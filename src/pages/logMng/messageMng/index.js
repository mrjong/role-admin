import { msg_list, msg_detail } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
export default {
  name: 'messageMng',
  mixins: [sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 180;
    var widthMidVal = 130;
    return {
      showPanel: false,
      showPanel2: false,
      operTime:[],
      getDirList: ['MSG_TYPE'],
      getDirObj: {},
      modalSee: false,
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
          title: '案件编号',
          align: alignCenter,
          width: widthVal,
          key: 'caseNo'
        },
        {
          title: '消息类型',
          key: 'msgTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '接收标识',
          key: 'msgFlgName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '消息内容',
          key: 'msgContent',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '账单ID',
          key: 'billNo',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '接收用户ID',
          key: 'receiveUserId',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '接收手机号掩码',
          key: 'receiveUserMobHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '内容类型',
          key: 'messageContentTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '消息提醒 ',
          key: 'messagePurposeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '消息备注',
          key: 'remark',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '消息发送人ID',
          key: 'sendUserId',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '消息发送人姓名',
          key: 'sendUserName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '发送类型',
          key: 'messageSendTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '消息发送时间',
          key: 'sendTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let remarkDate = params.row.sendTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let remarkDate = params.row.createTime;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '消息来源系统简称',
          key: 'srcSys',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '存储对应接收标识内容',
          key: 'msgFlgContent',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal
        },
        {
          title: '操作',
          key: 'edit',
          width: 180,
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
    this.getList();
  },
  methods: {
    // 改变日期区间的格式之后进行处理
    changeDate(val1) {
      this.formItem.startSendTime = val1[0];
      this.formItem.endSendTime = val1[1];
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
//        if(this.formItem.operTime){
//          this.formItem.operTime = this.$options.filters['formatDate'](this.formItem.operTime, 'YYYY-MM-DD')
//        }
      let res= await msg_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      })
      console.log(res)
      if(res && res.code === 1){
        this.$Message.success('请求成功!');
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
      this.operTime=[],
        this.$refs[name].resetFields();
    },
    //查看详情
    async handleDetail( obj) {
      let res= await msg_detail({
        id: obj.id,
      })
      this.formValidateInfo = res.data;
      this.formValidateInfo.sendTime = this.$options.filters['formatDate'](this.formValidateInfo.sendTime, 'YYYY-MM-DD HH:mm:ss')
      this.formValidateInfo.createTime = this.$options.filters['formatDate'](this.formValidateInfo.createTime, 'YYYY-MM-DD HH:mm:ss')
      this.modalSee = true;
    },
    closeModal(){
      this.modalSee = false;
    }
  }
};
