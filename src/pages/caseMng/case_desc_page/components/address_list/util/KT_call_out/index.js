let KT_UTILS = {};
KT_UTILS.call = (obj) => {
  var config = {
    uname: obj.loginName,
    pwd: obj.password,
    debug: true,
    isAutoAnswer: true,
    stateListenerCallBack: this.stateCallback,
    forceAnswerWhenRing: false, // 是否振铃自动接通
    autoReady: true,
    url: obj.url
  };
  CallHelper.init(config, this.initCallback);
}
