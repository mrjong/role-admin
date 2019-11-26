export default {
  name: 'credit-process-mng',
  data() {
    const alignCenter = 'center';
    return {
      showPanel: false,
      showPanelTable: false,
      export_case: true,
      formValidate: {},
      ruleValidate: {},
      query_loading: false,
      export_case_loading: false,
      tableData: [],
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
          title: '导入账单数量',
          key: 'applyNo',
          className: 'tableMainW',
          align: alignCenter,
        },
        {
          title: '操作人',
          key: 'applyNo',
          className: 'tableMainW',
          align: alignCenter,
        },
        {
          title: '操作时间',
          key: 'applyNo',
          className: 'tableMainW',
          align: alignCenter,
          render(h, params){
            console.log(this.$options,'opopopopo');
            let res = params.row.applayTime;
            res = res ? this.$options.filters['formatDate'](res,'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span',res);
          }
        },
      ],
      pageSize: 10,
      pageNo: 1,
      total: 0
    }
  },
  created() {

  },
  methods: {
    handleSubmit(name) {

    },
    clearForm() {
      this.formValidate = {};
    },
    // 改变日期区间的格式之后进行处理
    changeApplyDate(val1, val2) {
      this.formValidate.applayDateLt = val1[0];
      this.formValidate.applayDateBt = val1[1];
      console.log('123', this.formValidate);
    },
    // table勾选回调
    changeSelect(arr) {
      this.export_list = [];
      arr.forEach(item => {
        this.export_list.push(item.id);
      });
      console.log(this.approve_list)
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
  },
}
