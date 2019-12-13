import sysDictionary from '@/mixin/sysDictionary';
import configParameter from "./components/config-parameter/index.vue";
import getTemplate from "./components/get-template/index.vue";
import newTask from "./components/create-task/index.vue";
import api from '@/service/index.js';
import day from 'dayjs'
export default {
  name: 'template-mng',
  mixins: [sysDictionary],
  components: {
    configParameter,
    getTemplate,
    newTask,
  },
  data() {
    const minWidth = 80;
    const middleWidth = 120;
    const maxWidth = 150;
    return {
      getDirList: ['MSG_TEMPL_TYPE', 'MSG_TEMPL_STATUS'],
      getDirObj: {},
      formItem: {},
      formRules: {

      },
      showPanelForm: false,
      showPanelTable: false,
      parameterFlag: false,//参数配置modal
      getTemplateFlag: false,//获取模板modal
      createTaskFlag: false,//创建任务模板modal
      currentRow: {},
      total: 0,
      pageNo: 1,
      pageSize: 10,
      tableData: [
      ],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '模板类型',
          minWidth: minWidth,
          key: 'templTypeName',
          align: 'center',
        },
        {
          title: '模板名称',
          minWidth: maxWidth,
          tooltip: true,
          key: 'templName',
          align: 'center',
        },
        {
          title: '模板编号',
          minWidth: middleWidth,
          key: 'templCode',
          align: 'center',
        },
        {
          title: '模板内容',
          minWidth: maxWidth,
          key: 'templContent',
          tooltip: true,
          align: 'center',
        },
        {
          title: '模板状态',
          minWidth: minWidth,
          key: 'templStatusName',
          align: 'center',
        },
        {
          title: '创建时间',
          minWidth: minWidth,
          key: 'createTime',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const createTime = row.createTime
              ? this.$options.filters['formatDate'](row.createTime , 'YYYY-MM-DD HH:mm:ss')
              : row.createTime;
            return h('span', createTime);
          }
        },
        {
          title: '操作',
          minWidth: middleWidth,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    color: params.row.paramConfig.length>0? '#2d8cf0': '#ccc',
                  },
                  on: {
                    click: () => {
                      if (params.row.paramConfig.length>0) {
                        this.currentRow = params.row;
                        this.parameterFlag = true;
                      }
                    }
                  }
                },
                '配置参数'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.currentRow = params.row;
                      this.createTaskFlag = true;
                    }
                  }
                },
                '创建任务'
              ),
            ]);
          }
        },
      ],
      query_loading: false,//查询loading
      isBtnLoading: false,
    }
  },
  created() {
    this.msgTempl_list()
    console.log(day().format('YYYY-MM-DD'))
  },
  methods: {
    handleSubmit(name) {
      this.$refs.formItem.validate(isValid => {
        if (isValid) {
          this.query_loading = true;
          this.msgTempl_list();
        }
      })
    },

    clearForm() {
      this.$refs['formItem'].resetFields();
    },

    // modal回调校验
    handleSubmitModalprops(slotProps, type) {
      console.log(slotProps)
      slotProps.validateFormData().then(isValid => {
        if (isValid) {
          this.isBtnLoading = true;
          type === 'getTemplate' && this.handleSubmitTemplate(slotProps);
          type === 'createTask' && this.handleSubmitCreateTask(slotProps);
          type === 'configParams' && this.handleSubmitParameter(slotProps);
        } else {
          console.log(slotProps, '校验不通过');
        }
      });
    },

    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.msgTempl_list();
    },

    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.msgTempl_list();
    },

    // 查询模板
    msgTempl_list(messageText) {
      console.log(api)
      api.msgTempl_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      }).then(res => {
        if (res.code === 1) {
          this.$set(this, 'tableData', res.data.content);
          this.$set(this, 'total', res.data.totalElements);
          messageText && this.$Message.success(messageText);
        } else {
          this.$Message(res.message);
        }
        this.query_loading = false;
      }).catch(err => {
        this.query_loading = false;
        console.log(err);
      })
    },

    // 关闭参数配置modal
    handleCancelParameter() {
      this.parameterFlag = false;
    },

    // 参数配置确定提交
    handleSubmitParameter(slotProps) {
      let params = {
        templCode: this.currentRow.templCode,
        templType: this.currentRow.templType,
        paramConfig: slotProps.formItem.parameterList,
      }
      api.msgTempl_addParamConfig(params, {
        transformRequest: [
          function(data) {
            return JSON.stringify(data); //利用对应方法转换格式
          }
        ]
      }).then(async res => {
        if (res.code === 1) {
          this.handleCancelParameter();
          this.msgTempl_list('参数配置成功');
        } else {
          this.$Message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 关闭获取模板modal
    handleCancelTemplate() {
      this.getTemplateFlag = false;
    },

    // 获取模板确定提交
    handleSubmitTemplate(slotProps) {
      api.msgTempl_addTempl({
        ...slotProps.formItem,
      }).then(res => {
        if (res.code === 1) {
          this.handleCancelTemplate();
          this.msgTempl_list('模板添加成功');
        } else {
          this.$Message.error(res.message);
        }
        this.isBtnLoading = false;
      }).catch(err => {
        console.log(err);
        this.isBtnLoading = false;
      })
    },

    // 关闭创建任务modal
    handleCancelCreateTask() {
      this.createTaskFlag = false;
    },

    // 创建任务的提交
    handleSubmitCreateTask(slotProps) {
      let params = {
        ...slotProps.formItem,
        templId: this.currentRow.id,
        templCode: this.currentRow.templCode,
        templType: this.currentRow.templType,
        jobScene: slotProps.formItem.jobScene_children? slotProps.formItem.jobScene_children: slotProps.formItem.jobScene,
        dataPath: slotProps.dataPath? slotProps.dataPath: null,
        jobTime: slotProps.formItem.jobTime && slotProps.formItem.jobTime.length > 4? day(day().format('YYYY-MM-DD') + '' + slotProps.formItem.jobTime+':00').$d: slotProps.formItem.jobTime,
        conditions: slotProps.conditions,
      };
      api.msgJob_addMsgJob(params, {
        transformRequest: [
          function(data) {
            return JSON.stringify(data); //利用对应方法转换格式
          }
        ]
      })
      .then(res => {
        if (res.code === 1) {
          this.handleCancelCreateTask();
          this.msgTempl_list('任务创建成功');
        } else {
          this.$Message.error(res.message);
        }
        this.isBtnLoading = false;
      }).catch(err => {
        this.isBtnLoading = false;
        console.log(err)
      })
    },
  },
}
