import { wkProcessTask_detail, wkProcessTask_list } from '@/service/getData';
import tablePage from '@/mixin/tablePage';
export default {
	name: 'case_search_page',
	mixins: [ tablePage ],
	data() {
		return {
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
			ruleValidate: {
				buffet_id: [
					{
						required: true,
						message: '请输入网格编号',
						trigger: 'blur'
					}
				]
			},
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
			tableColumns: [
				{
					title: '定义ID',
					width: 100,
					sortable: true,
					key: 'defId'
				},
				{
					title: '定义名称',
					width: 120,
					key: 'defName'
				},
				{
					title: '业务标识',
					width: 120,
					key: 'busiKey'
				},
				{
					title: '节点名称',
					width: 120,
					key: 'taskNodeName'
				},
				{
					title: '节点顺序',
					width: 120,
					key: 'taskNodeSort'
				},
				{
					title: '处理人',
					width: 120,
					key: 'waitDealName'
				},
				{
					title: '申请人',
					width: 120,
					key: 'applyName'
				},
				{
					title: '操作',
					width: 100,
					key: 'edit',
					render: (h, params) => {
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									props: {}
								},
								'详情'
							),
							h(
								'a',
								{
									class: 'edit-btn',
									props: {}
								},
								'审核'
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
		async getList() {
			const res = await wkProcessTask_list({
				...this.formItem,
				pageNum: this.pageNo,
				pageSize: this.pageSize
			});
			if (res.code === 1) {
				this.tableData = res.data.content;
				this.pageSize = res.data.size;
				this.total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
