import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import net from 'net';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting DBD Timer Overlay...\n');

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
    console.log('📦 Starting Vite dev server...');
    const viteProcess = spawn('npx', ['vite', '--port', '5173'], {
      stdio: 'pipe',
      shell: true
    });
    
    viteProcess.stdout.on('data', (data) => {
      process.stdout.write(`[VITE] ${data}`);
    });
    
    await waitForServer(5173);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('⚡ Starting Electron...');
    const electronProcess = spawn('npx', ['cross-env', 'NODE_ENV=development', 'electron', '.'], {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..')
    });
    
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down...');
      viteProcess.kill('SIGTERM');
      electronProcess.kill('SIGTERM');
      setTimeout(() => process.exit(0), 1000);
    });
    
    electronProcess.on('close', (code) => {
      console.log(`\n📱 Electron exited with code ${code}`);
      viteProcess.kill('SIGTERM');
      process.exit(code);
    });
    
    console.log('🎉 Application started successfully!');
    
  } catch (error) {
    console.error('❌ Error starting application:', error.message);
    process.exit(1);
  }
}

startApp();