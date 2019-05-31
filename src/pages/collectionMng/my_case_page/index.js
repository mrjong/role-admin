import {
  case_collect_case_list,
  case_collect_case_list_export,
  collectcode_getListByCodeType
} from '@/service/getData';
import formValidateFun from '@/mixin/formValidateFun';
import tablePage from '@/mixin/tablePage';
import qs from 'qs';
import sysDictionary from '@/mixin/sysDictionary';
import util from '@/libs/util';
import Cookie from 'js-cookie';

export default {
  name: 'case_search_page',
  mixins: [formValidateFun, sysDictionary, tablePage],
  data() {
    const validate_yqts_start = (rule, value, callback) => {
      if (value && this.formItem.maxOverdueDays && Number(value) > Number(this.formItem.maxOverdueDays)) {
        console.log(this.formItem.maxOverdueDays);
        callback(new Error('逾期开始天数不能大于逾期结束天数'));
      } else {
        callback();
      }
    };
    const validate_yqts_end = (rule, value, callback) => {
      if (this.formItem.minOverdueDays) {
        this.$refs.formItem.validateField('minOverdueDays');
      }
      callback();
    };
    const validate_yqyhje_start = (rule, value, callback) => {
      if (value && this.formItem.maxOverdueAmt && Number(value) > Number(this.formItem.maxOverdueAmt)) {
        callback(new Error('开始金额不能大于结束金额'));
      } else {
        callback();
      }
    };
    const validate_yqyhje_end = (rule, value, callback) => {
      if (this.formItem.minOverdueAmt) {
        this.$refs.formItem.validateField('minOverdueAmt');
      }
      callback();
    };
    console.log(this.GLOBAL);
    const _this = this;
    return {
      getDirObj2: {},
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'TALK_RESULT'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      query: false,//查询权限
      detail: false,//查看案件详情权限
      export_case: false,//导出权限
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      apply_arbitrament: false,//案件详情申请仲裁权限
      apply_deduct: false,//案件详情申请划扣权限
      apply_remission: false,//案件详情申请减免权限
      query_loading: false,//查询按钮loading
      export_case_loading: false,//导出按钮loading
      summary: {},
      ruleValidate: {
        // idNo: [
        // 	{
        // 		pattern: this.GLOBAL.idNo,
        // 		message: '请输入正确身份证号',
        // 		trigger: 'blur'
        // 	}
        // ],
        // mblNo: [
        // 	{
        // 		pattern: this.GLOBAL.mblNo,
        // 		message: '请输入正确手机号',
        // 		trigger: 'blur'
        // 	}
        // ],
        minOverdueDays: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: validate_yqts_start,
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
            validator: validate_yqts_end,
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
            validator: validate_yqyhje_start,
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
            validator: validate_yqyhje_end,
            trigger: 'blur'
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {
        prodTypes: [],
        periodCounts: [],
        creditLevels: []
      },
      tableData: [],
      tableColumns: [
        {
          title: '序号',
          type: 'index',
          width: 50,
          fixed: 'left',
          align: 'center',
        },
        {
          title: '案件编号',
          width: 180,
          key: 'id',
          align: 'center',
          fixed: 'left',
          render(h, params) {
            const id = params.row.id;
            const prdTyp = params.row.prdTyp;
            const userId = params.row.userId;
            const eyeFlag = params.row.eyeFlag;
            let seatType = sessionStorage.getItem('seatType');
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    content: '查看详情',
                    placement: 'top',
                    transfer: true
                  }
                },
                [
                  h('Icon', {
                    props: {
                      type: 'ios-ionitron-outline',
                      size: '16'
                    },
                    style: {
                      'vertical-align': 'top',
                      'margin-right': '5px',
                      color: '#EF0D33',
                      display: eyeFlag? 'inline-block': 'none'
                    }
                  }),
                  h(
                    'a',
                    {
                      class: 'edit-desc',
                      on: {
                        click: () => {
                          if (!_this.detail) {
                            _this.$Message.error('很抱歉，暂无权限查看详情');
                            return
                          }
                          window.open(
                            `${location.origin}/#/case_desc_page?caseNotest=${window.btoa(id)}&prdTyptest=${prdTyp}&readType=edit&userIdtest=${userId}&seatType=${seatType
                              ? seatType
                              : 'KT'}&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
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
          width: 60,
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
          title: '手机号',
          width: 100,
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
          title: '产品期数',
          width: 120,
          align: 'center',
          key: 'perdCnt'
        },
        {
          title: '账单号',
          width: 180,
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
          title: '到期期数',
          width: 100,
          sortable: true,
          align: 'center',
          key: 'maxPerdCnt'
        },
        {
          title: '身份证属地',
          width: 200,
          align: 'center',
          key: 'idAddr'
        },

        {
          title: '信用级别',
          width: 120,
          sortable: true,
          align: 'center',
          key: 'creditLevel'
        },
        {
          title: '分配时间',
          width: 150,
          sortable: true,
          align: 'center',
          key: 'allotDate',
          render: (h, params) => {
            let allotDate = params.row.allotDate;
            allotDate = allotDate
              ? this.$options.filters['formatDate'](allotDate, 'YYYY-MM-DD HH:mm:ss')
              : allotDate;
            return h('span', allotDate);
          }
        },
        {
          title: '最后催收时间',
          width: 150,
          align: 'center',
          key: 'lastCurrentCollectDate',
          render: (h, params) => {
            let lastCurrentCollectDate = params.row.lastCurrentCollectDate;
            lastCurrentCollectDate = lastCurrentCollectDate
              ? this.$options.filters['formatDate'](lastCurrentCollectDate, 'YYYY-MM-DD HH:mm:ss')
              : lastCurrentCollectDate;
            return h('span', lastCurrentCollectDate);
          }
        },
        {
          title: '借款人拨打状态',
          width: 120,
          align: 'center',
          key: 'lastCurrentCollectResultName'
        },

        {
          title: '借款人沟通结果',
          width: 120,
          align: 'center',
          key: 'lastCurrentCollectStsName'
        },
        {
          title: '承诺还款时间',
          width: 130,
          sortable: true,
          align: 'center',
          key: 'promiseRepayDate',
          render: (h, params) => {
            let promiseRepayDate = params.row.promiseRepayDate;
            promiseRepayDate = promiseRepayDate
              ? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD HH:mm:ss')
              : promiseRepayDate;
            return h('span', promiseRepayDate);
          }
        },
        {
          title: '紧急联系人拨打状态',
          width: 120,
          align: 'center',
          key: 'lastCntCollectResultName'
        },
        {
          title: '是否提交仲裁',
          width: 120,
          align: 'center',
          key: 'isSubmitName',
        }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let my_case_form = window.sessionStorage.getItem('my_case_form');
    if (my_case_form) {
      this.formItem = JSON.parse(my_case_form);
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
        case "all_opt": this.all_opt = true;
          break;
        case "plaintext": this.plaintext = true;
          break;
        case "apply_arbitrament": this.apply_arbitrament = true;
          break;
        case "apply_deduct": this.apply_deduct = true;
          break;
        case "apply_remission": this.apply_remission = true;
          break;
      }
    });
    Cookie.set('all_opt', this.all_opt);
    Cookie.set('plaintext', this.plaintext);
    Cookie.set('apply_arbitrament', this.apply_arbitrament);
    Cookie.set('apply_deduct', this.apply_deduct);
    Cookie.set('apply_remission', this.apply_remission);
    // 沟通状态
    this.collectcode_getListByCodeType();
    this.getList();
  },
  methods: {
    // 获取表格数据
    async getList() {
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无权限查询');
      //   return
      // };
      this.query_loading = true;
      const res = await case_collect_case_list({
        ...this.formItem,
        pageSize: this.pageSize,
        pageNum: this.pageNo
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.page.content;
        this.pageSize = res.data.page.size;
        this.total = res.data.page.totalElements;
        this.summary = res.data.summary;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 沟通状态
    async collectcode_getListByCodeType() {
      const res = await collectcode_getListByCodeType({
        codeType: 'COLLECT_STS'
      });
      if (res.code === 1) {
        this.getDirObj2 = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSubmit(name) {
      this.pageNo = 1;
      this.$refs[name].validate((valid) => {
        if (valid) {
          window.sessionStorage.setItem('my_case_form', JSON.stringify(this.formItem));
          this.getList();
        }
      });
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {
        prodTypes: [],
        periodCounts: [],
        creditLevels: []
      };
      window.sessionStorage.removeItem('my_case_form');
      this.$refs[name].resetFields();
    },
    // 获取表格数据
    async case_collect_case_list_export() {
      this.export_case_loading = true;
      const res = await case_collect_case_list_export(
        {
          ...this.formItem
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      util.dowloadfile('我的案件', res);
      this.export_case_loading = false;
    }
  }
};
