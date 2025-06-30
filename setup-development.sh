#!/bin/bash

# VESLINT Development Environment Setup Script
# Sets up local development environment with Firebase emulators

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[DEV]${NC} $1"
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

print_status "Setting up VESLINT development environment..."

# Check prerequisites
print_status "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

if ! command -v firebase &> /dev/null; then
    print_error "Firebase CLI is not installed. Install with: npm install -g firebase-tools"
    exit 1
fi

print_success "Prerequisites check passed"

# Install Python dependencies
print_status "Installing Python dependencies..."
cd functions
if [ ! -d "venv" ]; then
    python3 -m venv venv
    print_success "Created Python virtual environment"
fi

source venv/bin/activate
pip install -r requirements.txt
print_success "Python dependencies installed"
cd ..

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
cd frontend
npm install
print_success "Frontend dependencies installed"
cd ..

# Check Firebase project
print_status "Checking Firebase project configuration..."
if [ ! -f "firebase.json" ]; then
    print_error "Firebase project not initialized. Please run 'firebase init' first."
    exit 1
fi

PROJECT_ID=$(grep -o '"projectId": "[^"]*"' frontend/src/firebase-config.ts | cut -d'"' -f4 2>/dev/null || echo "")
if [ -z "$PROJECT_ID" ]; then
    print_warning "Firebase project ID not found in config. Please update frontend/src/firebase-config.ts"
else
    print_success "Firebase project configured: $PROJECT_ID"
fi

# Create development scripts
print_status "Creating development scripts..."

# Create start-emulators script
cat > start-emulators.sh << 'EOF'
#!/bin/bash
echo "Starting Firebase emulators..."
firebase emulators:start --import=./emulator-data --export-on-exit=./emulator-data
EOF

# Create start-frontend script
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "Starting frontend development server..."
cd frontend
npm run dev
EOF

# Create start-dev script that runs both
cat > start-dev.sh << 'EOF'
#!/bin/bash
echo "Starting VESLINT development environment..."
echo "This will start both Firebase emulators and frontend dev server"
echo "Press Ctrl+C to stop all services"

# Function to cleanup background processes
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start emulators in background
./start-emulators.sh &
EMULATOR_PID=$!

# Wait a bit for emulators to start
sleep 5

# Start frontend in background
./start-frontend.sh &
FRONTEND_PID=$!

echo ""
echo "🚀 VESLINT Development Environment Started!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔥 Firebase UI: http://localhost:4000"
echo "⚡ Functions: http://localhost:8082"
echo "🗄️  Firestore: http://localhost:8080"
echo "📦 Storage: http://localhost:9199"
echo "📨 Pub/Sub: http://localhost:8085"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for background processes
wait
EOF

chmod +x start-emulators.sh start-frontend.sh start-dev.sh

print_success "Development scripts created"

# Create sample environment file
print_status "Creating sample environment configuration..."
cat > .env.development << EOF
# VESLINT Development Environment Configuration
NODE_ENV=development
REACT_APP_FIREBASE_USE_EMULATOR=true

# Firebase Emulator Ports (default values)
REACT_APP_FIRESTORE_EMULATOR_PORT=8080
REACT_APP_AUTH_EMULATOR_PORT=9099
REACT_APP_FUNCTIONS_EMULATOR_PORT=8082
REACT_APP_STORAGE_EMULATOR_PORT=9199
REACT_APP_PUBSUB_EMULATOR_PORT=8085
EOF

print_success "Environment configuration created"

# Create emulator data directory
mkdir -p emulator-data
print_success "Emulator data directory created"

# Create development README
cat > DEVELOPMENT.md << 'EOF'
# VESLINT Development Guide

## Quick Start

1. **Start Development Environment:**
   ```bash
   ./start-dev.sh
   ```

2. **Access Services:**
   - Frontend: http://localhost:5173
   - Firebase UI: http://localhost:4000
   - Functions: http://localhost:8082

## Individual Services

- **Start only emulators:** `./start-emulators.sh`
- **Start only frontend:** `./start-frontend.sh`

## Testing

1. Upload `sample-ais-data.csv` through the frontend
2. Monitor processing in Firebase UI
3. Check function logs in the emulator UI

## Debugging

- **Function logs:** Available in Firebase UI at http://localhost:4000
- **Database data:** View in Firestore emulator
- **Storage files:** View in Storage emulator

## Hot Reload

- Frontend changes reload automatically
- Function changes require restart of emulators
- Database/storage data persists between restarts

## Production Testing

To test against production Firebase:
1. Set `REACT_APP_FIREBASE_USE_EMULATOR=false` in .env.development
2. Restart frontend development server
EOF

print_success "Development documentation created"

print_success "🎉 Development environment setup complete!"
print_status ""
print_status "To start developing:"
print_status "1. Run: ./start-dev.sh"
print_status "2. Open: http://localhost:5173"
print_status "3. Upload sample-ais-data.csv to test"
print_status ""
print_status "Available scripts:"
print_status "- ./start-dev.sh      - Start full development environment"
print_status "- ./start-emulators.sh - Start only Firebase emulators"
print_status "- ./start-frontend.sh  - Start only frontend dev server"
print_status ""
print_status "See DEVELOPMENT.md for detailed development guide"
