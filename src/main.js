import Vue from "vue";
import iView from "iview";
import { router } from "./router/index";
import store from "./store";
import App from "./app.vue";
import "iview/dist/styles/iview.css";
import filters from "@/filters";
import validate from "@/libs/validate";
import { Carousel, CarouselItem } from "element-ui";
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.prototype.GLOBAL = validate;
Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k]);
});
Vue.use(iView);
window.vueExample = new Vue({
  el: "#app",
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ""
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
    this.$store.commit("initCachepage");
    // 权限菜单过滤相关
    // iview-admin检查更新
    // util.checkUpdate(this);
  },
  created() {}
});
