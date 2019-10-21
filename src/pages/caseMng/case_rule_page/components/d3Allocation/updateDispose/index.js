import { divide_rules_save, getLeafTypeList, divide_download_template, divide_rules_edit, collect_getLeafTypeListByIds } from '@/service/getData';
import formValidateFun from "@/mixin/formValidateFun";
import sysDictionary from "@/mixin/sysDictionary";
import Cookie from 'js-cookie';
import util from '@/libs/util';

export default {
  name: 'UpdateDispose',
  props: ["showUpdateDispose", 'updateData'],
  mixins: [formValidateFun, sysDictionary],
  data() {
    const validate_day_start = (rule, value, callback) => {
      if (value==='') {
        callback(new Error("请输入逾期天数"));
      }
      if (Number(value) > 999) {
        callback(new Error("天数不能大于999"));
      }
      if (
        value &&
        this.formItem.ovdudaysMax &&
        Number(value) > Number(this.formItem.ovdudaysMax)
      ) {
        console.log(this.formItem.ovdudaysMax);
        callback(new Error("开始不能大于结束"));
      } else {
        callback();
      }
    };
    const validate_day_end = (rule, value, callback) => {
      if (value==='') {
        callback(new Error("请输入逾期天数"));
      }
      if (Number(value) > 999) {
        callback(new Error("天数不能大于999"));
      }
      if (this.formItem.ovdudaysMin) {
        this.$refs.formItem.validateField("ovdudaysMin");
      }
      callback();
    };
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      titleDesc: '',
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      divideRuleUserVos: [], //汇款率接口参数list
      allotRoleIdList: [], //人员角色idlist
      allotNameList: [], //人员名字list
      import_search: true,// 导入查询权限
      download_import_data: false,
      file_url: '/admin/divide/batch/import',//文件上传地址
      import_data_loading: false,// 导入loading
      showDispose: true,
      formItem: {
        ruleType: '02',
      },
      ruleValidate: {
        prodTypeList: [
          {
            required: true,
            type: "string",
            message: "请选择产品线",
          }
        ],
        ovdudaysMin: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            trigger: "blur"
          },
          {
            validator: validate_day_start,
            trigger: "blur"
          }
        ],
        ovdudaysMax: [
          {
            pattern: this.GLOBAL.num,
            message: "逾期天数为正整数",
            trigger: "blur"
          },
          {
            validator: validate_day_end,
            trigger: "blur"
          }
        ],
        effectMinDt: [
          {
            required: true,
            type: "date",
            message: "请选择分案日期",
            trigger: 'change'
          }
        ],
        collectDateSta: [
          {
            required: true,
            type: "date",
            message: "请选择预设案件量时间",
            trigger: 'change'
          }
        ],
        collectDateEnd: [
          {
            required: true,
            type: "date",
            message: "请选择接案截至时间",
            trigger: 'change'
          }
        ],
        remainAllotType: [

          {
            required: true,
            type: "string",
            message: "请选择余案分配方式"
          }
        ],
        opOrganizationList: [
          {
            required: true,
            message: "请选择适用分案人员",
            trigger: "change",
            type: "array"
          }
        ],
      },
      getDirList: [
        "DIVIDE_PROD_TYPE",
        "DIVIDE_PROD_CNT",
        "DIVIDE_CREDIT_LEVEL",
        "CASE_HANDLE_STATUS",
        "ALLOT_TYPE",
        "DIVIDE_PROD_NUM",
        'ALLOT_TYPE'
      ], //s数据字典传的字段
      getDirObj: {},

      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        paddingTop: '23px',
        position: 'static',
      },
      update_loading: false,
      add_handle:true,
      tableData: [],
      tableColumns: [
        {
          title: '姓名',
          align: "center",
          key: 'opUserName'
        },
        {
          title: '回款率',
          align: "center",
          key: 'collectRate'
        },
      ],
    };

  },
  watch: {
    updateData: function (value) {
      if(Object.keys(value).length !== 0){
        this.tableData = []
        this.formItem.ruleType = '02'
        this.titleDesc = value.disabled ? '查看率值' : '修改配置'
        this.getData(value)
      }
    }
  },
  created() {
    this.getLeafTypeList('02', []);
    // this.getLeafTypeList('03', []);
    // this.getLeafTypeList('04', []);
  },
  methods: {
    async getData(value) {
      const res = await divide_rules_edit({
        id: value.id
      });
      if (res.code === 1) {
        this.formItem = res.data;
        this.formItem.ruleType = '02'
        this.formItem.disabled = value.disabled
        this.tableData = res.data.allotUserList
        this.formItem.allotUserList = res.data.allotUserList
      } else {
        this.$Message.error(res.message);
      }
    },
    // 电催中心change
    companyChange(value) {
//      this.getLeafTypeList('03', value);
//      this.getLeafTypeList('04', value);
      if(value.length === 0){
        this.department_list_data = []
        this.formItem.searchDepartmentIds = ''
      } else {
        this.getLeafTypeList('03', value);
      }
    },
    // 部门change
    departmentChange(value) {
      if(value.length === 0){
        this.collect_list_data = []
        this.formItem.searchPersonIds = ''
      } else {
        this.getLeafTypeList('04', value);
      }
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await collect_getLeafTypeListByIds({
        // status: "1",
        leafType: type,
        parentIds: parent || []
      });
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.company_list_data = res.data;
            break;
          case "03":
            this.department_list_data = res.data;
            break;
          case "04":
            this.collect_list_data = res.data;
            break;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    closeDrawer() {

    },

    async handleSubmit() {
      this.$refs['formItem'].validate(async valid => {
        if (valid) {
          if (this.formItem.allotUserList.length === 0) {
            this.$Message.error('请先导入分案率值')
            return
          }
          this.update_loading = true
          let res = await divide_rules_save(
            {
              ...this.formItem,
              effectMinDt:  this.$options.filters['formatDate'](this.formItem.effectMinDt, 'YYYYMMDD'),
              collectDateSta: this.$options.filters['formatDate'](this.formItem.collectDateSta, 'YYYY-MM-DD HH:mm:ss'),
              collectDateEnd: this.$options.filters['formatDate'](this.formItem.collectDateEnd, 'YYYY-MM-DD HH:mm:ss'),
              prodTypeList: [this.formItem.prodTypeList],
            },
            {
              transformRequest: [
                function (data) {
                  return JSON.stringify(data); //利用对应方法转换格式
                }
              ]
            }
          );
          this.update_loading = false
          if (res.code === 1) {
            this.formItem = {
              ruleType: '02',
            }
            this.$emit("passBack", 'change');
          } else {
            this.$Message.error(res.message)
          }
        }
      })
    },
    handleCancel() {
      this.$refs['formItem'].resetFields();
      this.$emit("passBack");
    },

    // 上传文件格式校验
    handleFormatError(file) {
      this.$Message.error('请选择Excel文件上传');
    },
    // 上传文件大小校验
    handleMaxSize(file) {
      this.$Message.error('文件大小不得超过1M');
    },
    // 文件上传时
    handleProgress() {
      this.import_data_loading = true;
    },
    // 上传文件失败
    handleError(error, file) {
      console.log(error);
      this.import_data_loading = false;
    },
    // 文件上传成功
    handleSuccess(res, file) {
      this.import_data_loading = false;
      if (res.code === 1) {
        this.tableData = res.data;
        this.formItem.allotUserList = res.data
      } else {
        this.$Message.error(res.message);
      }
    },
    // 下载导入查询模板
    async download_import() {
      this.download_import_data = true;
      const res = await divide_download_template(
        {},
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      this.download_import_data = false;
      util.dowloadfile('导入查询模板', res);
    },
  }
};
