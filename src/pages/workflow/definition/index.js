import gongzuoliu from '@/components/workflow/gongzuoliu';
import { wkProcessDef_list, wkProcessDef_forbid, wkProcessDef_release, wkProcessDef_copy } from '@/service/getData';
import tablePage from '@/mixin/tablePage';
export default {
	name: 'case_search_page',
	components: {
		gongzuoliu
	},
	mixins: [ tablePage ],
	data() {
		return {
			visible1: false,
			showPanel: false,
			showPanel2: false,
			formItem: {},
			backTypeList: [],
			defTypeList: [],
			pageNo: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			ruleValidate: {},
			tableColumns: [
				{
					title: '名称',
					minWidth: 180,
					sortable: true,
					align: 'center',
					key: 'defName'
				},
				{
					title: '类型',
					minWidth: 150,
					align: 'center',
					key: 'defType'
				},
				{
					title: '编号',
					align: 'center',
					minWidth: 200,
					key: 'defCode'
				},
				{
					title: '版本号',
					minWidth: 100,
					align: 'center',
					key: 'version'
				},
				{
					title: '状态',
					align: 'center',
					minWidth: 100,
					key: 'status'
				},
				{
					title: '创建时间',
					minWidth: 150,
					align: 'center',
					key: 'createTime',
					render: (h, params) => {
						const row = params.row;
						const createTime = row.createTime
							? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
							: row.createTime;
						return h('span', createTime);
					}
				},
				{
					title: '创建人',
					align: 'center',
					minWidth: 100,
					key: 'creater'
				},
				{
					title: '操作',
					width: 200,
					align: 'center',
					key: 'edit',
					render: (h, params) => {
						return h('div', [
							h(
								'Poptip',
								{
									props: {
										confirm: true,
										title: '您确定要禁用这条数据吗?',
										transfer: true
									},
                                    style: {
                                        display: params.row.status === '02' ? 'inline-block' : 'none'
                                    },
									on: {
										'on-ok': () => {
											this.forbid(params.row.id);
										}
									}
								},
								[
									h(
										'a',
										{
											class: 'edit-btn',
                                            props: {},
                                            style: {
                                                display: params.row.status === '02' ? 'inline-block' : 'none'
                                            },
										},
										'禁用'
									)
								]
							),
							h(
								'Poptip',
								{
                                    class: 'edit-btn',
									props: {
										confirm: true,
										title: '您确定要发布这条数据吗?',
										transfer: true
									},
								
									on: {
										'on-ok': () => {
											this.release(params.row.id);
										}
									}
								},
								[
									h(
										'a',
										{
											class: 'edit-btn',
                                            props: {},
                                            style: {
                                                display: params.row.status === '01' ? 'inline-block' : 'none'
                                            },
										},
										'发布'
									)
								]
							),
							h(
								'Poptip',
								{
									props: {
										confirm: true,
										title: '您确定要复制这条数据吗?',
										transfer: true
									},
								
									on: {
										'on-ok': () => {
											this.copy(params.row.id);
										}
									}
								},
								[
									h(
										'a',
										{
											class: 'edit-btn',
											props: {},
											style: {
												display:
													params.row.status === '02' || params.row.status === '03'
														? 'inline-block'
														: 'none'
											}
										},
										'复制'
									)
								]
							),

							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									style: {
										display: params.row.status === '01' ? 'inline-block' : 'none'
									}
								},
								'修改'
							),
							h(
								'a',
								{
									class: 'edit-btn',
									props: {}
								},
								'详情'
							)
						]);
					}
				}
			]
		};
	},

	created() {
		this.getList();
	},
	methods: {
		async forbid(id) {
			const res = await wkProcessDef_forbid({ id });
			if (res.code === 1) {
				this.$Message.success('禁用成功');
				this.pageNo = 1;
				setTimeout(() => {
					this.getList();
				}, 3000);
			} else {
				this.$Message.error(res.message);
			}
		},
		async copy(id) {
			const res = await wkProcessDef_copy({ id });
			if (res.code === 1) {
				this.$Message.success('复制成功');
				this.pageNo = 1;
				setTimeout(() => {
					this.getList();
				}, 3000);
			} else {
				this.$Message.error(res.message);
			}
		},
		async release(id) {
			const res = await wkProcessDef_release({ id });
			if (res.code === 1) {
				this.$Message.success('发布成功');
				this.pageNo = 1;
				setTimeout(() => {
					this.getList();
				}, 3000);
			} else {
				this.$Message.error(res.message);
			}
		},
		handView() {
			this.visible1 = true;
		},
		// 获取表格数据
		async getList() {
			const res = await wkProcessDef_list({
				...this.formItem,
				pageNum: this.pageNo,
				pageSize: this.pageSize
			});
			if (res.code === 1) {
				this.tableData = res.data.pageList.content;
				this.pageSize = res.data.pageList.size;
				this.total = res.data.pageList.totalElements;
				this.backTypeList = res.data.backTypeList;
				this.defTypeList = res.data.defTypeList;
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
