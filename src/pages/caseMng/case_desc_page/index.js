import jianmian from '@/components/caseDesc/jianmian.vue';
import qs from 'qs';
import sysDictionary from '@/mixin/sysDictionary';
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
	case_detail_urgent_contact, // 紧急联系人
	case_detail_case_base_info, // 查询案件详情基础信息
	case_detail_case_identity_info, // 查询案件详情身份信息
	mail_list_add // 新增通讯录
} from '@/service/getData';
export default {
	name: 'case_desc',
	components: {
		jianmian
	},
	mixins: [ sysDictionary ],
	data() {
		return {
			formItem2: {},
			ruleValidate2: {
				mblNo: [
					{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
                    },
                    {
						pattern: this.GLOBAL.mblNo,
						message: '请输入正确手机号',
						trigger: 'blur'
					}
				]
			},
			getDirList: [ 'CNT_REL_TYP' ],
			getDirObj: {},

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
			modal7: false,
			queryData: {},
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
			case_detail_case_identity_info_Data: {},
			case_detail_urgent_contact_Data: {},
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
			case_detail_address_info_Data: {},
			case_detail_remark_list_pageNo: 1,
			case_detail_remark_list_pageSize: 10,
			case_detail_remark_list_total: 0,
			case_detail_remark_list_tableData: [],
			case_detail_case_base_info_Data: {},
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
					key: 'userNmHid'
				},
				{
					title: '催收对象',
					align: 'center',
					width: 100,
					key: 'callUserTypeName'
				},
				{
					title: '拨打状态',
					align: 'center',
					width: 100,
					key: 'collectResultName'
				},
				{
					title: '沟通状态',
					align: 'center',
					width: 100,
					key: 'communicateResultName'
				},
				{
					title: '承诺还款时间',
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
									content: collectRmk,
									placement: 'top'
								}
							},
							[ h('div', {}, collectRmk) ]
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
					title: '还款时间',
					align: 'center',
					key: 'repayDate',
					width: 200,
					render: (h, params) => {
						let repayDate = params.row.repayDate;
						repayDate = repayDate
							? this.$options.filters['formatDate'](repayDate, 'YYYY-MM-DD HH:mm:ss')
							: repayDate;
						return h('span', repayDate);
					}
				},
				{
					title: '还款金额',
					align: 'center',
					width: 150,
					key: 'repayAmt',
					render: (h, params) => {
						let repayAmt = params.row.repayAmt;
						repayAmt = repayAmt ? this.$options.filters['money'](repayAmt) : repayAmt;
						return h('span', repayAmt);
					}
				},
				{
					title: '还款状态',
					align: 'center',
					width: 100,
					key: 'repayOrdStsName'
				},
				{
					title: '还款方式',
					align: 'center',
					width: 100,
					key: 'repayOrdTypName'
				},
				{
					title: '还款银行',
					align: 'center',
					width: 100,
					key: 'crdCorpOrgName'
				},
				{
					title: '还款账号',
					align: 'center',
					width: 100,
					key: 'crdNoHid'
				},
				{
					title: '实际还款人',
					align: 'center',
					width: 100,
					key: 'userNmHid'
				},
				{
					title: '还款人关系',
					align: 'center',
					width: 100,
					key: ''
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
					title: '还款金额',
					align: 'center',
					width: 150,
					key: 'repayOrdAmt',
					render: (h, params) => {
						let repayOrdAmt = params.row.repayOrdAmt;
						repayOrdAmt = repayOrdAmt ? this.$options.filters['money'](repayOrdAmt) : repayOrdAmt;
						return h('span', repayOrdAmt);
					}
				},
				{
					title: '订单状态',
					align: 'center',
					width: 100,
					key: 'ordSts'
				},
				{
					title: '失败原因',
					align: 'center',
					minWidth: 400,
					key: 'orgFnlMsg',
					render: (h, params) => {
						let orgFnlMsg = params.row.orgFnlMsg;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.orgFnlMsg,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.orgFnlMsg) ]
						);
					}
				},
				{
					title: '还款日期',
					align: 'center',
					width: 100,
					key: 'ordDt',
					render: (h, params) => {
						let ordDt = params.row.ordDt;
						ordDt = ordDt ? this.$options.filters['formatDate'](ordDt, 'YYYY-MM-DD') : ordDt;
						return h('span', ordDt);
					}
				},
				{
					title: '卡类型',
					align: 'center',
					width: 100,
					key: 'crdAcTyp'
				},
				{
					title: '还款银行',
					align: 'center',
					width: 100,
					key: 'crdCorpOrg'
				},
				{
					title: '还款银行卡后四位',
					align: 'center',
					width: 150,
					key: 'crdNoLast'
				},

				{
					title: '已还本金',
					align: 'center',
					width: 100,
					key: 'repayOrdPrcp',
					render: (h, params) => {
						let repayOrdPrcp = params.row.repayOrdPrcp;
						repayOrdPrcp = repayOrdPrcp ? this.$options.filters['money'](repayOrdPrcp) : repayOrdPrcp;
						return h('span', repayOrdPrcp);
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
					title: '还款金额',
					align: 'center',
					width: 150,
					key: 'repayOrdAmt',
					render: (h, params) => {
						let repayOrdAmt = params.row.repayOrdAmt;
						repayOrdAmt = repayOrdAmt ? this.$options.filters['money'](repayOrdAmt) : repayOrdAmt;
						return h('span', repayOrdAmt);
					}
				},
				{
					title: '订单状态',
					align: 'center',
					width: 100,
					key: 'ordSts'
				},
				{
					title: '失败原因',
					align: 'center',
					minWidth: 400,
					key: 'orgFnlMsg',
					render: (h, params) => {
						let orgFnlMsg = params.row.orgFnlMsg;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.orgFnlMsg,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.orgFnlMsg) ]
						);
					}
				},
				{
					title: '还款日期',
					align: 'center',
					width: 100,
					key: 'ordDt',
					render: (h, params) => {
						let ordDt = params.row.ordDt;
						ordDt = ordDt ? this.$options.filters['formatDate'](ordDt, 'YYYY-MM-DD') : ordDt;
						return h('span', ordDt);
					}
				},
				{
					title: '卡类型',
					align: 'center',
					width: 100,
					key: 'crdAcTyp'
				},
				{
					title: '还款银行',
					align: 'center',
					width: 100,
					key: 'crdCorpOrg'
				},
				{
					title: '还款银行卡后四位',
					align: 'center',
					width: 150,
					key: 'crdNoLast'
				},

				{
					title: '已还本金',
					align: 'center',
					width: 100,
					key: 'repayOrdPrcp',
					render: (h, params) => {
						let repayOrdPrcp = params.row.repayOrdPrcp;
						repayOrdPrcp = repayOrdPrcp ? this.$options.filters['money'](repayOrdPrcp) : repayOrdPrcp;
						return h('span', repayOrdPrcp);
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
					title: '用户姓名',
					align: 'center',
					width: 150,
					key: 'usrNmHid'
				},
				{
					title: '卡类型',
					align: 'center',
					width: 150,
					key: 'crdAcTypName'
				},
				{
					title: '银行',
					align: 'center',
					width: 150,
					key: 'corpOrgNm'
				},
				{
					title: '银行卡号',
					align: 'center',
					width: 150,
					key: 'crdNoHid'
				},
				{
					title: '银行卡后四位',
					align: 'center',
					width: 150,
					key: 'crdNoLast'
				},
				{
					title: '绑卡时间',
					align: 'center',
					width: 150,
					key: 'signDt',
					render: (h, params) => {
						let signDt = params.row.signDt;
						let signTm = params.row.signTm;
						signDt = signDt
							? this.$options.filters['formatDate'](signDt, 'YYYY-MM-DD') +
								' ' +
								signTm.slice(0, 2) +
								':' +
								signTm.slice(2, 4) +
								':' +
								signTm.slice(4, 6)
							: signDt;
						return h('span', signDt);
					}
				},
				{
					title: '身份证号',
					align: 'center',
					width: 150,
					key: 'idNoHid'
				},
				{
					title: '状态',
					align: 'center',
					width: 150,
					key: 'agrEffFlgName'
				},
				{
					title: '解绑时间',
					align: 'center',
					width: 150,
					key: 'unsignTm',
					render: (h, params) => {
						let unsignDt = params.row.unsignDt;
						let unsignTm = params.row.unsignTm;
						unsignDt = unsignDt
							? this.$options.filters['formatDate'](unsignDt, 'YYYY-MM-DD') +
								' ' +
								unsignTm.slice(0, 2) +
								':' +
								unsignTm.slice(2, 4) +
								':' +
								unsignTm.slice(4, 6)
							: unsignDt;
						return h('span', unsignDt);
					}
				},
				{
					title: '业务类型',
					align: 'center',
					width: 150,
					key: 'businessName'
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
					title: '分配时间',
					align: 'center',
					key: 'allotDate',
					width: 200,
					render: (h, params) => {
						let allotDate = params.row.allotDate;
						allotDate = allotDate
							? this.$options.filters['formatDate'](allotDate, 'YYYY-MM-DD HH:mm:ss')
							: allotDate;
						return h('span', allotDate);
					}
				},
				{
					title: '操作人',
					align: 'center',
					width: 150,
					key: 'allotUserName'
				},
				{
					title: '分配前经办人',
					align: 'center',
					width: 100,
					key: 'opUserNameOld'
				},
				{
					title: '分配后经办人',
					align: 'center',
					width: 100,
					key: 'opUserNameNew'
				},
				{
					title: '备注',
					align: 'center',
					minWidth: 400,
					key: 'rmk',
					render: (h, params) => {
						let rmk = params.row.rmk;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: params.row.rmk,
									placement: 'top'
								}
							},
							[ h('div', {}, params.row.rmk) ]
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
					title: '承诺还款时间',
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
					title: '承诺还款时间',
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
					title: '承诺还款时间',
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
					title: '承诺还款时间',
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
					title: '承诺还款时间',
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
		this.caseNo = queryData.caseNotest;
		this.userId = queryData.userIdtest;
		delete queryData.caseNotest;
		delete queryData.userIdtest;
		this.queryData = queryData;
		// 催收信息
		this.case_detail_remark_list(); // 催收信息
		this.case_detail_urgent_contact(); // 紧急联系人
		this.case_detail_case_base_info(); // 基本信息
	},
	methods: {
		saveTxl() {
			this.$refs.formItem2.validate((valid) => {
				if (valid) {
					this.mail_list_add();
				}
			});
		},
		async mail_list_add() {
			// 新增通讯录
			const res = await mail_list_add({
				...this.formItem2,
				caseNo: this.caseNo,
				userId: this.userId
			});
			if (res.code === 1) {
				// 更新list
				this.case_detail_mail_list_appended();
				this.modal7 = false;
			} else {
				this.$Message.error(res.message);
			}
		},
		closeTxl() {
			this.modal7 = false;
		},
		addtxl() {
			this.modal7 = true;
		},
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

		// 紧急联系人
		async case_detail_urgent_contact() {
			const res = await case_detail_urgent_contact({
				caseNo: this.caseNo,
				userId: this.userId
			});
			if (res.code === 1) {
				this.case_detail_urgent_contact_Data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 地址信息
		async case_detail_address_info() {
			const res = await case_detail_address_info({
				caseNo: this.caseNo,
				userId: this.userId
			});
			if (res.code === 1) {
				this.case_detail_address_info_Data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 查询案件详情基础信息
		async case_detail_case_base_info() {
			const res = await case_detail_case_base_info(this.queryData);
			if (res.code === 1) {
				this.case_detail_case_base_info_Data = res.data.content;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 查询案件详情身份信息
		async case_detail_case_identity_info() {
			const res = await case_detail_case_identity_info(this.queryData);
			if (res.code === 1) {
				this.case_detail_case_identity_info_Data = res.data.content;
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
		changeSize(pageSize, name) {
			console.log(pageSize, name);
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
