import {
  case_collect_case_list,
  case_collect_case_list_export,
  collectcode_getListByCodeType,
  case_detail_one_channel
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
      collect_status_list: [],
      call_status_list: [],
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'TALK_RESULT', 'APP_LOGIN_STATUS', 'DICTIONARY_PROCESS_SEARCH'],
      getDirObj: {},
      case_detail_one_channel_list: [],//渠道来源list
      showPanel: false,
      showPanel2: false,
      query: false,//查询权限
      detail: false,//查看案件详情权限
      export_case: false,//导出权限
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      addressListPhone: false,//查看通讯录电话权限
      contactPhone: false,//查看紧连明文权限
      oneselfPhone: false,//查看本人明文权限
      apply_arbitrament: false,//案件详情申请仲裁权限
      apply_deduct: false,//案件详情申请划扣权限
      apply_remission: false,//案件详情申请减免权限
      APPLY_QR_CODE: false,//收款二维码权限
      query_loading: false,//查询按钮loading
      export_case_loading: false,//导出按钮loading
      summary: {},
      ruleValidate: {
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
                    transfer: true,
                    disabled: !params.row.canCollect ? true : false
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
                      display: eyeFlag ? 'inline-block' : 'none'
                    }
                  }),
                  params.row.canCollect ?
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
                                : 'KT'}&caseType=myCase&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
                                  _this.formItem
                                )}`
                            );
                          }
                        }
                      },
                      params.row.id
                    ) : h('span', {
                      style: {
                        color: '#ccc'
                      }
                    }, params.row.id)
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
          width: 100,
          align: 'center',
          key: 'prdName'
        },
        {
          title: '产品期数',
          width: 100,
          align: 'center',
          key: 'perdCnt'
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
          width: 100,
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
          title: '当日拨打轮次',
          width: 120,
          align: 'center',
          key: 'todayRounds'
        },
        {
          title: '拨打总轮次',
          width: 120,
          align: 'center',
          key: 'totalRounds'
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
        },
        {
          title: '渠道来源',
          width: 100,
          align: 'center',
          key: 'channelName'
        },
        {
          title: '信用进度',
          width: 120,
          align: 'center',
          key: 'processStageName'
        },
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
        case "APPLY_QR_CODE": this.APPLY_QR_CODE = true;
          break;
        case "oneselfPhone": this.oneselfPhone = true;
          break;
        case "contactPhone": this.contactPhone = true;
          break;
        case "addressListPhone": this.addressListPhone = true;
          break;
      }
    });
    Cookie.set('all_opt', this.all_opt);
    Cookie.set('plaintext', this.plaintext);
    Cookie.set('apply_arbitrament', this.apply_arbitrament);
    Cookie.set('apply_deduct', this.apply_deduct);
    Cookie.set('apply_remission', this.apply_remission);
    Cookie.set('APPLY_QR_CODE', this.APPLY_QR_CODE);
    Cookie.set('oneselfPhone', this.oneselfPhone);
    Cookie.set('contactPhone', this.contactPhone);
    Cookie.set('addressListPhone', this.addressListPhone);
    this.collectcode_getListByCodeType(1);//获取沟通状态
    this.collectcode_getListByCodeType(2);// 获取拨打状态
    this.getList();
    this.case_detail_one_channel();
    if (document.hidden !== undefined) {
      document.addEventListener("visibilitychange", () => {
        // true 表示离开  false表示回来，再进行初始化
        console.log(document.hidden)
        !document.hidden && this.getList();
      });
    }
  },
  methods: {
    // 日期变更回调
    dateChange(val, key) {
      switch (key) {
        case 'collect_Date':
          this.formItem.beginLastCollectDate = val[0];
          this.formItem.endLastCollectDate = val[1];
          break;
        case 'distribute_Date':
          this.formItem.beginAllotDate = val[0];
          this.formItem.endAllotDate = val[1];
          break;
        case 'login_Date':
          this.formItem.beginAppLoginDate = val[0];
          this.formItem.endAppLoginDate = val[1];
          break;
        default:
          break;
      }
    },
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
        // 是否为开案阶段
        if (res.data.loadingText) {
          this.$store.commit("changeSpinData", res.data.loadingText);
          let timer;
          setTimeout(() => {
            this.$store.commit("changeSpinData", '');
          }, 3000);
          clearTimeout(timer);
        }
        this.tableData = res.data.page.content;
        this.pageSize = res.data.page.size;
        this.total = res.data.page.totalElements;
        this.summary = res.data.summary;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 沟通状态
    async collectcode_getListByCodeType(type) {
      const res = await collectcode_getListByCodeType({
        codeType: type === 1 ? 'COLLECT_STS' : 'TALK_RESULT'
      });
      if (res.code === 1) {
        if (type === 1) {
          this.collect_status_list = res.data;
        } else {
          this.call_status_list = res.data;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取渠道来源
    async case_detail_one_channel() {
      const res = await case_detail_one_channel();
      if (res.code === 1) {
        this.case_detail_one_channel_list = res.data;
      } else {
        this.$Message.error('获取渠道来源失败')
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
        creditLevels: [],
        login_Date: [],
        distribute_Date: [],
        collect_Date: [],
      };
      window.sessionStorage.removeItem('my_case_form');
      this.$refs[name].resetFields();
    },
    // 导出
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
