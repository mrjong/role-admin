import Cookie from 'js-cookie';
import sysDictionary from '@/mixin/sysDictionary';
import api from '@/service/'
import day from 'dayjs'
import { isValid } from 'ipaddr.js';

export default {
  name: 'get-template',
  mixins: [sysDictionary],
  props: {
    getParentCodeList: Array,
    dataSource: Object,
    disabled: Boolean
  },
  data() {
    return {
      getDirList: ['MSG_TRIGGER_NODE', 'MSG_JOB_SCENE', 'MSG_JOB_TYPE', 'MSG_DATA_SOURCE', 'MSG_OPERATOR'],
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
        jobScene_children: [{ required: true, message: '请选择发送时间', trigger: 'change' },],
        jobTime: [{ required: true, message: '请选择发送时间', trigger: 'change' },],
        dataType: [{ required: true, message: '请选择用户', trigger: 'change' },],
        source: [{ required: true, message: '请选择字段来源', trigger: 'change' },],
        partName: [{ required: true, message: '请选择字段名称', trigger: 'change' },],
        operator: [{ required: true, message: '请选择操作符', trigger: 'change' },],
        value: [{ required: true, message: '请选择值域', trigger: 'change' },],
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
          key: 'partNameShow',
          align: 'center',
        },
        {
          title: '字段名称',
          key: 'sourceShow',
          align: 'center',
        },
        {
          title: '操作符',
          key: 'operatorShow',
          align: 'center',
        },
        {
          title: '值域',
          key: 'valueShow',
          align: 'center',
        },
      ],
      tableData: [],
      partNameList: [],//字段名称list
      operatorList: [],//操作符list
      valueList: [],//值域list
      copyObj: {},//暂存添加到列表的数据
    }
  },
  created() {
    console.log(this.dataSource);
    this.dataSource && this.msgJob_queryJobById();
  },
  methods: {
    // 表单校验
    validateFormData() {
      return this.$refs.formItem.validate();
    },

    //添加单个规则
    handleAdd() {
      this.$refs.formItem.validate(isValid => {
        if (isValid) {
          this.tableData.push(this.copyObj);
          this.$set(this, 'copyObj', {});
          // this.$set(this.formItem, 'partName', null);
          // this.$set(this.formItem, 'source', null)
          // this.$set(this.formItem, 'operator', null)
          // this.$set(this.formItem, 'value', null)
        }
      })
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
        var timer = setTimeout(() => {
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

    // 输入框失焦
    inputBlur(e) {
      console.log(e.target.value)
      this.$set(this.copyObj, 'valueShow', e.target.value);
    },

    // select
    changeSelect(obj, type) {
      if (obj) {
        switch (type) {
          case 'source':
            this.$set(this.formItem, 'operator', null)
            this.$set(this.formItem, 'value', null)
            this.$set(this.formItem, 'partName', null)
            this.$set(this.copyObj, 'source', obj.value);
            this.$set(this.copyObj, 'sourceShow', obj.label);
            break;
          case 'partName':
            this.$set(this.formItem, 'operator', null)
            this.$set(this.formItem, 'value', null)
            this.$set(this.copyObj, 'partName', obj.value);
            this.$set(this.copyObj, 'partNameShow', obj.label);
            break;
          case 'operator':
            this.$set(this.copyObj, 'operator', obj.value);
            this.$set(this.copyObj, 'operatorShow', obj.label);
            break;
          case 'value':
            this.$set(this.copyObj, 'value', obj.value);
            this.$set(this.copyObj, 'valueShow', obj.label);
            break;
          default:
            break;
        }
      }
      console.log(obj)
      obj && this.sysDictionary_getListByParentId(obj.value, type);
    },

    // 数据字典动态联动
    sysDictionary_getListByParentId(itemCode, type) {
      api.sysDictionary_getListByParentId({
        itemCode: itemCode,
      }).then(res => {
        if (res.code === 1) {
          type === 'source' && this.$set(this, 'partNameList', res.data);
          type === 'partName' && this.$set(this, 'operatorList', res.data);
        } else {

        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取任务详情接口
    msgJob_queryJobById() {
      api.msgJob_queryJobById({
        id: this.dataSource.id,
      }).then(res => {
        if (res.code === 1) {
          let { jobType, jobName, jobScene, triggerNode, jobTime, dataType, jobDescribe, conditions } = res.data;
          this.$set(this.formItem, 'jobType', jobType);
          this.$set(this.formItem, 'jobName', jobName);
          this.$set(this.formItem, 'jobScene', jobScene);
          jobType === 'system' && jobScene === 'repeat' && this.$set(this.formItem, 'jobScene', 'timing');
          this.$set(this.formItem, 'triggerNode', triggerNode);
          jobType === 'system' && this.$set(this.formItem, 'jobTime', day(jobTime).format('HH:mm'));
          jobType === 'artificial' && this.$set(this.formItem, 'jobTime', day(jobTime).format('yyyy-MM-dd HH:mm'));
          conditions && this.$set(this, 'tableData', conditions)
          console.log(this.tableData)
          this.$set(this.formItem, 'dataType', dataType);
          this.$set(this.formItem, 'jobDescribe', jobDescribe);
          this.$set(this.formItem, 'jobScene_children', jobScene);
          console.log(this.formItem)
        } else {
          this.$Message.error(res.message);
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
}
