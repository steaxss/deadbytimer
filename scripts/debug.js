import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Checking project structure...\n');

// Check required files
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.js',
  'src/App.tsx',
  'src/main.tsx',
  'src/overlay.tsx',
  'electron/main.ts',
  'electron/preload.ts',
  'index.html',
  'overlay.html'
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check dependencies
console.log('\n📦 Checking package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  console.log(`Name: ${pkg.name}`);
  console.log(`Version: ${pkg.version}`);
  console.log(`Main: ${pkg.main}`);
  
  const requiredDeps = ['react', 'react-dom', 'zustand', 'electron-store'];
  const requiredDevDeps = ['electron', 'vite', 'typescript', '@vitejs/plugin-react'];
  
  console.log('\n📋 Required dependencies:');
  requiredDeps.forEach(dep => {
    const exists = pkg.dependencies && pkg.dependencies[dep];
    console.log(`${exists ? '✅' : '❌'} ${dep}`);
  });
  
  console.log('\n🛠️ Required dev dependencies:');
  requiredDevDeps.forEach(dep => {
    const exists = pkg.devDependencies && pkg.devDependencies[dep];
    console.log(`${exists ? '✅' : '❌'} ${dep}`);
  });
  
} catch (error) {
  console.log('❌ Failed to read package.json');
}

console.log('\n🎯 Debug complete!');