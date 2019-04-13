import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { case_list, query_export, getLeafTypeList, collect_parent_children } from '@/service/getData';
import util from '@/libs/util';
import qs from 'qs';
import Cookie from 'js-cookie';

export default {
  name: 'case_search_page',
  mixins: [formValidateFun, sysDictionary],
  data() {
    const validate_money_start = (rule, value, callback) => {
      if (value && this.formItem.maxOverdueAmt && Number(value) > Number(this.formItem.maxOverdueAmt)) {
        callback(new Error('逾期应还开始金额不能大于逾期应还结束金额'));
      } else {
        callback();
      }
    };
    const validate_money_end = (rule, value, callback) => {
      if (this.formItem.minOverdueAmt) {
        this.$refs.formItem.validateField('minOverdueAmt');
      }
      callback();
    };
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
    let _this = this;

    return {
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS', 'PAY_OFF_STS'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      query: false,//案件查询权限
      detail: false,//c查看案件详情权限
      export_case: false,//导出权限
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      apply_deduct: false,//案件详情申请划扣权限
      queryLoading: false,//查询按钮loading
      exportLoading: false,//导出loading
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      totalOverdueAmt: '',
      totalCase: '',
      caseMounts: '',
      caseIds: [],
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
        minOverdueAmt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: validate_money_start,
            trigger: 'blur'
          }
        ],
        maxOverdueAmt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: validate_money_end,
            trigger: 'blur'
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {
        caseHandleStatus: '',
        prodTypes: [],
        periodCounts: [],
        userNm: '',
        idNo: '',
        mblNo: '',
        minOverdueDays: '',
        maxOverdueDays: '',
        minOverdueAmt: '',
        maxOverdueAmt: '',
        id: '',
        billNo: '',
        caseStatus: '',
        creditLevels: [],
      },
      tableData: [],
      tableColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          fixed: 'left'
        },
        {
          title: '案件状态',
          width: 100,
          align: 'center',
          key: 'caseHandleStatusName'
        },
        {
          title: '案件编码',
          width: 180,
          key: 'id',
          align: 'center',
          fixed: 'left',
          render(h, params) {
            const id = params.row.id;
            const prdTyp = params.row.prdTyp;
            const userId = params.row.userId;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    content: '查看详情',
                    placement: 'top'
                  }
                },
                [
                  h(
                    'a',
                    {
                      class: 'edit-desc',
                      on: {
                        click: () => {
                          if (!_this.detail) {
                            _this.$Message.error('很抱歉，暂无权限查看详情');
                            return;
                          }
                          window.open(
                            `${location.origin}/#/case_desc_page?caseNotest=${window.btoa(id)}&prdTyptest=${prdTyp}&readType=read&userIdtest=${userId}&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
                              _this.formItem
                            )}`
                          );
                        }
                      }
                    },
                    params.row.id
                  )
                ]
              )
            ]);
          }
        },
        {
          title: '客户姓名',
          width: 80,
          align: 'center',
          key: 'userNmHid'
        },
        {
          title: '身份证号',
          width: 150,
          align: 'center',
          key: 'idNoHid'
        },
        {
          title: '身份证归属地',
          width: 150,
          align: 'center',
          key: 'idAddr'
        },
        {
          title: '手机号',
          width: 120,
          align: 'center',
          key: 'mblNoHid'
        },
        {
          title: '产品线',
          width: 120,
          align: 'center',
          key: 'prdName'
        },
        {
          title: '账单号',
          width: 200,
          align: 'center',
          key: 'billNo',
          render(h, params) {
            return h('div', [
              h('Tooltip',
                {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    content: params.row.billNo,
                    placement: 'top'
                  }
                },
                [
                  h('span', {
                  }, params.row.billNo)
                ]
              )
            ])
          }
        },
        {
          title: '逾期金额',
          width: 120,
          sortable: true,
          align: 'center',
          key: 'overdueAmt',
          render: (h, params) => {
            let overdueAmt = params.row.overdueAmt;
            overdueAmt = overdueAmt ? this.$options.filters['money'](overdueAmt) : overdueAmt;
            return h('span', overdueAmt);
          }
        },
        {
          title: '逾期天数',
          width: 100,
          sortable: true,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '分期期数',
          width: 120,
          sortable: true,
          align: 'center',
          key: 'perdCnt'
        },
        {
          title: '到期期数',
          width: 120,
          sortable: true,
          align: 'center',
          key: 'maxPerdCnt'
        },
        {
          title: '信用级别',
          width: 150,
          sortable: true,
          align: 'center',
          key: 'creditLevel'
        },
        {
          title: '还款状态',
          width: 150,
          sortable: true,
          align: 'center',
          key: 'caseStatusName'
        },
        {
          title: '分配时间',
          width: 200,
          sortable: true,
          align: 'center',
          key: 'allotDate',
          render: (h, params) => {
            let allotDate = params.row.allotDate;
            allotDate = allotDate
              ? this.$options.filters['formatDate'](allotDate, 'YYYY-MM-DD')
              : allotDate;
            return h('span', allotDate);
          }
        },
        {
          title: '电催中心',
          width: 120,
          align: 'center',
          key: 'opCompayName'
        },
        {
          title: '组别',
          width: 120,
          align: 'center',
          key: 'opOrganizationName'
        },
        {
          title: '经办人',
          width: 100,
          align: 'center',
          key: 'opUserName'
        },
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let case_search_form = window.sessionStorage.getItem('case_search_form');
    if (case_search_form) {
      this.formItem = JSON.parse(case_search_form);
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
        case "detail": this.detail = true;
          break;
        case "export": this.export_case = true;
          break;
        case "plaintext": this.plaintext = true;
          break;
      }
    });
    Cookie.set('all_opt', this.all_opt);
    Cookie.set('plaintext', this.plaintext);
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
  },
  methods: {
    // table选中
    changeSelect(selection) {
      console.log('---------');
      this.caseIds = [];
      selection &&
        selection.forEach((element) => {
          this.caseIds.push(element.id);
        });
      if (this.caseIds.length != 0) {
        this.totalCase = this.caseIds.length;
      } else {
        this.totalCase = this.totalCase;
      }
      console.log(this.caseIds);
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
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          window.sessionStorage.setItem('case_search_form', JSON.stringify(this.formItem));
          this.pageNo = 1;
          this.getList();
        };
      });
    },
    // 案件导出
    async query_export() {
      if (this.tableData.length === 0) {
        this.$Message.error('当前无数据，无法导出');
        return;
      }
      this.exportLoading = true;
      const res = await query_export(
        {
          ...this.formItem,
          caseIds: this.caseIds,
          preTotalCases: this.totalCase,
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      util.dowloadfile('案件查询', res);
      this.exportLoading = false;
      setTimeout(() => {
        this.getList();
      }, 1000)
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return
      };
      this.queryLoading = true;
      const res = await case_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formItem
      });
      console.log(res);
      this.queryLoading = false;
      if (res.code === 1) {
        this.tableData = res.data.page.content;
        this.total = res.data.page.totalElements;
        this.pageNo = res.data.page.number;
        this.totalCase = res.data.summary.totalCount;
        this.totalOverdueAmt = res.data.summary.totalOverdueAmt;
        this.caseIds = [];
      } else {
        this.$Message.error(res.message);
      }
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
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {
        caseHandleStatus: '',
        prodTypes: [],
        periodCounts: [],
        userNm: '',
        idNo: '',
        mblNo: '',
        minOverdueDays: '',
        maxOverdueDays: '',
        minOverdueAmt: '',
        maxOverdueAmt: '',
        id: '',
        billNo: '',
        caseStatus: '',
        creditLevels: [],
      };
      window.sessionStorage.removeItem('case_search_form');
      this.$refs[name].resetFields();
    },

  }
};
