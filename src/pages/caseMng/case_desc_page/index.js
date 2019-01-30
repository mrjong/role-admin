import jianmian from '@/components/caseDesc/jianmian.vue';
import huakou from '@/components/caseDesc/huakou.vue';
import zhongcai from '@/components/caseDesc/zhongcai.vue';
import qs from 'qs';
import dayjs from 'dayjs';
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
	mail_list_add, // 新增通讯录
	case_remark_his_add, // 新增催记
	collectcode_getCollectRelate, // 获取沟通状态
	call_kt_hung_on, // 外拨
	call_moor_hung_on
} from '@/service/getData';
export default {
	name: 'case_desc',
	components: {
		jianmian,
		huakou,
		zhongcai
	},
	mixins: [ sysDictionary ],
	data() {
		const _this = this;
		return {
			parentData: {},
			prdTyp: '',
			userNm: '',
			modal: {
				huakou: false,
				jianmian: false,
				zhongcai: false
			},
			formItem2: {},
			tabName: '',
			callUserTypeLevel: '',
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
			getDirList: [ 'CNT_REL_TYP', 'GENDER', 'NATION' ],
			getDirObj: {},
			userNmHidCopy: '',
			telShow: false,
			mblNo: '',
			caseNo: '',
			userId: '',
			readType: 'edit',
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
			collectcode_getCollectRelate_Data: [],
			collectcode_getCollectRelate_childItem: [],
			modal12: false,
			inputGrid: '',
			modal11: false,
			formValidate: {},
			formValidate2: {},
			case_detail_case_identity_info_Data: {},
			zhongcai_set_data: {},
			case_detail_urgent_contact_Data: {},
			ruleValidate: {
				collectResult: [
					{
						required: true,
						message: '请选择拨打状态',
						trigger: 'change'
					}
				],
				communicateResult: [
					{
						required: true,
						message: '请选择沟通状态',
						trigger: 'change'
					}
				]
			},

			formItem: {},
			tableColumns: [
				{
					title: '期数',
					width: 60,
					align: 'center',
					key: 'perdNum'
				},
				{
					title: '逾期天数',
					width: 100,
					align: 'center',
					key: 'overdueDays'
				},
				{
					title: '还款日',
					width: 150,
					align: 'center',
					key: 'perdDueDt',
					render: (h, params) => {
						let perdDueDt = params.row.perdDueDt;
						perdDueDt = perdDueDt ? this.$options.filters['tableDate'](perdDueDt) : perdDueDt;
						return h('span', perdDueDt);
					}
				},
				{
					title: '逾期状态',
					width: 100,
					align: 'center',
					key: 'overdueFlgName'
				},
				{
					title: '应还利息',
					width: 150,
					align: 'center',
					key: 'perdItrtAmt',
					render: (h, params) => {
						let perdItrtAmt = params.row.perdItrtAmt;
						perdItrtAmt = perdItrtAmt ? this.$options.filters['money'](perdItrtAmt) : perdItrtAmt;
						return h('span', perdItrtAmt);
					}
				},
				{
					title: '应还服务费',
					width: 150,
					align: 'center',
					key: 'perdMngAmt',
					render: (h, params) => {
						let perdMngAmt = params.row.perdMngAmt;
						perdMngAmt = perdMngAmt ? this.$options.filters['money'](perdMngAmt) : perdMngAmt;
						return h('span', perdMngAmt);
					}
				},
				{
					title: '应还罚息',
					width: 150,
					align: 'center',
					key: 'perdFineAmt',
					render: (h, params) => {
						let perdFineAmt = params.row.perdFineAmt;
						perdFineAmt = perdFineAmt ? this.$options.filters['money'](perdFineAmt) : perdFineAmt;
						return h('span', perdFineAmt);
					}
				},
				{
					title: '应还滞纳金',
					width: 150,
					align: 'center',
					key: 'perdOvduAmt',
					render: (h, params) => {
						let perdOvduAmt = params.row.perdOvduAmt;
						perdOvduAmt = perdOvduAmt ? this.$options.filters['money'](perdOvduAmt) : perdOvduAmt;
						return h('span', perdOvduAmt);
					}
				},
				{
					title: '应还总金额',
					width: 100,
					align: 'center',
					key: 'perdTotAmt',
					render: (h, params) => {
						let perdTotAmt = params.row.perdTotAmt;
						perdTotAmt = perdTotAmt ? this.$options.filters['money'](perdTotAmt) : perdTotAmt;
						return h('span', perdTotAmt);
					}
				},
				{
					title: '已还总金额',
					width: 150,
					align: 'center',
					key: 'perdTotRep',
					render: (h, params) => {
						let perdTotRep = params.row.perdTotRep;
						perdTotRep = perdTotRep ? this.$options.filters['money'](perdTotRep) : perdTotRep;
						return h('span', perdTotRep);
					}
				},
				{
					title: '未还总金额',
					width: 150,
					align: 'center',
					key: 'perdTotSur',
					render: (h, params) => {
						let perdTotSur = params.row.perdTotSur;
						perdTotSur = perdTotSur ? this.$options.filters['money'](perdTotSur) : perdTotSur;
						return h('span', perdTotSur);
					}
				},
				{
					title: '已还本金',
					width: 150,
					align: 'center',
					key: 'perdPrcpRep',
					render: (h, params) => {
						let perdPrcpRep = params.row.perdPrcpRep;
						perdPrcpRep = perdPrcpRep ? this.$options.filters['money'](perdPrcpRep) : perdPrcpRep;
						return h('span', perdPrcpRep);
					}
				},
				{
					title: '已还利息',
					width: 150,
					align: 'center',
					key: 'perdItrtRep',
					render: (h, params) => {
						let perdItrtRep = params.row.perdItrtRep;
						perdItrtRep = perdItrtRep ? this.$options.filters['money'](perdItrtRep) : perdItrtRep;
						return h('span', perdItrtRep);
					}
				},
				{
					title: '已还服务费',
					width: 150,
					align: 'center',
					key: 'perdMngRep',
					render: (h, params) => {
						let perdMngRep = params.row.perdMngRep;
						perdMngRep = perdMngRep ? this.$options.filters['money'](perdMngRep) : perdMngRep;
						return h('span', perdMngRep);
					}
				}
			],
			case_detail_address_info_Data: {},
			// 催收信息
			tableData: [],
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
					title: '发送时间',
					align: 'center',
					key: 'sendTime',
					width: 200,
					render: (h, params) => {
						let sendTime = params.row.sendTime;
						sendTime = sendTime
							? this.$options.filters['formatDate'](sendTime, 'YYYY-MM-DD HH:mm:ss')
							: sendTime;
						return h('span', sendTime);
					}
				},
				{
					title: '发送人',
					align: 'center',
					width: 150,
					key: 'userName'
				},
				{
					title: '发送结果',
					align: 'center',
					width: 100,
					key: 'sendStatus'
				},
				{
					title: '发送内容',
					align: 'center',
					minWidth: 400,
					key: 'sendContent',
					render: (h, params) => {
						let sendContent = params.row.sendContent;
						return h(
							'Tooltip',
							{
								style: {
									margin: '0 5px'
								},
								props: {
									content: sendContent,
									placement: 'top'
								}
							},
							[ h('div', {}, sendContent) ]
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
					title: '通话次数',
					align: 'center',
					key: 'count',
					width: 60
				},
				{
					title: '姓名（关系）',
					align: 'center',
					width: 150,
					key: 'userNmHid',
					render: (h, params) => {
						let callUserTypeName = params.row.callUserTypeName;
						let userNmHid = params.row.userNmHid;

						return h('div', [
							h(
								'span',
								{
									props: {
										type: 'edit'
									}
								},
								`${userNmHid}(${callUserTypeName})`
							)
						]);
					}
				},
				{
					title: '手机(状态)',
					align: 'center',
					width: 150,
					key: 'opUserName',
					render: (h, params) => {
						let callStateName = params.row.callStateName;
						let mblNoHid = params.row.mblNoHid;
						return h('div', [
							h(
								'a',
								{
									props: {
										type: 'edit'
									},
									on: {
										click: () => {
											_this.handCall(params.row);
										}
									}
								},
								`${mblNoHid}(${callStateName})`
							)
						]);
					}
				},
				{
					title: '操作',
					align: 'center',
					width: 100,
					key: 'edit',
					render: (h, params) => {
						return h('div', [
							h(
								'Icon',
								{
									style: {
										display: _this.readType !== 'read' ? 'inline-block' : 'none'
									},
									class: 'edit-btn',
									props: {
										type: 'edit'
									},
									on: {
										click: () => {
											_this.handCall(params.row);
										}
									}
								},
								'删除'
							)
						]);
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
					title: '通话时长(时间)',
					align: 'center',
					key: 'count',
					width: 130,
					render: (h, params) => {
						let callTime = params.row.callTime;
						let callDuration = params.row.callDuration;

						return h('div', [
							h(
								'span',
								{
									props: {
										type: 'edit'
									}
								},
								callDuration
							),
							h(
								'div',
								{
									props: {
										type: 'edit'
									}
								},
								callTime ? this.$options.filters['formatDate'](callTime, 'YYYY-MM-DD HH:mm:ss') : ''
							)
						]);
					}
				},
				{
					title: '姓名（关系）',
					align: 'center',
					width: 150,
					key: 'userNmHid',
					render: (h, params) => {
						let callUserTypeName = params.row.callUserTypeName;
						let userNmHid = params.row.userNmHid;
						return h('div', [
							h(
								'span',
								{
									props: {
										type: 'edit'
									}
								},
								`${userNmHid ? userNmHid : ''}(${callUserTypeName ? callUserTypeName : ''})`
							)
						]);
					}
				},
				{
					title: '手机(状态)',
					align: 'center',
					width: 150,
					key: 'mblNoHid',
					render: (h, params) => {
						let callStateName = params.row.callStateName;
						let mblNoHid = params.row.mblNoHid;
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									on: {
										click: () => {
											_this.handCall(params.row, 'call');
										}
									}
								},
								`${mblNoHid ? mblNoHid : ''}(${callStateName ? callStateName : ''})`
							)
						]);
					}
				},
				{
					title: '呼叫类型',
					align: 'center',
					key: 'callType',
					width: 100
				},
				{
					title: '操作',
					align: 'center',
					width: 100,
					key: 'edit',
					render: (h, params) => {
						return h('div', [
							h('Icon', {
								style: {
									display: _this.readType !== 'read' ? 'inline-block' : 'none'
								},
								class: 'edit-btn',
								props: {
									type: 'edit'
								},
								on: {
									click: () => {
										_this.handCall(params.row);
									}
								}
							})
						]);
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
					title: '姓名（关系）',
					align: 'center',
					width: 150,
					key: 'userNmHid',
					render: (h, params) => {
						let callUserTypeName = params.row.callUserTypeName;
						let userNmHid = params.row.userNmHid;

						return h('div', [
							h(
								'span',
								{
									props: {
										type: 'edit'
									}
								},
								`${userNmHid ? userNmHid : ''}(${callUserTypeName ? callUserTypeName : ''})`
							)
						]);
					}
				},
				{
					title: '手机(状态)',
					align: 'center',
					width: 150,
					key: 'mblNoHid',
					render: (h, params) => {
						let callStateName = params.row.callStateName;
						let mblNoHid = params.row.mblNoHid;
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									on: {
										click: () => {
											_this.handCall(params.row, 'call');
										}
									}
								},
								`${mblNoHid ? mblNoHid : ''}(${callStateName ? callStateName : ''})`
							)
						]);
					}
				},
				{
					title: '操作',
					align: 'center',
					width: 100,
					key: 'edit',
					render: (h, params) => {
						return h('div', [
							h(
								'Icon',
								{
									style: {
										display: _this.readType !== 'read' ? 'inline-block' : 'none'
									},
									class: 'edit-btn',
									props: {
										type: 'edit'
									},
									on: {
										click: () => {
											_this.handCall(params.row);
										}
									}
								},
								'编辑'
							)
						]);
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
					title: '姓名（关系）',
					align: 'center',
					width: 150,
					key: 'userNmHid',
					render: (h, params) => {
						let callUserTypeName = params.row.callUserTypeName;
						let userNmHid = params.row.userNmHid;

						return h('div', [
							h(
								'span',
								{
									props: {
										type: 'edit'
									}
								},
								`${userNmHid ? userNmHid : ''}(${callUserTypeName ? callUserTypeName : ''})`
							)
						]);
					}
				},
				{
					title: '手机(状态)',
					align: 'center',
					width: 150,
					key: 'mblNoHid',
					render: (h, params) => {
						let callStateName = params.row.callStateName;
						let mblNoHid = params.row.mblNoHid;
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									props: {
										type: 'edit'
									},
									on: {
										click: () => {
											_this.handCall(params.row, 'call');
										}
									}
								},
								`${mblNoHid}(${callStateName ? callStateName : ''})`
							)
						]);
					}
				},
				{
					title: '操作',
					align: 'center',
					width: 100,
					key: 'edit',
					render: (h, params) => {
						return h('div', [
							h(
								'Icon',
								{
									style: {
										display: _this.readType !== 'read' ? 'inline-block' : 'none'
									},
									class: 'edit-btn',
									props: {
										type: 'edit'
									}
								},
								'编辑'
							)
						]);
					}
				}
			]
		};
	},
	created() {
		let params = location.hash.split('?');
		const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
		this.caseNo = queryData.caseNotest;
		this.seatType = queryData.seatType;
		this.prdTyp = queryData.prdTyptest;
		this.userId = queryData.userIdtest;
		this.readType = queryData.readType;
		delete queryData.caseNotest;
		delete queryData.prdTyptest;
		delete queryData.userIdtest;
		this.queryData = queryData;
		// 催收信息
		this.case_detail_remark_list(); // 催收信息
		this.case_detail_urgent_contact(); // 紧急联系人
		this.case_detail_case_base_info(); // 基本信息
		this.case_detail_bindcard_list(); // 绑卡信息
		this.collectcode_getCollectRelate(); // 获取沟通状态
		this.case_detail_mail_statistics_list(); // 通话统计
		this.case_detail_case_identity_info(); // 查询案件详情身份信息
	},
	methods: {
		async call_kt_hung_on(obj) {
			this.telShow = true;
			let callData = JSON.parse(sessionStorage.getItem('callData'));
			let obj2 = {
				callno: obj.callno,
				caseNo: this.caseNo,
				toCallUser: obj.toCallUser,
				toCallUserHid: obj.toCallUserHid,
				toCallMbl: obj.toCallMbl,
				toCallMblHid: obj.toCallMblHid,
				callUserType: obj.callUserType,
				userId: this.userId
			};
			if (this.seatType === 'KT') {
				obj2.actionId = callData.id;
			}
			let res = {};
			if (this.seatType === 'RL') {
				res = await call_moor_hung_on(obj2);
			} else {
				res = await call_kt_hung_on(obj2);
			}
			if (res.code === 1) {
				this.$Message.success('呼出成功');
			} else {
				this.$Message.error(res.message);
			}
		},
		rowClassName(row, index) {
			if (row.overdueFlg === 'Y') {
				return 'demo-table-info-row';
			} else {
				return 'demo-table-error-row';
			}
			return '';
		},
		// 保存通讯录
		saveTxl() {
			this.$refs.formItem2.validate((valid) => {
				if (valid) {
					this.mail_list_add();
				}
			});
		},
		// 新增通讯录
		async mail_list_add() {
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
				this.case_detail_remark_list_tableData = res.data && res.data.content;
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
				this.case_detail_repay_ord_list_tableData = res.data && res.data.content;
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
				this.case_detail_user_repay_list_tableData = res.data && res.data.content;
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
				this.case_detail_system_repay_list_tableData = res.data && res.data.content;
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
				this.case_detail_bindcard_list_tableData = res.data && res.data.content;
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
				this.case_detail_allot_list_tableData = res.data && res.data.content;
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
				this.case_detail_siteletter_list_tableData = res.data && res.data.content;
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
				this.case_detail_mail_statistics_list_tableData = res.data && res.data.content;
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
				this.case_detail_mail_detail_list_tableData = res.data && res.data.content;
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
				this.case_detail_mail_list_tableData = res.data && res.data.content;
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
				this.case_detail_mail_list_appended_tableData = res.data && res.data.content;
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
			const res = await case_detail_case_base_info({
				...this.queryData,
				id: this.caseNo
			});
			if (res.code === 1) {
				this.case_detail_case_base_info_Data = res.data && res.data;
				this.tableData = res.data && res.data.caseBasePerdVoList;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 查询案件详情身份信息
		async case_detail_case_identity_info() {
			const res = await case_detail_case_identity_info({
				...this.queryData,
				id: this.caseNo
			});
			if (res.code === 1) {
				this.case_detail_case_identity_info_Data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},
		// tab 所有点击
		tabClick(name) {
			this[`${name}_pageNo`] = 1;
			this[name]();
		},

		// 取消催记
		handleCancle() {
			// 重置初始化数据
			this.mblNo = '';
			this.userNmHidCopy = '';
			this.mblNoHid = '';
			this.userNm = '';
			this.formValidate = {};
			this.showBottom = false;
			this.callUserTypeLevel = '';
		},

		// 点击电话
		handCall(obj, type, tag) {
			console.log('obj', obj);
			this.handleCancle();
			console.log(obj, type);
			// type ['call] 拨打电话
			this.call_kt_hung_on({
				callno: obj.mblNo || obj.cntUserMblNo,
				callUserType: obj.callUserType || obj.cntRelTyp,
				toCallUser: obj.userNm || obj.cntUserName,
				toCallUserHid: obj.userNmHid || obj.cntUserNameHid,
				toCallMbl: obj.mblNo || obj.cntUserMblNo,
				toCallMblHid: obj.mblNoHid || obj.cntUserMblNoHid
			});
			if (type === 'call') {
			}
			if (this.readType !== 'read') {
				this.callUserTypeLevel = tag;
				this.formValidate.userNmHid = obj.userNmHid || obj.cntUserNameHid;
				this.userNmHidCopy = obj.userNmHid || obj.cntUserNameHid;
				this.mblNoHid = obj.mblNoHid || obj.cntUserMblNoHid;
				this.userNm = obj.userNm || obj.cntUserName;
				this.mblNo = obj.mblNo || obj.cntUserMblNo;
				this.showBottom = true;
			} else {
				this.$Message.info('权限不足');
			}
		},
		passBack(type) {
			this.modal[type] = false;
		},
		handOpen(type) {
			console.log(this.modal);
			if (type === 'zhongcai') {
				this.zhongcai_set_data = {
					idNoHid: '22222222222', // case_detail_case_identity_info_Data.idNoHid
					billNo: '9999999999', // case_detail_case_base_info_Data.billNo
					userNmHid: '2222222', // case_detail_case_identity_info_Data.userNmHid
					caseNo: '2222222222', // this.caseNo,
					userGender: 'M', //this.prdTyp,
					userNation: '汉族'
				};
			}
			this.modal[type] = true;
		},
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		isShow() {
			this.showBtn = !this.showBtn;
		},
		// 页码改变的回调
		changePage(name) {
			this[name]();
		},
		nextCase(caseNo) {
			let params = location.hash.split('?');
			const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
			queryData.caseNotest = caseNo;
			location.href = params[0] + '?' + qs.stringify(queryData);
			location.reload();
		},
		// 切换每页条数时的回调
		changeSize(pageSize, name) {
			console.log(this.case_detail_allot_list_pageSize);
			console.log(pageSize, name);
			this.pageSize = pageSize;
			this.pageNo = 1;
		},
		// 新增催记
		async case_remark_his_add() {
			const res = await case_remark_his_add({
				...this.formValidate,
				promiseRepayDate: dayjs(this.formValidate.promiseRepayDate).format('YYYY-MM-DD HH:mm'),
				userId: this.userId,
				userNm: this.userNm,
				mblNo: this.mblNo,
				mblNoHid: this.mblNoHid,
				caseNo: this.caseNo,
				callUserTypeLevel: this.callUserTypeLevel,
				userNmHid: this.userNmHidCopy,
				userNmNew: this.formValidate.userNmHid === this.userNmHidCopy ? '' : this.formValidate.userNmHid
			});
			if (res.code === 1) {
				this.$Message.success('添加成功');
				setTimeout(() => {
					this.case_detail_remark_list_pageNo = 1;
					this.case_detail_remark_list();
					this.handleCancle();
				}, 2000);
			} else {
				this.$Message.error(res.message);
			}
		},
		case_detail_mail_list_changeSize() {},
		// 获取沟通状态
		async collectcode_getCollectRelate() {
			const res = await collectcode_getCollectRelate({});
			if (res.code === 1) {
				this.collectcode_getCollectRelate_Data = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},
		SelectChange(code) {
			this.collectcode_getCollectRelate_Data.forEach((element) => {
				if (element.code === code) {
					this.collectcode_getCollectRelate_childItem = element.codeRelateDomains;
				}
			});
		},
		// 新增催记按钮
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.case_remark_his_add();
				}
			});
		}
	}
};
