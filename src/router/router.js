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
export const case_desc = {
	path: '/case_desc',
	icon: 'ios-list',
	name: 'case_desc',
	title: '案件查询',
	component: () => import('@/pages/caseMng/case_desc_page')
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
			name: 'home',
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
	// {
	// 	path: '/demo',
	// 	icon: 'ios-grid-view',
	// 	name: 'demo',
	// 	access: 1,
	// 	title: '列表demo',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'demo_list',
	// 			icon: 'ios-list',
	// 			name: 'demo_list',
	// 			title: 'demo列表',
	// 			component: () => import('@/pages/demo/demo_list_page')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: 'demo详情',
	// 			component: () => import('@/pages/demo/demo_desc_page')
	// 		}
	// 	]
	// },
	{
		path: '/caseMng',
		icon: 'ios-grid-view',
		name: 'caseMng',
		title: '案件管理',
		component: Main,
		children: [
			{
				path: 'case_search',
				icon: 'ios-list',
				name: 'case_search',
				title: '案件查询',
				component: () => import('@/pages/caseMng/case_search_page')
			}
			// {
			// 	path: 'demo_desc',
			// 	icon: 'ios-list',
			// 	name: 'demo_desc',
			// 	title: '案件分配',
			// 	component: () => import('@/pages/demo/demo_desc.vue')
			// },
			// {
			// 	path: 'demo_desc',
			// 	icon: 'ios-list',
			// 	name: 'demo_desc',
			// 	title: '分案规则',
			// 	component: () => import('@/pages/demo/demo_desc.vue')
			// }
		]
	}
	// {
	// 	path: '/demo',
	// 	icon: 'ios-grid-view',
	// 	name: 'demo',
	// 	access: 1,
	// 	title: '催收管理',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'demo_list',
	// 			icon: 'ios-list',
	// 			name: 'demo_list',
	// 			title: '我的案件',
	// 			component: () => import('@/pages/demo/demo_list.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '催收记录',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: '催收录音',
	// 			title: '分案规则',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: '/demo',
	// 	icon: 'ios-grid-view',
	// 	name: 'demo',
	// 	access: 1,
	// 	title: '回款管理',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'demo_list',
	// 			icon: 'ios-list',
	// 			name: 'demo_list',
	// 			title: '确认回款明细',
	// 			component: () => import('@/pages/demo/demo_list.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '用户主动还款',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '系统代扣还款',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: '/demo',
	// 	icon: 'ios-grid-view',
	// 	name: 'demo',
	// 	access: 1,
	// 	title: '业务管理',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'demo_list',
	// 			icon: 'ios-list',
	// 			name: 'demo_list',
	// 			title: '减免管理',
	// 			component: () => import('@/pages/demo/demo_list.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '还款管理',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '划扣管理',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: '/demo',
	// 	icon: 'ios-grid-view',
	// 	name: 'demo',
	// 	access: 1,
	// 	title: '日常监控',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'demo_list',
	// 			icon: 'ios-list',
	// 			name: 'demo_list',
	// 			title: '逾期日报',
	// 			component: () => import('@/pages/demo/demo_list.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '催收回收率',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '坐席报表',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '呼叫明细',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: '/system',
	// 	icon: 'ios-grid-view',
	// 	name: 'system',
	// 	access: 1,
	// 	title: '系统管理',
	// 	component: Main,
	// 	children: [
	//         {
	// 			path: 'wkProcessDef_list',
	// 			icon: 'ios-list',
	// 			name: 'wkProcessDef_list',
	// 			title: '系统角色管理',
	// 			component: () => import('@/pages/system/wkProcessDef_list.vue')
	// 		},
	// 		{
	// 			path: 'wkProcessDef_list',
	// 			icon: 'ios-list',
	// 			name: 'wkProcessDef_list',
	// 			title: '系统用户管理',
	// 			component: () => import('@/pages/system/wkProcessDef_list.vue')
	// 		},
	// 		{
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '人员管理',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	//         },
	//         {
	// 			path: 'demo_desc',
	// 			icon: 'ios-list',
	// 			name: 'demo_desc',
	// 			title: '坐席关系维护',
	// 			component: () => import('@/pages/demo/demo_desc.vue')
	//         },
	//         {
	// 			path: 'wkProcessDef_list',
	// 			icon: 'ios-list',
	// 			name: 'wkProcessDef_list',
	// 			title: '数据字典管理',
	// 			component: () => import('@/pages/system/wkProcessDef_list.vue')
	// 		},
	// 	]
	// }
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
	page404,
	case_desc
];
