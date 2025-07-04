const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

const backendPath = path.join(__dirname, '..', 'cbgames-app');
const backendProcess = exec('npm start', { cwd: backendPath });

backendProcess.stdout.on('data', (data) => {
  console.log(`Backend: ${data}`);
});
backendProcess.stderr.on('data', (data) => {
  console.error(`Backend Error: ${data}`);
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'dist/index.html'));
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    backendProcess.kill(); 
    app.quit();
  }
});