import { repay_repayDetail_list, repay_repayDetail_exportDown } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
import util from '@/libs/util';
export default {
  name: 'remoney_detail',
  mixins: [sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 100;
    let $this = this;
    return {
      getDirList: ['PAY_OFF_STS' ],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      opCompanyNameList: [
        {
          value: '01',
          label: '还到z中心'
        },
        {
          value: '02',
          label: '随行付钱包中心'
        },
        {
          value: '03',
          label: '商户贷中心'
        }
      ],
      startRepayDateRange: '', //实际还款日期区间
      shouldRepayDate: '',
      summary:{},
      formValidate: {
        startRepayDate : '', // 实际还款起始日期
        endRepayDate: '', //实际还款结束日期
        startDueDate: "" , //应还款日期起始
        endDueDate:'',// 应还款日期结束
        caseNo:'', // 案件编码
        billNo: '', //账单号
        opUserName: '', //经办人
        opCompanyName: '', // 电催中心,
        userNm: '', //客户姓名
        payOffSts: '',// 还款状态
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
      total: 10,
      tableData: [
        // {
        //   caseNo:'', //案件编号
        //   billNo: '', // 账单号
        //   repayAmt:'', // 还款金额
        //   repayOrdTypName: '', // 还款方式
        //   payOffStsName:'', // 还款状态
        //   overdueDays: '',//逾期天数
        //   perdCnt: '',// 还款期数
        //   prdTypName:'',//产品线
        //   userNmHid:'',//客户姓名
        //   idNoHid:'',//身份证号
        //   mblNoHid:'',//手机号
        //   repayDate:'',//实际还款时间
        //   dueDate:'',//应该混款时间
        //   allotDate:'',//分配时间
        //   opCompayName:'',//电催中心
        //   opUserName:'',//经办人
        // },
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
          key: 'listIndex'
        },
        {
          title: '案件编号',
          searchOperator: '=',
          key: 'caseNo',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
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
          title: '还款金额',
          searchOperator: 'like',
          key: 'repayAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render(h,params){
            let res = params.row.repayAmt;
            res = res ? $this.$options.filters['money'](res) : res;
            return h('span',res);
          }
        },
        {
          title: '还款方式',
          key: 'repayOrdTypName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render(h,params){
            const row = params.row;
            const res = row.repayOrdTypName === 'UR' ? '用户主动还款': '系统代扣';
            console.log(row,'nmnnmnmnm');
            return h('span',res);
          }
        },
        {
          title: '还款状态',
          key: 'payOffStsName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render(h,params){
            const row = params.row;
            const res = row.payOffStsName === 'UR' ? '用户主动还款': row.payOffStsName;
            console.log(row,'nmnnmnmnm');
            return h('span',res);
          }
        },
        {
          title: '逾期天数',
          searchOperator: 'like',
          key: 'overdueDays',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '还款期数',
          searchOperator: 'like',
          key: 'perdCnt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '产品线',
          searchOperator: 'like',
          key: 'prdTypName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render(h,params){
            const row = params.row;
            const prdTyp = row.prdTypName === '01' ? '还到': row.prdTypName === '02' ? '随行付钱包': '商户贷';
            return h('span', prdTyp);
          }
        },
        {
          title: '客户姓名',
          searchOperator: 'like',
          key: 'userNmHid',
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
          width: widthVal
        },
        {
          title: '实际还款时间',
          searchOperator: 'like',
          key: 'repayDate',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let lastDate = params.row.repayDate;
            lastDate = lastDate
              ? this.$options.filters['formatDate'](lastDate, 'YYYY-MM-DD HH:mm:ss')
              : lastDate;
            return h('span', lastDate);
          },
        },
        {
          title: '应还款时间',
          searchOperator: 'like',
          key: 'dueDate',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let lastDate = params.row.dueDate;
            lastDate = lastDate
              ? this.$options.filters['formatDate'](lastDate, 'YYYY-MM-DD HH:mm:ss')
              : lastDate;
            return h('span', lastDate);
          },
        },
        {
          title: '分配时间',
          searchOperator: 'like',
          key: 'allotDate',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let lastDate = params.row.allotDate;
            lastDate = lastDate
              ? this.$options.filters['formatDate'](lastDate, 'YYYY-MM-DD HH:mm:ss')
              : lastDate;
            return h('span', lastDate);
          },
        },
        {
          title: '电催中心',
          searchOperator: 'like',
          key: 'opCompayName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '经办人',
          searchOperator: 'like',
          key: 'opUserName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
      ]
    };
  },
  created() {
    //this.getList();
  },
  methods: {
    // 导出数据
    async exportData(){
      const res= await repay_repayDetail_exportDown({
        ...this.formValidate
      });
      util.dowloadfile('回款明细', res);
    },
    // 改变日期区间的格式之后进行处理
    changeActDate(val1, val2) {
      console.log(val1,val2);
      this.formValidate.startRepayDate = val1[0];
      this.formValidate.endRepayDate = val1[1];
      console.log('123', this.formValidate);

      //this.formValidate.startAndend[1].Date('yyyy-MM-dd');
    },
    changeDueDate(val1,val2){
      this.formValidate.startDueDate = val1[0];
      this.formValidate.endDueDate = val1[1];
    },
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo,'当前的页码数量值');
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
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 获取表格数据
    async getList() {
      let res= await repay_repayDetail_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formValidate
      })
      if(res && res.code === 1){
        this.$Message.success('请求成功!');
        let data = res.data;
        this.tableData = data.page.content;
        this.total = data.page.totalElements //接口中在该条件下取得的数据量
        this.summary = data.summary;
        data.page.size // 数据的大小
        //data.page.numberOfElements  当前页面实际返回的数量
      } else{
        this.$Message.error(res.message);
      }
      // 试着处理数据和分页组件之间的关系,
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formValidate = {};
      this.startRepayDateRange = '';
      this.shouldRepayDate = '';
      this.$refs[name].resetFields();
    }
  }
};
