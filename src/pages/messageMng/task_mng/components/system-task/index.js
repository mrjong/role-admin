import sysDictionary from '@/mixin/sysDictionary';
import api from '@/service/';
export default {
  name: 'system-task',
  mixins: [sysDictionary],
  data() {
    const minWidth = 80;
    const middleWidth = 120;
    const maxWidth = 150;
    return {
      getDirList: ['DIVIDE_PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS', '01_02_EFFECT_INVAL'],
      getDirObj: {},
      showPanelForm: false,
      showPanelTable: false,
      formItem: {},
      formRules: {},
      query_loading: false,
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
          minWidth: middleWidth,
          key: 'jobTime',
          align: 'center',
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
          key: 'createUser',
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
                  on: {
                    click: () => {
                      this.parameterFlag = true;
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
                      this.createTaskFlag = true;
                    }
                  }
                },
                '启用'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.createTaskFlag = true;
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
    }
  },
}
