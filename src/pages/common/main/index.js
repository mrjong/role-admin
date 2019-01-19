import shrinkableMenu from '@/components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from '@/components/tags-page-opened.vue';
import breadcrumbNav from '@/components/breadcrumb-nav.vue';
import fullScreen from '@/components/fullscreen.vue';
import lockScreen from '@/components/lockscreen/lockscreen.vue';
import messageTip from '@/components/message-tip.vue';
import themeSwitch from '@/components/theme-switch/theme-switch.vue';
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
import scrollBar from '@/components/scroll-bar/vue-scroller-bars';
import { logout, findTreeByCurrentUser } from '@/service/getData';
import demo from './demo.json';
export default {
	components: {
		shrinkableMenu,
		tagsPageOpened,
		breadcrumbNav,
		fullScreen,
		lockScreen,
		messageTip,
		themeSwitch,
		scrollBar
	},
	data() {
		return {
			visible1: false,
            shrink: false,
            formItem:{},
            ruleValidate:{},
			userName: '',
			isFullScreen: false,
			openedSubmenuArr: this.$store.state.app.openedSubmenuArr
		};
	},
	created() {
		this.menuData();
	},
	computed: {
		menuList() {
			return this.$store.state.app.menuList;
		},
		pageTagsList() {
			return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
		},
		currentPath() {
			return this.$store.state.app.currentPath; // 当前面包屑数组
		},
		avatorPath() {
			return localStorage.avatorImgPath;
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
        ok(){

        },
        cancel(){},
		// 获取菜单
		async menuData() {
			let res = await findTreeByCurrentUser();
			console.log(demo);
		},
		init() {
			let pathArr = util.setCurrentPath(this, this.$route.name);
			this.$store.commit('updateMenulist');
			if (pathArr.length >= 2) {
				this.$store.commit('addOpenSubmenu', pathArr[1].name);
			}
			this.userName = Cookies.get('user');
			let messageCount = 3;
			this.messageCount = messageCount.toString();
			this.checkTag(this.$route.name);
			this.$store.commit('setMessageCount', 3);
		},
		toggleClick() {
			this.shrink = !this.shrink;
		},
		async handleClickUserDropdown(name) {
			if (name === 'editPwd') {
				this.visible1 = true;
			} else if (name === 'loginout') {
				// 退出登录
				const res = await logout();
				this.$store.commit('logout', this);
				this.$store.commit('clearOpenedSubmenu');
				this.$router.push({
					name: 'login'
				});
			}
		},
		checkTag(name) {
			let openpageHasTag = this.pageTagsList.some((item) => {
				if (item.name === name) {
					return true;
				}
			});
			if (!openpageHasTag) {
				//  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
				util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
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
		}
	},
	watch: {
		$route(to) {
			this.$store.commit('setCurrentPageName', to.name);
			let pathArr = util.setCurrentPath(this, to.name);
			if (pathArr.length > 2) {
				this.$store.commit('addOpenSubmenu', pathArr[1].name);
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
		window.addEventListener('resize', this.scrollBarResize);
	},
	created() {
		window.VueRouter = this.$router;
		// 显示打开的页面的列表
		this.$store.commit('setOpenedList');
	},
	dispatch() {
		window.removeEventListener('resize', this.scrollBarResize);
	}
};
