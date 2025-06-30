# main.py

import firebase_admin
from firebase_admin import credentials, firestore, storage
from firebase_functions import https_fn, options, storage_fn, pubsub_fn, firestore_fn
from google.cloud import pubsub_v1
import google.cloud.firestore
import os
import json
import base64
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK
firebase_admin.initialize_app()

# Initialize Pub/Sub client
publisher = pubsub_v1.PublisherClient()

# Model configuration
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'assets', 'extreme_maritime_classifier.joblib')
model = None
feature_columns = None

# Expected feature columns based on the training notebook
EXPECTED_FEATURES = [
    'lat_mean', 'lon_mean', 'sog_mean', 'cog_mean', 'heading_mean',
    'lat_std', 'lon_std', 'sog_std', 'cog_std', 'heading_std',
    'lat_min', 'lon_min', 'sog_min', 'cog_min', 'heading_min',
    'lat_max', 'lon_max', 'sog_max', 'cog_max', 'heading_max',
    'lat_range', 'lon_range', 'sog_range', 'cog_range', 'heading_range',
    'total_distance', 'avg_speed', 'max_speed', 'time_span_hours',
    'num_points', 'avg_time_between_points', 'speed_changes',
    'direction_changes', 'stops_count', 'moving_time_ratio',
    'stationary_time_ratio', 'acceleration_mean', 'acceleration_std',
    'turn_rate_mean', 'turn_rate_std', 'distance_from_shore_mean',
    'distance_from_shore_min', 'in_port_ratio', 'night_activity_ratio',
    'weekend_activity_ratio', 'speed_consistency', 'course_consistency',
    'zigzag_factor', 'circular_variance', 'linearity_index'
]

def get_model():
    """Lazy load the model and feature columns."""
    global model, feature_columns
    if model is None:
        try:
            # Import heavy dependencies only when needed
            import joblib
            import numpy as np
            from sklearn.dummy import DummyClassifier

            if os.path.exists(MODEL_PATH):
                logger.info(f"Loading model from {MODEL_PATH}")
                model_data = joblib.load(MODEL_PATH)

                # Handle different model storage formats
                if isinstance(model_data, dict):
                    model = model_data.get('model')
                    feature_columns = model_data.get('feature_columns', EXPECTED_FEATURES)
                else:
                    model = model_data
                    feature_columns = EXPECTED_FEATURES

                logger.info("Model loaded successfully")
                logger.info(f"Expected features: {len(feature_columns)}")
            else:
                logger.warning(f"Model file not found at {MODEL_PATH}, using dummy classifier")
                raise FileNotFoundError("Model file not found")
        except Exception as e:
            logger.error(f"Could not load model: {e}")
            # Import here to avoid loading scikit-learn at module level
            from sklearn.dummy import DummyClassifier
            import numpy as np

            # Create a dummy model for development/testing
            model = DummyClassifier(strategy='constant', constant=0)
            feature_columns = EXPECTED_FEATURES
            # Fit with dummy data matching expected features
            X_dummy = np.random.rand(10, len(feature_columns))
            y_dummy = np.array([0, 1, 2, 3, 0, 1, 2, 3, 0, 1])  # 4 classes: TUG, FISHING, PLEASURE, CARGO
            model.fit(X_dummy, y_dummy)
            logger.info("Using dummy classifier for development")
    return model, feature_columns

def ensure_pubsub_topic():
    """Ensure the required Pub/Sub topic exists."""
    try:
        project_id = os.environ.get('GCLOUD_PROJECT', 'demo-project')
        topic_path = publisher.topic_path(project_id, 'process-chunk')

        # Try to get the topic
        try:
            publisher.get_topic(request={"topic": topic_path})
            logger.info(f"Pub/Sub topic 'process-chunk' already exists")
        except Exception:
            # Topic doesn't exist, create it
            logger.info(f"Creating Pub/Sub topic 'process-chunk'")
            publisher.create_topic(request={"name": topic_path})
            logger.info(f"Successfully created Pub/Sub topic 'process-chunk'")

    except Exception as e:
        logger.error(f"Error ensuring Pub/Sub topic exists: {e}")
        # Don't fail the function, just log the error

