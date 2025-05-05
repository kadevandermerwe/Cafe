// Simple patch script to modify the built files to work without a database
const fs = require('fs');
const path = require('path');

console.log('Applying memory-only mode patch for deployment...');

// Path to the built server file
const distIndexPath = path.join(__dirname, 'dist', 'index.js');

if (!fs.existsSync(distIndexPath)) {
  console.error(`Error: Built file not found at ${distIndexPath}`);
  console.error('Run "npm run build" first before running this patch script.');
  process.exit(1);
}

try {
  let content = fs.readFileSync(distIndexPath, 'utf8');
  
  // Replace any code that throws an error for missing DATABASE_URL
  // with code that uses in-memory storage instead
  const originalPattern = 'if (!process.env.DATABASE_URL) {';
  const replacement = 'if (false) { // Always use in-memory for deployment';
  
  if (content.includes(originalPattern)) {
    content = content.replace(originalPattern, replacement);
    fs.writeFileSync(distIndexPath, content, 'utf8');
    console.log('Successfully patched dist/index.js to work without a database!');
  } else {
    console.log('No need to patch - the file does not contain DATABASE_URL check.');
  }

  // Create .env file to ensure in-memory mode is used
  fs.writeFileSync('.env', 'FORCE_IN_MEMORY=true\n', 'utf8');
  console.log('Created .env file with FORCE_IN_MEMORY=true');
  
  console.log('Patch complete! The application will now use in-memory storage.');
} catch (error) {
  console.error('Error patching file:', error);
  process.exit(1);
}