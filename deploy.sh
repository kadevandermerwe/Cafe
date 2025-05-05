#!/bin/bash
# Main deployment script - runs the render-scripts for build and test start

echo "====================================================="
echo "  Restaurant Website - Deployment Setup"
echo "====================================================="
echo ""
echo "This script will prepare your restaurant website for deployment,"
echo "with a focus on the portfolio/demo deployment option."
echo ""
echo "Options:"
echo "1. Build for deployment (creates dist/ folder)"
echo "2. Test run the built application"
echo "3. Exit"
echo ""
read -p "Select an option (1-3): " option

case $option in
  1)
    echo ""
    echo "Building application for deployment..."
    chmod +x ./render-scripts/build.sh
    ./render-scripts/build.sh
    echo ""
    echo "Build complete! The application is ready for deployment."
    echo "You can now deploy the contents of this directory to your hosting provider."
    echo ""
    echo "For Render.com deployment:"
    echo "- Build Command: ./render-scripts/build.sh"  
    echo "- Start Command: ./render-scripts/start.sh"
    echo ""
    ;;
  2)
    echo ""
    echo "Testing the built application..."
    chmod +x ./render-scripts/start.sh
    ./render-scripts/start.sh
    ;;
  3)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid option. Exiting."
    exit 1
    ;;
esac