@https_fn.on_call(cors=options.CorsOptions(
    cors_origins=["http://localhost:3000", "https://localhost:3000"],
    cors_methods=["GET", "POST", "OPTIONS"]
))
def get_upload_url(req: https_fn.Request) -> https_fn.Response:
    """Gets a signed URL for uploading a file to Cloud Storage."""
    from datetime import timedelta
    
    bucket_name = os.environ.get('GCLOUD_PROJECT', 'demo-project') + '.appspot.com'
    file_name = req.data.get('fileName')
    content_type = req.data.get('contentType')

    if not file_name or not content_type:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT,
            message='The function must be called with two arguments, "fileName" and "contentType".'
        )

    bucket = storage.bucket(bucket_name)
    blob = bucket.blob(f'uploads/{file_name}')

    url = blob.generate_signed_url(
        version='v4',
        expiration=timedelta(minutes=15),
        method='PUT',
        content_type=content_type,
    )

    return https_fn.Response(url)

def validate_csv_data(df):
    """Validate that the CSV contains the required AIS data columns."""
    required_columns = ['mmsi', 'timestamp', 'lat', 'lon', 'sog', 'cog', 'heading']
    missing_columns = [col for col in required_columns if col not in df.columns]

    if missing_columns:
        raise ValueError(f"Missing required columns: {missing_columns}")

    # Check for reasonable data ranges
    if df['lat'].abs().max() > 90:
        raise ValueError("Invalid latitude values (must be between -90 and 90)")
    if df['lon'].abs().max() > 180:
        raise ValueError("Invalid longitude values (must be between -180 and 180)")
    if df['sog'].max() > 100:  # SOG in knots, 100 is very high but possible
        logger.warning("Very high speed over ground values detected")

    return True

def preprocess_ais_data(df):
    """Preprocess AIS data to extract features for each vessel."""
    import pandas as pd
    import numpy as np
    from datetime import datetime

    # Convert timestamp to datetime if it's not already
    if not pd.api.types.is_datetime64_any_dtype(df['timestamp']):
        df['timestamp'] = pd.to_datetime(df['timestamp'])

    # Group by MMSI (vessel identifier)
    vessel_features = []

    for mmsi, vessel_data in df.groupby('mmsi'):
        if len(vessel_data) < 5:  # Skip vessels with too few data points
            continue

        vessel_data = vessel_data.sort_values('timestamp')

        # Basic statistics
        features = {
            'mmsi': mmsi,
            'lat_mean': vessel_data['lat'].mean(),
            'lon_mean': vessel_data['lon'].mean(),
            'sog_mean': vessel_data['sog'].mean(),
            'cog_mean': vessel_data['cog'].mean(),
            'heading_mean': vessel_data['heading'].mean(),
            'lat_std': vessel_data['lat'].std(),
            'lon_std': vessel_data['lon'].std(),
            'sog_std': vessel_data['sog'].std(),
            'cog_std': vessel_data['cog'].std(),
            'heading_std': vessel_data['heading'].std(),
            'lat_min': vessel_data['lat'].min(),
            'lon_min': vessel_data['lon'].min(),
            'sog_min': vessel_data['sog'].min(),
            'cog_min': vessel_data['cog'].min(),
            'heading_min': vessel_data['heading'].min(),
            'lat_max': vessel_data['lat'].max(),
            'lon_max': vessel_data['lon'].max(),
            'sog_max': vessel_data['sog'].max(),
            'cog_max': vessel_data['cog'].max(),
            'heading_max': vessel_data['heading'].max(),
        }

        # Ranges
        features.update({
            'lat_range': features['lat_max'] - features['lat_min'],
            'lon_range': features['lon_max'] - features['lon_min'],
            'sog_range': features['sog_max'] - features['sog_min'],
            'cog_range': features['cog_max'] - features['cog_min'],
            'heading_range': features['heading_max'] - features['heading_min'],
        })

        # Time-based features
        time_span = (vessel_data['timestamp'].max() - vessel_data['timestamp'].min()).total_seconds()
        features.update({
            'time_span_hours': time_span / 3600,
            'num_points': len(vessel_data),
            'avg_time_between_points': time_span / max(len(vessel_data) - 1, 1),
        })

        # Movement features
        distances = []
        for i in range(1, len(vessel_data)):
            prev_row = vessel_data.iloc[i-1]
            curr_row = vessel_data.iloc[i]
            # Simplified distance calculation (Haversine would be more accurate)
            lat_diff = curr_row['lat'] - prev_row['lat']
            lon_diff = curr_row['lon'] - prev_row['lon']
            distance = np.sqrt(lat_diff**2 + lon_diff**2) * 111  # Rough km conversion
            distances.append(distance)

        total_distance = sum(distances) if distances else 0
        features.update({
            'total_distance': total_distance,
            'avg_speed': total_distance / max(features['time_span_hours'], 0.001),
            'max_speed': features['sog_max'],
        })

        # Add remaining features with default values
        remaining_features = {
            'speed_changes': len([d for d in distances if d > 0.1]),
            'direction_changes': 0,  # Simplified
            'stops_count': len(vessel_data[vessel_data['sog'] < 0.5]),
            'moving_time_ratio': len(vessel_data[vessel_data['sog'] >= 0.5]) / len(vessel_data),
            'stationary_time_ratio': len(vessel_data[vessel_data['sog'] < 0.5]) / len(vessel_data),
            'acceleration_mean': 0,  # Would need time-series calculation
            'acceleration_std': 0,
            'turn_rate_mean': 0,
            'turn_rate_std': 0,
            'distance_from_shore_mean': 10,  # Default assumption
            'distance_from_shore_min': 5,
            'in_port_ratio': 0.1,  # Default assumption
            'night_activity_ratio': 0.3,  # Default assumption
            'weekend_activity_ratio': 0.3,  # Default assumption
            'speed_consistency': 1 - (features['sog_std'] / max(features['sog_mean'], 0.001)),
            'course_consistency': 1 - (features['cog_std'] / 360),
            'zigzag_factor': features['total_distance'] / max(np.sqrt(features['lat_range']**2 + features['lon_range']**2) * 111, 0.001),
            'circular_variance': 0,  # Simplified
            'linearity_index': 0.5,  # Default
        }

        features.update(remaining_features)
        vessel_features.append(features)

    return pd.DataFrame(vessel_features)

