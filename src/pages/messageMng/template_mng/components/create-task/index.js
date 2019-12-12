import Cookie from 'js-cookie';
import sysDictionary from '@/mixin/sysDictionary';
import api from '@/service/'

export default {
  name: 'get-template',
  mixins: [sysDictionary],
  props: {
    getParentCodeList: Array,
    dataSource: Object,
  },
  data() {
    return {
      getDirList: ['MSG_TRIGGER_NODE', 'MSG_JOB_SCENE', 'MSG_JOB_TYPE', 'MSG_PARAM_SOURCE'],
      getDirObj: {},
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      formRules: {
        jobType: [{ required: true, message: '请选择任务类型', trigger: 'change' },],
        jobName: [{ required: true, message: '请填写任务名称', trigger: 'blur' },],
        jobScene: [{ required: true, message: '请选择使用场景', trigger: 'change' },],
        triggerNode: [{ required: true, message: '请选择节点', trigger: 'change' },],
        jobTime: [{ required: true, message: '请选择发送时间', trigger: 'change' },],
        dataType: [{ required: true, message: '请选择用户', trigger: 'change' },],
      },
      formItem: {},
      default_file_list: [],//文件list
      tableColumns: [
        {
          title: '操作',
          width: 60,
          key: 'edit',
          align: 'center',
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
                '删除'
              ),
            ])
          }
        },
        {
          title: '字段来源',
          key: 'templTypeName',
          align: 'center',
        },
        {
          title: '字段名称',
          key: 'templTypeName',
          align: 'center',
        },
        {
          title: '操作符',
          key: 'templTypeName',
          align: 'center',
        },
        {
          title: '值域',
          key: 'templTypeName',
          align: 'center',
        },
      ],
      tableData: [],
      partExpressionList: [],//字段名称list
      operatorList: [],//操作符list
      valueList: [],//值域list
    }
  },
  methods: {
    // 表单校验
    validateFormData() {
      return this.$refs.formItem.validate();
    },

    //添加单个规则
    handleAdd() {

    },

    /**
     * @desc 文件上传 移除已上传的文件
     */
    handleFileRemove(file, fileList) {
      this.default_file_list = fileList;
    },

    /**
     * @desc 文件上传 格式校验出错
     */
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 .xls, .xlsx 文件。',
      });
    },

    /**
     * @desc 文件上传 成功
     */
    handleUploadSuccess(res, file, fileList) {
      if (timer) {
        clearTimeout(timer);
      }
      if (res.code === 1) {
        this.$Message.success('文件上传成功');
        timer = setTimeout(() => {
          this.default_file_list = fileList;
        }, 300);
      } else {
        this.$Message.error(res.message);
      }
    },

    /**
     * @desc 文件上传报错
     */
    handleUploadError(error, file, fileList) {
      console.log(error, 'error');
      console.log(file, 'file');
      console.log(fileList, 'fileList');
    },

    // select
    changeSelect(val, type) {
      val && this.sysDictionary_getListByParentId(val, type);
    },

    // 数据字典动态联动
    sysDictionary_getListByParentId(itemCode, type) {
      api.sysDictionary_getListByParentId({
        itemCode: itemCode,
      }).then(res => {
        if (res.code === 1) {
          type === 'partName' && this.$set(this, 'partExpressionList', res.data);
          type === 'partExpression' && this.$set(this, 'operatorList', res.data);
          type === 'operator' && this.$set(this, 'valueList', res.data);
        } else {

        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
}
