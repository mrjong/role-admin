import { arb_check, arb_operateRecord, arb_detail, repay_repayDetail_list} from '@/service/getData'

export default {
  model: {
    prop: 'model',
    event: 'passBack'
  },
  props: {
    model: Boolean,
    edit_flag: Boolean,
    arbitrament_data: {},
  },
  data() {
    return {
      arb_detail_data: {},//详情信息
      shenheObj: {},
      showModalType: '',
      reject_modal: false,//驳回modal
      recoverFormItem: {},//驳回表单
      reject_loading: false,//驳回loading
      audit_loading: false,
      show_table: false,// 是否显示table
      imgName: '',//img  name
      visible: false,// img modal
      reject_ruleValidate: {
        approvalRemark: [
          {
            required: true,
            message: '请输入驳回原因',
            trigger: 'blur'
          }
        ]
      },//驳回校验
      prefix: '/admin/arb/images/',
      // 操作记录
      case_detail_remark_list_tableData: [],
      case_detail_remark_list_pageNo: 1,
      case_detail_remark_list_pageSize: 10,
      case_detail_remark_list_total: 0,
      case_detail_remark_list_tableColumns: [
        {
          title: '操作人',
          align: 'center',
          key: 'approvalName',
          width: 100,
        },
        {
          title: '操作时间',
          align: 'center',
          key: 'approvalTime',
          width: 150,
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
          key: 'approvalStateName',
          width: 170,
          tooltip: true,
        },
        {
          title: '备注',
          align: 'center',
          width: 170,
          key: 'approvalRmk',
          tooltip: true,
          render: (h, params) => {
            let approvalRmk = params.row.approvalRmk;
            return h('div', approvalRmk)
          }
        }
      ],
      // 汇款记录
      returned_money_list_tableData: [],//data数据
      returned_money_list_tableColumns: [
        {
          title: '序号',
          align: 'center',
          key: 'approvalName',
          width: 90,
          type: 'index'
        },
        {
          title: '还款时间',
          align: 'center',
          key: 'repayDate',
          width: 150,
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
          key: 'repayAmt',
          width: 80,
        },
        {
          title: '还款期数',
          align: 'center',
          key: 'perdCnt',
          width: 70,
        },
        {
          title: '还款状态',
          align: 'center',
          key: 'payOffStsName',
          width: 100,
        },
        {
          title: '还款方式',
          align: 'center',
          key: 'repayOrdTypName',
          width: 100,
        },
      ],//表头
    }
  },
  async created () {
   this.arb_detail(this.arbitrament_data.data, this.arbitrament_data.edit);
  },
  methods: {
    del() {
      // this.reject_modal = false;
      // this.shenheObj = {};
      // this.arbitrament_modal = false;
      // this.showModalType = '';
      this.$emit('passBack', { flag: false });
    },
    handleSubmit() {
      this.$refs.formItem.validate((valid) => {
        if (valid) {
        } else {
          this.arbitrament_modal = true;
        }
      });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
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
    // 驳回
    rejectFunc() {
      this.arbitrament_modal = false;
      this.reject_modal = true;
    },
    // 驳回校验
    arb_checkTest() {
      this.$refs.recoverFormItem.validate((valid) => {
        if (valid) {
          this.arb_check('03');
        }
      });
    },
    // 查看详情
    async arb_detail(obj, type) {
      // this.del()
      const res = await arb_detail({
        approvalId: obj.approvalId
      });
      if (res.code === 1) {
        this.shenheObj = obj;
        this.repay_repayDetail_list();
        if (type === 'edit') {
          this.showModalType = 'edit';
        } else {
          this.case_detail_remark_list_pageNo = 1;
          this.arb_operateRecord();
        }
        this.arb_detail_data = res.data;
      } else {
        this.shenheObj = {};
        this.$Message.error(res.message);
      }
    },
    // 获取操作明细数据
    async arb_operateRecord() {
      const res = await arb_operateRecord({
        caseNo: this.shenheObj.caseNo,
        pageNum: this.case_detail_remark_list_pageNo,
        pageSize: 20,
      });
      if (res.code === 1) {
        this.show_table = this.arbitrament_data.edit === 'edit'? false: true;
        this.case_detail_remark_list_tableData = res.data && res.data.content;
        this.case_detail_remark_list_pageSize = res.data.size;
        this.case_detail_remark_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取回款记录数据
    async repay_repayDetail_list() {
      let startRepayDate = this.$options.filters['formatDate'](this.arbitrament_data.data.createTime, 'YYYY-MM-DD')
      const res = await repay_repayDetail_list({
        caseNo: this.shenheObj.caseNo,
        different: true,
        pageSize: 20,
        startRepayDate: startRepayDate
      });
      console.log(res);
      if (res.data && res.code === 1) {
        this.returned_money_list_tableData = res.data.page.content;
      } else {
        this.$Message.error('获取回款记录异常')
      }
    },
    // 审核
    async arb_check(type) {
      if (type === '03') {
        this.reject_loading = true;
      } else if (type === '02') {
        this.audit_loading = true;
      }
      const res = await arb_check({
        approvalRemark: type === '03'? this.recoverFormItem.approvalRemark: null,
        approvalState: type,
        approvalId: this.shenheObj.approvalId,
        caseNo: this.shenheObj.caseNo,
        billNo: this.shenheObj.billNo
      });
      this.audit_loading = false;
      this.reject_loading = false;
      if (res.code === 1) {
        this.arbitrament_modal = false;
        this.reject_modal = false;
        this.$Message.success('操作成功！');
        this.recoverFormItem = {};
        setTimeout(() => {
          this.$emit('passBack', { flag: true });
        }, 1500);
      } else {
        this.$Message.error(res.message);
      }
    },
  },
}
