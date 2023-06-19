const { net, protocol } = require("electron");
const path = require("path");
const { pathToFileURL } = require("url");
const apiHelper = require("./apiHelper");

protocol.registerSchemesAsPrivileged([
  {
    scheme: "customfile",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
    },
  },
]);

/**
 * @name: 请求处理器
 * @param {Request} request 当前请求
 * @return {Request} 新的请求
 */
async function handleRequest(request) {
  const apiRule = apiHelper.findRule(request);
  if (!apiRule || !apiRule.request) {
    return request;
  }
  let { url, options } =  typeof apiRule.request === "string" ? { url: apiRule.request } : await apiRule.request(request);
  if (new URL(url).protocol === "customfile:") {
    url = getLocalFileUrl(url);
    options = {};
  }
  return new Request(url, options || request);
}

/**
 * @name: 响应处理器
 * @param {String} url 当前请求地址
 * @param {Response} response 当前响应
 * @return {Response} 新的响应
 */
async function handleResponse(url, response) {
  const apiRule = apiHelper.findRule({ url });
  if (!apiRule || !apiRule.response) {
    return response;
  }
  const { body, options } = await apiRule.response(response);
  return new Response(body, options || response);
}

/**
 * @name: 获取本地文件file地址
 * @param {string} url customfile地址
 * @return {string} file地址
 */
function getLocalFileUrl(url) {
  const { host, pathname, search } = new URL(url);
  return pathToFileURL(
    path.resolve(__dirname, "../../", `${host}${pathname}${search}`)
  ).toString();
}

module.exports = () => {
  protocol.handle("http", async (req) => {
    const res = await net.fetch(await handleRequest(req), {
      bypassCustomProtocolHandlers: true,
    });
    return await handleResponse(req.url, res);
  });

  protocol.handle("https", async (req) => {
    const res = await net.fetch(await handleRequest(req), {
      bypassCustomProtocolHandlers: true,
    });
    return await handleResponse(req.url, res);
  });

  protocol.handle("customfile", (req) => {
    return net.fetch(getLocalFileUrl(req.url));
  });
};
