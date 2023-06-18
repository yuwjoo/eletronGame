const rules = [
  {
    match: /res1\.ly\-games\.cn\/h5_4399\/js\/main\.min_/,
    request: "customfile://assets/js/main.min_f761f093.js",
  },
  {
    match: "https://www.zxwyouxi.com/g/100067877",
    response: async (response) => {
      const html = await response.text();
      const index = html.indexOf('<meta name="google" content="notranslate">');
      const data = `
      <link rel="stylesheet" href="https://assets/css/zxwyouxi.css">
      `;
      const newHtml = `${html.slice(0, index)}${data}${html.slice(index)}`;
      return { body: newHtml };
    },
  },
  {
    match: /^https:\/\/h\.api\.4399\.com\/g\.php/,
    response: async (response) => {
      const html = await response.text();
      const index = html.indexOf('</html>');
      const data = `
      <link rel="stylesheet" href="https://assets/css/4399.css">
      <script src="https://assets/js/4399.js"></script>
      `;
      const newHtml = `${html.slice(0, index)}${data}${html.slice(index)}`;
      return { body: newHtml };
    },
  },
  {
    match: /^https:\/\/res1\.ly\-games\.cn\/h5_4399\/index\.html/,
    response: async (response) => {
      const html = await response.text();
      const index = html.indexOf('</head>');
      const data = `
      <script src="https://assets/js/games.js"></script>
      `;
      const newHtml = `${html.slice(0, index)}${data}${html.slice(index)}`;
      return { body: newHtml };
    },
  },
  {
    match: "https://assets/css/zxwyouxi.css",
    request: "customfile://assets/css/zxwyouxi.css",
  },
  {
    match: "https://assets/css/4399.css",
    request: "customfile://assets/css/4399.css",
  },
  {
    match: "https://assets/js/4399.js",
    request: "customfile://assets/js/4399.js",
  },
  {
    match: "https://assets/js/games.js",
    request: "customfile://assets/js/games.js",
  },
];

/**
 * @name: 获取api规则
 * @param {object} config 接口配置(可能是响应对象，也可能是请求对象)
 * @return {object} api规则
 */
function findRule(config) {
  return rules.find((rule) => {
    switch (Object.prototype.toString.call(rule.match)) {
      case "[object RegExp]":
        return rule.match.test(config.url);
      case "[object String]":
        return rule.match === config.url;
      case "[object Function]":
        return rule.match(config.url, config);
    }
  });
}

module.exports = {
  rules,
  findRule,
};
