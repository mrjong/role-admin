import { rout_seatPool_add, rout_seatPool_list, rout_explicit_add, rout_explicit_list, rout_seatPool_delete,rout_explicit_delete } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'SeatsMg',
  mixins: [sysDictionary],
  props: ["showSeatsMg", 'seatsData'],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      getDirList: ['EXECUTION_NUMBER', 'TASK_STATUS'],
      getDirObj: {},
      add_loading: false,
      query_loading: false,
      add_loading_explicit: false,
      ids: [],
      seatsNo: '',
      explicitNumber: '',
      explicitNumberSearch: '',
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        paddingTop: '23px',
        position: 'static',
      },
      seatsRuleValidate:{
        seatNo: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'blur',
          }
        ],
        loginName: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          }
        ],
        passWord: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ],
      },
      tableDataSeats: [],
      formData: {},
      tableDataExplicitNumber:[],
      tableColumnsSeats: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '坐席编号',
          key: 'seatNo',
        },
        {
          title: '账号',
          key: 'loginName',
        },
        {
          title: '密码',
          key: 'passWord',
        },
      ],
      tableColumnsExplicitNumber: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '坐席号码',
          key: 'explicitNumber',
        },
        {
          title: '归属地',
          key: 'attribution',
        },
      ],
      add_handle: true, //添加
      dialogFormVisible: false,
      title: '',
      task_api: [
      ],
      phoneType: ''
    };

  },
  watch: {
    seatsData: function (value) {
      if(Object.keys(value).length !== 0){
        this.getListSeats();
        this.getListExplicit();
      }
    }
  },
  created() {
    console.log(this.seatsData)
  },
  methods: {

    async handleSubmitExplicit() {
      this.add_loading_explicit = true;
      this.formData.configId = this.seatsData.id
      let res = await rout_explicit_add({
        explicitNumber: this.explicitNumber,
        configId: this.seatsData.id
      })
      this.add_loading_explicit = false;
      if (res.code === 1) {
        this.explicitNumber= ''
        this.getListExplicit();
      } else {
        this.$Message.error(res.message);
      }
    },

    //删除坐席
    async deleteSeats() {
      let res = await rout_seatPool_delete({
        ids: this.ids,
      })
      if (res.code === 1) {
        this.ids = []
        this.getListSeats();
      } else {
        this.$Message.error(res.message);
      }
    },
    //删除外显
    async deleteExplicit() {
      let res = await rout_explicit_delete({
        ids: this.ids,
      })
      if (res.code === 1) {
        this.ids = []
        this.getListExplicit();
      } else {
        this.$Message.error(res.message);
      }
    },

    //添加外显号码
    async handleSubmitSeats() {
      this.add_loading = true;
      this.formData.configId = this.seatsData.id
      let res = await rout_seatPool_add({
        ...this.formData,
      })
      this.add_loading = false;
      if (res.code === 1) {
        this.formData= {}
        this.getListSeats();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取表格数据
    async getListSeats() {
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无查询权限');
      //   return;
      // }
      let res = await rout_seatPool_list({
        configId: this.seatsData.id,
        seatNo: this.seatsNo
      })
      if (res.code === 1) {
        this.tableDataSeats = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 获取表格数据
    async getListExplicit() {
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无查询权限');
      //   return;
      // }
      let res = await rout_explicit_list({
        configId: this.seatsData.id,
        explicitNumber: this.explicitNumberSearch
      })
      if (res.code === 1) {
        this.tableDataExplicitNumber = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },



    closeDrawer() {
      this.formData = {}
      this.tableDataSeats = []
      this.tableDataExplicitNumber = []
      this.$emit("passBack");
    },
    selectItem(value) {
      value.forEach(item=>{
        this.ids.push(item.id)
      })
    },

    //渲染行高度
    rowStyle(){
      return 'row_style'
    },

    changeTab(val){
      console.log(val)
    },

  }
};
