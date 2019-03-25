import { system_handleList, system_handleDetail } from '@/service/getData';
import { join } from 'path';
export default {
  name: 'systemOperation',
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      showPanel: false,
      showPanel2: false,
      modalSee: false,
      startTime: [],
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
      total: 0,
      tableData: [

      ],
      tableColumns: [
        {
          title: '耗时',
          align: alignCenter,
          width: widthVal,
          key: 'duration'
        },
        {
          title: '开始时间',
          key: 'startTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let remarkDate = params.row.startTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '结束时间',
          key: 'endTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let remarkDate = params.row.endTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '操作类型',
          key: 'operTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '执行参数',
          key: 'operParam',
          className: 'tableMainW',
          align: alignCenter,
          width: 250,
        },
        {
          title: '执行结果',
          key: 'operResult',
          className: 'tableMainW',
          align: alignCenter,
          width: 250,
        },
        {
          title: '操作描述',
          key: 'operDesc',
          className: 'tableMainW',
          align: alignCenter,
          width: 250,
        },
        {
          title: '是否成功',
          key: 'isSuccessName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
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
          width: widthMidVal,
        },
        {
          title: '用户IP',
          key: 'userIp',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
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
    // this.getList();
    let log_case_systemOperation_form = window.sessionStorage.getItem('log_case_systemOperation_form');
    if (log_case_systemOperation_form) {
      this.formItem = JSON.parse(log_case_systemOperation_form);
    }
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val1) {
      this.formItem.sysStartTime = val1[0];
      this.formItem.sysEndTime = val1[1];
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
      if (this.formItem.dateRange) {
        this.formItem.dateRange = [
          this.formItem.sysStartTime,
          this.formItem.sysEndTime
        ]
      }
      window.sessionStorage.setItem('log_case_systemOperation_form', JSON.stringify(this.formItem));
      this.pageNo = 1;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      if (this.formItem.minDuration) {
        this.formItem.minDuration = parseFloat(this.formItem.minDuration)
      }
      if (this.formItem.maxDuration) {
        this.formItem.maxDuration = parseFloat(this.formItem.maxDuration)
      }
      this.queryLoading = true;
      let res = await system_handleList({
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
      window.sessionStorage.removeItem('log_case_systemOperation_form');
      this.$refs[name].resetFields();
      // this.getList();
    },
    //查看详情
    async handleDetail(obj) {
      this.formValidateInfo = obj
      if (obj.startTime) {
        this.formValidateInfo.startTime = this.$options.filters['formatDate'](this.formValidateInfo.startTime, 'YYYY-MM-DD HH:mm:ss')
      }
      if (obj.endTime) {
        this.formValidateInfo.endTime = this.$options.filters['formatDate'](this.formValidateInfo.endTime, 'YYYY-MM-DD HH:mm:ss')
      }
      this.modalSee = true;
    },
    closeModal() {
      this.modalSee = false;
    }
  }
};
