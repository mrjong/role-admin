import shrinkableMenu from "@/components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "@/components/tags-page-opened.vue";
import breadcrumbNav from "@/components/breadcrumb-nav.vue";
import fullScreen from "@/components/fullscreen.vue";
import lockScreen from "@/components/lockscreen/lockscreen.vue";
import scrollBar from "@/components/scroll-bar/vue-scroller-bars";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import util from "@/libs/util.js";
import api from "@/service";
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    scrollBar,
  },
  data() {
    return {
      visible1: false,
      shrink: false,
      formItem: {},
      showCaseLoading: false,
      ruleValidate: {
        loginPwd: [
          {
            required: true,
            message: "请填写旧密码",
            trigger: "blur"
          }
        ],
        newLoginPwd: [
          {
            required: true,
            message: "请填写新密码",
            trigger: "blur"
          }
        ]
      },
      userName: "",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      productLineList: []
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuTreeList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      // return localStorage.avatorImgPath;
      return "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565095877898&di=c485a6e7f8c397c4671a4e0b18799e5d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190806%2F63eb83f209ea4f34bfd9d3b304dc4764.JPG";
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    }
  },
  methods: {

    passWord(str) {
      let key = CryptoJS.enc.Hex.parse("63666262663331373130363634393864");
      let iv = CryptoJS.enc.Hex.parse("38313837386662346131393061333035");
      let enc = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString();
      return enc;
    },
    ok() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          this.reset_passWord();
        }
      });
    },
    async reset_passWord() {
      const res = await api.reset_passWord({
        // loginName: Cookies.get('user'),
        oldPwd: this.formItem.loginPwd,
        newPwd: this.formItem.newLoginPwd
      });
      if (res.code === "0000") {
        this.$Message.success("修改成功");
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        util.clearAllCookie();
        setTimeout(() => {
          this.$router.push({
            name: "login"
          });
        }, 2000);
      } else {
        this.$Message.error(res.msg);
        this.$refs["formItem"].resetFields();
      }
    },
    cancel() {
      this.$refs["formItem"].resetFields();
    },

    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    async handleClickUserDropdown(name) {
      if (name === "editPwd") {
        this.visible1 = true;
      } else if (name === "loginout") {
        // 退出登录
        const res = await api.logout();
        window.sessionStorage.clear();
        if (res.code === 1) {
          this.$Message.success("退出成功");
          util.clearAllCookie();
          location.replace("/");
          this.$store.commit("logout", this);
          this.$store.commit("clearOpenedSubmenu");
        } else {
          util.clearAllCookie();
          location.replace("/");
          this.$store.commit("logout", this);
          this.$store.commit("clearOpenedSubmenu");
          this.$Message.error(res.message);
        }
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    scrollBarResize() {
      this.$refs.scrollBar.resize();
    },
    passBack() {
      this.showCaseLoading = false;
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    },
    openedSubmenuArr() {
      setTimeout(() => {
        this.scrollBarResize();
      }, 300);
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.scrollBarResize);
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
  },
  dispatch() {
    window.removeEventListener("resize", this.scrollBarResize);
  }
};
