import Vue from "vue";

// let _this = new Vue();
// const h = _this.$createElement;
let util = {};
util.title = function(title, vm) {
  let iTitle = "对外合作管理";
  if (title) {
    iTitle += " - " + (title.i18n ? vm.$t(title.i18n) : title);
  }
  window.document.title = iTitle;
};
util.clearAllCookie = function() {
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
};
util.inOf = function(arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.showThisRoute = function(itAccess, currentAccess) {
  if (typeof itAccess === "object" && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getRouterObjByName = function(routers, name) {
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

util.handleTitle = function(vm, item) {
  if (typeof item.title === "object") {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
};

util.setCurrentPath = function(vm, name) {
  let title = "";
  let isOtherRouter = false;
  vm.$store.state.app.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item);
        if (item.name === "otherRouter") {
          isOtherRouter = true;
        }
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child);
          if (item.name === "otherRouter") {
            isOtherRouter = true;
          }
        }
      });
    }
  });
  let currentPathArr = [];
  if (name === "/home") {
    currentPathArr = [
      {
        title: util.handleTitle(
          vm,
          util.getRouterObjByName(vm.$store.state.app.routers, "/home")
        ),
        path: "/home",
        name: "/home"
      }
    ];
  } else if (
    (name.indexOf("_index") >= 0 || isOtherRouter) &&
    name !== "/home"
  ) {
    currentPathArr = [
      {
        title: util.handleTitle(
          vm,
          util.getRouterObjByName(vm.$store.state.app.routers, "/home")
        ),
        path: "/home",
        name: "/home"
      },
      {
        title: title,
        path: "",
        name: name
      }
    ];
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
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
    if (
      currentPathObj.children.length <= 1 &&
      currentPathObj.name === "/home"
    ) {
      currentPathArr = [
        {
          title: "首页",
          path: "/home",
          name: "/home"
        }
      ];
    } else if (
      currentPathObj.children.length <= 1 &&
      currentPathObj.name !== "/home"
    ) {
      currentPathArr = [
        {
          title: "首页",
          path: "/home",
          name: "/home"
        },
        {
          title: currentPathObj.title,
          path: "",
          name: name
        }
      ];
    } else {
      let childObj = currentPathObj.children.filter(child => {
        return child.name === name;
      })[0];
      currentPathArr = [
        {
          title: "首页",
          path: "/home",
          name: "/home"
        },
        {
          title: currentPathObj.title,
          path: "",
          name: currentPathObj.name
        },
        {
          title: childObj.title,
          path: currentPathObj.path + "/" + childObj.path,
          name: name
        }
      ];
    }
  }
  vm.$store.commit("setCurrentPath", currentPathArr);

  return currentPathArr;
};

util.openNewPage = function(vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit("pageOpenedList", {
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
    let tag = vm.$store.state.app.tagsList.filter(item => {
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
      vm.$store.commit("increateTag", tag);
    }
  }
  vm.$store.commit("setCurrentPageName", name);
};

util.toDefaultPage = function(routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (
      routers[i].name === name &&
      routers[i].children &&
      routers[i].redirect === undefined
    ) {
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

util.dowloadfile = function(name, res) {
  var blob = new Blob([res], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var downloadElement = document.createElement("a");
  var href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name + ".xlsx"; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
util.dowloadZip = function(res) {
  const type = "application/zip"; //  ZIP文件
  const blob = new Blob([res], { type: type });
  const downloadElement = document.createElement("a");
  const href = window.URL.createObjectURL(blob);
  //  后台再header中传文件名
  // const name = decodeURI(res.headers['content-disposition'].split('=')[1])
  downloadElement.href = href;
  downloadElement.download = "录音";
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
util.dowloadAudio = function(res) {
  const type = "audio/mpeg"; // mp3文件
  const blob = new Blob([res], { type: type });
  const href = window.URL.createObjectURL(blob);
  return href;
};

util.fullscreenEvent = function(vm) {
  vm.$store.commit("initCachepage");
  // 全屏相关
};

// 处理当前日期 xxxx-xx-xx
util.getToday = num => {
  // num 0=> today, 1=> tomorrow, -1=> yesterday
  let today = new Date();
  let year = today.getFullYear();
  let month =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1;
  let day;
  if (num) {
    day =
      today.getDate() + num < 10
        ? "0" + (today.getDate() + num)
        : today.getDate() + num;
  } else {
    day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  }
  today = `${year}-${month}-${day}`;
  return today;
};

util.filterEmptyKey = (obj = {}) => {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
  return obj;
};

util.base64Encode = data => {
  let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data = utf8Encode(data);

  do {
    // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = (o1 << 16) | (o2 << 8) | o3;

    h1 = (bits >> 18) & 0x3f;
    h2 = (bits >> 12) & 0x3f;
    h3 = (bits >> 6) & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] =
      b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join("");

  switch (data.length % 3) {
    case 1:
      enc = `${enc.slice(0, -2)}==`;
      break;
    case 2:
      enc = `${enc.slice(0, -1)}=`;
      break;
  }

  return enc;
};

const utf8Encode = function(string) {
  string = `${string}`.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  let utftext = "",
    start,
    end;
  let stringl = 0,
    n;

  start = end = 0;
  stringl = string.length;

  for (n = 0; n < stringl; n++) {
    let c1 = string.charCodeAt(n);
    let enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
    } else {
      enc = String.fromCharCode(
        (c1 >> 12) | 224,
        ((c1 >> 6) & 63) | 128,
        (c1 & 63) | 128
      );
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.substring(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.substring(start, string.length);
  }

  return utftext;
};

export default util;
