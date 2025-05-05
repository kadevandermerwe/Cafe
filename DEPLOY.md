# Deployment Guide

This document provides instructions for deploying the Restaurant Website to various platforms, with a focus on database-free deployment for portfolio demonstration purposes.

## Database-Free Deployment

The website is designed to work without requiring a database connection, making it ideal for portfolio demonstration purposes. All data is stored in memory, simulating a full-featured restaurant website without the overhead of database setup.

### Deployment on Render.com

1. Fork or push this repository to GitHub, GitLab, or any Git provider supported by Render.
2. In Render, create a new Web Service and connect to your repository.
3. Configure the service with the following settings:

   - **Name**: `restaurant-website` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `./deploy-no-database.sh`
   - **Start Command**: `NODE_ENV=production node dist/index.js`

4. Click "Create Web Service" and wait for the deployment to complete.

The `deploy-no-database.sh` script handles all the necessary configuration to ensure the website works without a database connection.

### Verifying Deployment

Once deployed, your website should function fully, including:
- Home page with restaurant information
- Menu page with food categories and items
- About page with restaurant story
- Contact page with map and contact form
- Booking page with reservation functionality

All features will work as expected, storing data in memory for the duration of the server process.

## Using with a Real Database (Optional)

If you want to use the website with a real database for persistent data storage:

1. Set up a PostgreSQL database (Render.com offers this service).
2. Add a `DATABASE_URL` environment variable in your deployment settings, pointing to your PostgreSQL database.
3. The application will automatically detect the database connection and use it instead of in-memory storage.

## Troubleshooting

If you encounter issues with the deployment:

1. Check the logs in Render.com to see any error messages.
2. Ensure the `deploy-no-database.sh` script is executable (`chmod +x deploy-no-database.sh`).
3. Verify that the scripts in this repository haven't been modified in a way that would affect the deployment process.

## Notes for Portfolio Use

This website is ideal for demonstrating your full-stack development skills as part of a portfolio:

- The frontend showcases React, TypeScript, and modern CSS skills
- The booking system demonstrates interactive form handling
- The in-memory storage demonstrates understanding of server-side architecture
- The responsive design shows mobile-first development approach

Feel free to customize the content, styling, and functionality to showcase your unique skills and preferences.