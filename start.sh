#!/bin/bash

# Exit immediately if any command fails. It doesn't cover all cases 
# (e.g. when BE of FE is already running), but good enough for the rest of cases.
set -e  

# Start the backend server
cd backend
echo "Running: npm install (backend)"
npm install

echo "Starting backend server..."
node index.js &
cd ..

# Start the frontend server
cd frontend
echo "Running: npm install (frontend)"
npm install

echo "Starting frontend server..."
npm start
