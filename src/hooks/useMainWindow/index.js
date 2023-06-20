const { app, BrowserWindow } = require("electron");
const path = require("path");

module.exports = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const webContents = mainWindow.webContents;

  // and load the index.html of the app.
  mainWindow.loadURL("https://www.zxwyouxi.com/g/100067877");

  if (!app.isPackaged) {
    // Open the DevTools.
    webContents.openDevTools();
  }

  return mainWindow;
};
