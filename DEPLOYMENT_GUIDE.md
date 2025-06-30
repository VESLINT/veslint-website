
# VESLINT Professional Deployment Guide

This comprehensive guide provides step-by-step instructions for deploying the VESLINT maritime vessel classification system to Google Cloud and Firebase.

## 🎯 Overview

VESLINT is a production-ready system that requires:
- **Python 3.11+ Cloud Functions** for ML processing
- **React Frontend** with TypeScript
- **Firestore Database** for job tracking
- **Cloud Storage** for file handling
- **Pub/Sub** for distributed processing
- **Firebase Authentication** for user management

## 📋 Prerequisites

Ensure you have the following installed and configured:

### Required Software
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **Python 3.11+** ([Download](https://www.python.org/))
- **Google Cloud CLI** ([Install Guide](https://cloud.google.com/sdk/docs/install))
- **Firebase CLI**: `npm install -g firebase-tools`

### Google Cloud Setup
1. **Create a Google Cloud Project** at [console.cloud.google.com](https://console.cloud.google.com)
2. **Enable Billing** (required for Cloud Functions, but stays within free tier)
3. **Note your Project ID** - you'll need this throughout the setup

## 🚀 Automated Deployment (Recommended)

### Step 1: Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd VESLINT

# Authenticate with Google Cloud
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Authenticate with Firebase
firebase login
```

### Step 2: Run Automated Setup
```bash
# Make the setup script executable
chmod +x setup-infrastructure.sh

# Run the automated infrastructure setup
./setup-infrastructure.sh
```

This script automatically:
- ✅ Enables all required Google Cloud APIs
- ✅ Creates the Pub/Sub topic for processing
- ✅ Sets up Firestore database
- ✅ Configures Cloud Storage with CORS
- ✅ Deploys Python Cloud Functions
- ✅ Sets up IAM permissions

### Step 3: Deploy Frontend
```bash
cd frontend
npm install

# Update Firebase configuration (see Configuration section below)
# Edit src/firebase-config.ts with your project details

npm run build
cd ..
firebase deploy --only hosting
```

### Step 4: Access Your Application
Your VESLINT system will be available at: `https://YOUR_PROJECT_ID.web.app`

## 🔧 Manual Deployment (Advanced)

If you prefer manual control or need to troubleshoot:

### 1. Enable Google Cloud APIs
```bash
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable pubsub.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable firebase.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Create Required Resources
```bash
# Create Pub/Sub topic
gcloud pubsub topics create process-chunk

# Create Firestore database
gcloud firestore databases create --region=us-central1

# Set up storage CORS (create cors.json first - see script for content)
gsutil cors set cors.json gs://YOUR_PROJECT_ID.appspot.com
```

### 3. Deploy Functions
```bash
cd functions
pip install -r requirements.txt
cd ..
firebase deploy --only functions
```

### 4. Set IAM Permissions
```bash
PROJECT_ID="your-project-id"
FUNCTION_SA="$PROJECT_ID@appspot.gserviceaccount.com"

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
```

## ⚙️ Configuration

### Firebase Configuration
Update `frontend/src/firebase-config.ts` with your project details:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

Find these values in:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings > General
4. Scroll down to "Your apps" and select the web app
5. Copy the configuration object

## 🧪 Local Development

### Start All Services Locally
```bash
# Terminal 1: Start Firebase emulators
firebase emulators:start

# Terminal 2: Start frontend development server
cd frontend
npm run dev
```

### Access Local Services
- **Frontend**: http://localhost:5173
- **Firebase UI**: http://localhost:4000
- **Functions**: http://localhost:8082
- **Firestore**: http://localhost:8080

## 🔍 Verification & Testing

### 1. Check Function Deployment
```bash
# List deployed functions
gcloud functions list

# Check function logs
gcloud functions logs read get_upload_url --limit 10
```

### 2. Test the System
1. Navigate to your deployed application
2. Sign up/sign in with email or Google
3. Upload a sample AIS CSV file
4. Monitor job progress in the dashboard
5. View classification results

### 3. Monitor Resources
- **Cloud Console**: Monitor function executions, storage usage
- **Firebase Console**: Check authentication, database, hosting
- **Pub/Sub Console**: Monitor message processing

## 🌐 Custom Domain Setup

### For Firebase Hosting
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter your domain (e.g., `veslint.com`)
4. Follow verification steps
5. Update DNS records as instructed

### DNS Configuration Example (Cloudflare)
```
Type: A
Name: @
Content: [Firebase IP 1]

Type: A
Name: @
Content: [Firebase IP 2]
```

## 🚨 Troubleshooting

### Common Issues

**"Pub/Sub topic not found"**
```bash
gcloud pubsub topics create process-chunk
```

**"Permission denied" errors**
```bash
# Re-run IAM setup
./setup-infrastructure.sh
```

**Functions not deploying**
```bash
# Check Python version
python --version  # Should be 3.11+

# Clear cache and redeploy
firebase functions:delete --force
firebase deploy --only functions
```

**Frontend not loading**
- Check Firebase configuration in `firebase-config.ts`
- Verify hosting is enabled: `firebase deploy --only hosting`

### Logs and Debugging
```bash
# Function logs
gcloud functions logs read --limit 50

# Firebase logs
firebase functions:log

# Real-time logs
gcloud functions logs tail
```

## 📊 Performance Optimization

### Production Settings
- **Function Memory**: 1GB (automatically set)
- **Function Timeout**: 540 seconds
- **Concurrent Executions**: 1000 (default)
- **Storage Class**: Standard
- **Firestore Mode**: Native

### Cost Optimization
- Functions automatically scale to zero
- Storage lifecycle rules for cleanup
- Firestore indexes optimized for queries
- Pub/Sub message retention: 7 days

## 🔒 Security Checklist

- ✅ Firestore security rules configured
- ✅ Storage security rules configured
- ✅ CORS properly set up
- ✅ IAM permissions minimal and specific
- ✅ Authentication required for uploads
- ✅ Input validation on all endpoints

## 📈 Monitoring & Maintenance

### Key Metrics to Monitor
- Function execution count and duration
- Storage usage and costs
- Pub/Sub message processing rates
- User authentication patterns
- Error rates and types

### Regular Maintenance
- Review and rotate service account keys
- Update dependencies monthly
- Monitor free tier usage
- Clean up old job data
- Review security rules

---

**Your VESLINT system is now ready for professional maritime vessel classification!**

For support, check the main README.md troubleshooting section or create an issue in the repository.
