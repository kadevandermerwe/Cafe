# Deployment Guide

This document provides detailed instructions for deploying the restaurant website in various environments.

## Deployment Options

### Option 1: Database-Free Deployment (Recommended for Portfolios)

This is the simplest deployment method, ideal for portfolio demonstrations. It uses in-memory storage to simulate database functionality without requiring an actual database connection.

#### Using Render.com

1. **Fork or clone the repository** to your GitHub account
2. **Connect to Render.com**:
   - Sign up/login to [Render](https://render.com)
   - Create a new Web Service and connect your repository
   - Configure as follows:
     - **Build Command**: `./render-scripts/build.sh`
     - **Start Command**: `./render-scripts/start.sh`
     - **Environment Variables**:
       - Key: `FORCE_IN_MEMORY` Value: `true`
       - Key: `DATABASE_URL` Value: `postgresql://placeholder:placeholder@localhost:5432/placeholder`
     - **Plan**: Free tier works fine

3. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

#### Manual Deployment

If you're deploying to another platform or your own server:

1. **Prepare the application**:
   ```bash
   # Run the deployment script to build and patch the application
   chmod +x ./deploy-no-database.sh
   ./deploy-no-database.sh
   ```

2. **Deploy the application**:
   - The `/dist` directory now contains the fully built application
   - Upload these files to your hosting provider
   - Ensure your server starts the application with: `NODE_ENV=production node dist/index.js`
   - Set the environment variable `FORCE_IN_MEMORY=true`

### Option 2: With Database (Optional)

If you want persistent data storage:

1. **Set up a PostgreSQL database**:
   - Create a new PostgreSQL database instance
   - Note the connection string in the format: `postgresql://username:password@hostname:port/database`

2. **Deploy with database connection**:
   - Follow the same steps as Option 1, but:
     - Set `FORCE_IN_MEMORY=false` (or omit this variable)
     - Set `DATABASE_URL` to your actual PostgreSQL connection string

3. **Initialize the database**:
   - The application will automatically create the necessary tables on first run

## Verifying Deployment

After deployment:

1. **Check the application logs** to ensure proper startup
2. **Visit the website** and verify all features function correctly
3. **Test the booking system** to ensure it properly saves reservations
   
## Troubleshooting

### Common Issues

**Error: DATABASE_URL must be set**
- Make sure you've set the `FORCE_IN_MEMORY=true` environment variable
- If using database mode, ensure your `DATABASE_URL` is correct and accessible

**Application starts but shows blank page**
- Check browser console for JavaScript errors
- Verify that all assets loaded properly

**Booking system doesn't save reservations**
- In database-free mode, this is normal - data is stored in memory and will reset on server restart
- If using a database, check database connectivity and permissions

## Maintenance

To update an existing deployment:

1. Push changes to your repository
2. Render.com will automatically rebuild and redeploy
3. For manual deployments, run the deployment script again and upload the new files

---

If you encounter any issues not covered in this guide, please open an issue on the repository.