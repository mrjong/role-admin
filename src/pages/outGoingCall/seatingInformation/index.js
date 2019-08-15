import {seats_config_list, seats_config_add, seats_config_update, call_channel_list, call_channel_edit, call_channel_updateStatus } from '@/service/getData';
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
      getDirList: ['EXECUTION_NUMBER', 'SEAT_TYPE'],
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
      updateChannelData: {},
      seatsData: {},
      ruleValidate:{},
      channelType: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableColumns: [
        {
          title: '渠道名称',
          align: alignCenter,
          width: widthVal,
          key: 'channelName'
        },
        {
          title: '渠道类型',
          align: alignCenter,
          width: widthVal,
          key: 'channelSecondaryName'
        },
        {
          title: '状态',
          key: 'statusName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '号码类型',
          key: 'explicitTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '坐席数量',
          key: 'seatCount',
          className: 'tableMainW',
          align: alignCenter,
          width: 300,
          tooltip: true
        },
        {
          title: '号码数量',
          key: 'explicitCount',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '地域盲区',
          key: 'deadArea',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '创建时间',
          key: 'createTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let createDate = params.row.createTime;
            createDate = createDate
              ? this.$options.filters['formatDate'](createDate, 'YYYY-MM-DD HH:mm:ss')
              : createDate;
            return h('span', createDate);
          }
        },
        {
          title: '操作',
          slot: 'handle',
          key: 'edit',
          className: 'tableMainHandle',
          width: 380,
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
    this.getChannelType()
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
      // if (!this.query) {
      //   this.$Message.error("很抱歉，暂无权限查询");
      //   return;
      // }
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
    },
    handleClick(originalData, flag) {
      let data = JSON.parse(JSON.stringify(originalData))
      switch(flag) {
        case 'update':
          this.updateRowData(data.id)
          break;
        case 'seatsMg':
          this.seatsData = data
          this.showSeatsMg = true
          break;
        case 'faultDebugger':
          this.showPhone = true
          break;
        case 'open':
          this.callChannelUpdateStatus(data)
          break;
        case 'close':
          this.callChannelUpdateStatus(data)
          break;
      }
    },
    //  开启关闭渠道
    async callChannelUpdateStatus(data) {
      let res;
      res = await call_channel_updateStatus({id: data.id, status: data.status==='1' ? '0' : '1'})
      if (res && res.code === 1) {
        this.getList()
      } else {
        this.$Message.error(res.message);
      }
    },

    async updateRowData(id) {
      let res;
      res = await call_channel_edit({id: id})
      if (res && res.code === 1) {
        this.updateChannelData = res.data
        this.showAddChannel = true
      } else {
        this.$Message.error(res.message);
      }
    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },
    passBack(flag){
      if(flag){
        this.getList()
      }
      this.showAddChannel = false
      this.showSeatsMg = false
      this.showPhone = false
      this.updateChannelData = {}
      this.seatsData = {}
    },

    async getChannelType() {
      let res;
      res = await call_channel_list({})
      if (res && res.code === 1) {
        this.channelType = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
  }
};
