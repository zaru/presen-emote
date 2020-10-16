const {app, BrowserWindow, ipcMain} = require('electron');
const os = require('os');
const path = require('path');


/**
 * @type {BrowserWindow}
 */
let win = null;

/**
 * MainWindow
 */
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 640,
    hasShadow: false,
    transparent: true,
    frame: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const osName = os.platform();
  // MagickCode
  if (osName === 'darwin') {
    app.dock.hide();
    win.setAlwaysOnTop(true, 'floating');
    win.setVisibleOnAllWorkspaces(true);
    win.setFullScreenable(false);
    app.dock.show();
  } else if (osName === 'win32' || osName === 'cygwin') {
    win.setAlwaysOnTop(true);
  }

  win.loadURL('http://0.0.0.0:3000/presen.html');

  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});