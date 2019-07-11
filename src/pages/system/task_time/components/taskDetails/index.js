import { timed_task_detail_list} from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
export default {
  name: 'timedTask',
  mixins: [sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      getDirList: ['EXECUTION_STS'],
      getDirObj: {},
      queryLoading: false,
      formItem: {
      },
      formValidate: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
      ],
      tableColumns: [
        {
          title: '任务名称',
          align: alignCenter,
          width: widthVal,
          key: 'taskName'
        },
        {
          title: '开始时间',
          key: 'startTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let startTime = params.row.startTime;
            startTime = startTime
              ? this.$options.filters['formatDate'](startTime, 'YYYY-MM-DD HH:mm:ss')
              : startTime;
            return h('span', startTime);
          }
        },
        {
          title: '结束时间',
          key: 'endTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let endTime = params.row.endTime;
            endTime = endTime
              ? this.$options.filters['formatDate'](endTime, 'YYYY-MM-DD HH:mm:ss')
              : endTime;
            return h('span', endTime);
          }
        },
        {
          title: '执行时间',
          key: 'executionTimeStr',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '执行状态',
          key: 'executionStsName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '执行数据量',
          key: 'dataNumber',
          className: 'tableMainW',
          align: alignCenter,

        },

      ],
      add_handle: true, //添加
      dialogFormVisible: false,
    };

  },
  created() {
    // this.getList();
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val1) {
      this.formItem.startTimeStart = val1[0];
      this.formItem.startTimeEnd = val1[1];
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
      delete this.formItem.startTimeArray
      let res= await timed_task_detail_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
      this.queryLoading = false;
      if(res && res.code === 1){
        let data = res.data;
        this.tableData = data.content;
        this.total = data.totalElements //接口中在该条件下取得的数据量
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
      // this.getList();
    },
    handleClick(data, flag) {

    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },
  }
};
