const Login = () => import('@/pages/login/login.vue');
const Locking = () => import('@/components/lockscreen/components/locking-page.vue');
const CASE_DESC_PAGE = () => import('@/pages/caseMng/case_desc_page');
const CASE_KEY_DISTRIBUTE_PAGE = () => import('@/pages/caseMng/case_key_distribute_page');
const CASE_ADD_DISTRIBUTE_PAGE = () => import('@/pages/caseMng/case_add_distribute_page');
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
export const newStyleRouter = [
	{
		path: '/case_desc_page',
		name: 'case_desc_page',
		title: '案件详情',
		component: CASE_DESC_PAGE
  },
  {
    path: '/caseMng/case_key_distribute_page',
		name: 'case_key_distribute_page',
		title: '一键分配',
		component: CASE_KEY_DISTRIBUTE_PAGE
  },
  {
    path: '/caseMng/case_add_distribute_page',
		name: 'case_add_distribute_page',
		title: '新添案件',
		component: CASE_ADD_DISTRIBUTE_PAGE
  },
  {
    path: '/caseMng/case_update_distribute_page',
		name: 'case_update_distribute_page',
		title: '案件修改',
		component: CASE_ADD_DISTRIBUTE_PAGE
  },
];
