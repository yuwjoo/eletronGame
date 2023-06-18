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
        <input type="checkbox" id="huey" name="drone" ${
          config.isSuccess ? "checked" : ""
        } oninput="setConfig(event, 'isSuccess')">
        <label for="huey">对方回合结束，直接获胜</label>
      </div>
  
      <div>
        <input type="checkbox" id="dewey" name="drone" ${
          config.onlyOneselfSuccess ? "checked" : ""
        } oninput="setConfig(event, 'onlyOneselfSuccess')">
        <label for="dewey">获胜者只能是自己</label>
      </div>
  </fieldset>
    `;
  content.innerHTML = dom;
}

function setConfig(event, key) {
  const value = event.target.checked;
  window.frames[0].postMessage({ [key]: value }, "*");
  config = {
    ...config,
    [key]: value
  }
}
