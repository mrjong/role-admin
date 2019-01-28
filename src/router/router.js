import Main from '@/pages/common/main';
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
			title: '首页',
			name: 'home',
			component: () => import('@/pages/common/home')
		},
		// {
		// 	path: 'message',
		// 	title: '消息中心',
		// 	name: 'message_index',
		// 	component: () => import('@/pages/common/message/message.vue')
		// }
	]
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	otherRouter,
];
