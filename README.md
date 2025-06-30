
# VESLINT - VEssel Surveillance & Logging INTelligence

**Professional Maritime Vessel Classification System**

VESLINT is a serverless, AI-powered maritime vessel classification system that processes AIS (Automatic Identification System) data to automatically classify vessels into categories such as TUG, FISHING, PLEASURE, and CARGO vessels. The system is architected to run entirely within Google Cloud's "always-free" tiers while providing enterprise-grade performance and accuracy.

## 🚀 Key Features

- **AI-Powered Classification**: Advanced machine learning model with 88%+ accuracy
- **Scalable Processing**: Parallel processing of large AIS datasets using Cloud Functions and Pub/Sub
- **Real-time Results**: Live job status tracking and results visualization
- **Professional UI**: Modern React frontend with Material-UI components
- **Cost-Effective**: Designed to run within Google Cloud free tier limits
- **Automated Infrastructure**: One-command setup for all required cloud services

## 🏗️ Architecture

The application is a full-stack solution with:

- **Frontend:** React application with TypeScript and Material-UI
- **Backend:** Python Cloud Functions implementing fan-out/fan-in parallel processing
- **ML Pipeline:** Automated feature engineering and vessel classification
- **Database:** Firestore for job tracking and results storage
- **File Storage:** Cloud Storage for AIS data and processing chunks
- **Messaging:** Pub/Sub for distributed processing coordination
- **Authentication:** Firebase Authentication

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and npm
- **Python 3.11+**
- **Google Cloud CLI** ([Install Guide](https://cloud.google.com/sdk/docs/install))
- **Firebase CLI**: `npm install -g firebase-tools`
- **A Google Cloud Project** with billing enabled (required for Cloud Functions)

## ⚡ Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd VESLINT
```

### 2. Google Cloud Setup

```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Login to Firebase
firebase login
```

### 3. Automated Infrastructure Setup

Run our automated setup script to configure all required Google Cloud services:

```bash
chmod +x setup-infrastructure.sh
./setup-infrastructure.sh
```

This script will:
- Enable all required Google Cloud APIs
- Create the Pub/Sub topic for processing
- Set up Firestore database
- Configure Cloud Storage with CORS
- Deploy Cloud Functions
- Set up IAM permissions

### 4. Frontend Setup

```bash
cd frontend
npm install

# Update Firebase configuration in src/firebase-config.ts with your project details
# Then build and deploy
npm run build
cd ..
firebase deploy --only hosting
```

### 5. Access Your Application

Your VESLINT application will be available at:
`https://YOUR_PROJECT_ID.web.app`

## 📊 Data Format

VESLINT expects AIS data in CSV format with the following columns:

- `mmsi`: Maritime Mobile Service Identity (vessel identifier)
- `timestamp`: ISO 8601 timestamp
- `lat`: Latitude (-90 to 90)
- `lon`: Longitude (-180 to 180)
- `sog`: Speed over ground (knots)
- `cog`: Course over ground (degrees)
- `heading`: Vessel heading (degrees)

### Example CSV Format:
```csv
mmsi,timestamp,lat,lon,sog,cog,heading
123456789,2024-01-01T00:00:00Z,40.7128,-74.0060,12.5,180,175
123456789,2024-01-01T00:05:00Z,40.7130,-74.0058,12.8,182,178
```

## 🔬 Machine Learning Model

VESLINT uses an advanced ensemble machine learning model trained on real AIS data with the following characteristics:

- **Model Type**: Meta-ensemble combining Random Forest, Extra Trees, LightGBM, XGBoost, CatBoost, and Gradient Boosting
- **Accuracy**: 88.15% on test data
- **Features**: 99 engineered features including movement patterns, behavioral analysis, and temporal characteristics
- **Classes**: TUG (61.4%), FISHING (18.3%), PLEASURE (14.0%), CARGO (6.2%)

### Feature Engineering

The system automatically extracts 99 features from raw AIS data:

- **Statistical Features**: Mean, std, min, max, range for position and movement
- **Temporal Features**: Time spans, activity patterns, night/weekend ratios
- **Movement Features**: Distance calculations, speed consistency, course changes
- **Behavioral Features**: Stop detection, port activity, zigzag patterns

## 🛠️ Development

### Local Development

1. **Start Firebase Emulators:**
```bash
firebase emulators:start
```

2. **Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```

3. **Access Local Application:**
- Frontend: `http://localhost:5173`
- Firebase UI: `http://localhost:4000`

### Project Structure

```
VESLINT/
├── functions/                 # Python Cloud Functions
│   ├── main.py               # Main function definitions
│   ├── requirements.txt      # Python dependencies
│   └── assets/              # ML model files
├── frontend/                 # React frontend
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   └── package.json         # Node dependencies
├── firebase.json            # Firebase configuration
├── firestore.rules         # Firestore security rules
├── storage.rules           # Storage security rules
└── setup-infrastructure.sh # Automated setup script
```

## 🔧 Configuration

### Environment Variables

The system uses the following environment variables:

- `GCLOUD_PROJECT`: Google Cloud Project ID (automatically set)
- `NODE_ENV`: Environment (development/production)

### Firebase Configuration

Update `frontend/src/firebase-config.ts` with your project configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 📈 Performance & Scaling

- **Processing Speed**: ~1000 vessels per minute
- **Concurrent Jobs**: Multiple jobs can run simultaneously
- **Memory Usage**: 1GB per processing function
- **Storage**: Automatic cleanup of temporary files
- **Cost**: Designed to stay within free tier limits

## 🔒 Security

- **Authentication**: Firebase Auth with email/password and Google sign-in
- **Authorization**: Firestore security rules
- **Data Validation**: Server-side validation of all inputs
- **CORS**: Properly configured for web access
- **Error Handling**: Comprehensive error logging and user feedback

## 🚨 Troubleshooting

### Common Issues

1. **"Pub/Sub topic not found"**
   - Run the setup script: `./setup-infrastructure.sh`
   - Or manually create: `gcloud pubsub topics create process-chunk`

2. **"Model prediction error"**
   - Check that the model file exists in `functions/assets/`
   - Verify CSV data format matches expected columns

3. **"Permission denied"**
   - Ensure all required APIs are enabled
   - Check IAM permissions for the service account

4. **Frontend not connecting**
   - Verify Firebase configuration in `firebase-config.ts`
   - Check CORS settings on Cloud Storage

### Logs and Monitoring

- **Cloud Functions Logs**: `gcloud functions logs read`
- **Firebase Console**: Monitor jobs and errors
- **Cloud Console**: View Pub/Sub metrics and storage usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review Cloud Functions logs for detailed error information

---

**VESLINT** - Professional Maritime Intelligence at Scale
