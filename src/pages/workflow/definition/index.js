import gongzuoliu from '@/components/workflow/gongzuoliu'
import { wkProcessDef_list } from "@/service/getData"
import tablePage from '@/mixin/tablePage';
export default {
    name: 'case_search_page',
    components:{
        gongzuoliu
    },
    mixin:[tablePage],
	data() {
		return {
			visible1: false,
			showPanel: false,
			showPanel2: false,
			phoneCallList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			productTimeList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			productLineList: [
				{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			modal12: false,
			inputGrid: '',
			modal11: false,
			formValidate2: {},
			pageNo: 1,
			pageSize: 10,
			total: 0,
			formValidate3: {
				items: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			},
			formItem: {},
            tableData: [],
            ruleValidate:{},
			tableColumns: [
				{
					title: '餐柜ID',
					width: 100,
					searchOperator: '=',
					sortable: true,
					key: 'buffet_id'
				},
				{
					title: '餐柜编码',
					width: 120,
					searchOperator: '=',
					key: 'buffet_code'
				},
				{
					title: '设备ID',
					searchOperator: '=',
					key: 'device_id'
				},
				{
					title: '餐柜添加时间',
					key: 'addtime',
					width: 3000,
					sortable: true,
					render: (h, params) => {
						const row = params.row;
						const addtime = row.addtime
							? this.$options.filters['formatDate'](new Date(row.addtime * 1000), 'yyyy-MM-dd hh:mm:ss')
							: row.addtime;
						return h('span', addtime);
					}
				},
				{
					title: '餐柜名称',
					width: 120,
					searchOperator: 'like',
					key: 'buffet_name',
					sortable: true
				},
				{
					title: '餐柜详细地址',
					searchOperator: 'like',
					key: 'address',
					render: (h, params) => {
						return h('div', [
							h(
								'Tooltip',
								{
									style: {
										margin: '0 5px'
									},
									props: {
										content: params.row.address,
										placement: 'top'
									}
								},
								[ h('div', {}, params.row.address) ]
							)
						]);
					}
				},
				{
					title: '操作',
					width: 100,
					key: 'edit',
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
											this.deleteGoods(params.row.buffet_id);
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
									),
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
		this.getList();
	},
	methods: {
		handView() {
			this.visible1 = true;
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.getList();
				} else {
					this.$Message.error('查询条件格式有误，请重新填写');
				}
			});
		},
		// 获取表格数据
		async getList() {
		},
		// 重置
		clearForm(name) {
			this.pageNo = 1;
			this.formItem = {};
			this.$refs[name].resetFields();
		}
	}
};
