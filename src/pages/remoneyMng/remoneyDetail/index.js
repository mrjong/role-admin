import { repay_repayDetail_list, repay_repayDetail_exportDown, getLeafTypeList } from '@/service/getData';
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
      getDirList: ['PAY_OFF_STS', 'ROLE_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      export_case: false,//导出权限
      query: false,//查询权限
      query_loading: false,//查询按钮loading
      export_case_loading: false,//导出按钮loading
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      startRepayDateRange: '', //实际还款日期区间
      shouldRepayDate: '',
      summary: {},
      formValidate: {
        startRepayDate: '', // 实际还款起始日期
        endRepayDate: '', //实际还款结束日期
        startDueDate: "", //应还款日期起始
        endDueDate: '',// 应还款日期结束
        caseNo: '', // 案件编码
        billNo: '', //账单号
        opUserName: '', //经办人
        opCompayName: '', // 电催中心,
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
      total: 0,
      tableData: [
      ],
      tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter,
          fixed: 'left'
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
          width: 210
        },
        {
          title: '还款金额',
          searchOperator: 'like',
          key: 'repayAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: 150,
          render(h, params) {
            let res = params.row.repayAmt;
            res = res ? $this.$options.filters['money'](res) : res;
            return h('span', res);
          }
        },
        {
          title: '还款方式',
          key: 'repayOrdTypName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render(h, params) {
            const row = params.row;
            const res = row.repayOrdTypName;
            console.log(row, 'nmnnmnmnm');
            return h('span', res);
          }
        },
        {
          title: '还款状态',
          key: 'payOffStsName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render(h, params) {
            const row = params.row;
            const res = row.payOffStsName;
            console.log(row, 'nmnnmnmnm');
            return h('span', res);
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
          render(h, params) {
            const row = params.row;
            const prdTypName = row.prdTypName;
            return h('span', prdTypName);
          }
        },
        {
          title: '客户姓名',
          searchOperator: 'like',
          key: 'userNmHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
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
          key: 'opCompayName',
          className: 'tableMainW',
          align: alignCenter,
          width: 180,
          tooltip: true
        },
        {
          title: '组别',
          key: 'opOrganizationName',
          className: 'tableMainW',
          align: alignCenter,
          width: 140
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
    //获取缓存的表单值
    let remoney_detail_form = window.sessionStorage.getItem('remoney_detail_form');
    if (remoney_detail_form) {
      this.formValidate = JSON.parse(remoney_detail_form);
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
        case "export": this.export_case = true;
          break;
      }
    });
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
    // this.getList();
  },
  methods: {
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    // 导出数据
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info('当前无数据，无法导出');
        return;
      }
      this.export_case_loading = true;
      const res = await repay_repayDetail_exportDown(
        {
          ...this.formValidate
        },
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      this.export_case_loading = false;
      util.dowloadfile('回款明细', res);
    },
    // 改变日期区间的格式之后进行处理
    changeActDate(val1, val2) {
      console.log(val1, val2);
      this.formValidate.startRepayDate = val1[0];
      this.formValidate.endRepayDate = val1[1];
      console.log('123', this.formValidate);

      //this.formValidate.startAndend[1].Date('yyyy-MM-dd');
    },
    changeDueDate(val1, val2) {
      this.formValidate.startDueDate = val1[0];
      this.formValidate.endDueDate = val1[1];
    },
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      console.log(pageNo, '当前的页码数量值');
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
      window.sessionStorage.setItem('remoney_detail_form', JSON.stringify(this.formValidate))
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
      let res = await repay_repayDetail_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formValidate
      })
      this.query_loading = false;
      if (res && res.code === 1) {
        let data = res.data;
        this.tableData = data.page.content;
        this.total = data.page.totalElements //接口中在该条件下取得的数据量
        this.summary = data.summary;
        //data.page.size  数据的大小
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
        this.$Message.error(res.message);
      }
      // 试着处理数据和分页组件之间的关系,
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await getLeafTypeList({
        // status: "1",
        leafType: type,
        parentId: parent || ""
      });
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.company_list_data = res.data;
            break;
          case "03":
            this.department_list_data = res.data;
            break;
          case "04":
            this.collect_list_data = res.data;
            break;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.formValidate = {};
      // this.startRepayDateRange = '';
      // this.shouldRepayDate = '';
      window.sessionStorage.removeItem('remoney_detail_form');
      this.$refs[name].resetFields();
    }
  }
};
