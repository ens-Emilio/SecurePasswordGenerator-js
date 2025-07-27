#!/bin/bash
# Script to start a simple local HTTP server for the project using Node.js and Express

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install Node.js to use this script."
    exit 1
fi

# Start the Node.js server
echo "Starting local server at http://localhost:8000"
node server.js
