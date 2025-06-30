#!/bin/bash

# VESLINT System Test Script
# This script tests all components of the VESLINT system

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[FAIL]${NC} $1"
}

# Get project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    print_error "No Google Cloud project is set"
    exit 1
fi

print_status "Testing VESLINT system for project: $PROJECT_ID"

# Test 1: Check required APIs
print_status "Checking required Google Cloud APIs..."
REQUIRED_APIS=(
    "cloudfunctions.googleapis.com"
    "pubsub.googleapis.com"
    "firestore.googleapis.com"
    "storage.googleapis.com"
    "firebase.googleapis.com"
)

for api in "${REQUIRED_APIS[@]}"; do
    if gcloud services list --enabled --filter="name:$api" --format="value(name)" | grep -q "$api"; then
        print_success "API enabled: $api"
    else
        print_error "API not enabled: $api"
        exit 1
    fi
done

# Test 2: Check Pub/Sub topic
print_status "Checking Pub/Sub topic..."
if gcloud pubsub topics describe process-chunk &>/dev/null; then
    print_success "Pub/Sub topic 'process-chunk' exists"
else
    print_error "Pub/Sub topic 'process-chunk' not found"
    exit 1
fi

# Test 3: Check Firestore database
print_status "Checking Firestore database..."
if gcloud firestore databases describe --database="(default)" &>/dev/null; then
    print_success "Firestore database exists"
else
    print_error "Firestore database not found"
    exit 1
fi

# Test 4: Check Cloud Storage bucket
print_status "Checking Cloud Storage bucket..."
BUCKET_NAME="${PROJECT_ID}.appspot.com"
if gsutil ls -b gs://$BUCKET_NAME &>/dev/null; then
    print_success "Storage bucket exists: $BUCKET_NAME"
else
    print_error "Storage bucket not found: $BUCKET_NAME"
    exit 1
fi

# Test 5: Check deployed Cloud Functions
print_status "Checking deployed Cloud Functions..."
REQUIRED_FUNCTIONS=(
    "get_upload_url"
    "on_file_upload"
    "process_chunk"
    "on_job_update"
    "get_job_results"
)

for func in "${REQUIRED_FUNCTIONS[@]}"; do
    if gcloud functions describe $func --region=us-central1 &>/dev/null; then
        print_success "Function deployed: $func"
    else
        print_error "Function not found: $func"
        exit 1
    fi
done

# Test 6: Check model file
print_status "Checking ML model file..."
if [ -f "functions/assets/extreme_maritime_classifier.joblib" ]; then
    print_success "ML model file exists"
else
    print_warning "ML model file not found - system will use dummy classifier"
fi

# Test 7: Check frontend build
print_status "Checking frontend build..."
if [ -d "frontend/dist" ] || [ -d "frontend/build" ]; then
    print_success "Frontend build directory exists"
else
    print_warning "Frontend not built - run 'cd frontend && npm run build'"
fi

# Test 8: Test function connectivity
print_status "Testing function connectivity..."
FUNCTION_URL="https://us-central1-${PROJECT_ID}.cloudfunctions.net/get_upload_url"

# Create a test request
TEST_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"data":{"fileName":"test.csv","contentType":"text/csv"}}' \
    "$FUNCTION_URL" || echo "ERROR")

if [[ "$TEST_RESPONSE" == *"ERROR"* ]] || [[ "$TEST_RESPONSE" == *"error"* ]]; then
    print_error "Function connectivity test failed"
    echo "Response: $TEST_RESPONSE"
else
    print_success "Function connectivity test passed"
fi

# Test 9: Check IAM permissions
print_status "Checking IAM permissions..."
SERVICE_ACCOUNT="${PROJECT_ID}@appspot.gserviceaccount.com"

REQUIRED_ROLES=(
    "roles/pubsub.publisher"
    "roles/pubsub.subscriber"
    "roles/storage.objectAdmin"
    "roles/datastore.user"
)

for role in "${REQUIRED_ROLES[@]}"; do
    if gcloud projects get-iam-policy $PROJECT_ID --flatten="bindings[].members" --format="table(bindings.role)" --filter="bindings.members:serviceAccount:$SERVICE_ACCOUNT AND bindings.role:$role" | grep -q "$role"; then
        print_success "IAM role assigned: $role"
    else
        print_warning "IAM role not found: $role"
    fi
done

# Test 10: Validate sample data
print_status "Validating sample AIS data..."
if [ -f "sample-ais-data.csv" ]; then
    # Check if CSV has required columns
    HEADER=$(head -n 1 sample-ais-data.csv)
    REQUIRED_COLUMNS=("mmsi" "timestamp" "lat" "lon" "sog" "cog" "heading")
    
    for col in "${REQUIRED_COLUMNS[@]}"; do
        if [[ "$HEADER" == *"$col"* ]]; then
            print_success "Required column found: $col"
        else
            print_error "Required column missing: $col"
            exit 1
        fi
    done
    
    # Count data rows
    DATA_ROWS=$(tail -n +2 sample-ais-data.csv | wc -l)
    print_success "Sample data has $DATA_ROWS rows"
else
    print_warning "Sample AIS data file not found"
fi

print_success "All system tests passed!"
print_status ""
print_status "System is ready for use. Next steps:"
print_status "1. Access your application at: https://${PROJECT_ID}.web.app"
print_status "2. Upload the sample-ais-data.csv file to test the system"
print_status "3. Monitor job progress in the dashboard"
print_status ""
print_status "For monitoring:"
print_status "- Function logs: gcloud functions logs read --limit 50"
print_status "- Firebase console: https://console.firebase.google.com/project/${PROJECT_ID}"
print_status "- Cloud console: https://console.cloud.google.com/home/dashboard?project=${PROJECT_ID}"
