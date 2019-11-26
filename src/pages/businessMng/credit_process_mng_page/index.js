import Cookie from 'js-cookie';

export default {
  name: 'credit-process-mng',
  data() {
    const alignCenter = 'center';
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      file_url: '/admin/cases/batch/import ',//文件上传地址
      showPanel: false,
      showPanelTable: false,
      export_case: true,
      import_search: true,
      formValidate: {},
      ruleValidate: {},
      query_loading: false,
      import_data_loading: false,
      download_import_data: false,
      tableData: [],
      tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 100,
          align: alignCenter,
          fixed: 'left',
        },
        {
          type: 'index', // 通过给columns 数据设置 type:'index'
          width: 100,
          align: alignCenter,
          fixed: 'left',
          title: '序号'
        },
        {
          title: '操作',
          width: 150,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const caseHandleStatus = params.row.caseHandleStatus;
            return h('div', [
              this.update_limt ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {

                    }
                  }
                },
                '修改'
              ) : h('span', {
                style : {
                  color: rgb(204, 204, 204),
                }
              }, '修改'),
            ]);
          }
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
    // 上传文件格式校验
    handleFormatError(file) {
      this.$Message.error('请选择Excel文件上传');
    },
    // 上传文件大小校验
    handleMaxSize(file) {
      this.$Message.error('文件大小不得超过1M');
    },
    // 文件上传时
    handleProgress() {
      this.import_data_loading = true;
    },
    // 上传文件失败
    handleError(error, file) {
      console.log(error);
      this.import_data_loading = false;
    },
    // 文件上传成功
    handleSuccess(res, file) {
      this.import_data_loading = false;
      if (res.code === 1) {
        console.log(res);
        this.tableData = [];
        this.query_flag = true;
        this.$set(this, 'file_csaeIds', res.data.caseNoList);
        let caseIds;
        // 判断返回的案件号是否为空，空 不执行下面分页请求操作
        if (res.data.caseNoList.length > 0) {
          caseIds = util.slice_case_number(res.data.caseNoList, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
        } else {
          this.$Message.error('暂时查询不到相关数据')
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 下载模板
    download_import() {},
  },
}
