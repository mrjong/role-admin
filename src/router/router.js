import Main from '@/pages/common/main';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
	path: '/loginAdmin',
	name: 'login',
	meta: {
		title: 'Login - 登录'
	},
	component: () => import('@/pages/login/login.vue')
};
export const case_desc = {
	path: '/case_desc',
    name: 'case_desc',
    meta: {
		title: '案件详情'
	},
	component: () => import('@/pages/caseMng/case_desc_page')
};

export const page404 = {
	path: '/*',
	name: 'error-404',
	meta: {
		title: '404-页面不存在'
	},
	component: () => import('@/pages/common/error-page/404.vue')
};

export const page403 = {
	path: '/403',
	meta: {
		title: '403-权限不足'
	},
	name: 'error-403',
	component: () => import('@/pages/common/error-page/403.vue')
};

export const page500 = {
	path: '/500',
	meta: {
		title: '500-服务端错误'
	},
	name: 'error-500',
	component: () => import('@/pages/common/error-page/500.vue')
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
			component: () => import('@/pages/common/home')
		},
		{
			path: 'message',
			title: '消息中心',
			name: 'message_index',
			component: () => import('@/pages/common/message/message.vue')
		}
	]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
	{
		path: '/demo',
		icon: 'ios-grid-view',
		name: 'demo',
		access: 1,
		title: '列表demo',
		component: Main,
		children: [
			{
				path: 'demo_list',
				icon: 'ios-list',
				name: 'demo_list',
				title: 'demo列表',
				component: () => import('@/pages/demo/demo_list_page')
			},
			{
				path: 'demo_desc',
				icon: 'ios-list',
				name: 'demo_desc',
				title: 'demo详情',
				component: () => import('@/pages/demo/demo_desc_page')
			}
		]
    },
    {
		path: '/workflow',
		icon: 'ios-grid-view',
		name: 'workflow',
		access: 1,
		title: '工作流',
		component: Main,
		children: [
			{
				path: 'definition',
				icon: 'ios-list',
				name: 'definition',
				title: '工作流定义',
				component: () => import('@/pages/workflow/definition')
			},
			{
				path: 'task',
				icon: 'ios-list',
				name: 'task',
				title: '工作流任务',
				component: () => import('@/pages/workflow/task')
			},
		]
	},
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
				path: 'my_case',
				icon: 'ios-list',
				name: 'my_case',
				title: '我的案件',
				component: () => import('@/pages/demo/demo_list_page/index.vue')
			},
			{
				path: 'collection_records',
				icon: 'ios-list',
				name: 'collection_records',
				title: '催收记录',
				component: () => import('@/pages/demo/demo_desc_page/index.vue')
			},
			{
				path: 'collection_recording',
				icon: 'ios-list',
				name: 'collection_recording',
				title: '催收录音',
				component: () => import('@/pages/collection/collection_recording_page/index.vue')
			}
		]
	},
	{
		path: '/remoneyMng',
		icon: 'ios-grid-view',
		name: 'remoneyMng',
		access: 1,
		title: '回款管理',
		component: Main,
		children: [
			{
				path: 'remoney_detail',
				icon: 'ios-list',
				name: 'remoney_detail',
				title: '确认回款明细',
				component: () => import ('@/pages/remoneyMng/remoneyDetail')
			},
			{
				path: 'remoney_user',
				icon: 'ios-list',
				name: 'remoney_user',
				title: '用户主动还款',
				component: () => import ('@/pages/remoneyMng/remoneyUser')
			},
			{
				path: 'remoney_system',
				icon: 'ios-list',
				name: 'remoney_system',
				title: '系统代扣还款',
				component: () => import ('@/pages/remoneyMng/remoneySys')
			}
		]
	},
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
	{
		path: '/system',
		icon: 'ios-grid-view',
		name: 'system',
		access: 1,
		title: '系统管理',
		component: Main,
		children: [
	        {
				path: 'wkProcessDef_list',
				icon: 'ios-list',
				name: 'wkProcessDef_list',
				title: '系统角色管理',
				component: () => import('@/pages/system/wkProcessDef_list.vue')
			},
			{
				path: 'system_user',
				icon: 'ios-list',
				name: 'system_user',
				title: '系统用户管理',
				component: () => import('@/pages/system/system_user_page/index.vue')
			},
			{
				path: 'user_manager',
				icon: 'ios-list',
				name: 'user_manager',
				title: '人员管理',
				component: () => import('@/pages/system/user_manager_page/index.vue')
	        },
	        {
				path: 'relationship_maintain',
				icon: 'ios-list',
				name: 'relationship_maintain',
				title: '坐席关系维护',
				component: () => import('@/pages/system/relationship_maintain_page/index.vue')
	        },
	        {
				path: 'data_dictionary',
				icon: 'ios-list',
				name: 'data_dictionary',
				title: '数据字典管理',
				component: () => import('@/pages/system/data_dictionary_page/index.vue')
			},
		]
	}
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	otherRouter,
	// preview,
    ...appRouter,
	case_desc,
	page500,
	page403,
	page404,
];
