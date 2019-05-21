import { deduct_list, repayinfo_exportlist } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
import util from '@/libs/util';
export default {
  name: 'transfer_mng_page',
  mixins: [sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 200;
    var widthMidVal = 100;
    var _this = this;
    return {
      getDirList: ['REPAY_ORD_STS', 'PROD_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      modal12: false,
      modal11: false,
      query: false,//查询权限按钮
      query_loading: false,//查询权限按钮loding
      applyDate: '', //申请日期区间
      export_list: [],//导出list
      export_case_loading: false,//导出loading
      formValidate: {
        // prdTyp: '14', //产品线01：还到02：随行付钱包 03：商户贷，调接口
        // caseNo:'',// 案件号
        // billNo: '1', //账单号
        // repayOrdSts: '7', // 订单状态 借口中取
        // applayDateLt:'',// 申请日期开始
        // applayDateBt:'',// 申请日期结束
        // applayNo: '',//申请流水号
      },
      ruleValidate: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      checkStartAndEnd:[],
      tableData: [
      ],
      tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter,
          fixed: 'left',
        },
        {
          type: 'index', // 通过给columns 数据设置 type:'index'
          width: 60,
          align: alignCenter,
          fixed: 'left',
          title: '序号'
        },
        {
          title: '申请流水号',
          searchOperator: '=',
          key: 'applyNo',
          className: 'tableMainW',
          align: alignCenter,
          width: 220
        },
        {
          title: '案件编号',
          searchOperator: 'like',
          key: 'caseNo',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '账单号',
          searchOperator: 'like',
          key: 'billNo',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '还款金额',
          searchOperator: 'like',
          key: 'repayAmount',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render(h,params){
            let res = params.row.repayAmount;
            res = res ? _this.$options.filters['money'](res) : res;
            return h('span', res);
          }
        },
        {
          title: '还款账户',
          searchOperator: 'like',
          key: 'crdNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '订单状态',
          searchOperator: 'like',
          key: 'repayOrdStsName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '代扣订单信息',
          searchOperator: 'like',
          key: 'responseMessage',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '产品名称',
          searchOperator: 'like',
          key: 'prdTypName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          // render(h,params){
          //   console.log(_this.getDirObj.PROD_TYPE,'产品数据');
          //   const prdTyp = params.row.prdTyp;
          //   let result = '';
          //   if(_this.getDirObj && _this.getDirObj.PROD_TYPE){
          //    result = _this.getDirObj.PROD_TYPE.filter(item => {
          //       return item.itemCode == prdTyp
          //     });
          //   }
          //   console.log(result,'resressrsrsr');
          //   return h('span', result[0].itemName);
          // }
        },
        {
          title: '借款期限',
          searchOperator: 'like',
          key: 'loanNum',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
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
          width: widthMidVal
        },
        {
          title: '申请时间',
          searchOperator: 'like',
          key: 'applayTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render(h, params){
            console.log(_this.$options,'opopopopo');
            let res = params.row.applayTime;
            res = res ? _this.$options.filters['formatDate'](res,'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span',res);
          }
        },
        {
          title: '申请人',
          searchOperator: 'like',
          key: 'opUserName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '电催中心',
          searchOperator: 'like',
          key: 'compayName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '申请备注',
          searchOperator: 'like',
          key: 'applayRemarks',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let transfer_manager_form = window.sessionStorage.getItem('transfer_manager_form');
    if (transfer_manager_form) {
      this.formValidate = JSON.parse(transfer_manager_form);
    }
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
      }
    });
    // this.getList();
  },
  methods: {
    // table勾选回调
    changeSelect(arr) {
      this.export_list = [];
      arr.forEach(item => {
        this.export_list.push(item.id);
      });
      console.log(this.approve_list)
    },
    // 导出数据
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info('当前无数据，无法导出');
        return;
      }
      this.export_case_loading = true;
      const res = await repayinfo_exportlist(
        {
          ...this.formValidate,
          ids: this.export_list,
        },
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      this.export_case_loading = false;
      util.dowloadfile('划扣管理', res);
    },
    // 改变日期区间的格式之后进行处理
    changeApplyDate(val1, val2) {
      this.formValidate.applayDateLt = val1[0];
      this.formValidate.applayDateBt = val1[1];
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
      if (this.formValidate.applyDate) {
        this.formValidate.applyDate = [
          this.formValidate.applayDateLt,
          this.formValidate.applayDateBt
        ]
      }
      window.sessionStorage.setItem('transfer_manager_form', JSON.stringify(this.formValidate));
      this.pageNo = 1;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      }
      this.query_loading = true;
      let res= await deduct_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        //repayOrdTyp: this.repayOrdTyp,
        ...this.formValidate
      })
      this.query_loading = false;
      // 请求成功之后需要做分页处理，然后将拿到的数据进行数据处理，总数目和展示条数
      if(res && res.code === 1){
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.export_list = [];
      } else{
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.formValidate = {};
      window.sessionStorage.removeItem('transfer_manager_form');
      this.$refs[name].resetFields();
    }
  }
};
