import {seats_config_list, seats_config_add, seats_config_update } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
import AddChannel from './components/addChannel/index.vue'
import SeatsMg from './components/seatsMg/index.vue'
import Phone from './components/phone/index.vue'
export default {
  name: 'SeatingInformation',
  mixins: [sysDictionary],
  components: {
    AddChannel,
    SeatsMg,
    Phone
  },
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;

    return {
      getDirList: ['EXECUTION_NUMBER', 'TASK_STATUS'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      modalSee: false,
      createTime: [],
      queryLoading: false,
      showAddChannel: false,
      showSeatsMg: false,
      showPhone: false,
      formItem: {
      },
      updateChannel: {},
      ruleValidate:{
        jobName: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'blur',
          }
        ],
        jobClass: [
          {
            required: true,
            message: '请输入任务类名',
            trigger: 'blur',
          }
        ],
        jobMethod: [
          {
            required: true,
            message: '请输入任务方法名',
            trigger: 'blur',

          }
        ],
        ipAddress: [
          {
            required: true,
            message: '请输入IP地址',
            trigger: 'blur'
          }
        ],
        cronExpression: [
          {
            required: true,
            message: '请输入CRON表达式',
            trigger: 'blur',

          }
        ],
        executionNumber: [
          {
            required: true,
            message: '请选择执行次数',
            trigger: 'change',
          }
        ]
      },
      formValidate: {},
      formValidateInfo: {
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        {
          jobName: '333'
        }
      ],
      tableColumns: [
        {
          title: '渠道名称',
          align: alignCenter,
          width: widthVal,
          key: 'jobName'
        },
        {
          title: '渠道类型',
          align: alignCenter,
          width: widthVal,
          key: 'jobName'
        },
        {
          title: '状态',
          key: 'isLockName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '号码类型',
          key: 'cronExpression',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '坐席数量',
          key: 'jobClass',
          className: 'tableMainW',
          align: alignCenter,
          width: 300,
          tooltip: true
        },
        {
          title: '号码数量',
          key: 'jobMethod',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '地域盲区',
          key: 'ipAddress',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '创建时间',
          key: 'executionNumberName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '操作',
          slot: 'handle',
          key: 'edit',
          className: 'tableMainHandle',
          width: 280,
          fixed: 'left',
          align: 'center',
        }
      ],
      add_handle: true, //添加
      dialogFormVisible: false,
      title: '',
      task_api: [

      ]
    };

  },
  created() {
    // this.getList();
  },
  methods: {

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
    async getList(type) {
      console.log(this.formItem)
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      this.query_loading = true;
      let res;
      res = await seats_config_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
      this.query_loading = false;
      if (res && res.code === 1) {
        let data = res.data;
        this.tableData = data.content;
        this.total = data.totalElements; //接口中在该条件下取得的数据量
        //data.page.numberOfElements  当前页面实际返回的数量
      } else {
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
    handleClick(originalData, flag) {
      let data = JSON.parse(JSON.stringify(originalData))
      switch(flag) {
        case 'update':
          this.updateChannel = data
          this.showAddChannel = true
          break;
        case 'seatsMg':
          this.showSeatsMg = true
          break;
        case 'faultDebugger':
          debugger
          this.showPhone = true
          break;
      }
    },
    closeModal(flag){

    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },
    passBack(){
      this.showAddChannel = false
      this.showSeatsMg = false
      this.showPhone = false
    },

    showTask(flag, data) {

    },
  }
};