@storage_fn.on_object_finalized()
def on_file_upload(event: storage_fn.CloudEvent) -> None:
    """
    Triggered by a new file upload. Validates, preprocesses, splits the CSV into chunks
    and publishes a Pub/Sub message for each.
    """
    # Import pandas only when needed
    import pandas as pd

    bucket_name = event.data.bucket
    file_name = event.data.name

    if not file_name.startswith('uploads/'):
        logger.info(f"Ignoring file not in uploads/: {file_name}")
        return

    logger.info(f"Processing uploaded file: {file_name}")

    # Ensure Pub/Sub topic exists
    ensure_pubsub_topic()

    client = firestore.client()
    job_ref = client.collection('jobs').document()

    job_ref.set({
        'fileName': file_name,
        'status': 'validating',
        'createdAt': firestore.SERVER_TIMESTAMP,
        'chunkCount': 0,
        'processedChunks': 0
    })

    try:
        # Download the file to a temporary location
        bucket = storage.bucket(bucket_name)
        blob = bucket.blob(file_name)
        tmp_path = f'/tmp/{os.path.basename(file_name)}'
        blob.download_to_filename(tmp_path)

        logger.info("Validating and preprocessing AIS data...")
        job_ref.update({'status': 'preprocessing'})

        # Read and validate the CSV
        raw_data = pd.read_csv(tmp_path)
        logger.info(f"Loaded {len(raw_data)} raw AIS records")

        validate_csv_data(raw_data)

        # Preprocess to extract vessel features
        vessel_features = preprocess_ais_data(raw_data)
        logger.info(f"Extracted features for {len(vessel_features)} vessels")

        if len(vessel_features) == 0:
            raise ValueError("No valid vessel data found after preprocessing")

        # Save preprocessed data
        processed_path = f'/tmp/processed_{os.path.basename(file_name)}'
        vessel_features.to_csv(processed_path, index=False)

        # Split the processed data into chunks and publish messages
        job_ref.update({'status': 'splitting'})
        chunk_size = 100  # Smaller chunks for processed vessel data
        chunk_count = 0

        for chunk in pd.read_csv(processed_path, chunksize=chunk_size):
            chunk_path = f'/tmp/chunk_{chunk_count}.csv'
            chunk.to_csv(chunk_path, index=False)

            # Upload chunk to storage
            chunk_blob = bucket.blob(f'chunks/{job_ref.id}/{chunk_count}.csv')
            chunk_blob.upload_from_filename(chunk_path)

            # Publish message
            project_id = os.environ.get('GCLOUD_PROJECT', 'demo-project')
            topic_path = publisher.topic_path(project_id, 'process-chunk')
            message_data = {
                'jobId': job_ref.id,
                'chunkId': chunk_count,
                'chunkPath': chunk_blob.name
            }
            message_bytes = json.dumps(message_data).encode('utf-8')
            publisher.publish(topic_path, message_bytes)
            chunk_count += 1
            os.remove(chunk_path)

        job_ref.update({
            'chunkCount': chunk_count,
            'status': 'processing',
            'vesselCount': len(vessel_features)
        })

        # Clean up temporary files
        os.remove(tmp_path)
        os.remove(processed_path)
        logger.info(f"Successfully split processed data into {chunk_count} chunks")

    except Exception as e:
        logger.error(f"Error processing file: {e}")
        job_ref.update({'status': 'error', 'error': str(e)})

