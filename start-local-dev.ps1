# VESLINT Local Development Startup Script
# PowerShell script to start all development services

Write-Host "🚀 Starting VESLINT Local Development Environment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "python")) {
    Write-Host "❌ Python not found. Please install Python 3.11+" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "firebase")) {
    Write-Host "❌ Firebase CLI not found. Install with: npm install -g firebase-tools" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All prerequisites found" -ForegroundColor Green

# Check if Java is available for full emulator suite
$javaAvailable = Test-Command "java"
if (-not $javaAvailable) {
    Write-Host "⚠️  Java not found. Will start functions emulator only." -ForegroundColor Yellow
    Write-Host "   Install Java 11+ for full emulator suite (Firestore, Auth, etc.)" -ForegroundColor Yellow
}

# Start Firebase Emulators
Write-Host "🔥 Starting Firebase Emulators..." -ForegroundColor Yellow

if ($javaAvailable) {
    Write-Host "Starting full emulator suite..." -ForegroundColor Green
    Start-Process -FilePath "firebase" -ArgumentList "emulators:start" -WindowStyle Normal
} else {
    Write-Host "Starting functions emulator only..." -ForegroundColor Yellow
    Start-Process -FilePath "firebase" -ArgumentList "emulators:start", "--only", "functions" -WindowStyle Normal
}

# Wait for emulators to start
Write-Host "⏳ Waiting for emulators to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Start Frontend Development Server
Write-Host "⚛️  Starting React Development Server..." -ForegroundColor Yellow
Set-Location "frontend"
Start-Process -FilePath "npm" -ArgumentList "start" -WindowStyle Normal
Set-Location ".."

# Display access information
Write-Host ""
Write-Host "🎉 VESLINT Development Environment Started!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend Application: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔥 Firebase Emulator UI: http://localhost:4000" -ForegroundColor Cyan
Write-Host "⚡ Functions Emulator: http://localhost:8082" -ForegroundColor Cyan

if ($javaAvailable) {
    Write-Host "🗄️  Firestore Emulator: http://localhost:8080" -ForegroundColor Cyan
    Write-Host "🔐 Auth Emulator: http://localhost:9099" -ForegroundColor Cyan
    Write-Host "📦 Storage Emulator: http://localhost:9199" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🧪 Testing Instructions:" -ForegroundColor Yellow
Write-Host "1. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "2. Sign up for a new account or login" -ForegroundColor White
Write-Host "3. Upload the sample-ais-data.csv file" -ForegroundColor White
Write-Host "4. Monitor processing in Firebase UI at http://localhost:4000" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in any terminal to stop all services" -ForegroundColor Red
