import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { arb_apply } from '@/service/getData';
export default {
	name: 'case_search_page',
	mixins: [ formValidateFun, sysDictionary ],
	data() {
		console.log(this.GLOBAL);

		return {
			getDirList: [ 'PROD_TYPE', 'GENDER', 'APPROVAL_STATE' ],
			getDirObj: {},
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
			ruleValidate: {
				idNo: [
					{
						pattern: this.GLOBAL.idNo,
						message: '请输入正确身份证号',
						trigger: 'blur'
					}
				],
				mblNo: [
					{
						pattern: this.GLOBAL.mblNo,
						message: '请输入正确手机号',
						trigger: 'blur'
					}
				],
				overdueDaysLt: [
					{
						pattern: this.GLOBAL.num,
						message: '逾期天数为正整数',
						trigger: 'blur'
					},
					{
						validator: this.validate_yqts_start,
						trigger: 'blur'
					}
				],
				overdueDaysBt: [
					{
						pattern: this.GLOBAL.num,
						message: '逾期天数为正整数',
						trigger: 'blur'
					},
					{
						validator: this.validate_yqts_end,
						trigger: 'blur'
					}
				],
				billOvduAmtLt: [
					{
						pattern: this.GLOBAL.money,
						message: '金额格式不正确',
						trigger: 'blur'
					},
					{
						validator: this.validate_yqyhje_start,
						trigger: 'blur'
					}
				],
				billOvduAmtBt: [
					{
						pattern: this.GLOBAL.money,
						message: '金额格式不正确',
						trigger: 'blur'
					},
					{
						validator: this.validate_yqyhje_end,
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
					title: '案件状态',
					minWidth: 120,
					align: 'center',
					key: 'approvalState'
				},
				{
					title: '案件编号',
					minWidth: 120,
					align: 'center',
					key: 'caseNo'
				},
				{
					title: '账单号',
					minWidth: 120,
					align: 'center',
					key: 'billNo'
				},
				{
					title: '产品名称',
					minWidth: 120,
					align: 'center',
					key: 'productType'
				},

				{
					title: '借款期限',
					minWidth: 120,
					align: 'center',
					key: 'perdCnt'
				},
				{
					title: '客户姓名',
					minWidth: 120,
					align: 'center',
					key: 'userName'
				},
				{
					title: '身份证号',
					minWidth: 120,
					align: 'center',
					key: 'idCardNo'
				},
				{
					title: '手机号',
					minWidth: 120,
					align: 'center',
					key: 'mblNo'
				},
				{
					title: '逾期天数',
					minWidth: 120,
					align: 'center',
					key: 'overdueDays'
				},
				{
					title: '逾期应还金额',
					minWidth: 120,
					align: 'center',
					key: 'overdueAmt',
					render: (h, params) => {
						let overdueAmt = params.row.overdueAmt;
						overdueAmt = overdueAmt ? this.$options.filters['money'](overdueAmt) : overdueAmt;
						return h('span', overdueAmt);
					}
				},
				{
					title: '已还罚息',
					minWidth: 120,
					align: 'center',
					key: 'perdFineRep',
					render: (h, params) => {
						let perdFineRep = params.row.perdFineRep;
						perdFineRep = perdFineRep ? this.$options.filters['money'](perdFineRep) : perdFineRep;
						return h('span', perdFineRep);
					}
				},
				{
					title: '已还滞纳金',
					minWidth: 120,
					align: 'center',
					key: 'perdOvduRep',
					render: (h, params) => {
						let perdOvduRep = params.row.perdOvduRep;
						perdOvduRep = perdOvduRep ? this.$options.filters['money'](perdOvduRep) : perdOvduRep;
						return h('span', perdOvduRep);
					}
				},
				{
					title: '申请时间',
					minWidth: 120,
					align: 'center',
					key: 'createTime',
					render: (h, params) => {
						let createTime = params.row.createTime;
						createTime = createTime
							? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
							: createTime;
						return h('span', createTime);
					}
				},
				{
					title: '申请人',
					minWidth: 120,
					align: 'center',
					key: 'createUser'
				},
				{
					title: '电催中心',
					minWidth: 120,
					align: 'center',
					key: 'opCompayName'
				},
				{
					title: '审核人',
					minWidth: 120,
					align: 'center',
					key: 'approvalUser'
				},
				{
					title: '审核时间',
					minWidth: 120,
					align: 'center',
					key: 'approvalTime',
					render: (h, params) => {
						let approvalTime = params.row.approvalTime;
						approvalTime = approvalTime
							? this.$options.filters['formatDate'](approvalTime, 'YYYY-MM-DD HH:mm:ss')
							: approvalTime;
						return h('span', approvalTime);
					}
				},
				{
					title: '审核备注',
					minWidth: 120,
					align: 'center',
					key: 'approvalRemark',
					render: (h, params) => {
						let approvalRemark = params.row.approvalRemark;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: approvalRemark,
									placement: 'top'
								}
							},
							[ h('div', {}, approvalRemark) ]
						);
					}
				}
			]
		};
	},
	created() {
		// this.getList();
	},
	methods: {
		// 页码改变的回调
		changePage(pageNo) {
			this.pageNo = pageNo;
			this.getList();
		},
		// 切换每页条数时的回调
		changeSize(pageSize) {
			this.pageSize = pageSize;
			this.pageNo = 1;
			this.getList();
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
			const res = await arb_apply({
				pageNum: this.pageNo,
				pageSize: this.pageSize,
				...this.formItem
			});
			if (res.code === 1) {
				this.tableData = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 重置
		clearForm(name) {
			this.pageNo = 1;
			this.formItem = {};
			this.$refs[name].resetFields();
		}
	}
};