def prepare_features_for_model(data, feature_columns):
    """Prepare the feature data for model prediction."""
    import pandas as pd
    import numpy as np

    # Ensure we have all required features
    missing_features = [col for col in feature_columns if col not in data.columns and col != 'mmsi']
    if missing_features:
        logger.warning(f"Missing features: {missing_features}")
        # Add missing features with default values
        for feature in missing_features:
            data[feature] = 0.0

    # Select only the features the model expects (excluding mmsi)
    model_features = [col for col in feature_columns if col != 'mmsi' and col in data.columns]
    X = data[model_features].copy()

    # Handle any remaining NaN values
    X = X.fillna(0)

    # Ensure all values are numeric
    for col in X.columns:
        X[col] = pd.to_numeric(X[col], errors='coerce').fillna(0)

    return X, data['mmsi'].tolist() if 'mmsi' in data.columns else list(range(len(data)))

@pubsub_fn.on_message_published(
    topic='process-chunk',
    memory=options.MemoryOption.GiB_1,
)
def process_chunk(event: pubsub_fn.CloudEvent) -> None:
    """Processes a single data chunk with the maritime classification model."""
    # Import pandas only when needed
    import pandas as pd
    import numpy as np

    try:
        # Decode the message data
        message_data_str = base64.b64decode(event.data.message.data).decode('utf-8')
        message_data = json.loads(message_data_str)
        job_id = message_data['jobId']
        chunk_id = message_data['chunkId']
        chunk_path = message_data['chunkPath']

        logger.info(f"Processing chunk {chunk_id} for job {job_id}")

        bucket_name = os.environ.get('GCLOUD_PROJECT', 'demo-project') + '.appspot.com'
        bucket = storage.bucket(bucket_name)

        # Download chunk
        blob = bucket.blob(chunk_path)
        tmp_chunk_path = f'/tmp/chunk_{job_id}_{chunk_id}.csv'
        blob.download_to_filename(tmp_chunk_path)

        # Load the data
        data = pd.read_csv(tmp_chunk_path)
        logger.info(f"Loaded chunk with {len(data)} vessels")

        # Get the model and feature columns
        current_model, feature_columns = get_model()

        # Prepare features for the model
        X, vessel_ids = prepare_features_for_model(data, feature_columns)

        # Make predictions
        try:
            predictions = current_model.predict(X)
            probabilities = None

            # Try to get prediction probabilities if available
            if hasattr(current_model, 'predict_proba'):
                try:
                    probabilities = current_model.predict_proba(X)
                except Exception:
                    logger.warning("Could not get prediction probabilities")

            logger.info(f"Successfully predicted {len(predictions)} vessel classifications")

        except Exception as model_error:
            logger.error(f"Model prediction error: {model_error}")
            # Fallback to dummy predictions
            predictions = np.zeros(len(data), dtype=int)
            probabilities = None

        # Map predictions to class names
        class_names = {0: 'TUG', 1: 'FISHING', 2: 'PLEASURE', 3: 'CARGO'}
        prediction_results = []

        for i, (vessel_id, pred) in enumerate(zip(vessel_ids, predictions)):
            result = {
                'mmsi': vessel_id,
                'prediction': int(pred),
                'class_name': class_names.get(int(pred), 'UNKNOWN'),
                'confidence': float(probabilities[i].max()) if probabilities is not None else 0.0
            }

            if probabilities is not None:
                result['class_probabilities'] = {
                    class_names[j]: float(prob) for j, prob in enumerate(probabilities[i])
                }

            prediction_results.append(result)

        # Store results in Firestore
        client = firestore.client()
        result_ref = client.collection('jobs').document(job_id).collection('results').document(str(chunk_id))
        result_ref.set({
            'predictions': prediction_results,
            'chunk_size': len(data),
            'processed_at': firestore.SERVER_TIMESTAMP
        })

        # Update job progress
        job_ref = client.collection('jobs').document(job_id)
        job_ref.update({'processedChunks': firestore.Increment(1)})

        os.remove(tmp_chunk_path)
        logger.info(f"Successfully processed chunk {chunk_id} with {len(predictions)} predictions")

    except Exception as e:
        logger.error(f"Error processing chunk: {e}")
        # Update job with error status
        try:
            client = firestore.client()
            job_ref = client.collection('jobs').document(job_id)
            job_ref.update({'status': 'error', 'error': str(e)})
        except Exception as firestore_error:
            logger.error(f"Failed to update job status: {firestore_error}")

