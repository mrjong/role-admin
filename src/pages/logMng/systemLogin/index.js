import { login_quitList } from '@/service/getData';
export default {
  name: 'systemLogin',
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      showPanel: false,
      showPanel2: false,
      modalSee: false,
      loginTime: [],
      logoutTime: [],
      queryLoading: false,
      formItem: {
      },
      ruleValidate: {
      },
      formValidate: {
      },
      formValidateInfo: {
      },
      pageNo: 1,
      pageSize: 10,
      total: 10,
      tableData: [

      ],
      tableColumns: [
        {
          title: '用户IP',
          align: alignCenter,
          width: widthVal,
          key: 'userIp'
        },
        {
          title: '用户ID',
          key: 'userId',
          className: 'tableMainW',
          align: alignCenter,
          width: 250,
        },
        {
          title: '用户名称',
          key: 'userName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
        },
        {
          title: '登录时间',
          key: 'loginTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let remarkDate = params.row.loginTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '退出时间',
          key: 'logoutTime',
          className: 'tableMainW',
          align: alignCenter,
          width: 250,
          render: (h, params) => {
            let remarkDate = params.row.logoutTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '描述',
          key: 'rmk',
          className: 'tableMainW',
          align: alignCenter,
          width: 250,
        },
        {
          title: '操作',
          key: 'edit',
          width: 180,
          fixed: 'left',
          align: 'center',
          render: (h, params) => {
            const obj = params.row;
            return h('div', [
              h(
                'a',
                {
                  props: {},
                  on: {
                    click: () => {
                      this.handleDetail(obj);
                    }
                  }
                },
                '查看'
              ),
            ]);
          }
        }
      ]
    };
  },
  created() {
    let log_case_systemLogin_form = window.sessionStorage.getItem('log_case_systemLogin_form');
    if (log_case_systemLogin_form) {
      this.formItem = JSON.parse(log_case_systemLogin_form);
    }
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate1(val) {
      this.formItem.startLoginTime = val[0];
      this.formItem.endLoginTime = val[1];
      // 日期格式单天和时间区间之间的差别在于range这里拿到的是一个长度唯二的数组，而单日侧直接是一个结果值
    },
    changeDate2(val) {
      this.formItem.startQuitTime = val[0];
      this.formItem.endQuitTime = val[1];
      // 日期格式单天和时间区间之间的差别在于range这里拿到的是一个长度唯二的数组，而单日侧直接是一个结果值
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
      if (this.formItem.loginDateRange) {
        this.formItem.loginDateRange = [
          this.formItem.startLoginTime,
          this.formItem.endLoginTime
        ];
      }
      if (this.formItem.logoutDateRange) {
        this.formItem.logoutDateRange = [
          this.formItem.startQuitTime,
          this.formItem.endQuitTime
        ]
      }
      window.sessionStorage.setItem('log_case_systemLogin_form', JSON.stringify(this.formItem));
      this.pageNo = 1;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      this.queryLoading = true;
      let res = await login_quitList({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
      this.queryLoading = false;
      if (res && res.code === 1) {
        let data = res.data;
        this.tableData = data.content;
        this.total = data.totalElements //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      window.sessionStorage.removeItem('log_case_systemLogin_form');
      this.$refs[name].resetFields();
    },
    //查看详情
    async handleDetail(obj) {
      this.formValidateInfo = obj
      if (this.formValidateInfo.loginTime) {
        this.formValidateInfo.loginTime = this.$options.filters['formatDate'](this.formValidateInfo.loginTime, 'YYYY-MM-DD HH:mm:ss')
      }
      if (this.formValidateInfo.logoutTime) {
        this.formValidateInfo.logoutTime = this.$options.filters['formatDate'](this.formValidateInfo.logoutTime, 'YYYY-MM-DD HH:mm:ss')
      }

      this.modalSee = true;
    },
    closeModal() {
      this.modalSee = false;
    }
  }
};
