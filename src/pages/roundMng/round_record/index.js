import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { collectRoundsRecords_list, getLeafTypeList, collectRoundsRecords_export } from '@/service/getData';
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
      getDirList: ['COLLECT_ROUNDS_OVER'],
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
      applyTime: [],//统计时间区间
      export_case_loading: false,//导出loading
      recordIdList: [],//导出的list
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
          key: 'debtorCall'
        },
        {
          title: '紧联拨打(次)',
          width: width_common,
          align: 'center',
          key: 'urgencyCall'
        },

        {
          title: '通讯录拨打(个)',
          width: width_common,
          align: 'center',
          key: 'contactCall'
        },
        {
          title: '通讯录接听(个)',
          width: width_common,
          align: 'center',
          key: 'contactAnswer'
        },
        {
          title: '达标情况',
          width: width_common,
          align: 'center',
          key: 'isOverName'
        },
        {
          title: '当日轮次',
          width: width_common,
          align: 'center',
          key: 'currentRounds'
        },
        {
          title: '总轮次',
          width: width_common,
          align: 'center',
          key: 'totalRounds'
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
          key: 'opOrganizationName'
        },
        {
          title: '电催中心',
          width: width_common,
          align: 'center',
          key: 'opCompayName'
        },
        {
          title: '统计日期',
          width: 150,
          align: 'center',
          key: 'logDate',
          // render: (h, params) => {
          //   let updateTime = params.row.updateTime;
          //   updateTime = updateTime
          //     ? this.$options.filters['formatDate'](updateTime, 'YYYY-MM-DD HH:mm:ss')
          //     : updateTime;
          //   return h('span', updateTime);
          // }
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
    this.getList();
  },
  methods: {
    // table勾选回调
    changeSelect(arr) {
      this.recordIdList = [];
      arr.forEach(item => {
        this.recordIdList.push(item.id);
      });
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
      this.formItem.logDateStart = val[0];
      this.formItem.logDateEnd = val[1];
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
              this.formItem.logDateStart,
              this.formItem.logDateEnd
            ]
          };
          window.sessionStorage.setItem('arbitrament_approve_form', JSON.stringify(this.formItem))
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 轮次记录导出
    async collectRoundsRecords_export() {
      if (this.tableData.length === 0) {
        this.$Message.info('当前无数据，无法导出');
        return;
      }
      this.export_case_loading = true;
      const res = await collectRoundsRecords_export(
        {
          recordIdList: this.recordIdList,
          ...this.formItem
        },
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      this.export_case_loading = false;
      util.dowloadfile("轮次记录", res);
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
      this.query_loading = true;
      // delete this.formItem.approvalTimeLt;
      // delete this.formItem.applyTimeLt;
      const res = await collectRoundsRecords_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.recordIdList = [];
        this.pageNo = res.data.number;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.applyTime = [];
      window.sessionStorage.removeItem('arbitrament_approve_form');
      this.$refs[name].resetFields();
    }
  }
};
