#!/bin/bash
# Script specifically for Render.com builds

# Set environment variables for in-memory mode
export FORCE_IN_MEMORY=true

# Create a placeholder DATABASE_URL for the build process
# This will prevent drizzle-kit from throwing an error
export DATABASE_URL="postgresql://mock:mock@localhost:5432/mockdb"

# Run the standard build process
npm install
npm run build

# Set environment for the running app
echo "FORCE_IN_MEMORY=true" > .env

# Success message
echo "Build completed successfully for Render.com deployment!"
echo "The application will use in-memory storage."