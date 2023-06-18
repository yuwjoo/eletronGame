module.exports = (app, module) => {
  if (!app.isPackaged) {
    const reLoader = require("electron-reloader");
    reLoader(module); //热加载
  }
};
