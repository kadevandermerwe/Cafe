#!/bin/bash
# Complete script to build and deploy the restaurant website without a database

# Display banner
echo "====================================================="
echo "  Restaurant Website - No-Database Deployment Script"
echo "====================================================="
echo ""

# Step 1: Set environment variable for build process
echo "Step 1: Setting environment variables..."
export FORCE_IN_MEMORY=true
export DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
echo "Environment variables set!"
echo ""

# Step 2: Build the application
echo "Step 2: Building the application..."
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed! Please check the errors above."
  exit 1
fi
echo "Build successful!"
echo ""

# Step 3: Apply patch to ensure no database is required
echo "Step 3: Applying patch for database-free operation..."
node patch-for-deployment.js
if [ $? -ne 0 ]; then
  echo "Patch failed! Please check the errors above."
  exit 1
fi
echo "Patch successfully applied!"
echo ""

# Step 4: Setup for production
echo "Step 4: Finalizing deployment..."
echo "FORCE_IN_MEMORY=true" > .env
echo "Deployment preparation complete!"
echo ""

# Display success message and instructions
echo "====================================================="
echo "  DEPLOYMENT READY!"
echo "====================================================="
echo ""
echo "Your restaurant website is now ready for deployment without"
echo "requiring a database connection."
echo ""
echo "How to deploy on render.com:"
echo "1. Connect your repository to render.com"
echo "2. Configure your Web Service:"
echo "   - Build Command: ./deploy-no-database.sh"
echo "   - Start Command: NODE_ENV=production node dist/index.js"
echo ""
echo "The website will use in-memory storage for all data,"
echo "making it perfect for portfolio demonstration purposes."
echo "====================================================="