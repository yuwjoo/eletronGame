window._pulgConfig = {
  currentId: "2523204", // 自己账号id
  ballState: 0, // 0：禁用，1：所有小球进袋，2：所有大球进袋，3：移动黑球到上中袋，4：移动小球到上中袋，5：移动大球到上中袋，6：所有球到上中袋
  currentPower: 0, // 0：禁用，数字：自己球杆力度
  youPower: 0, // 0：禁用，数字：电脑球杆力度
  isSuccess: false, // 对手回合结束，直接胜利
  onlyOneselfSuccess: false, // 获胜者只能是自己
};

const parent = window.parent;
parent.postMessage({ type: "_pulgConfig", data: window._pulgConfig }, "*");

window.addEventListener(
  "message",
  function (e) {
    if (e.source != window.parent) return;
    window._pulgConfig = {
      ...window._pulgConfig,
      ...e.data,
    };
  },
  false
);
