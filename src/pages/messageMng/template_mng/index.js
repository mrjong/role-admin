import sysDictionary from '@/mixin/sysDictionary';
import configParameter from "./components/config-parameter/index.vue";
import getTemplate from "./components/get-template/index.vue";
import newTask from "./components/create-task/index.vue";

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
      getDirList: ['DIVIDE_PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS', '01_02_EFFECT_INVAL'],
      getDirObj: {},
      formItem: {},
      formRules: {},
      showPanelForm: false,
      showPanelTable: false,
      parameterFlag: false,//参数配置modal
      getTemplateFlag: false,//获取模板modal
      createTaskFlag: false,//创建任务模板modal
      total: 0,
      pageNo: 1,
      pageSize: 10,
      tableData: [
        {
          templName: '13'
        }
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
                  on: {
                    click: () => {
                      this.parameterFlag = true;
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
    }
  },
  created() {

  },
  methods: {
    handleSubmit(name) {

    },

    clearForm() {
      this.$refs.formItem.resetFields();
    },

    // modal回调校验
    handleSubmitModalprops(slotProps) {
      console.log(slotProps)
      slotProps.validateFormData().then(isValid => {
        if (isValid) {
          this.isBtnLoading = true;
        } else {
          console.log(slotProps, '校验不通过');
        }
      });
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

    // 关闭参数配置modal
    handleCancelParameter() {
      this.parameterFlag = false;
    },

    // 参数配置确定提交
    handleSubmitParameter(slotProps) {

    },

    // 关闭获取模板modal
    handleCancelTemplate() {
      this.getTemplateFlag = false;
    },

    // 获取模板确定提交
    handleSubmitTemplate(slotProps) {

    },

    // 关闭创建任务modal
    handleCancelCreateTask() {
      this.createTaskFlag = false;
    },

    // 创建任务的提交
    handleSubmitCreateTask(slotProps) {

    }
  },
}
