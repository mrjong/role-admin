import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import BaiduMap from 'vue-baidu-map'
import fetch from './libs/fetch';
// 　import'../static/Ueditor/ueditor.config.js'
// 　　　　import'../static/Ueditor/ueditor.all.min.js'
// 　　　　import'../static/Ueditor/lang/zh-cn/zh-cn.js'
// 　　　　import'../static/Ueditor/ueditor.parse.min.js'
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'C2cZndxTOFTR4MoXUpiEb68Guxbzf4oY'
})
Vue.prototype.BASEURL = 'http://shopadmin.e-blive.com'

// 组件之间通信 eventBus
Vue.prototype.$eventBus = new Vue();

// 将API方法绑定到全局
Vue.prototype.$fetch = fetch;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