@https_fn.on_call(cors=options.CorsOptions(
    cors_origins=["http://localhost:3000", "https://localhost:3000"],
    cors_methods=["GET", "POST", "OPTIONS"]
))
def get_job_results(req: https_fn.Request) -> https_fn.Response:
    """Get the results of a completed job."""
    try:
        job_id = req.data.get('jobId')
        if not job_id:
            raise https_fn.HttpsError(
                code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT,
                message='jobId is required'
            )

        client = firestore.client()

        # Get job info
        job_ref = client.collection('jobs').document(job_id)
        job_doc = job_ref.get()

        if not job_doc.exists:
            raise https_fn.HttpsError(
                code=https_fn.FunctionsErrorCode.NOT_FOUND,
                message='Job not found'
            )

        job_data = job_doc.to_dict()

        # Get all results
        results_ref = job_ref.collection('results')
        results_docs = results_ref.stream()

        all_predictions = []
        for doc in results_docs:
            chunk_results = doc.to_dict()
            if 'predictions' in chunk_results:
                all_predictions.extend(chunk_results['predictions'])

        # Aggregate statistics
        class_counts = {}
        total_vessels = len(all_predictions)

        for pred in all_predictions:
            class_name = pred.get('class_name', 'UNKNOWN')
            class_counts[class_name] = class_counts.get(class_name, 0) + 1

        response_data = {
            'jobId': job_id,
            'status': job_data.get('status'),
            'fileName': job_data.get('fileName'),
            'vesselCount': total_vessels,
            'classificationSummary': class_counts,
            'predictions': all_predictions,
            'createdAt': job_data.get('createdAt'),
            'completedAt': job_data.get('completedAt')
        }

        return https_fn.Response(response_data)

    except https_fn.HttpsError:
        raise
    except Exception as e:
        logger.error(f"Error getting job results: {e}")
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=f'Error retrieving results: {str(e)}'
        )

@firestore_fn.on_document_updated('jobs/{jobId}')
def on_job_update(event: firestore_fn.Change) -> None:
    """Finalizes the job when all chunks are processed."""
    job_data_after = event.after.to_dict()

    processed_chunks = job_data_after.get('processedChunks', 0)
    chunk_count = job_data_after.get('chunkCount', -1)

    logger.info(f"Job update: {processed_chunks}/{chunk_count} chunks processed")

    if chunk_count > 0 and processed_chunks == chunk_count:
        job_ref = event.after.reference
        job_ref.update({
            'status': 'completed',
            'completedAt': firestore.SERVER_TIMESTAMP
        })
        logger.info(f"Job {job_ref.id} completed successfully")