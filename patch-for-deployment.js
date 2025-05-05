/**
 * This script patches the built files for deployment without database requirement.
 * It modifies dist/index.js to remove the DATABASE_URL requirement.
 */

const fs = require('fs');
const path = require('path');

console.log('Starting deployment patching process...');

// Path to the built server file
const serverFilePath = path.resolve(__dirname, 'dist', 'index.js');

// Check if file exists
if (!fs.existsSync(serverFilePath)) {
  console.error('Error: Built server file not found at', serverFilePath);
  console.error('Did you run "npm run build" first?');
  process.exit(1);
}

// Read the file content
console.log('Reading built server file...');
let content = fs.readFileSync(serverFilePath, 'utf8');

// Find and replace the DATABASE_URL check if present
if (content.includes('DATABASE_URL must be set')) {
  console.log('Removing DATABASE_URL requirement...');
  
  // Create a pattern to match the DATABASE_URL check and error throwing
  const pattern = /if\s*\(\s*!\s*process\.env\.DATABASE_URL\s*\)\s*\{\s*throw new Error\(\s*(['"])DATABASE_URL must be set[^]*?\)\s*;\s*\}/g;
  
  // Replace with a simple log indicating in-memory mode
  const replacement = 'console.log("DEPLOYMENT: Using in-memory storage mode");';
  
  // Perform the replacement
  const newContent = content.replace(pattern, replacement);
  
  // Check if replacement was successful
  if (newContent === content) {
    console.warn('Warning: Could not find DATABASE_URL check pattern. The file may have changed or already been patched.');
  } else {
    console.log('Replacement successful!');
    content = newContent;
  }
} else {
  console.log('No DATABASE_URL requirement found. File may already be patched.');
}

// Write the modified content back to the file
console.log('Writing updated file...');
fs.writeFileSync(serverFilePath, content, 'utf8');

console.log('Deployment patch completed successfully!');