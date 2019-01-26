import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { case_collect_collect_list, case_collect_tape_download } from '@/service/getData';
import tablePage from '@/mixin/tablePage';

export default {
	name: 'case_search_page',
	mixins: [ tablePage, formValidateFun, sysDictionary ],
	data() {
		console.log(this.GLOBAL);
		return {
			getDirList: [ 'PROD_TYPE' ],
			getDirObj: {},
			showPanel: false,
			productLineList: [],
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
					title: '序号',
					width: 80,
					type: 'index',
					align: 'center'
                },
                {
					title: '关联录音',
					width: 120,
					searchOperator: '=',
					key: 'buffet_code',
					render: (h, params) => {
						const uuid = params.row.uuid;
						return h('span', uuid ? '播放' : '');
					}
				},
				{
					title: '催收时间',
					width: 150,
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
					title: '客户姓名',
					width: 120,
					key: 'userNmHid'
				},
				{
					title: '关系',
					key: 'callUserTypeName'
				},
				{
					title: '催收电话',
					width: 150,
					key: 'mblNoHid'
				},
				{
					title: '拨打状态',
					width: 120,
					key: 'collectResultName'
				},
				{
					title: '沟通结果',
					key: 'communicateResultName'
				},

				{
					title: '承诺还款时间',
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
					title: '经办人',
					width: 120,
					key: 'opUserName'
				},
				{
					title: '案件编码',
					searchOperator: '=',
					key: 'caseNo'
				},
				{
					title: '账单号',
					width: 180,
					sortable: true,
					key: 'billNo'
				},
				{
					title: '催收期数',
					width: 120,
					key: 'perdCount'
				},
		
				{
					title: '客户身份证号',
					key: 'idNoHid'
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
			]
		};
	},
	created() {
		this.getList();
	},
	methods: {
		// 获取表格数据
		async case_collect_tape_download() {
			const res = await case_collect_tape_download(
				{
					...this.formItem
				},
				{
					responseType: 'blob'
				}
			);
			util.dowloadfile('催收记录', res);
		},
		async getList() {
			const res = await case_collect_collect_list();
			if (res.code === 1) {
				this.tableData = res.data.content;
				console.log(res);
			} else {
				this.$Message.error(res.message);
			}
		}
	}
};
