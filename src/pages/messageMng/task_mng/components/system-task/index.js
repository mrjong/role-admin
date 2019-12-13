import sysDictionary from '@/mixin/sysDictionary';
import api from '@/service/';
import taskDetail from '../../../template_mng/components/create-task/index.vue'
import day from 'dayjs'

export default {
  name: 'system-task',
  mixins: [sysDictionary],
  components: {
    taskDetail
  },
  data() {
    const minWidth = 80;
    const middleWidth = 120;
    const maxWidth = 150;
    return {
      getDirList: ['MSG_JOB_STATUS', 'MSG_JOB_TYPE'],
      getDirObj: {},
      showPanelForm: false,
      showPanelTable: false,
      taskDetailFlag: false,
      taskModalTitle: '',
      taskModal: '',
      formItem: {},
      formRules: {},
      query_loading: false,
      isBtnLoading: false,
      total: 0,
      pageSize: 10,
      pageNo: 1,
      tableData: [],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '任务名称',
          minWidth: maxWidth,
          key: 'jobName',
          align: 'center',
        },
        {
          title: '任务类型',
          minWidth: minWidth,
          key: 'jobType',
          align: 'center',
        },
        {
          title: '使用场景',
          minWidth: minWidth,
          key: 'jobScene',
          align: 'center',
        },
        {
          title: '模板名称',
          minWidth: maxWidth,
          key: 'templName',
          align: 'center',
        },
        {
          title: '发送时间',
          minWidth: maxWidth,
          key: 'jobTime',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const jobTime = row.jobTime
              ? this.$options.filters['formatDate'](row.jobTime , 'YYYY-MM-DD HH:mm:ss')
              : row.jobTime;
            return h('span', jobTime);
          }
        },
        {
          title: '任务状态',
          minWidth: minWidth,
          key: 'jobStatus',
          align: 'center',
        },
        {
          title: '任务描述',
          minWidth: maxWidth,
          key: 'jobDescribe',
          align: 'center',
        },
        {
          title: '创建人',
          minWidth: minWidth,
          key: 'creater',
          align: 'center',
        },
        {
          title: '创建时间',
          minWidth: maxWidth,
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
                  on: {
                    click: () => {
                      this.taskModal = 'view';
                      this.taskModalTitle = '查看任务';
                      this.currentRow = params.row;
                      this.taskDetailFlag = true;
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      params.row.jobStatus === "启用" && this.msgJob_disableJob(params.row.id)
                      params.row.jobStatus === "禁用" && this.msgJob_enableJob(params.row.id)
                    }
                  }
                },
                params.row.jobStatus === "禁用" && '启用' ||
                params.row.jobStatus === "启用" && '禁用'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    color: params.row.jobStatus === "禁用"? '#2d8cf0':'#ccc',
                  },
                  on: {
                    click: () => {
                      if (params.row.jobStatus === "禁用") {
                        this.taskModal = 'update';
                        this.taskModalTitle = '编辑任务';
                        this.currentRow = params.row;
                        this.taskDetailFlag = true;
                      }
                    }
                  }
                },
                '编辑任务'
              ),
            ]);
          }
        },
      ],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 表单查询校验
    handleSubmit() {
      this.$refs.formItem.validate(isValid => {
        if (isValid) {
          this.query_loading = true;
          this.getList();
        };
      })
    },

    // 清空重置
    clearForm() {
      this.$refs.formItem.resetFields();
    },

    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },

    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },

    // 查询任务列表
    getList() {
      api.msgJob_queryJob({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        jobType: 'system',
        ...this.formItem
      }).then(res => {
        if (res.code === 1) {
          this.$set(this, 'tableData', res.data.content);
          this.$set(this, 'total', res.data.totalElements);
        } else {
          this.$Message(res.message);
        }
        this.query_loading = false;
      }).catch(err => {
        this.query_loading = false;
        console.log(err)
      })
    },

    // 启用任务
    msgJob_enableJob(id) {
      api.msgJob_enableJob({
        id: id,
      }).then(res => {
        if (res.code === 1) {
          this.getList();
          this.$Message.success({
            content: '启用成功',
            duration: 2
          });
        } else {
          this.$Message.error(res.message);
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 禁用任务
    msgJob_disableJob(id) {
      api.msgJob_disableJob({
        id: id,
      }).then(async res => {
        if (res.code === 1) {
          await this.getList();
          this.$Message.success({
            content: '禁用成功',
            duration: 2
          });
        } else {
          this.$Message.error(res.message);
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // modal回调校验
    handleSubmitModalprops(slotProps, type) {
      console.log(slotProps)
      slotProps.validateFormData().then(isValid => {
        if (isValid) {
          this.isBtnLoading = true;
          type === 'createTask' && this.handleSubmitCreateTask(slotProps);
        } else {
          console.log(slotProps, '校验不通过');
        }
      });
    },

    // 关闭任务详情modal
    handleCancelCreateTask() {
      this.taskDetailFlag = false;
    },

    // 编辑任务
    handleSubmitCreateTask(slotProps) {
      let params = {
        ...slotProps.formItem,
        id: this.currentRow.id,
        jobScene: slotProps.formItem.jobScene_children? slotProps.formItem.jobScene_children: slotProps.formItem.jobScene,
        dataPath: null,
        jobTime: slotProps.formItem.jobTime.length > 4? day(day().format('YYYY-MM-DD') + '' + slotProps.formItem.jobTime+':00').$d: slotProps.formItem.jobTime
      };
      api.msgJob_updateMsgJob(params, {
        transformRequest: [
          function(data) {
            return JSON.stringify(data); //利用对应方法转换格式
          }
        ]
      }).then(res => {
        if (res.code === 1) {
          this.handleCancelCreateTask();
          this.getList();
          this.$Message.success('任务修改成功');
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
