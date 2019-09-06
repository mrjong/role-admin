import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { arb_list, getLeafTypeList, credit_pdf_data, arb_exportlist } from '@/service/getData';
import util from '@/libs/util';
import Cookie from 'js-cookie';

export default {
  name: 'roune_record',
  mixins: [formValidateFun, sysDictionary],

  data() {
    const validate_day_start = (rule, value, callback) => {
      if (value && this.formItem.maxOverdueDays && Number(value) > Number(this.formItem.maxOverdueDays)) {
        console.log(this.formItem.maxOverdueDays)
        callback(new Error('逾期开始天数不能大于逾期结束天数'));
      } else {
        callback();
      }
    };
    const validate_day_end = (rule, value, callback) => {
      if (this.formItem.minOverdueDays) {
        this.$refs.formItem.validateField('minOverdueDays');
      }
      callback();
    };
    const _this = this;
    const width_common = 110;
    return {
      getDirList: ['PROD_TYPE', 'GENDER', 'APPROVAL_STATE'],
      getDirObj: {},
      showPanel: false,
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      showPanel2: false,
      query: false,//查询权限
      audit: false,//审核权限
      export_case: false,//导出权限
      query_loading: false,//查询按钮loading
      applyTime: [],//申请时间区间
      approvalTime: [],//审核时间区间
      export_case_loading: false,//导出loading
      export_list: [],//导出的list
      ruleValidate: {
        idNo: [
          {
            pattern: this.GLOBAL.idNo,
            message: '请输入正确身份证号',
            trigger: 'blur'
          }
        ],
        mblNo: [
          {
            pattern: this.GLOBAL.mblNo,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ],
        minOverdueDays: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: validate_day_start,
            trigger: 'blur'
          }
        ],
        maxOverdueDays: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: validate_day_end,
            trigger: 'blur'
          }
        ],
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {
        productTypes: []
      },
      tableData: [],
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          type: 'index',
          title: '序号',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '案件编号',
          width: 180,
          align: 'center',
          key: 'caseNo'
        },
        {
          title: '账单号',
          width: 200,
          align: 'center',
          key: 'billNo'
        },
        {
          title: '逾期天数',
          width: width_common,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '本人拨打(次)',
          width: width_common,
          align: 'center',
          key: 'caseAmt'
        },
        {
          title: '紧联拨打(次)',
          width: width_common,
          align: 'center',
          key: 'productName'
        },

        {
          title: '通讯录拨打(个)',
          width: width_common,
          align: 'center',
          key: 'perdCnt'
        },
        {
          title: '通讯录接听(个)',
          width: width_common,
          align: 'center',
          key: 'userNameHid'
        },
        {
          title: '达标情况',
          width: width_common,
          align: 'center',
          key: 'idCardNoHid'
        },
        {
          title: '当日轮次',
          width: width_common,
          align: 'center',
          key: 'mblNo'
        },
        {
          title: '总轮次',
          width: width_common,
          align: 'center',
          key: 'mblNo'
        },
        {
          title: '经办人',
          width: width_common,
          align: 'center',
          key: 'opUserName'
        },
        {
          title: '组别',
          width: width_common,
          align: 'center',
          key: 'approvalUserName'
        },
        {
          title: '电催中心',
          width: width_common,
          align: 'center',
          key: 'opCompayName'
        },
        {
          title: '审核时间',
          width: 150,
          align: 'center',
          key: 'approvalTime',
          render: (h, params) => {
            let approvalTime = params.row.approvalTime;
            approvalTime = approvalTime
              ? this.$options.filters['formatDate'](approvalTime, 'YYYY-MM-DD HH:mm:ss')
              : approvalTime;
            return h('span', approvalTime);
          }
        },
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let arbitrament_approve_form = window.sessionStorage.getItem('arbitrament_approve_form');
    if (arbitrament_approve_form) {
      this.formItem = JSON.parse(arbitrament_approve_form);
      // 获取缓存的申请时间
      this.applyTime = [
        JSON.parse(arbitrament_approve_form).applyTimeLt,
        JSON.parse(arbitrament_approve_form).applyTimeBt,
      ];
      // 获取缓存的审核时间
      this.approvalTime = [
        JSON.parse(arbitrament_approve_form).approvalTimeLt,
        JSON.parse(arbitrament_approve_form).approvalTimeBt,
      ];
    }
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        case "audit": this.audit = true;
          break;
        case "upload": this.upload = true;
          break;
        case "execution": this.execution = true;
          break;
        case "export": this.export_case = true;
          break;
      }
    });
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
  },
  methods: {
    // table勾选回调
    changeSelect(arr) {
      this.approve_list = [];
      this.export_list = [];
      let obj = {};
      arr.forEach(item => {
        obj = {
          id: item.approvalId,
          caseNo: item.caseNo,
        }
        this.approve_list.push(obj);
        this.export_list.push(item.approvalId);
      });
      console.log(this.approve_list)
    },
    // 导出数据
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info('当前无数据，无法导出');
        return;
      }
      this.export_case_loading = true;
      const res = await arb_exportlist(
        {
          ...this.formItem,
          ids: this.export_list,
        },
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      this.export_case_loading = false;
      util.dowloadfile('仲裁审批', res);
    },
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    //申请时间监听
    changeApplyTime(val) {
      this.formItem.applyTimeLt = val[0];
      this.formItem.applyTimeBt = val[1];
    },
    //审核时间监听
    changeApprovalTime(val) {
      this.formItem.approvalTimeLt = val[0];
      this.formItem.approvalTimeBt = val[1];
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

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.applyTime) {
            this.applyTime = [
              this.formItem.applyTimeLt,
              this.formItem.applyTimeBt
            ]
          };
          if (this.approvalTime) {
            this.approvalTime = [
              this.formItem.approvalTimeLt,
              this.formItem.approvalTimeBt
            ]
          }
          window.sessionStorage.setItem('arbitrament_approve_form', JSON.stringify(this.formItem))
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await getLeafTypeList({
        // status: "1",
        leafType: type,
        parentId: parent || ""
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
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      };
      this.query_loading = true;
      // delete this.formItem.approvalTimeLt;
      // delete this.formItem.applyTimeLt;
      const res = await arb_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.export_list = [];
        this.pageNo = res.data.number;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {
        productTypes: []
      };
      this.applyTime = [];
      this.approvalTime = [];
      window.sessionStorage.removeItem('arbitrament_approve_form');
      this.$refs[name].resetFields();
    }
  }
};
