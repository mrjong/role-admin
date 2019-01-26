import { deduct_list } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
export default {
  name: 'transferMng',
  mixins: [sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 100;
    return {
      getDirList: ['REPAY_ORD_STS', 'PROD_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      productTypeList: [
        {
          value: '01',
          label: '还到'
        },
        {
          value: '02',
          label: '随行付钱包'
        },
        {
          value: '03',
          label: '商户贷'
        }
      ],
      orderStsList: [
        {
          value: 'gbbg',
          label: 'New York'
        }
      ],
      checkStsList:[
        {
          value: '01',
          label: '审核中'
        },
        {
          value: '02',
          label:'审核通过'
        },
        {
          value: '03',
          label:'审核拒绝'
        }
      ],
      modal12: false,
      inputGrid: '',
      modal11: false,
      applyDate: '', //申请日期区间
      formValidate: {},
      ruleValidate: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      checkStartAndEnd:[],
      tableData: [
        {
          prdTyp: '14', //产品线01：还到02：随行付钱包 03：商户贷，调接口
          caseNo:'',// 案件号
          billNo: '1', //账单号
          repayOrdSts: '7', // 订单状态 借口中取
          applayDateLt:'',// 申请日期开始
          applayDateBt:'',// 申请日期结束
          applayNo: '',//申请流水号
        }
      ],
      tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter
        },
        {
          title: '申请流水号',
          searchOperator: '=',
          key: 'billNo',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '代扣订单号',
          searchOperator: 'like',
          key: 'dkorgOrdNo',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '案件编号',
          searchOperator: 'like',
          key: 'userNm',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '账单号',
          searchOperator: 'like',
          key: 'idNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '还款金额',
          searchOperator: 'like',
          key: 'repayOrdAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '还款账户',
          searchOperator: 'like',
          key: 'mblNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '审核状态',
          searchOperator: 'like',
          key: 'mblNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '审核备注',
          searchOperator: 'like',
          key: 'mblNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '订单状态',
          searchOperator: 'like',
          key: 'ordSts',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '代扣订单信息',
          searchOperator: 'like',
          key: 'orgFnlMsg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '代扣通道',
          searchOperator: 'like',
          key: 'rutCopyOrg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '失败原因',
          searchOperator: 'like',
          key: 'rutCopyOrg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '产品名称',
          searchOperator: 'like',
          key: 'rutCopyOrg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '借款期限',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '最后还款日期',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '逾期应还金额',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '客户姓名',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '身份证号',
          searchOperator: 'like',
          key: 'crdAcTyp',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '手机号',
          searchOperator: 'like',
          key: 'crdCorpOrg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '申请时间',
          searchOperator: 'like',
          key: 'crdNoLast',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '申请人',
          searchOperator: 'like',
          key: 'repayOrdPrcp',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '电催中心',
          searchOperator: 'like',
          key: 'acTyp',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '审核人',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '审核日期',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },

        // {
        //   title: '操作',
        //   width: 100,
        //   key: 'edit',
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Poptip',
        //         {
        //           props: {
        //             confirm: true,
        //             title: '您确定要删除这条数据吗?',
        //             transfer: true
        //           },
        //           on: {
        //             'on-ok': () => {
        //               this.deleteGoods(params.row.buffet_id);
        //             }
        //           }
        //         },
        //         [
        //           h(
        //             'a',
        //             {
        //               class: 'edit-btn',
        //               props: {}
        //             },
        //             '删除'
        //           ),
        //           h(
        //             'a',
        //             {
        //               class: 'edit-btn',
        //               props: {}
        //             },
        //             '删除'
        //           )
        //         ]
        //       )
        //     ]);
        //   }
        // }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeApplyDate(val1, val2) {
      this.formValidate.startRepayDate = val1[0];
      this.formValidate.endRepayDate = val1[1];
      console.log('123', this.formValidate);
    },
    changeShouldDate(val1, val2) {
      this.formValidate.startRepayDate = val1[0];
      this.formValidate.endRepayDate = val1[1];
      console.log('123', this.formValidate);
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getList();
        }
      });
    },
    // 获取表格数据
    async getList() {
      let res= await deduct_list({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        //repayOrdTyp: this.repayOrdTyp,
        ...this.formValidate
      })
      console.log(res)
      // 请求成功之后需要做分页处理，然后将拿到的数据进行数据处理，总数目和展示条数

    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formValidate = {};
      this.$refs[name].resetFields();
    }
  }
};
