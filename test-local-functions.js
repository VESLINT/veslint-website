// Test script for local VESLINT functions
const https = require('https');
const http = require('http');

// Test the get_upload_url function
async function testGetUploadUrl() {
    console.log('🧪 Testing get_upload_url function...');
    
    const postData = JSON.stringify({
        data: {
            fileName: 'test-ais-data.csv',
            contentType: 'text/csv'
        }
    });

    const options = {
        hostname: 'localhost',
        port: 8081,
        path: '/veslint-49fb2/us-central1/get_upload_url',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    console.log('✅ get_upload_url response:', response);
                    resolve(response);
                } catch (error) {
                    console.error('❌ Failed to parse response:', data);
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Request failed:', error.message);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Test function to check if functions are running
async function testFunctionsHealth() {
    console.log('🏥 Testing functions health...');
    
    const options = {
        hostname: 'localhost',
        port: 8081,
        path: '/',
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                console.log('✅ Functions emulator is running');
                console.log('Response status:', res.statusCode);
                resolve(data);
            });
        });

        req.on('error', (error) => {
            console.error('❌ Functions emulator not accessible:', error.message);
            reject(error);
        });

        req.end();
    });
}

// Main test function
async function runTests() {
    console.log('🚀 Starting VESLINT Local Function Tests\n');
    
    try {
        // Test 1: Check if functions emulator is running
        await testFunctionsHealth();
        console.log('');
        
        // Test 2: Test get_upload_url function
        await testGetUploadUrl();
        console.log('');
        
        console.log('🎉 All tests completed successfully!');
        console.log('');
        console.log('Next steps:');
        console.log('1. Open a new terminal and run: cd frontend && npm start');
        console.log('2. Open http://localhost:3000 in your browser');
        console.log('3. Try uploading the sample-ais-data.csv file');
        
    } catch (error) {
        console.error('❌ Tests failed:', error.message);
        console.log('');
        console.log('Troubleshooting:');
        console.log('1. Make sure Firebase functions emulator is running');
        console.log('2. Check that the emulator is on port 8081');
        console.log('3. Verify your functions are deployed to the emulator');
    }
}

// Run the tests
runTests();
