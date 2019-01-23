const Login = () => import('@/pages/login/login.vue');

const LayoutMain = () => import('@/pages/common/main');

const Home = () => import('@/pages/common/home');
const Locking = () => import('@/components/lockscreen/components/locking-page.vue');
const CASE_DESC_PAGE = () => import('@/pages/caseMng/case_desc_page');
const Page404 = () => import('@/pages/common/error-page/404.vue');
const Page403 = () => import('@/pages/common/error-page/403.vue');
const Page500 = () => import('@/pages/common/error-page/500.vue');

// 初始化路由
export const initMenu = [
	{
		path: '/login',
		name: 'login',
		title: 'Login - 登录',
		component: Login
	},
	{
		path: '/locking',
		name: 'locking',
		title: 'locking',
		component: Locking
	},
	{
		path: '/404',
		name: 'error-404',
		title: '404-页面不存在',
		component: Page404
	},
	{
		path: '/403',
		title: '403-权限不足',
		name: 'error-403',
		component: Page403
	},
	{
		path: '/500',
		title: '500-服务端错误',
		name: 'error-500',
		component: Page500
	},
	{
		path: '/',
		name: 'otherRouter',
		redirect: '/home',
		title: '首页',
		component: LayoutMain,
		children: [
			{
				path: 'home',
				title: 'home',
				name: 'home',
				component: Home
			}
		]
	}
];
export const newStyleRouter = [
	{
		path: '/case_desc_page',
		name: 'case_desc_page',
		title: '案件详情',
		component: CASE_DESC_PAGE
	}
];
// 导出设置动态路由方法
export const setRouter = function(menuTree) {};
