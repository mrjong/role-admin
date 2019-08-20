import { rout_seatPool_add, rout_seatPool_list, rout_explicit_add, rout_explicit_list, rout_seatPool_delete,rout_explicit_delete, rout_seatPool_updateStatus } from '@/service/getData';

export default {
  name: 'SeatsMg',
  props: ["showSeatsMg", 'seatsData'],
  data() {
    var alignCenter = 'center';
    var widthVal = 130;
    var widthMidVal = 130;
    return {
      add_loading: false,
      query_loading: false,
      add_loading_explicit: false,
      edit_loading: false, //编辑loading
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
          width: widthVal,
          align: alignCenter,
        },
        {
          title: '账号',
          key: 'loginName',
          width: widthVal,
          align: alignCenter,
        },
        {
          title: '占用时间',
          key: 'occupyTime',
          width: 150,
          align: alignCenter,
          render: (h, params) => {
            let occupyTime = params.row.occupyTime;
            occupyTime = occupyTime
              ? this.$options.filters['formatDate'](occupyTime, 'YYYY-MM-DD HH:mm:ss')
              : occupyTime;
            return h('span', occupyTime);
          }
        },
        {
          title: '密码',
          key: 'passWord',
          width: widthVal,
          align: alignCenter,
        },
        {
          title: '占用状态',
          key: 'occupyStatusName',
          width: widthVal,
          align: alignCenter,
        },
        {
          title: '占用人',
          key: 'occupyUser',
          width: widthVal,
          align: alignCenter,
        },
        {
          title: '操作',
          slot: 'handle',
          key: 'edit',
          className: 'tableMainHandle',
          width: 100,
          fixed: 'left',
          align: 'center',
        }
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
          align: alignCenter,
        },
        {
          title: '归属地',
          key: 'attribution',
          align: alignCenter,
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
    handleClick(data) {
      if(data.occupyStatus === '1'){
        this.$Message.error('现在已经是空闲状态了');
        return
      }
      this.edit_loading = data.id
      rout_seatPool_updateStatus({
        ...data
      }).then(res=>{
        this.edit_loading = ''
        if(res.code === 1){
          this.getListSeats()
        } else {
          this.$Message.error(res.message);
        }
      }).catch(err=>{
        this.edit_loading = ''
      })
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
