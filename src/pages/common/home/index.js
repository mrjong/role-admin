import {
	announcement_list,
	announcement_add,
	announcement_update,
	announcement_delete
} from '@/service/getData';

export default {
	name: '/home',
	data() {
		return {
			showPanel3: false,
			showPanel2: false,
      showPanel1: false,
      other_add: false,//其他添加
      other_del: false,//其他删除
      notice_del: false,//公告删除
      notice_add: false,//公告添加
      charge_add: false,//罚息规则添加
      charge_edit: false,//罚息规则删除
			val: '',
			announcement_list3: [],
			announcement_list1: [],
			announcement_list2: [],
			tableData: [],
			announcement_list: [],
			tableColumns2: [
				{
					width: 100,
          type: 'index',
          align: 'center'
				},
				{
          title: '公告详情',
          maxWidth: 1000,
          key: 'announcementContent',
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: announcementContent,
                    placement: 'top-start',
                    maxWidth: 980,
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '990px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, announcementContent)]
              ),
            ])
          }
				},
				{
					title: '操作',
          width: 100,
          align: 'center',
					render: (h, params) => {
						return h('div', [
							this.charge_edit?h(
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
							): null
						]);
					}
				}
			],
			tableColumns: [
				{
					width: 100,
          type: 'index',
          align: 'center'
				},
				{
					title: '公告详情',
          key: 'announcementContent',
          maxWidth: 1000,
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: announcementContent,
                    placement: 'top-start',
                    maxWidth: 980,
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '990px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, announcementContent)]
              ),
            ])
          }
				},
				{
					title: '操作',
          width: 100,
          align: 'center',
					render: (h, params) => {
						return h('div', [
							this.notice_del?h(
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
							): null
						]);
					}
				}
			],
			tableColumns3: [
				{
					width: 100,
          type: 'index',
          align: 'center'
				},
				{
					title: '公告详情',
          key: 'announcementContent',
          maxWidth: 1000,
          render: (h, params) => {
            let announcementContent = params.row.announcementContent;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: announcementContent,
                    placement: 'top-start',
                    maxWidth: 980,
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '990px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, announcementContent)]
              ),
            ])
          }
				},
				{
					title: '操作',
          width: 100,
          align: 'center',
					render: (h, params) => {
						return h('div', [
							this.other_del?h(
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
							): null
						]);
					}
				}
			]
		};
	},
	created() {
    console.log(this.$route)
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch(item.url) {
        case "other_del" : this.other_del = true;
        break;
        case "other_add" : this.other_add = true;
        break;
        case "notice_del" : this.notice_del = true;
        break;
        case "notice_add" : this.notice_add = true;
        break;
        case "charge_add" : this.charge_add = true;
        break;
        case "charge_edit" : this.charge_edit = true;
        break;
      }
    });
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
				}, 500);
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
				}, 500);
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
				}, 500);
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
