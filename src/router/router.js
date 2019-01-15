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
	// {
	// 	path: '/onlinecarte',
	// 	icon: 'qr-scanner',
	// 	name: 'onlinecarte',
	// 	access: 1,
	// 	title: '柜前购买管理',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'onlinecarte_list',
	// 			icon: 'ios-list',
	// 			name: 'onlinecarte_list',
	// 			title: '柜前购买列表',
	// 			component: () => import('@/pages/onlinecarte/onlinecarte_list.vue')
	// 		},
	// 		{
	// 			path: 'onlinecarte_add',
	// 			icon: 'ios-plus-empty',
	// 			name: 'onlinecarte_add',
	// 			title: '添加柜前购买',
	// 			component: () => import('@/pages/onlinecarte/onlinecarte_add.vue')
	// 		}
	// 	]
	// },
	{
		path: '/carteorder',
		icon: 'ios-paper',
		name: 'carteorder',
		access: 1,
		title: '订单管理',
		component: Main,
		children: [
			// {
			// 	path: 'carteorder_list',
			// 	icon: 'ios-list',
			// 	name: 'carteorder_list',
			// 	title: '预约订单',
			// 	component: () => import('@/pages/carteorder/carteorder_list.vue')
			// },
			{
				path: 'order_list',
				icon: 'ios-paper',
				name: 'order_list',
				title: '订单管理',
				component: () => import('@/pages/carteorder/order_list.vue')
			}
		]
	},
	{
		path: '/carte',
		icon: 'android-calendar',
		name: 'carte',
		access: 1,
		title: '菜单管理',
		component: Main,
		children: [
			{
				path: 'carte_list',
				icon: 'ios-list',
				name: 'carte_list',
				title: '菜单列表',
				component: () => import('@/pages/carte/carte_list.vue')
			},
			{
				path: 'batchadd',
				icon: 'ios-list',
				name: 'batchadd',
				title: '添加菜单',
				component: () => import('@/pages/carte/batchadd/index.vue')
			},
			{
				path: 'onlinecarte_list',
				icon: 'ios-list',
				name: 'onlinecarte_list',
				title: '旧版柜前购买',
				component: () => import('@/pages/onlinecarte/onlinecarte_list.vue')
			}
		]
	},
	{
		path: '/Distribution',
		icon: 'android-restaurant',
		name: 'Distribution',
		title: '配送管理',
		component: Main,
		children: [
			{
				path: 'Distribution_list',
				icon: 'android-bicycle',
				name: 'Distribution_list',
				title: '配送记录',
				component: () => import('@/pages/Distribution/Distribution_list.vue')
			}
		]
	},
	{
		path: '/goods',
		icon: 'android-restaurant',
		name: 'goods',
		title: '商品管理',
		component: Main,
		children: [
			{
				path: 'goods_list',
				icon: 'ios-list',
				name: 'goods_list',
				title: '商品列表',
				component: () => import('@/pages/goods/goods_list.vue')
			},
			{
				path: 'goods_add',
				icon: 'ios-plus-empty',
				name: 'goods_add',
				title: '添加商品',
				component: () => import('@/pages/goods/goods_add.vue')
			}
		]
	},
	{
		path: '/user',
		icon: 'ios-person',
		name: 'user',
		title: '用户管理',
		component: Main,
		children: [
			{
				path: 'user_list',
				icon: 'ios-person',
				name: 'user_list',
				title: '用户列表',
				component: () => import('@/pages/user/user_list.vue')
			}
		]
	},
	{
		path: '/answer',
		icon: 'ios-checkmark',
		name: 'answer',
		access: 1,
		title: '答题管理',
		component: Main,
		children: [
			{
				path: 'answer_list',
				icon: 'ios-list',
				name: 'answer_list',
				title: '答题列表',
				component: () => import('@/pages/answer/answer_list.vue')
			},
			{
				path: 'answer_add',
				icon: 'ios-plus-empty',
				name: 'answer_add',
				title: '添加答题',
				component: () => import('@/pages/answer/answer_add.vue')
			},
			{
				path: 'answer_loglist',
				icon: 'ios-list',
				name: 'answer_loglist',
				title: '答题纪录',
				component: () => import('@/pages/answer/answer_loglist.vue')
			}
		]
	},
	{
		path: '/award',
		icon: 'ribbon-a',
		name: 'award',
		access: 1,
		title: '答题奖励管理',
		component: Main,
		children: [
			{
				path: 'award_list',
				icon: 'ios-list',
				name: 'award_list',
				title: '答题奖励列表',
				component: () => import('@/pages/award/award_list.vue')
			},
			{
				path: 'award_add',
				icon: 'ios-list',
				name: 'award_add',
				title: '添加答题奖励',
				component: () => import('@/pages/award/award_add.vue')
			}
		]
	},
	{
		path: '/activity',
		icon: 'cube',
		name: 'activity',
		access: 1,
		title: '活动管理',
		component: Main,
		children: [
			{
				path: 'activity_list',
				icon: 'ios-list',
				name: 'activity_list',
				title: '活动列表',
				component: () => import('@/pages/activity/activity_list.vue')
			},
			{
				path: 'activity_add',
				icon: 'ios-plus-empty',
				name: 'activity_add',
				title: '添加活动',
				component: () => import('@/pages/activity/activity_add.vue')
			},
			{
				path: 'activity_loglist',
				icon: 'ios-list',
				name: 'activity_loglist',
				title: '活动纪录',
				component: () => import('@/pages/activity/activity_loglist.vue')
			}
		]
	},
	{
		path: '/activity_award',
		icon: 'bowtie',
		name: 'activity_award',
		access: 1,
		title: '活动奖励管理',
		component: Main,
		children: [
			{
				path: 'activity_award_list',
				icon: 'ios-list',
				name: 'activity_award_list',
				title: '活动奖励列表',
				component: () => import('@/pages/activity_award/activity_award_list.vue')
			},
			{
				path: 'activity_award_add',
				icon: 'ios-list',
				name: 'activity_award_add',
				title: '添加活动奖励',
				component: () => import('@/pages/activity_award/activity_award_add.vue')
			}
		]
	},
	{
		path: '/evaluate',
		icon: 'android-favorite',
		name: 'evaluate',
		access: 1,
		title: '评价管理',
		component: Main,
		children: [
			{
				path: 'evaluate_list',
				icon: 'ios-list',
				name: 'evaluate_list',
				title: '评价列表',
				component: () => import('@/pages/evaluate/evaluate_list.vue')
			},
			{
				path: 'evaluate_add',
				icon: 'ios-plus-empty',
				name: 'evaluate_add',
				title: '添加评价',
				component: () => import('@/pages/evaluate/evaluate_add.vue')
			}
		]
	},
	{
		path: '/bonus',
		icon: 'android-mail',
		name: 'bonus',
		access: 1,
		title: '红包管理',
		component: Main,
		children: [
			{
				path: 'bonus_list',
				icon: 'ios-list',
				name: 'bonus_list',
				title: '红包列表',
				component: () => import('@/pages/bonus/bonus_list.vue')
			},
			{
				path: 'bonus_add',
				icon: 'ios-plus-empty',
				name: 'bonus_add',
				title: '添加红包',
				component: () => import('@/pages/bonus/bonus_add.vue')
			}
		]
	},
	{
		path: '/rechargeSet',
		icon: 'ios-cog',
		name: 'rechargeSet',
		access: 1,
		title: '充值设置管理',
		component: Main,
		children: [
			{
				path: 'rechargeSet_list',
				icon: 'ios-list',
				name: 'rechargeSet_list',
				title: '充值设置列表',
				component: () => import('@/pages/rechargeSet/rechargeSet_list.vue')
			},
			{
				path: 'rechargeSet_add',
				icon: 'ios-plus-empty',
				name: 'rechargeSet_add',
				title: '添加充值设置',
				component: () => import('@/pages/rechargeSet/rechargeSet_add.vue')
			}
		]
	},
	{
		path: '/points',
		icon: 'ios-star',
		name: 'points',
		access: 1,
		title: '积分管理',
		component: Main,
		children: [
			{
				path: 'points_list',
				icon: 'ios-star',
				name: 'points_list',
				title: '积分列表',
				component: () => import('@/pages/points/points_list.vue')
			}
		]
	},
	// {
	// 	path: '/recharge',
	// 	icon: 'android-alarm-clock',
	// 	name: 'recharge',
	// 	access: 1,
	// 	title: '充值记录管理',
	// 	component: Main,
	// 	children: [
	// 		{
	// 			path: 'recharge_list',
	// 			icon: 'android-alarm-clock',
	// 			name: 'recharge_list',
	// 			title: '充值记录列表',
	// 			component: () => import('@/pages/rechargeSet/recharge_list.vue')
	// 		}
	// 	]
	// },
	{
		path: '/invitation',
		icon: 'person-add',
		name: 'invitation',
		access: 1,
		title: '邀请管理',
		component: Main,
		children: [
			{
				path: 'invitation_list',
				icon: 'person-add',
				name: 'invitation_list',
				title: '邀请列表',
				component: () => import('@/pages/invitation/invitation_list.vue')
			}
		]
	},
	{
		path: '/points',
		icon: 'settings',
		name: 'points',
		access: 1,
		title: '兑换红包设置',
		component: Main,
		children: [
			{
				path: 'points_listset',
				icon: 'ios-list',
				name: 'points_listset',
				title: '兑换红包设置列表',
				component: () => import('@/pages/points/points_listset.vue')
			},
			{
				path: 'points_add',
				icon: 'ios-plus-empty',
				name: 'points_add',
				title: '添加兑换红包',
				component: () => import('@/pages/points/points_add.vue')
			}
		]
	},
	{
		path: '/article',
		icon: 'android-list',
		name: 'article',
		access: 1,
		title: '新闻管理',
		component: Main,
		children: [
			{
				path: 'article_list',
				icon: 'ios-list',
				name: 'article_list',
				title: '新闻列表',
				component: () => import('@/pages/article/article_list.vue')
			},
			{
				path: 'article_add',
				icon: 'ios-plus-empty',
				name: 'article_add',
				title: '添加新闻',
				component: () => import('@/pages/article/article_add.vue')
			}
		]
	},
	{
		path: '/copywriter',
		icon: 'ios-book',
		name: 'copywriter',
		access: 1,
		title: '文案管理',
		component: Main,
		children: [
			{
				path: 'copywriter_list',
				icon: 'ios-list',
				name: 'copywriter_list',
				title: '文案列表',
				component: () => import('@/pages/copywriter/copywriter_list.vue')
			},
			{
				path: 'copywriter_add',
				icon: 'ios-plus-empty',
				name: 'copywriter_add',
				title: '添加文案',
				component: () => import('@/pages/copywriter/copywriter_add.vue')
			}
		]
	},
	{
		path: '/notice',
		icon: 'speakerphone',
		name: 'notice',
		access: 1,
		title: '公告管理',
		component: Main,
		children: [
			{
				path: 'notice_list',
				icon: 'ios-list',
				name: 'notice_list',
				title: '公告列表',
				component: () => import('@/pages/notice/notice_list.vue')
			},
			{
				path: 'notice_add',
				icon: 'ios-plus-empty',
				name: 'notice_add',
				title: '添加公告',
				component: () => import('@/pages/notice/notice_add.vue')
			}
		]
	},
	{
		path: '/wheel',
		icon: 'images',
		name: 'wheel',
		access: 1,
		title: '轮播图管理',
		component: Main,
		children: [
			{
				path: 'wheel_list',
				icon: 'ios-list',
				name: 'wheel_list',
				title: '轮播图列表',
				component: () => import('@/pages/wheel/wheel_list.vue')
			},
			{
				path: 'wheel_add',
				icon: 'ios-plus-empty',
				name: 'wheel_add',
				title: '添加轮播图',
				component: () => import('@/pages/wheel/wheel_add.vue')
			}
		]
	},
	{
		path: '/adminuser',
		icon: 'ios-people',
		name: 'adminuser',
		access: 1,
		title: '管理员管理',
		component: Main,
		children: [
			{
				path: 'adminuser_list',
				icon: 'ios-list',
				name: 'adminuser_list',
				title: '管理员列表',
				component: () => import('@/pages/adminuser/adminuser_list.vue')
			},
			{
				path: 'adminuser_add',
				icon: 'ios-plus-empty',
				name: 'adminuser_add',
				title: '添加管理员',
				component: () => import('@/pages/adminuser/adminuser_add.vue')
			}
		]
	},
	{
		path: '/setting',
		icon: 'android-settings',
		name: 'setting',
		title: '系统设置',
		component: Main,
		children: [
			{
				path: 'setting_list',
				icon: 'android-settings',
				name: 'setting_list',
				title: '系统设置',
				component: () => import('@/pages/setting/setting_list.vue')
			}
		]
	},
	{
		path: '/log',
		icon: 'clipboard',
		name: 'log',
		title: '操作记录',
		component: Main,
		children: [
			{
				path: 'log_list',
				icon: 'clipboard',
				name: 'log_list',
				title: '操作记录',
				component: () => import('@/pages/log/log_list.vue')
			}
		]
	},
	{
		path: '/coupon',
		icon: 'cash',
		name: 'coupon',
		title: '卡券管理',
		component: Main,
		children: [
			{
				path: 'coupon_list',
				icon: 'ios-list',
				name: 'coupon_list',
				title: '卡券列表',
				component: () => import('@/pages/coupon/coupon_list.vue')
			},
			{
				path: 'coupon_add',
				icon: 'ios-plus-empty',
				name: 'coupon_add',
				title: '添加卡券',
				component: () => import('@/pages/coupon/coupon_add.vue')
			}
		]
	},
	{
		path: '/usersign',
		icon: 'calendar',
		name: 'usersign',
		access: 1,
		title: '签到管理',
		component: Main,
		children: [
			{
				path: 'usersign_list',
				icon: 'ios-list',
				name: 'usersign_list',
				title: '签到奖励列表',
				component: () => import('@/pages/usersign/usersign_list.vue')
			},
			{
				path: 'usersignset_add',
				icon: 'ios-plus-empty',
				name: 'usersignset_add',
				title: '编辑签到设置',
				component: () => import('@/pages/usersign/usersignset_add.vue')
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
