import Main from '@/pages/main/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
	path: '/loginAdmin',
	name: 'login',
	meta: {
		title: 'Login - 登录'
	},
	component: () => import('@/pages/login/login.vue')
};

export const page404 = {
	path: '/*',
	name: 'error-404',
	meta: {
		title: '404-页面不存在'
	},
	component: () => import('@/pages/error-page/404.vue')
};

export const page403 = {
	path: '/403',
	meta: {
		title: '403-权限不足'
	},
	name: 'error-403',
	component: () => import('@//pages/error-page/403.vue')
};

export const page500 = {
	path: '/500',
	meta: {
		title: '500-服务端错误'
	},
	name: 'error-500',
	component: () => import('@/pages/error-page/500.vue')
};

export const locking = {
	path: '/locking',
	name: 'locking',
	component: () => import('@/components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
	path: '/',
	name: 'otherRouter',
	redirect: '/home',
	title: '首页',
	component: Main,
	children: [
		{
			path: 'home',
			title: { i18n: 'home' },
			name: 'home_index',
			component: () => import('@/pages/home/home.vue')
		},
		{
			path: 'message',
			title: '消息中心',
			name: 'message_index',
			component: () => import('@/pages/message/message.vue')
		}
	]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
	{
		path: '/buffet',
		icon: 'ios-grid-view',
		name: 'buffet',
		access: 1,
		title: '餐柜管理',
		component: Main,
		children: [
			{
				path: 'buffet_list',
				icon: 'ios-list',
				name: 'buffet_list',
				title: '餐柜列表',
				component: () => import('@/pages/buffet/buffet_list.vue')
			},
			{
				path: 'buffet_desc',
				icon: 'ios-keypad-outline',
				name: 'buffet_desc',
				title: '餐柜使用情况',
				component: () => import('@/pages/buffet/buffet_desc.vue')
			},
			{
				path: 'buffet_add',
				icon: 'ios-plus-empty',
				name: 'buffet_add',
				title: '添加餐柜',
				component: () => import('@/pages/buffet/buffet_add.vue')
			}
		]
	},
	{
		path: '/collection',
		icon: 'ios-grid-view',
		name: 'collection',
		access: 1,
		title: '催收管理',
		component: Main,
		children: [
			{
				path: 'collection_list',
				icon: 'ios-list',
				name: 'collection_list',
				title: '我的案件',
				component: () => import('@/pages/collection/collection_list.vue')
            },
            {
				path: 'collection_add',
				icon: 'ios-list',
				name: 'collection_add',
				title: '我的案件',
				component: () => import('@/pages/collection/collection_list.vue')
			}
		]
	}
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	otherRouter,
	// preview,
	locking,
	...appRouter,
	page500,
	page403,
	page404
];
