import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import { system_menu_findTreeByCurrentUser } from '@/service/getData';

import AllRouter from '@/router/routers';
const LayoutMain = () => import('@/pages/common/main');

import menuTree2 from './demo.json';

const app = {
	state: {
		cachePage: [],
		lang: '',
		isFullScreen: false,
		openedSubmenuArr: [], // 要展开的菜单数组
		menuTheme: 'dark', // 主题
		themeColor: '',
		pageOpenedList: [
			{
				title: '首页',
				path: '/home/home',
				name: 'home_home'
			}
		],
		currentPageName: '',
		currentPath: [
			{
				title: '首页',
				path: '/home/home',
				name: 'home_home'
			}
		], // 面包屑数组
		menuList: [],
		routers: [],
		tagsList: [],
		messageCount: 0,
		dontCache: [ 'text-editor', 'artical-publish' ], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
		menuTreeOriginal: [], // 菜单树结构 源数据
		menuTreeList: [], // 菜单树结构 处理后的结构 需要动态添加的路由中去
		isFinishedRouteAdd: false
	},
	getters: {
		menuTreeList: (state) => {
			return state.menuTreeList;
		},
		finishedRouteAddStatus: (state) => {
			return state.isFinishedRouteAdd;
		}
	},
	actions: {
		getMenuTreeOriginal({ commit }) {
			return new Promise(async (resolve, reject) => {
				const menuTree = await system_menu_findTreeByCurrentUser();
				commit('changeMenuTreeOriginal', menuTree2.data);
				resolve(menuTree2.data);
			});
		},
		async generateRoutes({ state, commit, dispatch }) {
			await dispatch('getMenuTreeOriginal');
			const menuTreeList = state.menuTreeOriginal.map((item, index1) => ({
				path: item.url,
				icon: item.icon,
				name: item.url,
				title: item.text,
				component: LayoutMain,
				// 判断一级菜单是否有子菜单
				children: item.children
					? item.children.map((child, index) => ({
							path: item.url + child.url,
							name: item.url + child.url,
							icon: child.icon,
							title: child.text,
							component: AllRouter[`${child.url}`],
							meta: {
								// 判断子菜单是否有按钮级别的控制
								btnPermissionsList: child.children ? child.children.map((btn) => btn) : []
							}
						}))
					: []
			}));
			// let demo = {};
			// menuTreeList.forEach(item => {
			//   if(item.children) {
			//     item.children.forEach(child => {
			//       demo[`${child.path}`] = '';
			//     })
			//   }
			// });
			// console.log(JSON.stringify(demo), 'demo');
			// console.log(JSON.stringify(menuTreeList), 'menuTreeList111');
			commit('changeMenuTreeList', menuTreeList);
			commit('changeRouters', menuTreeList);

			let tagsList = [];
			menuTreeList.map((item) => {
				if (item.children.length <= 1) {
					tagsList.push(item.children[0]);
				} else {
					tagsList.push(...item.children);
				}
			});
			commit('setTagsList', tagsList);
		}
	},
	mutations: {
		changeMenuTreeOriginal(state, res) {
			state.menuTreeOriginal = res;
		},
		changeMenuTreeList(state, res) {
			state.menuTreeList = res;
		},
		changeFinishedRouteAddStatus(state, data) {
			state.isFinishedRouteAdd = data;
		},
		changeRouters(state, data) {
			state.routers = [  ...data ];
		},
		setTagsList(state, list) {
			state.tagsList.push(...list);
		},
		changeMenuTheme(state, theme) {
			state.menuTheme = theme;
		},
		changeMainTheme(state, mainTheme) {
			state.themeColor = mainTheme;
		},
		addOpenSubmenu(state, name) {
			let hasThisName = false;
			let isEmpty = false;
			if (name.length === 0) {
				isEmpty = true;
			}
			if (state.openedSubmenuArr.indexOf(name) > -1) {
				hasThisName = true;
			}
			if (!hasThisName && !isEmpty) {
				state.openedSubmenuArr.push(name);
			}
		},
		closePage(state, name) {
			state.cachePage.forEach((item, index) => {
				if (item === name) {
					state.cachePage.splice(index, 1);
				}
			});
		},
		initCachepage(state) {
			if (localStorage.cachePage) {
				state.cachePage = JSON.parse(localStorage.cachePage);
			}
		},
		removeTag(state, name) {
			state.pageOpenedList.map((item, index) => {
				if (item.name === name) {
					state.pageOpenedList.splice(index, 1);
				}
			});
		},
		pageOpenedList(state, get) {
			let openedPage = state.pageOpenedList[get.index];
			if (get.argu) {
				openedPage.argu = get.argu;
			}
			if (get.query) {
				openedPage.query = get.query;
			}
			state.pageOpenedList.splice(get.index, 1, openedPage);
			localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
		},
		clearAllTags(state) {
			state.pageOpenedList.splice(1);
			state.cachePage.length = 0;
			localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
		},
		clearOtherTags(state, vm) {
			let currentName = vm.$route.name;
			let currentIndex = 0;
			state.pageOpenedList.forEach((item, index) => {
				if (item.name === currentName) {
					currentIndex = index;
				}
			});
			if (currentIndex === 0) {
				state.pageOpenedList.splice(1);
			} else {
				state.pageOpenedList.splice(currentIndex + 1);
				state.pageOpenedList.splice(1, currentIndex - 1);
			}
			let newCachepage = state.cachePage.filter((item) => {
				return item === currentName;
			});
			state.cachePage = newCachepage;
			localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
		},
		setOpenedList(state) {
			state.pageOpenedList = localStorage.pageOpenedList
				? JSON.parse(localStorage.pageOpenedList)
				: [ ];
		},
		setCurrentPath(state, pathArr) {
			state.currentPath = pathArr;
		},
		setCurrentPageName(state, name) {
			state.currentPageName = name;
		},
		setAvator(state, path) {
			localStorage.avatorImgPath = path;
		},
		switchLang(state, lang) {
			state.lang = lang;
			Vue.config.lang = lang;
		},
		clearOpenedSubmenu(state) {
			state.openedSubmenuArr.length = 0;
		},
		setMessageCount(state, count) {
			state.messageCount = count;
		},
		increateTag(state, tagObj) {
			if (!Util.oneOf(tagObj.name, state.dontCache)) {
				state.cachePage.push(tagObj.name);
				localStorage.cachePage = JSON.stringify(state.cachePage);
			}
			state.pageOpenedList.push(tagObj);
			localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
		}
	}
};

export default app;
