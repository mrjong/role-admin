import { case_detail_remark_list, // 催收
  case_detail_repay_ord_list, // 回款
  case_detail_user_repay_list, // 用户主动
  case_detail_system_repay_list, // 系统代扣
  case_detail_repay_list
 } from '@/service/getData';

export default {
  name: 'collection_info',
  props: ['queryData', 'caseNo', 'userId'],
  data () {
    return {
      userIdCopy: '',
      // 催收信息
      case_detail_remark_list_spin: false,
      case_detail_remark_list_pageNo: 1,
      case_detail_remark_list_pageSize: 10,
      case_detail_remark_list_total: 0,
      case_detail_remark_list_tableData: [],
      case_detail_remark_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '催收时间',
          align: 'center',
          key: 'remarkDate',
          width: 180,
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
          width: 120,
          key: 'mblNoHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.mblNoHid),
            ]);
          }
        },
        {
          title: '催收姓名',
          align: 'center',
          width: 100,
          key: 'userNmHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.userNmClear),
            ]);
          }
        },
        {
          title: '关系',
          align: 'center',
          width: 100,
          key: 'callUserTypeName'
        },
        {
          title: '经办人',
          align: 'center',
          width: 100,
          key: 'opUserName'
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
          title: '备注',
          align: 'center',
          width: 280,
          key: 'collectRmk',
          tooltip: true,
        },
        {
          title: '通话来源',
          align: 'center',
          width: 100,
          key: 'collectTypeName'
        },
        {
          title: '承诺还款时间',
          align: 'center',
          width: 180,
          key: 'promiseRepayDate',
          render: (h, params) => {
            let promiseRepayDate = params.row.promiseRepayDate;
            promiseRepayDate = promiseRepayDate
              ? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
              : promiseRepayDate;
            return h('span', promiseRepayDate);
          }
        },

      ],

      // 回款信息
      case_detail_repay_ord_list_spin: false,
      case_detail_repay_ord_list_pageNo: 1,
      case_detail_repay_ord_list_pageSize: 10,
      case_detail_repay_ord_list_total: 0,
      case_detail_repay_ord_list_tableData: [],
      case_detail_repay_ord_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '账单号',
          width: 200,
          align: 'center',
          key: 'billNo',
          sortable: true,
          render(h, params) {
            return h('div', [
              h('Tooltip',
                {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    content: params.row.billNo,
                    placement: 'top'
                  }
                },
                [
                  h('span', {
                  }, params.row.billNo)
                ]
              )
            ])
          }
        },
        {
          title: '还款时间',
          align: 'center',
          key: 'repayDate',
          width: 180,
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
          width: 100,
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
          width: 180,
          key: 'crdNoHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.crdNoHid)
            ]);
          }
        }
      ],

      // 用户主动还款
      case_detail_user_repay_list_spin: false,
      case_detail_user_repay_list_pageNo: 1,
      case_detail_user_repay_list_pageSize: 10,
      case_detail_user_repay_list_total: 0,
      case_detail_user_repay_list_tableData: [],
      case_detail_user_repay_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '还款金额',
          align: 'center',
          width: 100,
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
          key: 'ordStsName'
        },
        {
          title: '失败原因',
          align: 'center',
          width: 280,
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
              [h('div', {}, params.row.orgFnlMsg)]
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
          key: 'crdAcTypName'
        },
        {
          title: '还款银行',
          align: 'center',
          width: 100,
          key: 'crdCorpOrgName'
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
      case_detail_system_repay_list_spin: false,
      case_detail_system_repay_list_pageNo: 1,
      case_detail_system_repay_list_pageSize: 10,
      case_detail_system_repay_list_total: 0,
      case_detail_system_repay_list_tableData: [],
      case_detail_system_repay_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '还款金额',
          align: 'center',
          width: 100,
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
          key: 'ordStsName'
        },
        {
          title: '失败原因',
          align: 'center',
          width: 280,
          tooltip: true,
          key: 'orgFnlMsg',
          render: (h, params) => {
            let orgFnlMsg = params.row.orgFnlMsg;
            return h(
              'div', orgFnlMsg
            );
          }
        },
        {
          title: '还款日期',
          align: 'center',
          width: 120,
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
          key: 'crdAcTypName'
        },
        {
          title: '还款银行',
          align: 'center',
          width: 100,
          key: 'crdCorpOrgName'
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
    }
  },
  created () {
  },
  watch: {
    userId(userId) {
      this.userIdCopy = userId;
      this.case_detail_remark_list(); // 催收信息
    }
  },
  methods: {
    // 催收信息
    async case_detail_remark_list() {
      this.case_detail_remark_list_spin = true
      const res = await case_detail_remark_list({
        caseNo: this.caseNo,
        userId: this.userIdCopy,
        pageNum: this.case_detail_remark_list_pageNo,
        pageSize: this.case_detail_remark_list_pageSize
      });
      this.case_detail_remark_list_spin = false
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
      this.case_detail_repay_ord_list_spin = true
      const res = await case_detail_repay_ord_list({
        userId: this.userIdCopy,
        // caseNo: this.caseNo,
        pageNum: this.case_detail_repay_ord_list_pageNo,
        pageSize: this.case_detail_repay_ord_list_pageSize
      });
      this.case_detail_repay_ord_list_spin = false
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
      this.case_detail_user_repay_list_spin = true
      const res = await case_detail_user_repay_list({
        caseNo: this.caseNo,
        userId: this.userIdCopy,
        pageNum: this.case_detail_user_repay_list_pageNo,
        pageSize: this.case_detail_user_repay_list_pageSize
      });
      this.case_detail_user_repay_list_spin = false
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
      this.case_detail_system_repay_list_spin = true
      const res = await case_detail_system_repay_list({
        caseNo: this.caseNo,
        userId: this.userIdCopy,
        pageNum: this.case_detail_system_repay_list_pageNo,
        pageSize: this.case_detail_system_repay_list_pageSize
      });
      this.case_detail_system_repay_list_spin = false
      if (res.code === 1) {
        this.case_detail_system_repay_list_tableData = res.data && res.data.content;
        this.case_detail_system_repay_list_pageSize = res.data.size;
        this.case_detail_system_repay_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // tab 所有点击（除通讯录以外的）
    tabClick(name) {
      this[`${name}_pageNo`] = 1;
      this[name]();
    },
    // 切换每页条数时的回调
    changeSize(pageSize, name) {
      this[name + '_pageSize'] = pageSize;
      this.pageNo = 1;
      this[name]();
    },
    // 页码改变的回调
    changePage(pageNum, name) {
      this[name]();
    },
  },
}
