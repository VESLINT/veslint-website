#!/bin/bash

# VESLINT Infrastructure Setup Script
# This script sets up all required Google Cloud services for VESLINT

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "gcloud CLI is not installed. Please install it first:"
    print_error "https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    print_error "Firebase CLI is not installed. Please install it first:"
    print_error "npm install -g firebase-tools"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    print_error "No Google Cloud project is set. Please run:"
    print_error "gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

print_status "Setting up VESLINT infrastructure for project: $PROJECT_ID"

# Enable required APIs
print_status "Enabling required Google Cloud APIs..."
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable pubsub.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable firebase.googleapis.com
gcloud services enable cloudbuild.googleapis.com

print_success "APIs enabled successfully"

# Create Pub/Sub topic
print_status "Creating Pub/Sub topic 'process-chunk'..."
if gcloud pubsub topics describe process-chunk &>/dev/null; then
    print_warning "Pub/Sub topic 'process-chunk' already exists"
else
    gcloud pubsub topics create process-chunk
    print_success "Pub/Sub topic 'process-chunk' created"
fi

# Initialize Firestore (if not already done)
print_status "Checking Firestore database..."
if gcloud firestore databases describe --database="(default)" &>/dev/null; then
    print_warning "Firestore database already exists"
else
    print_status "Creating Firestore database..."
    gcloud firestore databases create --region=us-central1
    print_success "Firestore database created"
fi

# Create storage bucket (if not already exists)
print_status "Checking Cloud Storage bucket..."
BUCKET_NAME="${PROJECT_ID}.appspot.com"
if gsutil ls -b gs://$BUCKET_NAME &>/dev/null; then
    print_warning "Storage bucket already exists"
else
    print_status "Creating storage bucket..."
    gsutil mb gs://$BUCKET_NAME
    print_success "Storage bucket created"
fi

# Set up CORS for the bucket
print_status "Setting up CORS for storage bucket..."
cat > cors.json << EOF
[
  {
    "origin": ["http://localhost:3000", "https://localhost:3000", "https://${PROJECT_ID}.web.app", "https://${PROJECT_ID}.firebaseapp.com"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"]
  }
]
EOF

gsutil cors set cors.json gs://$BUCKET_NAME
rm cors.json
print_success "CORS configuration applied"

# Check if Firebase project is initialized
if [ ! -f "firebase.json" ]; then
    print_error "Firebase project not initialized. Please run 'firebase init' first."
    exit 1
fi

# Deploy functions
print_status "Deploying Cloud Functions..."
firebase deploy --only functions

print_success "Cloud Functions deployed successfully"

# Set up IAM permissions for Cloud Functions
print_status "Setting up IAM permissions..."
FUNCTION_SA="$PROJECT_ID@appspot.gserviceaccount.com"

# Grant necessary permissions to the default App Engine service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$FUNCTION_SA" \
    --role="roles/pubsub.publisher"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$FUNCTION_SA" \
    --role="roles/pubsub.subscriber"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$FUNCTION_SA" \
    --role="roles/storage.objectAdmin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$FUNCTION_SA" \
    --role="roles/datastore.user"

print_success "IAM permissions configured"

print_success "VESLINT infrastructure setup completed successfully!"
print_status "Your project is now ready for VESLINT deployment."
print_status ""
print_status "Next steps:"
print_status "1. Deploy the frontend: cd frontend && npm run build && firebase deploy --only hosting"
print_status "2. Test the system by uploading an AIS CSV file"
print_status ""
print_status "Project URL: https://${PROJECT_ID}.web.app"
