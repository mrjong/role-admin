import jianmian from '@/components/caseDesc/jianmian.vue';
import qs from 'qs';
import {
	case_detail_remark_list, // 催收
	case_detail_repay_ord_list, // 回款
	case_detail_user_repay_list, // 用户主动
	case_detail_system_repay_list, // 系统代扣
	case_detail_bindcard_list, // 绑卡信息
	case_detail_allot_list, // 分配
	case_detail_siteletter_list, // 站内
	case_detail_address_info, // 地址
	case_detail_mail_detail_list, // 通话明细
	case_detail_mail_list, // 通讯录（指定案件）
	case_detail_mail_list_appended, // 定案件后追加的
	case_detail_mail_statistics_list, // 通信记录统计
	case_detail_urgent_contact // 紧急联系人
} from '@/service/getData';
export default {
	name: 'case_desc',
	components: {
		jianmian
	},
	data() {
		return {
			caseNo: '',
			userId: '',
			showBtn: true,
			showPanel: false,
			showPanel2: false,
			imgName: '',
			visible: false,
			showBottom: false,
			value1: 1,
			modalTitle: '',
			visible1: false,
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
			formValidate: {},
			formValidate2: {},
			ruleValidate: {
				name: [ { required: true, message: 'The name cannot be empty', trigger: 'blur' } ],
				mail: [
					{ required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
					{ type: 'email', message: 'Incorrect email format', trigger: 'blur' }
				],
				city: [ { required: true, message: 'Please select the city', trigger: 'change' } ],
				gender: [ { required: true, message: 'Please select gender', trigger: 'change' } ],
				interest: [
					{ required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
					{ type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
				],
				date: [ { required: true, type: 'date', message: 'Please select the date', trigger: 'change' } ],
				time: [ { required: true, type: 'string', message: 'Please select time', trigger: 'change' } ],
				desc: [
					{ required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
					{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
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
			tableColumns: [],
			// 催收信息
			tableData: [],
			case_detail_remark_list_pageNo: 1,
			case_detail_remark_list_pageSize: 10,
			case_detail_remark_list_total: 0,
			case_detail_remark_list_tableData: [],
			case_detail_remark_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 回款信息
			case_detail_repay_ord_list_pageNo: 1,
			case_detail_repay_ord_list_pageSize: 10,
			case_detail_repay_ord_list_total: 0,
			case_detail_repay_ord_list_tableData: [],
			case_detail_repay_ord_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 用户主动还款
			case_detail_user_repay_list_pageNo: 1,
			case_detail_user_repay_list_pageSize: 10,
			case_detail_user_repay_list_total: 0,
			case_detail_user_repay_list_tableData: [],
			case_detail_user_repay_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 系统代扣还款
			case_detail_system_repay_list_pageNo: 1,
			case_detail_system_repay_list_pageSize: 10,
			case_detail_system_repay_list_total: 0,
			case_detail_system_repay_list_tableData: [],
			case_detail_system_repay_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 用户绑卡信息
			case_detail_bindcard_list_pageNo: 1,
			case_detail_bindcard_list_pageSize: 10,
			case_detail_bindcard_list_total: 0,
			case_detail_bindcard_list_tableData: [],
			case_detail_bindcard_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 分配信息
			case_detail_allot_list_pageNo: 1,
			case_detail_allot_list_pageSize: 10,
			case_detail_allot_list_total: 0,
			case_detail_allot_list_tableData: [],
			case_detail_allot_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 站内信记录
			case_detail_siteletter_list_pageNo: 1,
			case_detail_siteletter_list_pageSize: 10,
			case_detail_siteletter_list_total: 0,
			case_detail_siteletter_list_tableData: [],
			case_detail_siteletter_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 通话统计
			case_detail_mail_statistics_list_pageNo: 1,
			case_detail_mail_statistics_list_pageSize: 10,
			case_detail_mail_statistics_list_total: 0,
			case_detail_mail_statistics_list_tableData: [],
			case_detail_mail_statistics_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 通话明细
			case_detail_mail_detail_list_pageNo: 1,
			case_detail_mail_detail_list_pageSize: 10,
			case_detail_mail_detail_list_total: 0,
			case_detail_mail_detail_list_tableData: [],
			case_detail_mail_detail_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 通讯录
			case_detail_mail_list_pageNo: 1,
			case_detail_mail_list_pageSize: 10,
			case_detail_mail_list_total: 0,
			case_detail_mail_list_tableData: [],
			case_detail_mail_list_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			],

			// 通话更新
			case_detail_mail_list_appended_pageNo: 1,
			case_detail_mail_list_appended_pageSize: 10,
			case_detail_mail_list_appended_total: 0,
			case_detail_mail_list_appended_tableData: [],
			case_detail_mail_list_appended_tableColumns: [
				{
					title: '序号',
					width: 100,
					align: 'center',
					type: 'index',
					sortable: true
				},
				{
					title: '催收时间',
					align: 'center',
					key: 'remarkDate',
					width: 200,
					render: (h, params) => {
						let remarkDate = params.row.remarkDate;
						remarkDate = remarkDate
							? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
							: remarkDate;
						return h('span', remarkDate);
					}
				},
				{
					title: '催收电话',
					align: 'center',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '催收姓名',
					align: 'center',
					width: 100,
					key: 'opUserName'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResult'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResult'
				},
				{
					title: 'PTP时间',
					align: 'center',
					width: 200,
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'collectRmk',
					render: (h, params) => {
						let collectRmk = params.row.collectRmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.collectRmk) ]
						);
					}
				}
			]
		};
	},
	created() {
		let params = location.hash.split('?');
		const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
		this.caseNo = queryData.caseNo;
		console.log(queryData);
		this.userId = queryData.userId;
		// 催收信息
		this.case_detail_remark_list();
	},
	methods: {
		// 催收信息
		async case_detail_remark_list() {
			console.log(this.caseNo);
			const res = await case_detail_remark_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_remark_list_pageNo,
				pageSize: this.case_detail_remark_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_remark_list_tableData = res.data.content;
				this.case_detail_remark_list_pageSize = res.data.size;
				this.case_detail_remark_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 回款信息
		async case_detail_repay_ord_list() {
			const res = await case_detail_repay_ord_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_repay_ord_list_pageNo,
				pageSize: this.case_detail_repay_ord_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_repay_ord_list_tableData = res.data.content;
				this.case_detail_repay_ord_list_pageSize = res.data.size;
				this.case_detail_repay_ord_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 用户主动还款
		async case_detail_user_repay_list() {
			const res = await case_detail_user_repay_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_user_repay_list_pageNo,
				pageSize: this.case_detail_user_repay_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_user_repay_list_tableData = res.data.content;
				this.case_detail_user_repay_list_pageSize = res.data.size;
				this.case_detail_user_repay_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 系统代扣还款
		async case_detail_system_repay_list() {
			const res = await case_detail_system_repay_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_system_repay_list_pageNo,
				pageSize: this.case_detail_system_repay_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_system_repay_list_tableData = res.data.content;
				this.case_detail_system_repay_list_pageSize = res.data.size;
				this.case_detail_system_repay_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 用户绑卡信息
		async case_detail_bindcard_list() {
			const res = await case_detail_bindcard_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_bindcard_list_pageNo,
				pageSize: this.case_detail_bindcard_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_bindcard_list_tableData = res.data.content;
				this.case_detail_bindcard_list_pageSize = res.data.size;
				this.case_detail_bindcard_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 分配信息
		async case_detail_allot_list() {
			const res = await case_detail_allot_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_allot_list_pageNo,
				pageSize: this.case_detail_allot_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_allot_list_tableData = res.data.content;
				this.case_detail_allot_list_pageSize = res.data.size;
				this.case_detail_allot_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 站内信记录
		async case_detail_siteletter_list() {
			const res = await case_detail_siteletter_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_siteletter_list_pageNo,
				pageSize: this.case_detail_siteletter_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_siteletter_list_tableData = res.data.content;
				this.case_detail_siteletter_list_pageSize = res.data.size;
				this.case_detail_siteletter_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 通信记录统计
		async case_detail_mail_statistics_list() {
			const res = await case_detail_mail_statistics_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_mail_statistics_list_pageNo,
				pageSize: this.case_detail_mail_statistics_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_mail_statistics_list_tableData = res.data.content;
				this.case_detail_mail_statistics_list_pageSize = res.data.size;
				this.case_detail_mail_statistics_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
        },
        
        	// 通话明细
		async case_detail_mail_detail_list() {
			const res = await case_detail_mail_detail_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_mail_detail_list_pageNo,
				pageSize: this.case_detail_mail_detail_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_mail_detail_list_tableData = res.data.content;
				this.case_detail_mail_detail_list_pageSize = res.data.size;
				this.case_detail_mail_detail_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
        },
        
        	// 通讯录
		async case_detail_mail_list() {
			const res = await case_detail_mail_list({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_mail_list_pageNo,
				pageSize: this.case_detail_mail_list_pageSize
			});
			if (res.code === 1) {
				this.case_detail_mail_list_tableData = res.data.content;
				this.case_detail_mail_list_pageSize = res.data.size;
				this.case_detail_mail_list_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
        },
        
        	// 通话更新
		async case_detail_mail_list_appended() {
			const res = await case_detail_mail_list_appended({
				caseNo: this.caseNo,
				userId: this.userId,
				pageNum: this.case_detail_mail_list_appended_pageNo,
				pageSize: this.case_detail_mail_list_appended_pageSize
			});
			if (res.code === 1) {
				this.case_detail_mail_list_appended_tableData = res.data.content;
				this.case_detail_mail_list_appended_pageSize = res.data.size;
				this.case_detail_mail_list_appended_total = res.data.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		},

		tabClick(name) {
			this[`${name}_pageNo`] = 1;
			this[name]();
		},
		handleCancle() {
			this.showBottom = false;
		},
		handCall() {
			this.showBottom = true;
		},
		handOpen(type, title) {
			this.modalTitle = title;
			this.visible1 = true;
		},
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		isShow() {
			this.showBtn = !this.showBtn;
			console.log('00000');
		},
		// 页码改变的回调
		changePage(pageNo) {
			this.pageNo = pageNo;
			// this.getList();
		},
		// 切换每页条数时的回调
		changeSize(pageSize) {
			console.log(pageSize);
			this.pageSize = pageSize;
			this.pageNo = 1;
			this.getList();
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					// this.getList();
				} else {
					this.$Message.error('查询条件格式有误，请重新填写');
				}
			});
		},
		// 获取表格数据
		async getList() {},
		// 重置
		clearForm(name) {
			this.pageNo = 1;
			this.formItem = {};
			this.$refs[name].resetFields();
		}
	}
};
