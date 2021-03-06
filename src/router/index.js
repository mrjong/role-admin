import Vue from "vue";
import iView from "iview";
import Util from "../libs/util";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
import store from "@/store";
// import { routers } from './router';
import { initMenu } from "./routerDemo";

Vue.use(VueRouter);
// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: [...initMenu]
};

export const router = new VueRouter(RouterConfig);

// 免登录白名单
const whiteList = ["/login", "/locking", "/demo/demo_list", "/demo/demo_desc"];

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title, router.app);

  if (Cookies.get("SXF-TOKEN")) {
    // 判断是否登录
    if (to.path === "/login") {
      Util.title();
      next({ path: "/home" });
    }
    if (to.name === "/locking") {
      if (Cookies.get("locking") === "1") {
        next({
          replace: true,
          name: "locking"
        });
      } else if (Cookies.get("locking") === "0") {
        next(false);
      }
    }

    if (!store.getters.finishedRouteAddStatus) {
      store
        .dispatch("generateRoutes")
        .then(() => {
          // 生成可访问的路由表
          let syncRoute = [
            ...store.getters.menuTreeList,
            { path: "*", redirect: "/404", hidden: true }
          ];
          router.addRoutes(syncRoute); // 动态添加可访问路由表
          store.commit("changeFinishedRouteAddStatus", true);
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
        .catch(err => {
          console.log(err, "路由处理错误");
        });
    }

    const curRouterObj = Util.getRouterObjByName(store.state.routers, to.name);
    if (curRouterObj && curRouterObj.title) {
      Util.title(curRouterObj.title, router.app);
    }
    if (curRouterObj && curRouterObj.access !== undefined) {
      // 需要判断权限的路由
      if (curRouterObj.access === parseInt(Cookies.get("access"))) {
        Util.toDefaultPage(store.state.routers, to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
      } else {
        next({
          replace: true,
          name: "error-403"
        });
      }
    } else {
      // 没有配置权限的路由, 直接通过
      Util.toDefaultPage([], to.name, router, next);
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login"); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(to => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
