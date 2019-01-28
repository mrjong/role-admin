import { wkProcessTask_detail, wkProcessTask_list, wkProcessTask_approval_list } from '@/service/getData';
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
					minWidth: 100,
					sortable: true,
                    align:'center',
                    key: 'defId'
				},
				{
					title: '定义名称',
					minWidth: 120,
                    align:'center',
                    key: 'defName'
				},
				{
					title: '业务标识',
					minWidth: 120,
                    align:'center',
                    key: 'busiKey'
				},
				{
					title: '节点名称',
					minWidth: 120,
                    align:'center',
                    key: 'taskNodeName'
				},
				{
					title: '节点顺序',
					minWidth: 120,
                    align:'center',
                    key: 'taskNodeSort'
				},
				{
					title: '处理人',
					minWidth: 120,
                    align:'center',
                    key: 'waitDealName'
				},
				{
					title: '申请人',
					minWidth: 120,
                    align:'center',
                    key: 'applyName'
				},
				{
					title: '操作',
					minWidth: 100,
                    align:'center',
                    key: 'edit',
					render: (h, params) => {
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
											this.wkProcessTask_detail(params.row.id);
										}
									}
								},
								'详情'
							),
							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
											this.wkProcessTask_approval_list(params.row.id);
										}
									}
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
		// 详情
		async wkProcessTask_detail(id) {
			const res = await wkProcessTask_detail({
				id
			});
			if (res.code === 1) {
				this.show2(res.data);
			} else {
				this.$Message.error(res.message);
			}
		},
		// 审核
		async wkProcessTask_approval_list(id) {
			const res = await wkProcessTask_approval_list({
				id
			});
			if (res.code === 1) {
				this.show(res.data.content);
			} else {
				this.$Message.error(res.message);
			}
		},
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
		},
		show(obj) {
			let str = '';
			obj.forEach((ele) => {
				str += `
                定义ID：${ele.defId}<br>
                定义名称：${ele.defName}<br>
                业务标示：${ele.busiKey}<br>
                当前任务节点名称：${ele.taskNodeName}<br>
                当前任务顺序号：${ele.taskNodeSort}<br>
                当前任务节点待处理人名称：${ele.waitDealName}<br>
                申请人名称：${ele.applyName}<br><br><br><br>
                `;
			});
			this.$Modal.info({
				// closable: true,
				title: '任务详情',
				content: str
			});
		},
		show2(obj) {
			this.$Modal.info({
				// closable: true,
				title: '任务详情',
				content: `
              定义ID：${obj.defId}<br>
              定义名称：${obj.defName}<br>
              业务标示：${obj.busiKey}<br>
              当前任务节点名称：${obj.taskNodeName}<br>
              当前任务顺序号：${obj.taskNodeSort}<br>
              当前任务节点待处理人名称：${obj.waitDealName}<br>
              申请人名称：${obj.applyName}<br><br><br>
              `
			});
		}
	}
};
