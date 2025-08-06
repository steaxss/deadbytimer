import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Setting up DBD Timer Overlay project...\n');

// Create resources directory for icons
const resourcesDir = path.join(__dirname, '..', 'resources');
if (!fs.existsSync(resourcesDir)) {
  fs.mkdirSync(resourcesDir);
  console.log('✅ Created resources directory');
}

// Create dummy icon files if they don't exist
const iconFiles = [
  { name: 'icon.ico', content: 'Dummy Windows icon' },
  { name: 'icon.icns', content: 'Dummy macOS icon' },
  { name: 'icon.png', content: 'Dummy Linux icon' }
];

iconFiles.forEach(icon => {
  const iconPath = path.join(resourcesDir, icon.name);
  if (!fs.existsSync(iconPath)) {
    fs.writeFileSync(iconPath, icon.content);
    console.log(`✅ Created dummy ${icon.name}`);
  }
});

// Check if main entry points exist
const entryPoints = [
  'electron/main.ts',
  'electron/preload.ts',
  'src/main.tsx',
  'src/overlay.tsx',
  'index.html',
  'overlay.html'
];

console.log('\n📋 Checking entry points:');
entryPoints.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check dist-electron directory
const distElectronDir = path.join(__dirname, '..', 'dist-electron');
console.log(`\n📁 dist-electron exists: ${fs.existsSync(distElectronDir) ? '✅' : '❌'}`);

if (fs.existsSync(distElectronDir)) {
  const files = fs.readdirSync(distElectronDir);
  console.log('Files in dist-electron:', files);
  
  // Check if main.js exists
  const mainJsExists = files.includes('main.js');
  console.log(`main.js exists: ${mainJsExists ? '✅' : '❌'}`);
}

console.log('\n🎯 Setup complete! Try running: npm run electron:dev');