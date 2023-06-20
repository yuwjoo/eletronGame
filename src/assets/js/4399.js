let fixedButton = null; // 悬浮按钮
let config = {}; // 外挂配置

const timear1 = setInterval(() => {
  fixedButton = document.querySelector(".float-cover");
  if (fixedButton) {
    fixedButton.addEventListener("mouseenter", () => {
      init();
    });
    clearInterval(timear1);
  }
}, 1000);

window.addEventListener(
  "message",
  function (e) {
    data = e.data;
    if (data.type === "_pulgConfig") {
      config = data.data;
      init();
    }
  },
  false
);

function init() {
  const content = document.querySelector(
    ".slide.slide-border .slide-container .navigation"
  );
  const dom = `
    <fieldset>
      <legend>外挂辅助</legend>

      <div>
        <input type="checkbox" id="hideFirstAD" name="hideFirstAD" ${
          config.hideFirstAD ? "checked" : ""
        } oninput="setConfig(event.target.checked, 'hideFirstAD')">
        <label for="hideFirstAD">关闭首屏广告</label>
      </div>

      <div>
        <input type="checkbox" id="enemyLose" name="enemyLose" ${
          config.enemyLose ? "checked" : ""
        } oninput="setConfig(event.target.checked, 'enemyLose')">
        <label for="enemyLose">对方回合结束，直接获胜</label>
      </div>
      
      <div>
        <input type="checkbox" id="hideBlackBall" name="hideBlackBall" ${
          config.hideBlackBall ? "checked" : ""
        } oninput="setConfig(event.target.checked, 'hideBlackBall')">
        <label for="hideBlackBall">隐藏黑球，己方需要时自动出现</label>
      </div>
      
      <div>
        <input type="checkbox" id="onePolePlatformCleaning" name="onePolePlatformCleaning" ${
          config.onePolePlatformCleaning ? "checked" : ""
        } oninput="setConfig(event.target.checked, 'onePolePlatformCleaning')">
        <label for="onePolePlatformCleaning">开启一杆清台模式</label>
      </div>
      
      <div>
        <input type="number" id="salfPower" value="${config.salfPower}" oninput="setConfig(event.target.value, 'salfPower')">
        <label for="salfPower">自己击球力度</label>
      </div>

      <div>
        <input type="number" id="botPower" value="${config.botPower}" oninput="setConfig(event.target.value, 'botPower')">
        <label for="botPower">电脑击球力度</label>
      </div>
  </fieldset>
    `;
  content.innerHTML = dom;
}

function setConfig(value, key) {
  window.frames[0].postMessage({ [key]: value }, "*");
  config = {
    ...config,
    [key]: value
  }
}
