const LoginAdmin = () => import(/* webpackChunkName: "LoginAdmin" */ '@/pages/login/login.vue');

const LayoutMain = () => import(/* webpackChunkName: "LayoutMain" */ '@/pages/common/main');

const Home = () => import(/* webpackChunkName: "Home" */ '@/pages/common/home')
const Locking = () => import(/* webpackChunkName: "Locking" */ '@/components/lockscreen/components/locking-page.vue')
const Page404 = () => import(/* webpackChunkName: "Page404" */ '@/pages/common/error-page/404.vue')
const Page403 = () => import(/* webpackChunkName: "Page403" */ '@/pages/common/error-page/403.vue');
const Page500 = () => import(/* webpackChunkName: "Page500" */ '@/pages/common/error-page/500.vue');

const DemoList = () => import(/* webpackChunkName: "DemoList" */ '@/pages/demo/demo_list_page');
const DemoDesc = () => import(/* webpackChunkName: "DemoDesc" */ '@/pages/demo/demo_desc_page');

// 初始化路由
export const initMenu = [
  {
    path: '/loginAdmin',
    name: 'login',
    title: 'Login - 登录',
    component: LoginAdmin,
  },
  {
    path: '/locking',
    name: 'locking',
    title: 'locking',
    component: Locking,
  },
  {
    path: '/404',
    name: 'error-404',
    title: '404-页面不存在',
    component: Page404,
  },
  {
    path: '/403',
    title: '403-权限不足',
    name: 'error-403',
    component: Page403,
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
        component: Home,
      },
    ],
  },
  {
		path: '/demo',
		icon: 'ios-grid-view',
		name: 'demo',
		access: 1,
		title: '列表demo',
		component: LayoutMain,
		children: [
			{
				path: 'demo_list',
				icon: 'ios-list',
				name: 'demo_list',
				title: 'demo列表',
				component: DemoList,
			},
			{
				path: 'demo_desc',
				icon: 'ios-list',
				name: 'demo_desc',
				title: 'demo详情',
				component: DemoDesc
			},
		],
  },
];

// 导出设置动态路由方法
export const setRouter = function (menuTree) {

}
