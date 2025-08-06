import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import net from 'net';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting DBD Timer Overlay in development mode...\n');

// Function to wait for file existence
function waitForFile(filepath, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkFile = () => {
      if (fs.existsSync(filepath)) {
        console.log(`✅ Found ${filepath}`);
        resolve(true);
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        reject(new Error(`Timeout waiting for ${filepath}`));
        return;
      }
      
      setTimeout(checkFile, 100);
    };
    
    checkFile();
  });
}

// Function to wait for server
function waitForServer(port, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkServer = () => {
      const socket = new net.Socket();
      
      socket.setTimeout(1000);
      socket.on('connect', () => {
        socket.destroy();
        console.log(`✅ Server ready on port ${port}`);
        resolve(true);
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        checkAgain();
      });
      
      socket.on('error', () => {
        checkAgain();
      });
      
      const checkAgain = () => {
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Timeout waiting for server on port ${port}`));
          return;
        }
        setTimeout(checkServer, 500);
      };
      
      socket.connect(port, 'localhost');
    };
    
    checkServer();
  });
}

async function startApp() {
  try {
    // Nettoyer les anciens builds
    console.log('🧹 Cleaning old builds...');
    const distElectronPath = path.join(__dirname, '..', 'dist-electron');
    if (fs.existsSync(distElectronPath)) {
      fs.rmSync(distElectronPath, { recursive: true, force: true });
    }
    
    // Étape 1: Build Electron en premier
    console.log('🔧 Building Electron main process...');
    const buildElectron = spawn('npx', ['vite', 'build', '--config', 'vite.config.ts', '--mode', 'development'], {
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, NODE_ENV: 'development' }
    });
    
    buildElectron.stdout.on('data', (data) => {
      process.stdout.write(`[BUILD] ${data}`);
    });
    
    buildElectron.stderr.on('data', (data) => {
      process.stderr.write(`[BUILD ERROR] ${data}`);
    });
    
    await new Promise((resolve, reject) => {
      buildElectron.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Electron build completed');
          resolve(null);
        } else {
          reject(new Error(`Electron build failed with code ${code}`));
        }
      });
    });
    
    // Vérifier que main.js existe
    const mainJsPath = path.join(__dirname, '..', 'dist-electron', 'main.js');
    await waitForFile(mainJsPath);
    
    // Étape 2: Démarrer Vite dev server
    console.log('📦 Starting Vite dev server...');
    const viteProcess = spawn('npx', ['vite', '--port', '5173'], {
      stdio: 'pipe',
      shell: true
    });
    
    viteProcess.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(`[VITE] ${output}`);
    });
    
    viteProcess.stderr.on('data', (data) => {
      process.stderr.write(`[VITE ERROR] ${data}`);
    });
    
    // Attendre que le serveur Vite soit prêt
    await waitForServer(5173);
    
    // Petite pause pour s'assurer que tout est stable
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Étape 3: Démarrer Electron
    console.log('⚡ Starting Electron...');
    const electronProcess = spawn('npx', ['cross-env', 'NODE_ENV=development', 'electron', '.'], {
      stdio: 'pipe',
      shell: true,
      cwd: path.join(__dirname, '..')
    });
    
    electronProcess.stdout.on('data', (data) => {
      process.stdout.write(`[ELECTRON] ${data}`);
    });
    
    electronProcess.stderr.on('data', (data) => {
      const output = data.toString();
      // Ignorer les erreurs de cache GPU qui sont normales
      if (output.includes('cache') || output.includes('Cache') || output.includes('GPU')) {
        return;
      }
      process.stderr.write(`[ELECTRON] ${data}`);
    });
    
    // Gestion de la fermeture
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down...');
      viteProcess.kill('SIGTERM');
      electronProcess.kill('SIGTERM');
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    });
    
    electronProcess.on('close', (code) => {
      console.log(`\n📱 Electron exited with code ${code}`);
      viteProcess.kill('SIGTERM');
      process.exit(code);
    });
    
    viteProcess.on('close', (code) => {
      console.log(`\n📦 Vite exited with code ${code}`);
      electronProcess.kill('SIGTERM');
      process.exit(code);
    });
    
    console.log('🎉 Application started successfully!');
    
  } catch (error) {
    console.error('❌ Error starting application:', error.message);
    process.exit(1);
  }
}

startApp();