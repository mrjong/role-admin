import {
	case_collect_case_list,
	case_collect_case_list_export,
	collectcode_getListByCodeType
} from '@/service/getData';
import formValidateFun from '@/mixin/formValidateFun';
import tablePage from '@/mixin/tablePage';
import qs from 'qs';
import sysDictionary from '@/mixin/sysDictionary';
import util from '@/libs/util';
export default {
	name: 'case_search_page',
	mixins: [ formValidateFun, sysDictionary, tablePage ],
	data() {
		const validate_yqts_start = (rule, value, callback) => {
			if (value && this.formItem.maxOverdueDays && Number(value) > Number(this.formItem.maxOverdueDays)) {
				console.log(this.formItem.maxOverdueDays);
				callback(new Error('逾期开始天数不能大于逾期结束天数'));
			} else {
				callback();
			}
		};
		const validate_yqts_end = (rule, value, callback) => {
			if (this.formItem.minOverdueDays) {
				this.$refs.formItem.validateField('minOverdueDays');
			}
			callback();
		};
		const validate_yqyhje_start = (rule, value, callback) => {
			if (value && this.formItem.maxOverdueAmt && Number(value) > Number(this.formItem.maxOverdueAmt)) {
				callback(new Error('开始金额不能大于结束金额'));
			} else {
				callback();
			}
		};
		const validate_yqyhje_end = (rule, value, callback) => {
			if (this.formItem.minOverdueAmt) {
				this.$refs.formItem.validateField('minOverdueAmt');
			}
			callback();
		};
		console.log(this.GLOBAL);
		const _this = this;
		return {
			getDirObj2: {},
			getDirList: [ 'PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'TALK_RESULT' ],
			getDirObj: {},
			showPanel: false,
			showPanel2: false,
			summary: {},
			ruleValidate: {
				// idNo: [
				// 	{
				// 		pattern: this.GLOBAL.idNo,
				// 		message: '请输入正确身份证号',
				// 		trigger: 'blur'
				// 	}
				// ],
				// mblNo: [
				// 	{
				// 		pattern: this.GLOBAL.mblNo,
				// 		message: '请输入正确手机号',
				// 		trigger: 'blur'
				// 	}
				// ],
				minOverdueDays: [
					{
						pattern: this.GLOBAL.num,
						message: '逾期天数为正整数',
						trigger: 'blur'
					},
					{
						validator: validate_yqts_start,
						trigger: 'blur'
					}
				],
				maxOverdueDays: [
					{
						pattern: this.GLOBAL.num,
						message: '逾期天数为正整数',
						trigger: 'blur'
					},
					{
						validator: validate_yqts_end,
						trigger: 'blur'
					}
				],
				minOverdueAmt: [
					{
						pattern: this.GLOBAL.money,
						message: '金额格式不正确',
						trigger: 'blur'
					},
					{
						validator: validate_yqyhje_start,
						trigger: 'blur'
					}
				],
				maxOverdueAmt: [
					{
						pattern: this.GLOBAL.money,
						message: '金额格式不正确',
						trigger: 'blur'
					},
					{
						validator: validate_yqyhje_end,
						trigger: 'blur'
					}
				]
			},
			pageNo: 1,
			pageSize: 10,
			total: 0,
			formItem: {
        prdTyp: [],
        perdCnt: [],
        creditLevel: [],
      },
			tableData: [],
			tableColumns: [
				{
					title: '案件编码',
					minWidth: 150,
					key: 'id',
					align: 'center',
					render(h, params) {
						const id = params.row.id;
						const prdTyp = params.row.prdTyp;
						const userId = params.row.userId;
						let seatType = sessionStorage.getItem('seatType');
						return h('div', [
							h(
								'Tooltip',
								{
									style: {
										margin: '0 5px'
									},
									props: {
										content: '查看详情',
										placement: 'top'
									}
								},
								[
									h(
										'a',
										{
											class: 'edit-desc',
											on: {
												click: () => {
													window.open(
														`${location.origin}/#/case_desc_page?caseNotest=${id}&prdTyptest=${prdTyp}&userIdtest=${userId}&seatType=${seatType
															? seatType
															: 'KT'}&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
															_this.formItem
														)}`
													);
												}
											}
										},
										params.row.id
									)
								]
							)
						]);
					}
				},
				{
					title: '客户姓名',
					minWidth: 60,
					align: 'center',
					key: 'userNmHid'
				},
				{
					title: '身份证号',
					minWidth: 150,
					align: 'center',
					key: 'idNoHid'
				},
				{
					title: '手机号',
					minWidth: 100,
					align: 'center',
					key: 'mblNoHid'
				},
				{
					title: '产品线',
					minWidth: 120,
					align: 'center',
					key: 'prdName'
				},
				{
					title: '账单号',
					minWidth: 180,
					align: 'center',
					key: 'billNo'
				},

				{
					title: '逾期金额',
					minWidth: 120,
					sortable: true,
					align: 'center',
					key: 'overdueAmt',
					render: (h, params) => {
						let overdueAmt = params.row.overdueAmt;
						overdueAmt = overdueAmt ? this.$options.filters['money'](overdueAmt) : overdueAmt;
						return h('span', overdueAmt);
					}
				},
				{
					title: '逾期天数',
					minWidth: 100,
					sortable: true,
					align: 'center',
					key: 'overdueDays'
				},
				{
					title: '到期期数',
					minWidth: 100,
					sortable: true,
					align: 'center',
					key: 'maxPerdCnt'
				},
				{
					title: '身份证属地',
					minWidth: 200,
					align: 'center',
					key: 'idAddr'
				},

				{
					title: '信用级别',
					minWidth: 120,
					sortable: true,
					align: 'center',
					key: 'creditLevel'
				},
				{
					title: '分配时间',
					minWidth: 150,
					sortable: true,
					align: 'center',
					key: 'allotDate',
					render: (h, params) => {
						let allotDate = params.row.allotDate;
						allotDate = allotDate
							? this.$options.filters['formatDate'](allotDate, 'YYYY-MM-DD HH:mm:ss')
							: allotDate;
						return h('span', allotDate);
					}
				},
				{
					title: '最后催收时间',
					minWidth: 150,
					align: 'center',
					key: 'lastCollectDate',
					render: (h, params) => {
						let lastCollectDate = params.row.lastCollectDate;
						lastCollectDate = lastCollectDate
							? this.$options.filters['formatDate'](lastCollectDate, 'YYYY-MM-DD HH:mm:ss')
							: lastCollectDate;
						return h('span', lastCollectDate);
					}
				},
				{
					title: '借款人拨打状态',
					minWidth: 120,
					align: 'center',
					key: 'lastCurrentCollectResultName'
				},

				{
					title: '借款人沟通结果',
					minWidth: 120,
					align: 'center',
					key: 'collectStsName'
				},
				{
					title: '承诺还款时间',
					minWidth: 130,
					sortable: true,
					align: 'center',
					key: 'promiseRepayDate',
					render: (h, params) => {
						let promiseRepayDate = params.row.promiseRepayDate;
						promiseRepayDate = promiseRepayDate
							? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD HH:mm:ss')
							: promiseRepayDate;
						return h('span', promiseRepayDate);
					}
				},
				{
					title: '紧急联系人拨打状态',
					minWidth: 120,
					align: 'center',
					key: 'lastCntCollectResultName'
				},
				{
					title: '是否提交仲裁',
					minWidth: 120,
					align: 'center',
					key: 'isSubmit',
					render: (h, params) => {
						let isSubmit = params.row.isSubmit;
						isSubmit = isSubmit ? this.$options.filters['isSubmit'](isSubmit) : '否';
						return h('span', isSubmit);
					}
				}
			]
		};
	},
	created() {
		this.getList();
		// 沟通状态
		this.collectcode_getListByCodeType();
	},
	methods: {
		// 获取表格数据
		async getList() {
			const res = await case_collect_case_list({
				...this.formItem,
				pageSize: this.pageSize,
				pageNum: this.pageNo
			});
			if (res.code === 1) {
				this.tableData = res.data.page.content;
				this.pageSize = res.data.page.size;
				this.total = res.data.page.totalElements;
				this.summary = res.data.summary;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 沟通状态
		async collectcode_getListByCodeType() {
			const res = await collectcode_getListByCodeType({
				codeType: 'TALK_RESULT'
			});
			if (res.code === 1) {
				this.getDirObj2 = res.data;
			} else {
				this.$Message.error(res.message);
			}
		},

		// 获取表格数据
		async case_collect_case_list_export() {
			const res = await case_collect_case_list_export(
				{
					...this.formItem
				},
				{
					responseType: 'blob'
				}
			);
			util.dowloadfile('我的案件', res);
		}
	}
};
