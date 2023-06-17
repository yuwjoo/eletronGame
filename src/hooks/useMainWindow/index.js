const { BrowserWindow } = require("electron");
const path = require("path");
const apiMap = require("./apiMap");

module.exports = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const webContents = mainWindow.webContents;

  // and load the index.html of the app.
  mainWindow.loadURL("https://element.eleme.cn/#/zh-CN/component/skeleton");

  // Open the DevTools.
  webContents.openDevTools();

  // 请求拦截
  webContents.session.webRequest.onBeforeRequest((details, callback) => {
    const targetAPi = apiMap[details.url];
    if (targetAPi) {
      callback({
        cancel: false,
        redirectURL: targetAPi,
      });
    } else {
      callback(details);
    }
  });

  return mainWindow;
};
