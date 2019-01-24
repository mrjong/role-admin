import { case_collect_case_list, case_collect_case_list_export } from '@/service/getData';
import formValidateFun from '@/mixin/formValidateFun';
import tablePage from '@/mixin/tablePage';
import qs from 'qs';
import sysDictionary from '@/mixin/sysDictionary';
import util from '@/libs/util';
export default {
	name: 'case_search_page',
	mixins: [ formValidateFun, sysDictionary, tablePage ],
	data() {
		console.log(this.GLOBAL);
		const _this = this;
		return {
			getDirList: [ 'PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL' ],
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
						validator: this.validate_yqts_start,
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
						validator: this.validate_yqts_end,
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
						validator: this.validate_yqyhje_start,
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
						validator: this.validate_yqyhje_end,
						trigger: 'blur'
					}
				]
			},
			pageNo: 1,
			pageSize: 10,
			total: 0,
			formItem: {},
			tableData: [],
			tableColumns: [
				{
					title: '案件编码',
					minWidth: 150,
					key: 'id',
					align: 'center',
					render(h, params) {
						const id = params.row.id;
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
														`${location.origin}/#/case_desc_page?caseNotest=${id}&userIdtest=${params
															.row
															.userId}&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
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
					key: 'prdTyp',
					render: (h, params) => {
						let prdTyp = params.row.prdTyp;
						switch (prdTyp) {
							case '01':
								setTimeout(() => {
									prdTyp = 'huandao';
								}, 3000);
								break;

							default:
								break;
						}
						return h('span', prdTyp);
					}
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
					key: 'device_id'
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
					key: 'lastCurrentCollectResult'
				},

				{
					title: '借款人沟通结果',
					minWidth: 120,
					align: 'center',
					key: 'collectSts'
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
					key: 'lastCntCollectResult'
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
