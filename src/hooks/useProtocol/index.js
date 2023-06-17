const { net, protocol } = require("electron");
const path = require("path");
const { pathToFileURL } = require("url");
protocol.registerSchemesAsPrivileged([
  {
    scheme: "custom",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
    },
  },
]);

module.exports = () => {
  protocol.handle("custom", (req) => {
    const filePath = req.url.slice("custom://".length);
    return net.fetch(
      pathToFileURL(path.resolve(__dirname, "../../", filePath)).toString()
    );
  });
};
