import { system_user_list, system_user_reset } from '@/service/getData';
import Remodal from './components/user_info_form';
import tablePage from '@/mixin/tablePage';
import sysDictionary from '@/mixin/sysDictionary';
export default {
	components: {
		Remodal
	},
	mixins: [ sysDictionary, tablePage ],
	name: 'demo_list',
	data() {
		return {
			getDirList: [ '1_0_AVAILABLE_DISABLE' ],
			getDirObj: {},
			showPanel: false,
			showPanel2: false,
			modal: false,
			parentData: {
				modal: false
			},
			ruleValidate: {},
			pageNo: 1,
			pageSize: 10,
			total: 0,
			formItem: {},
			tableData: [],
			selectList: [],
			tableColumns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '登录账号',
					searchOperator: '=',
					key: 'loginName',
					minWidth: 150,
					align: 'center'
				},
				{
					title: '用户名称',
					searchOperator: 'like',
					key: 'name',
					sortable: true,
					minWidth: 150,
					align: 'center'
				},
				{
					title: '系统角色名称',
					searchOperator: 'like',
					key: 'uapLoginName',
					minWidth: 150,
					align: 'center'
				},
				{
					title: '状态',
					searchOperator: '=',
					key: 'state',
					ellipsis: true,
					minWidth: 150,
					align: 'center'
				},
				{
					title: '手机号',
					searchOperator: '=',
					key: 'mobile',
					minWidth: 150,
					align: 'center'
				},
				{
					title: '邮箱',
					searchOperator: '=',
					key: 'email',
					ellipsis: true,
					minWidth: 180,
					align: 'center'
				},
				{
					title: '创建时间',
					searchOperator: '=',
					key: 'createTime',
					ellipsis: true,
					minWidth: 150,
					align: 'center',
					render: (h, params) => {
						let createTime = params.row.createTime;
						createTime = createTime
							? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
							: createTime;
						return h('span', createTime);
					}
				},
				{
					title: '操作',
					key: 'edit',
					minWidth: 180,
					align: 'center',
					render: (h, params) => {
						const obj = params.row;
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
											this.handleAdd('1', obj);
										}
									}
								},
								'查看'
							),
							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
											this.handleAdd('2', obj);
										}
									}
								},
								'修改'
							),
							h(
								'Poptip',
								{
									props: {
										confirm: true,
										title: '您确定要重置密码?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.system_user_reset([ obj.uuid ]);
										}
									}
								},
								[
									h(
										'a',
										{
											style: {
												margin: '0 5px'
											},
											class: 'edit-btn',
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										},
										'重置密码'
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
		// this.getList();
	},
	methods: {
		selectOne(selection) {
			console.log('---------');
			this.selectList = [];
			selection &&
				selection.forEach((element) => {
					this.selectList.push(element.uuid);
				});
			console.log(this.selectList);
		},
		handleDelAll() {
			if (this.selectList.length !== 0) {
				this.system_user_reset(this.selectList);
			} else {
				this.$Message.info('请勾选需要操作的数据');
			}
		},
		getChildrenStatus() {
			this.modal = true;
			this.parentData = {
				modal: this.modal,
				tableData: this.tableData
			};
		},
		// 添加列表新数据按钮
		handleAdd(type, obj) {
			this.modal = true;
			this.parentData = {
				modal: this.modal,
				type: type,
				userData: obj
			};
			console.log(this.parentData);
		},

		// 获取表格数据
		async system_user_reset(ids) {
			const res = await system_user_reset({ ids: JSON.stringify(ids) });
			if (res.code === 1) {
				this.$Message.success('重置密码成功');
			} else {
				this.$Message.error(res.message);
			}
		},
		// 获取表格数据
		async getList() {
			const res = await system_user_list({
				...this.formItem,
				pageNum: this.pageNo,
				pageSize: this.pageSize
			});
			if (res.code === 1) {
				this.tableData = res.data.data;
				this.pageSize = res.data.size;
				this.total = res.data.total;
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
