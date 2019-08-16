import { rout_seatPool_add, rout_seatPool_list, rout_explicit_add, rout_explicit_list, rout_seatPool_delete,rout_explicit_delete } from '@/service/getData';

export default {
  name: 'SeatsMg',
  props: ["showSeatsMg", 'seatsData'],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
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
            message: '请输入坐席编号',
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
      if(!this.explicitNumber){
        this.$Message.error('请输入外显号码');
        return
      }
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
      if(this.ids.length === 0){
        this.$Message.info('请勾选要删除的项')
        return
      }
      let res = await rout_seatPool_delete({
        ids: this.ids,
        configId: this.seatsData.id
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
      if(this.ids.length === 0){
        this.$Message.info('请勾选要删除的项')
        return
      }
      let res = await rout_explicit_delete({
        ids: this.ids,
        configId: this.seatsData.id
      })
      if (res.code === 1) {
        this.ids = []
        this.getListExplicit();
      } else {
        this.$Message.error(res.message);
      }
    },

    //添加坐席
    async handleSubmitSeats() {
      this.$refs['formData'].validate((valid) => {
        if(valid){
          this.add_loading = true;
          this.formData.configId = this.seatsData.id
          rout_seatPool_add({
            ...this.formData,
          }).then(res=>{
            this.add_loading = false;
            if (res.code === 1) {
              this.formData= {}
              this.getListSeats();
            } else {
              this.$Message.error(res.message);
            }
          })
        } else {
          this.$Message.error('请填写必填项');
        }
      })

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
      this.$emit("passBack", 'change');
    },
    selectItem(value) {
      value.forEach(item=>{
        this.ids.push(item.id)
      })
    },

  }
};
