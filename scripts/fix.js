import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Fixing common DBD Timer Overlay issues...\n');

// Create missing directories
const dirs = ['dist', 'dist-electron', 'resources'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Create resources and dummy icons
const resourcesDir = path.join(__dirname, '..', 'resources');
const iconFiles = [
  { name: 'icon.ico', content: 'ICON_PLACEHOLDER' },
  { name: 'icon.icns', content: 'ICON_PLACEHOLDER' },
  { name: 'icon.png', content: 'ICON_PLACEHOLDER' }
];

iconFiles.forEach(icon => {
  const iconPath = path.join(resourcesDir, icon.name);
  if (!fs.existsSync(iconPath)) {
    fs.writeFileSync(iconPath, icon.content);
    console.log(`✅ Created dummy ${icon.name}`);
  }
});

// Check main entry points
const entryPoints = [
  'electron/main.ts',
  'electron/preload.ts',
  'src/main.tsx',
  'src/overlay.tsx',
  'index.html',
  'overlay.html'
];

console.log('\n📋 Checking entry points:');
let allGood = true;
entryPoints.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allGood = false;
});

// Check package.json
console.log('\n📦 Checking package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  console.log(`✅ Package name: ${pkg.name}`);
  console.log(`✅ Main entry: ${pkg.main}`);
  
  const requiredDeps = ['react', 'react-dom', 'zustand', 'electron-store'];
  const missingDeps = requiredDeps.filter(dep => !pkg.dependencies || !pkg.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:', missingDeps.join(', '));
    allGood = false;
  } else {
    console.log('✅ All required dependencies present');
  }
} catch (error) {
  console.log('❌ Failed to read package.json');
  allGood = false;
}

// Check node_modules
console.log('\n📁 Checking node_modules...');
const nodeModulesExists = fs.existsSync(path.join(__dirname, '..', 'node_modules'));
if (!nodeModulesExists) {
  console.log('❌ node_modules not found - run "npm install"');
  allGood = false;
} else {
  console.log('✅ node_modules exists');
}

if (allGood) {
  console.log('\n🎉 All checks passed! You can now run:');
  console.log('   npm run electron:dev');
} else {
  console.log('\n⚠️  Some issues found. Try running:');
  console.log('   npm install');
  console.log('   npm run clean');
  console.log('   npm run electron:dev');
}

console.log('\n🎯 Fix complete!');