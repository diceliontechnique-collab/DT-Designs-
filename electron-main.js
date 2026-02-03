const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false, // Frameless Window enabled
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.ico')
  });

  // Handle Window Controls via IPC
  ipcMain.on('window-control', (event, action) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    if (!win) return;

    if (action === 'close') win.close();
    else if (action === 'minimize') win.minimize();
    else if (action === 'maximize') {
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
    }
  });

  // Load the production build
  win.loadFile(path.join(__dirname, 'dist/index.html'));
  
  // Production optimizations
  win.maximize();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// التدقيق النهائي (مُستمر): إغلاق العملية تماماً لتجنب استهلاك الرام في الخلفية
app.on('window-all-closed', () => {
  app.quit();
  if (process.platform !== 'darwin') {
    process.exit(0);
  }
});