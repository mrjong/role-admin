import {
	announcement_list,
	announcement_add,
	announcement_update,
	announcement_delete
} from '@/service/getData';

export default {
	name: 'case_search_page',
	data() {
		return {
			showPanel3: false,
			showPanel2: false,
			showPanel1: false,
			val: '',
			announcement_list3: [],
			announcement_list1: [],
			announcement_list2: [],
			tableData: [],
			announcement_list: [],
			tableColumns2: [
				{
					width: 100,
					type: 'index'
				},
				{
					title: '公告详情',
					key: 'announcementContent'
				},
				{
					title: '操作',
					width: 100,
					render: (h, params) => {
						return h('div', [
							// h(
							// 	'Poptip',
							// 	{
							// 		props: {
							// 			confirm: true,
							// 			title: '您确定要删除这条数据吗?',
							// 			transfer: true
							// 		},
							// 		on: {
							// 			'on-ok': () => {
							// 				this.delAnnouncement(params.row.uuid);
							// 			}
							// 		}
							// 	},
							// 	[
							// 		h(
							// 			'a',
							// 			{
							// 				class: 'edit-btn',
							// 				props: {}
							// 			},
							// 			'删除'
							// 		)
							// 	]
							// ),
							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
											this.showAlert('1', params.row.uuid, params.row.announcementContent);
										}
									}
								},
								'编辑'
							)
						]);
					}
				}
			],
			tableColumns: [
				{
					width: 100,
					type: 'index'
				},
				{
					title: '公告详情',
					key: 'announcementContent'
				},
				{
					title: '操作',
					width: 100,
					render: (h, params) => {
						return h('div', [
							h(
								'Poptip',
								{
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.delAnnouncement(params.row.uuid);
										}
									}
								},
								[
									h(
										'a',
										{
											class: 'edit-btn',
											props: {}
										},
										'删除'
									)
								]
							)
						]);
					}
				}
			]
		};
	},
	created() {
		console.log('---------');
		window.$router = this.$router;
		this.announcement_list_fun();
	},
	methods: {
		showAlert(type, uuid, val) {
			this.$Modal.confirm({
				onOk: () => {
					if (this.val) {
						if (uuid) {
							this.editAnnouncement(uuid, this.val || val);
						} else {
							this.addAnnouncement(type, this.val);
						}
					} else {
						this.$Message.error('请输入内容');
					}
				},
				render: (h) => {
					return h('Input', {
						props: {
							type: 'textarea',
							value: val || '',
							placeholder: '请输入内容'
						},
						on: {
							input: (val) => {
								this.val = val;
							}
						}
					});
				}
			});
		},
		// 编辑公告
		async editAnnouncement(uuid, content) {
			const res = await announcement_update({
				uuid,
				content
			});
			if (res.code === 1) {
				this.val = '';
				this.$Message.success('编辑成功');
				setTimeout(() => {
					this.announcement_list_fun();
				}, 3000);
			} else {
				this.$Message.error(res.message);
			}
		},
		// 新增公告
		async addAnnouncement(type, content) {
			const res = await announcement_add({
				type,
				content
			});
			if (res.code === 1) {
				this.val = '';
				this.$Message.success('添加成功');
				setTimeout(() => {
					this.announcement_list_fun();
				}, 3000);
			} else {
				this.$Message.error(res.message);
			}
		},
		// 删除公告
		async delAnnouncement(uuid) {
			const res = await announcement_delete({
				uuid
			});
			if (res.code === 1) {
				this.$Message.success('删除成功');
				setTimeout(() => {
					this.announcement_list_fun();
				}, 3000);
			} else {
				this.$Message.error(res.message);
			}
		},
		async announcement_list_fun() {
			const res = await announcement_list();
			if (res.code === 1) {
				this.announcement_list1 = (res.data && res.data.date_1) || [];
				this.announcement_list2 = (res.data && res.data.date_2) || [];
				this.announcement_list3 = (res.data && res.data.date_3) || [];
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
