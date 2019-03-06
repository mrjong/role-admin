import { timed_taskList, timed_taskDetail } from '@/service/getData';
export default {
  name: 'timedTask',
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      showPanel: false,
      showPanel2: false,
      modalSee: false,
      createTime: [],
      queryLoading: false,
      formItem: {
      },
      ruleValidate:{
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
          title: '任务名称',
          align: alignCenter,
          width: widthVal,
          key: 'jobName'
        },
        {
          title: '任务类名',
          key: 'jobClass',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: 'IP地址',
          key: 'ipAddress',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: 'cron表达式',
          key: 'cronExpression',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '是否开启',
          key: 'isLockName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '创建人',
          key: 'createUser',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '创建时间',
          key: 'createTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render: (h, params) => {
            let remarkDate = params.row.createTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '修改人',
          key: 'updateUser',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '修改时间',
          key: 'updateTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
          render: (h, params) => {
            let remarkDate = params.row.updateTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
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
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val1) {
      this.formItem.startCreateTime = val1[0];
      this.formItem.endCreateTime = val1[1];
      // 日期格式单天和时间区间之间的差别在于range这里拿到的是一个长度唯二的数组，而单日侧直接是一个结果值
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
      this.pageNo = 1;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      this.queryLoading = true;
      let res= await timed_taskList({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
      this.queryLoading = false;
      if(res && res.code === 1){
        let data = res.data;
        this.tableData = data.content;
        this.total = data.totalElements //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else{
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.createTime = [];
      this.$refs[name].resetFields();
      this.getList();
    },
    //查看详情
    handleDetail( obj) {
      this.formValidateInfo = obj;
      this.formValidateInfo.createTime = this.$options.filters['formatDate'](this.formValidateInfo.createTime, 'YYYY-MM-DD HH:mm:ss')
      this.formValidateInfo.updateTime = this.$options.filters['formatDate'](this.formValidateInfo.updateTime, 'YYYY-MM-DD HH:mm:ss')
      this.modalSee = true;
    },
    closeModal(){
      this.modalSee = false;
    }
  }
};
