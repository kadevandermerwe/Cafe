#!/bin/bash
# Complete script to build and deploy the restaurant website without a database

# Display banner
echo "====================================================="
echo "  Restaurant Website - No-Database Deployment Script"
echo "====================================================="
echo ""

# Run our optimized render-scripts build script
echo "Running optimized build script..."
chmod +x ./render-scripts/build.sh
./render-scripts/build.sh

# Display success message and instructions
echo ""
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
echo "   - Build Command: ./render-scripts/build.sh"
echo "   - Start Command: ./render-scripts/start.sh"
echo ""
echo "The website will use in-memory storage for all data,"
echo "making it perfect for portfolio demonstration purposes."
echo "====================================================="