
import Cookie from 'js-cookie';
import Vue from 'vue';
import { Notification } from "element-ui";
let _this = new Vue();
const h = _this.$createElement;
let util = {};
util.title = function (title, vm) {
  let iTitle = '贷后管理系统';
  if (title) {
    iTitle += ' - ' + (title.i18n ? vm.$t(title.i18n) : title);
  }
  window.document.title = iTitle;
};
util.clearAllCookie = function () {
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
};
util.inOf = function (arr, targetArr) {
  let res = true;
  arr.forEach((item) => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.showThisRoute = function (itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
};

util.handleTitle = function (vm, item) {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
};

util.setCurrentPath = function (vm, name) {
  let title = '';
  let isOtherRouter = false;
  vm.$store.state.app.routers.forEach((item) => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item);
        if (item.name === 'otherRouter') {
          isOtherRouter = true;
        }
      }
    } else {
      item.children.forEach((child) => {
        if (child.name === name) {
          title = util.handleTitle(vm, child);
          if (item.name === 'otherRouter') {
            isOtherRouter = true;
          }
        }
      });
    }
  });
  console.log(name, '-----------------');
  let currentPathArr = [];
  if (name === '/home') {
    currentPathArr = [
      {
        title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, '/home')),
        path: '/home',
        name: '/home'
      }
    ];
  } else
    if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== '/home') {
      currentPathArr = [
        {
          title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, '/home')),
          path: '/home',
          name: '/home'
        },
        {
          title: title,
          path: '',
          name: name
        }
      ];
    } else {
      let currentPathObj = vm.$store.state.app.routers.filter((item) => {
        if (item.children.length <= 1) {
          return item.children[0].name === name;
        } else {
          let i = 0;
          let childArr = item.children;
          let len = childArr.length;
          while (i < len) {
            if (childArr[i].name === name) {
              return true;
            }
            i++;
          }
          return false;
        }
      })[0];
      if (currentPathObj.children.length <= 1 && currentPathObj.name === '/home') {
        currentPathArr = [
          {
            title: '首页',
            path: '/home',
            name: '/home'
          }
        ];
      } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== '/home') {
        currentPathArr = [
          {
            title: '首页',
            path: '/home',
            name: '/home'
          },
          {
            title: currentPathObj.title,
            path: '',
            name: name
          }
        ];
      } else {
        let childObj = currentPathObj.children.filter((child) => {
          return child.name === name;
        })[0];
        currentPathArr = [
          {
            title: '首页',
            path: '/home',
            name: '/home'
          },
          {
            title: currentPathObj.title,
            path: '',
            name: currentPathObj.name
          },
          {
            title: childObj.title,
            path: currentPathObj.path + '/' + childObj.path,
            name: name
          }
        ];
      }
    }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      if (item.children) {
        return name === item.children[0].name;
      } else {
        return name === item.name;
      }
    });
    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit('increateTag', tag);
    }
  }
  vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

util.dowloadfile = function (name, res) {
  var blob = new Blob([res], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); // 创建下载的链接
  console.log(href, '--------------');
  downloadElement.href = href;
  downloadElement.download = name + '.xlsx'; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
util.dowloadZip = function (res) {
  const type = 'application/zip'//ZIP文件
  const blob = new Blob([res], { type: type })
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  //后台再header中传文件名
  // const name = decodeURI(res.headers['content-disposition'].split('=')[1])
  console.log(href)
  downloadElement.href = href
  downloadElement.download = '录音';
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
};
util.dowloadAudio = function (res) {
  const type = 'audio/mpeg'//mp3文件
  const blob = new Blob([res], { type: type })
  const href = window.URL.createObjectURL(blob);
  return href;
};
util.fullscreenEvent = function (vm) {
  vm.$store.commit('initCachepage');
  // 全屏相关
};
// 处理导入文件的案件号分割
util.slice_case_number = (arr, prevIndex, nextIndex) => {
  let newArr = [];
  newArr = arr.slice(prevIndex, nextIndex);
  arr = [];
  return newArr;
}
// 处理当前日期 xxxx-xx-xx
util.getToday = (num) => {
  // num 0=> today, 1=> tomorrow, -1=> yesterday
  let today = new Date();
  let year = today.getFullYear();
  let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
  let day;
  if (num) {
    day = today.getDate() < 10 ? '0' + (today.getDate() + num) : today.getDate() + num;
  } else {
    day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  }
  today = `${year}-${month}-${day}`;
  return today;
}
let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
let chnUnitChar = ["", "十", "百", "千"];

function SectionToChinese(section) {
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

util.NumberToChinese = (num) => {
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    console.log(strIns)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }
  return chnStr;
}

util.websocket = () => {
  //  地址配置在webpack
  let websocket = new WebSocket(`${LOCALHOST}/${Cookie.get('user')}`);
  // let websocket = new WebSocket(`wss://fcs-front-test.vbillbank.com/admin/websocket/${Cookie.get('user')}`);
  console.log(LOCALHOST)
  //连接发生错误的回调方法
  websocket.onerror = function () {
    //         setMessageInnerHTML("WebSocket连接发生错误");
  }; //连接成功建立的回调方法

  websocket.onopen = function () {
    //         setMessageInnerHTML("WebSocket连接成功");
    // websocket.send("我是从客户端发出去的消息");
    // websocket.send("我是从客户端发出去的消息2");
    // websocket.send("我是从客户端发出去的消息3");
    // websocket.send("我是从客户端发出去的消息4");
  }; //接收到消息的回调方法
  websocket.onmessage = (event) => {
    //         setMessageInnerHTML(event.data);
    console.log(event.data);
    let data = JSON.parse(event.data);
    switch (data.msgType) {
      case '01':
        Notification({
          title: data.msgTitle,
          message: h('span', { style: 'color: #fff; font-weight: 600' }, data.msgContent),
          type: "error",
          duration: 5000,
          position: 'bottom-left',
          customClass: 'notice-error'
        });
        break;
      case '02':
        Notification({
          title: data.msgTitle,
          message: h('span', { style: 'color: #fff; font-weight: 600' }, data.msgContent),
          type: "info",
          duration: 5000,
          position: 'bottom-left',
          customClass: 'notice-info'
        });
        break;
      case '03':
        Notification({
          title: data.msgTitle,
          message: h('span', { style: 'color: #fff; font-weight: 600' }, data.msgContent),
          type: "success",
          duration: 5000,
          position: 'bottom-left',
          customClass: 'notice-success'
        });
        break;
    }

  }; //连接关闭的回调方法

  websocket.onclose = function () {
    //         setMessageInnerHTML("WebSocket连接关闭");
  }; //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。

  window.onbeforeunload = function () {
    closeWebSocket();
  };
}
export default util;
