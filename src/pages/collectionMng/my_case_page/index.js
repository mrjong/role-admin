import { case_collect_case_list } from '@/service/getData';
import formValidateFun from '@/mixin/formValidateFun';
import tablePage from '@/mixin/tablePage';
import sysDictionary from '@/mixin/sysDictionary';
export default {
	name: 'case_search_page',
	mixins: [ formValidateFun, sysDictionary, tablePage ],
	data() {
		console.log(this.GLOBAL);

		return {
			getDirList: [ 'PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL' ],
			getDirObj: {},
			showPanel: false,
			showPanel2: false,
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
			formItem: {},
			tableData: [],
			tableColumns: [
				{
					title: '案件编码',
					minWidth: 150,
					key: 'id',
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
													window.open(`${location.origin}/#/case_desc`);
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
					key: 'userNmHid'
				},
				{
					title: '身份证号',
					minWidth: 150,
					key: 'idNoHid'
				},
				{
					title: '手机号',
					minWidth: 100,
					key: 'mblNoHid'
				},
				{
					title: '产品线',
					minWidth: 120,
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
					key: 'billNo'
				},

				{
					title: '逾期金额',
					minWidth: 120,
					key: 'overdueAmt'
				},
				{
					title: '逾期天数',
					minWidth: 100,
					key: 'overdueDays'
				},
				{
					title: '到期期数',
					minWidth: 60,
					key: 'maxPerdCnt'
				},
				{
					title: '身份证属地',
					minWidth: 200,
					key: 'device_id'
				},

				{
					title: '信用级别',
					minWidth: 120,
					key: 'creditLevel'
				},
				{
					title: '分配时间',
					minWidth: 150,
					sortable: true,
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
					key: 'lastCurrentCollectResult'
				},

				{
					title: '借款人沟通结果',
					minWidth: 120,
					key: 'collectSts'
				},
				{
					title: '承诺还款时间',
					minWidth: 100,
					sortable: true,
					key: 'promiseRepayDate'
				},
				{
					title: '紧急联系人拨打状态',
					minWidth: 120,
					key: 'lastCntCollectResult'
				},
				{
					title: '是否提交仲裁',
					minWidth: 120,
					key: 'isSubmit'
				}
				// {
				// 	title: '操作',
				// 	minWidth: 100,
				// 	key: 'edit',
				// 	render: (h, params) => {
				// 		return h('div', [
				// 			h(
				// 				'Poptip',
				// 				{
				// 					props: {
				// 						confirm: true,
				// 						title: '您确定要删除这条数据吗?',
				// 						transfer: true
				// 					},
				// 					on: {
				// 						'on-ok': () => {
				// 							this.deleteGoods(params.row.buffet_id);
				// 						}
				// 					}
				// 				},
				// 				[
				// 					h(
				// 						'a',
				// 						{
				// 							class: 'edit-btn',
				// 							props: {}
				// 						},
				// 						'删除'
				// 					),
				// 					h(
				// 						'a',
				// 						{
				// 							class: 'edit-btn',
				// 							props: {}
				// 						},
				// 						'删除'
				// 					)
				// 				]
				// 			)
				// 		]);
				// 	}
				// }
			]
		};
	},
	created() {
		this.getList();
	},
	methods: {
		// 获取表格数据
		async getList() {
			const res = await case_collect_case_list();
			if (res.code === 1) {
				this.tableData = res.data.page.content;
				this.pageSize = res.data.page.size;
				this.total = res.data.page.totalElements;
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
