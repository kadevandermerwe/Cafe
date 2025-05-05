// This script prepares the environment for a database-free deployment
// It ensures the build process can complete even if DATABASE_URL is not set

// Log the process
console.log('Preparing for database-free deployment...');

// Set environment variables for the build process
process.env.FORCE_IN_MEMORY = 'true';

// Create a temporary DATABASE_URL for drizzle-kit if none exists
// This avoids errors during build, but won't actually connect to any database
if (!process.env.DATABASE_URL) {
  console.log('Setting placeholder DATABASE_URL for build process...');
  process.env.DATABASE_URL = 'postgresql://mock:mock@localhost:5432/mockdb';
}

console.log('Environment prepared for database-free deployment!');