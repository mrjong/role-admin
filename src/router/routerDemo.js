const Login = () => import('@/pages/login/login.vue');
const Locking = () => import('@/components/lockscreen/components/locking-page.vue');
const Page404 = () => import('@/pages/common/error-page/404.vue');
const Page403 = () => import('@/pages/common/error-page/403.vue');
const Page500 = () => import('@/pages/common/error-page/500.vue');
// const Home = () => import('@/pages/common/home');

// 初始化路由
export const initMenu = [
	{
		path: '/login',
		name: 'login',
		title: 'Login - 登录',
		component: Login
	},
	// {
	// 	path: '/home/home',
	// 	name: 'home_home',
	// 	title: '首页',
	// 	component: Home
	// },
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
];
