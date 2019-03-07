import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import dayjs from 'dayjs';
import zhongcai from '@/components/caseDesc/zhongcai.vue';

import { arb_operateRecord, arb_myArbList, arb_detail, arb_check } from '@/service/getData';
export default {
	name: 'case_search_page',
	mixins: [ formValidateFun, sysDictionary ],
	components: {
		zhongcai
	},
	data() {
		console.log(this.GLOBAL);
		const _this = this;
		return {
            modal: {
				zhongcai: false
            },
            zhongcai_set_data: {},
			getDirList: [ 'PROD_TYPE', 'GENDER', 'APPROVAL_STATE','NATION' ],
			getDirObj: {},
			showPanel: false,
			prefix: '/admin/arb/images/',
			arb_detail_data: {},
			showPanel2: false,
			showModalType: '',
      shenheObj: {},
      query: false,//查询权限
      update: false,//编辑权限
      update_loading: false,//编辑按钮loading
      query_loading: false,//查询按钮loading
			case_detail_remark_list_tableData: [],
			case_detail_remark_list_pageNo: 1,
			case_detail_remark_list_pageSize: 10,
			case_detail_remark_list_total: 0,
			case_detail_remark_list_tableColumns: [
				{
					title: '操作人',
					align: 'center',
					key: 'approvalName'
				},
				{
					title: '操作时间',
					align: 'center',
					key: 'approvalTime',
					width: 200,
					render: (h, params) => {
						let approvalTime = params.row.approvalTime;
						approvalTime = approvalTime
							? this.$options.filters['formatDate'](approvalTime, 'YYYY-MM-DD HH:mm:ss')
							: approvalTime;
						return h('span', approvalTime);
					}
				},
				{
					title: '操作',
					align: 'center',
					key: 'approvalStateName'
				},
				{
					title: '备注',
					align: 'center',
					width: 400,
					key: 'approvalRmk',
					render: (h, params) => {
            let approvalRmk = params.row.approvalRmk;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: approvalRmk,
                    placement: 'top',
                    maxWidth: "380",
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '380px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, approvalRmk)]
              ),
            ])
					}
				}
			],
			recoverFormItem: {},
			showModal2: false,
			showModal1: false,
			ruleValidate2: {
				approvalRemark: [
					{
						required: true,
						message: '请输入驳回原因',
						trigger: 'blur'
					}
				]
			},
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
			imgName: '',
			visible: false,
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
			formItem: {
				productTypes: []
			},
			tableData: [],
			tableColumns: [
				{
					title: '操作',
					width: 150,
					key: 'edit',
					align: 'center',
					fixed: 'left',
					render: (h, params) => {
						return h('div', [
							h(
								'a',
								{
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
											_this.arb_detail(params.row);
										}
									}
								},
								'查看'
							),
							h(
								'a',
								{
									style: {
										display: params.row.approvalState === '03' ? 'inline-block' : 'none'
									},
									class: 'edit-btn',
									props: {},
									on: {
										click: () => {
                      if (!_this.update) {
                        _this.$Message.error('很抱歉，暂无编辑权限');
                        return;
                      }
											_this.arb_detail(params.row, 'edit');
										}
									}
								},
								'编辑'
							)
						]);
					}
				},
				{
					title: '案件状态',
					width: 120,
					align: 'center',
					key: 'approvalStateName'
				},
				{
					title: '案件编号',
					width: 180,
					align: 'center',
					key: 'caseNo'
				},
				{
					title: '账单号',
					width: 200,
					align: 'center',
					key: 'billNo'
				},
				{
					title: '产品名称',
					width: 120,
					align: 'center',
					key: 'productName'
				},

				{
					title: '借款期限',
					width: 120,
					align: 'center',
					key: 'perdCnt'
				},
				{
					title: '客户姓名',
					width: 120,
					align: 'center',
					key: 'userNameHid'
				},
				{
					title: '身份证号',
					width: 120,
					align: 'center',
					key: 'idCardNoHid'
				},
				{
					title: '手机号',
					width: 120,
					align: 'center',
					key: 'mblNo'
				},
				{
					title: '逾期天数',
					width: 120,
					align: 'center',
					key: 'overdueDays'
				},
				{
					title: '逾期应还金额',
					width: 120,
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
					width: 120,
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
					width: 120,
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
					width: 150,
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
					width: 120,
					align: 'center',
					key: 'opUserName'
				},
				{
					title: '电催中心',
					width: 120,
					align: 'center',
					key: 'opCompayName'
				},
				{
					title: '审核人',
					width: 120,
					align: 'center',
					key: 'approvalUserName'
				},
				{
					title: '审核时间',
					width: 150,
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
					width: 120,
					align: 'center',
					key: 'approvalRemark',
					render: (h, params) => {
						let approvalRemark = params.row.approvalRemark;
						return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: approvalRemark,
                    placement: 'top',
                    maxWidth: "110",
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '110px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, approvalRemark)]
              ),
            ]);
					}
				}
			]
		};
	},
	created() {
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        case "update": this.update = true;
          break;
      }
    });
    // this.$nextTick(() => {
    //   document.oncontextmenu = new Function("event.returnValue=false");
    // });
		// this.getList();
	},
	methods: {
        passBack(type) {
            this.modal[type] = false;
            this.del()
            this.pageNo = 1;
            this.getList()
		},
		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		// 获取表格数据
		async arb_operateRecord() {
			const res = await arb_operateRecord({
				caseNo: this.shenheObj.caseNo,
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
		// 查看详情
		async arb_detail(obj, type) {
            this.del()
			const res = await arb_detail({
				approvalId: obj.approvalId
			});
			if (res.code === 1) {
				this.shenheObj = obj;
				if (type === 'edit') {
					this.showModalType = 'edit';
				} else {
					this.case_detail_remark_list_pageNo = 1;
					this.arb_operateRecord();
				}
                this.arb_detail_data = res.data;
                if(type==='edit'){
                    this.zhongcai_set_data = {
                        idNoHid: res.data.idCardNoHid,
                        billNo: res.data.billNo,
                        userNmHid: res.data.userNameHid,
                        caseNo: res.data.caseNo,
                        voucherNo:res.data.voucherNo,
                        idAddress:res.data.idAddress,
                        userGender: res.data.userGender,
                        userNation: res.data.userNation,
                        idCardFront:res.data.idCardFront,
                        idCardOpposite:res.data.idCardOpposite,
                        voucherImg:res.data.voucherImg,
                        standImg:res.data.standImg,
                        routertype:'my_zhongcai',
                        standAgreeDate:res.data.standAgreeDate
                    };
                this.modal['zhongcai'] = true;
                }else{
                this.showModal1 = true;
                }

			} else {
				this.shenheObj = {};
				this.$Message.error(res.message);
			}
		},
		rejectFunc() {
			this.showModal1 = false;
			this.showModal2 = true;
		},
		arb_checkTest() {
			this.$refs.recoverFormItem.validate((valid) => {
				if (valid) {
					this.arb_check('03');
				}
			});
		},
		// 审核
		async arb_check(type) {
			let approvalRemark = '';
			if (type === '03') {
				approvalRemark = this.recoverFormItem.approvalRemark;
			} else if (type === '02') {
				approvalRemark = '仲裁审核通过';
			}
			const res = await arb_check({
				approvalRemark,
				approvalState: type,
				approvalId: this.shenheObj.approvalId,
				caseNo: this.shenheObj.caseNo,
				billNo: this.shenheObj.billNo
			});
			if (res.code === 1) {
				this.showModal1 = false;
				this.showModal2 = false;
				this.$Message.success('操作成功！');
				this.recoverFormItem = {};
				setTimeout(() => {
                    this.pageNo = 1
					this.getList();
                }, 2000);
                this.del()
			} else {
				this.$Message.error(res.message);
			}
		},
		handleSubmit1() {
			this.$refs.formItem.validate((valid) => {
				if (valid) {
				} else {
					this.showModal1 = true;
				}
			});
		},
		del() {
			this.showModal2 = false;
			this.shenheObj = {};
			this.showModal1 = false;
			this.showModalType = '';
		},
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
		// 页码改变的回调
		changePage_remark(pageNo) {
			this.case_detail_remark_list_pageNo = pageNo;
			this.arb_operateRecord();
		},
		// 切换每页条数时的回调
		changeSize_remark(pageSize) {
			this.case_detail_remark_list_pageSize = pageSize;
			this.case_detail_remark_list_pageNo = 1;
			this.arb_operateRecord();
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.getList();
				}
			});
		},
		// 获取表格数据
		async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      };
      this.query_loading = true;
			let applyTimeLt = '',
				applyTimeBt = '';
      if (this.formItem.applyTimeLt && this.formItem.applyTimeLt.length > 0) {
				applyTimeLt = this.formItem.applyTimeLt[0]
					? dayjs(this.formItem.applyTimeLt[0]).format('YYYY-MM-DD')
					: '';
				applyTimeBt = this.formItem.applyTimeLt[1]
					? dayjs(this.formItem.applyTimeLt[1]).format('YYYY-MM-DD')
					: '';
			}
			let approvalTimeLt = '',
				approvalTimeBt = '';
			if (this.formItem.approvalTimeLt && this.formItem.approvalTimeLt.length > 0) {
				approvalTimeLt = this.formItem.approvalTimeLt[0]
					? dayjs(this.formItem.approvalTimeLt[0]).format('YYYY-MM-DD')
					: '';
				approvalTimeBt = this.formItem.approvalTimeLt[1]
					? dayjs(this.formItem.approvalTimeLt[1]).format('YYYY-MM-DD')
					: '';
			}
			// delete this.formItem.approvalTimeLt;
			// delete this.formItem.applyTimeLt;
			const res = await arb_myArbList({
				...this.formItem,
				applyTimeLt,
				approvalTimeLt,
				approvalTimeBt,
				applyTimeBt,
				pageNum: this.pageNo,
				pageSize: this.pageSize
      });
      this.query_loading = false;
			if (res.code === 1) {
				this.tableData = res.data.content;
				this.total = res.data.totalElements;
				this.pageNo = res.data.number;
			} else {
				this.$Message.error(res.message);
			}
		},
		// 重置
		clearForm(name) {
			this.pageNo = 1;
			this.formItem = {
				productTypes: []
			};
			this.$refs[name].resetFields();
		}
	}
};
