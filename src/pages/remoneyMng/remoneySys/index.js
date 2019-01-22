import { repay_repayUserOrSystem_list } from '@/service/getData';
export default {
  name: 'remoney_user',
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 100;
    return {
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
      rutTypeList: [
        {
          value: '01',
          label: '11'
        },
        {
          value: '02',
          label: '22'
        },
        {
          value: '03',
          label: '33'
        }
      ], //代扣类型
      modal12: false,
      inputGrid: '',
      modal11: false,
      startAndend: '', //还款日期区间
      formValidate: {
        // 查询接口时候所需的参数值传递
        billNo: '', //账单号,
        dkorgOrdNo: '', // string 代扣订单号,
        usrNm: '', // 用户姓名,
        mblNo: '', // 手机号,
        ordSts: '', // 订单状态 借口中取,
        orgFnlMsg: '', //失败原因,
        ordDt: '', // 还款时间,
        prdTyp: '', //产品线01：还到02：随行付钱包 03：商户贷，调接口,
        rutCopyOrg: '', // 代扣通道,
        startRepayDate: '', //起始时间段
        endRepayDate: '', // 结束时间段
        //nametwo: '', //此处的名称必须要与 ruleValidate的里面具体的校验规则名称完全的保持一致性，不然会出现校验bug
      },
      ruleValidate: {
        //ruleValidate添加表单的校验规则，用来提示用户的输入法则，具体使用在表单里面 ：rule='ruleValidate'直接使用即可
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
      total: 100,
      repayOrdTyp: 'SR', //区分用户主动还款、系统代扣还款，UR：用户主动还款，SR：系统代扣还款
      tableData: [
        {
          billNo: '1', //账单号
          dkorgOrdNo: '2', // string 代扣订单号
          usrNmHid: '3', // 用户姓名
          idNoHid: '4', // 身份证号
          mblNoHid: '5', // 手机号
          repayOrdAmt: '6', //还款金额
          ordSts: '7', // 订单状态 借口中取
          orgFnlMsg: '8', //失败原因,
          ordDt: '9', // 还款时间,
          crdAcTyp: '10', //卡类型
          crdCorpOrg: '11', // 还款银行
          crdNoLast: '12', //还款银行四位
          repayOrdPrcp: '13', // 已还本金
          prdTyp: '14', //产品线01：还到02：随行付钱包 03：商户贷，调接口
          rutCopyOrg: '15' // 代扣类型
        },
      ],
      tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter
        },
        {
          title: '序号',
          type: 'index',
          width: 60,
          searchOperator: '=',
          align: alignCenter,
          key: 'buffet_id'
        },
        {
          title: '账单号',
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
          title: '客户姓名',
          searchOperator: 'like',
          key: 'usrNmHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '身份证号',
          searchOperator: 'like',
          key: 'idNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '手机号',
          searchOperator: 'like',
          key: 'mblNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
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
          title: '订单状态',
          searchOperator: 'like',
          key: 'ordSts',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '失败原因',
          searchOperator: 'like',
          key: 'orgFnlMsg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '还款日期',
          searchOperator: 'like',
          key: 'ordDt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '卡类型',
          searchOperator: 'like',
          key: 'crdAcTyp',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '还款银行',
          searchOperator: 'like',
          key: 'crdCorpOrg',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '还款银行卡后四位',
          searchOperator: 'like',
          key: 'crdNoLast',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '已还本金',
          searchOperator: 'like',
          key: 'repayOrdPrcp',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '产品类型',
          searchOperator: 'like',
          key: 'prdTyp',
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
        }

      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDange(val1, val2) {
      this.formValidate.startRepayDate = val1[0];
      this.formValidate.endRepayDate = val1[1];
      console.log('123', this.formValidate);

      //this.formValidate.startAndend[1].Date('yyyy-MM-dd');
    },
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo,'当前的页码数量值');
      this.pageNo = pageNo;

      //this.getList();
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
      let res= await repay_repayUserOrSystem_list({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        repayOrdTyp: this.repayOrdTyp,
        ...this.formValidate
      })
      console.log(res)
      // 试着处理数据和分页组件之间的关系,
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formValidate = {};
      this.$refs[name].resetFields();
    }
  }
};
