import { timed_taskList, timed_task_add, timed_task_update, timed_task_open, timed_task_close, timed_task_run,timed_task_delete } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
var noPassJobName = false
var noPassJobClass = false
var noPassJobMethod = false
var noPassCronExpression = false
const validateJobName = (rule, value, callback) => {
  if (!value) {
    callback(new Error());
  } else if (noPassJobName) {
    noPassJobName= false
    rule.message = '任务名称不正确'
    callback(new Error());
  } else {
    callback();
  }
};
const validateJobClass = (rule, value, callback) => {
  if (!value) {
    callback(new Error());
  } else if (noPassJobClass) {
    rule.message = '任务类别不正确'
    noPassJobClass= false
    callback(new Error());
  } else {
    callback();
  }
};
const validateJobMethod = (rule, value, callback) => {
  if (!value) {
    callback(new Error());
  } else if (noPassJobMethod) {
    noPassJobMethod= false
    rule.message = '任务方法名不正确'
    callback(new Error());
  } else {
    callback();
  }
};
const validateCronExpression = (rule, value, callback) => {
  if (!value) {
    callback(new Error());
  } else if (noPassCronExpression) {
    rule.message = '任务表达式不正确'
    noPassCronExpression = false
    callback(new Error());
  } else {
    callback();
  }
};
export default {
  name: 'timedTask',
  mixins: [sysDictionary],
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
      formItem: {
      },
      ruleValidate:{
        jobName: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'blur',
            validator: validateJobName,
          }
        ],
        jobClass: [
          {
            required: true,
            message: '请输入任务类名',
            trigger: 'blur',
            validator: validateJobClass,
          }
        ],
        jobMethod: [
          {
            required: true,
            message: '请输入任务方法名',
            trigger: 'blur',
            validator: validateJobMethod,

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
            validator: validateCronExpression,

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
      ],
      tableColumns: [
        {
          title: '任务名称',
          align: alignCenter,
          width: widthVal,
          key: 'jobName'
        },
        {
          title: '任务状态',
          key: 'isLockName',
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
          title: '任务类名',
          key: 'jobClass',
          className: 'tableMainW',
          align: alignCenter,
          width: 300,
          tooltip: true
        },
        {
          title: '任务方法名',
          key: 'jobMethod',
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
          title: '执行次数',
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
        {
          api: timed_task_add,
          key: '添加'
        },
        {
          api: timed_task_update,
          key: '修改'
        },
        {
          api: timed_task_open,
          key: '开始'
        },
        {
          api: timed_task_close,
          key: '关闭'
        },
        {
          api: timed_task_run,
          key: '执行'
        },
        {
          api: timed_task_delete,
          key: '删除'
        },
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
      console.log(data)
      switch(flag) {
        case 'open':
          console.log('开始')
          this.open('此操作将开始该任务, 是否继续?', '开始', data)
          break;
        case 'close':
          console.log('关闭')
          this.open('此操作将关闭该任务, 是否继续?', '关闭', data)
          break;
        case 'update':
          console.log('修改')
          this.showTask('update', data)
          break;
        case 'execute':
          console.log('执行')
          this.open('此操作将执行该任务, 是否继续?', '执行', data)
          break;
        case 'delete':
          console.log('删除')
          this.open('此操作将删除该任务, 是否继续?', '删除', data)
          break;
      }
    },
    closeModal(flag){
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.task_api.forEach(item=>{
            if(flag && flag === item.key){
              item.api({
                ...this.formValidateInfo
              }).then(res=>{
                switch(res.code) {
                  case 1:
                    this.dialogFormVisible = false;
                    this.$Message.info({content:item.key+ '成功', onClose: ()=>{
                      this.getList()
                    }})
                    break
                  case 2000001:
                    noPassJobName = true
                    this.$refs['formValidate'].validate((valid) => {})
                    break
                  case 2000002:
                    noPassJobClass = true
                    this.$refs['formValidate'].validate((valid) => {})
                    break
                  case 2000003:
                    noPassJobMethod = true
                    this.$refs['formValidate'].validate((valid) => {})
                    break
                  case 2000004:
                    noPassCronExpression = true
                    this.$refs['formValidate'].validate((valid) => {})
                    break
                  default:
                    this.$Message.info(res.message)
                }
              }).catch(err=>{
                this.$Message.info(err.message)
              })
            }
          })
        } else {
        }
      })

    },
    //渲染行高度
    rowStyle(){
      return 'row_style'
    },
    open(content='', text='', data= {}){
      this.$Modal.confirm({
        title: '提示',
        content: content,
        onOk: () => {
          this.task_api.forEach(item=>{
            if(text && text === item.key){
              item.api({
                id: data.id
              }).then(res=>{
                if(res.code === 1){
                  this.$Message.info({content:res.data, onClose: ()=>{
                    this.getList()
                  }})
                }else {
                  this.$Message.info(res.message)
                }
              })
            }
          })
        },
        onCancel: () => {
          this.$Message.info( '已取消'+ text + '操作');
        }
      });
    },

    showTask(flag, data) {
      this.$refs['formValidate'].resetFields();
      if(flag === 'add'){
        this.title = '添加'
        this.formValidateInfo = {}
      } else {
        this.title = '修改'
        console.log(data)
        this.formValidateInfo = data
      }
      this.dialogFormVisible=true
      setTimeout(()=>{
        // document.querySelector('.bottom').childNodes.forEach((item, index)=>{
        //   if(index !== 0){
        //     item.style.display= 'none'
        //   }
        // })
      },300)
    },
  }
};
