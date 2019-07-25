import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import dayjs from 'dayjs';
import zhongcai from '@/components/caseDesc/zhongcai.vue';
import arbitramentDeatil from './components/arbitrament_detail';

import { arb_operateRecord, arb_myArbList, arb_detail, arb_check } from '@/service/getData';
export default {
  name: 'case_search_page',
  mixins: [formValidateFun, sysDictionary],
  components: {
    zhongcai,
    arbitramentDeatil
  },
  data() {
    console.log(this.GLOBAL);
    const _this = this;
    return {
      modal: {
        zhongcai: false
      },
      zhongcai_set_data: {},
      getDirList: ['PROD_TYPE', 'GENDER', 'APPROVAL_STATE', 'NATION'],
      getDirObj: {},
      showPanel: false,
      prefix: '/admin/arb/images/',
      showPanel2: false,
      query: false,//查询权限
      update: false,//编辑权限
      update_loading: false,//编辑按钮loading
      query_loading: false,//查询按钮loading
      approvalTime: [],//审核时间区间
      applyTime: [],//申请时间区间
      arbitrament_modal: false,//仲裁详情的modal
      arbitrament_data: {},
      recoverFormItem: {},
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
        overdueDaysLt: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqts_start,
            trigger: 'blur'
          }
        ],
        overdueDaysBt: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqts_end,
            trigger: 'blur'
          }
        ],
        billOvduAmtLt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqyhje_start,
            trigger: 'blur'
          }
        ],
        billOvduAmtBt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqyhje_end,
            trigger: 'blur'
          }
        ]
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
          title: '操作',
          width: 150,
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
                      _this.arbitrament_data = {
                        data: params.row,
                      }
                      _this.arbitrament_modal = true;
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  style: {
                    display: params.row.approvalState === '03' || params.row.approvalState === '08'? 'inline-block' : 'none'
                  },
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      if (!_this.update) {
                        _this.$Message.error('很抱歉，暂无编辑权限');
                        return;
                      }
                      _this.arb_detail(params.row, 'edit');
                    }
                  }
                },
                '修改'
              )
            ]);
          }
        },
        {
          title: '仲裁状态',
          width: 120,
          align: 'center',
          key: 'approvalStateName'
        },
        {
          title: '标的金额',
          width: 120,
          align: 'center',
          key: 'caseAmt'
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
          title: '产品名称',
          width: 120,
          align: 'center',
          key: 'productName'
        },

        {
          title: '借款期限',
          width: 120,
          align: 'center',
          key: 'perdCnt'
        },
        {
          title: '客户姓名',
          width: 120,
          align: 'center',
          key: 'userNameHid'
        },
        {
          title: '身份证号',
          width: 120,
          align: 'center',
          key: 'idCardNoHid'
        },
        {
          title: '手机号',
          width: 120,
          align: 'center',
          key: 'mblNo'
        },
        {
          title: '逾期天数',
          width: 120,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '逾期应还金额',
          width: 120,
          align: 'center',
          key: 'overdueAmt',
          render: (h, params) => {
            let overdueAmt = params.row.overdueAmt;
            overdueAmt = overdueAmt ? this.$options.filters['money'](overdueAmt) : overdueAmt;
            return h('span', overdueAmt);
          }
        },
        {
          title: '已还罚息',
          width: 120,
          align: 'center',
          key: 'perdFineRep',
          render: (h, params) => {
            let perdFineRep = params.row.perdFineRep;
            perdFineRep = perdFineRep ? this.$options.filters['money'](perdFineRep) : perdFineRep;
            return h('span', perdFineRep);
          }
        },
        {
          title: '已还滞纳金',
          width: 120,
          align: 'center',
          key: 'perdOvduRep',
          render: (h, params) => {
            let perdOvduRep = params.row.perdOvduRep;
            perdOvduRep = perdOvduRep ? this.$options.filters['money'](perdOvduRep) : perdOvduRep;
            return h('span', perdOvduRep);
          }
        },
        {
          title: '申请时间',
          width: 150,
          align: 'center',
          key: 'createTime',
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime
              ? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
              : createTime;
            return h('span', createTime);
          }
        },
        {
          title: '申请人',
          width: 120,
          align: 'center',
          key: 'opUserName'
        },
        {
          title: '电催中心',
          width: 120,
          align: 'center',
          key: 'opCompayName'
        },
        {
          title: '审核人',
          width: 120,
          align: 'center',
          key: 'approvalUserName'
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
        {
          title: '审核备注',
          width: 120,
          align: 'center',
          key: 'approvalRemark',
          render: (h, params) => {
            let approvalRemark = params.row.approvalRemark;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: approvalRemark,
                    placement: 'top',
                    maxWidth: "110",
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '110px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, approvalRemark)]
              ),
            ]);
          }
        }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let my_arbitrament_approve_form = window.sessionStorage.getItem('my_arbitrament_approve_form');
    if (my_arbitrament_approve_form) {
      this.formItem = JSON.parse(my_arbitrament_approve_form);
      // 获取缓存的申请时间
      this.applyTime = [
        JSON.parse(my_arbitrament_approve_form).applyTimeLt,
        JSON.parse(my_arbitrament_approve_form).applyTimeBt,
      ];
      // 获取缓存的审核时间
      this.approvalTime = [
        JSON.parse(my_arbitrament_approve_form).approvalTimeLt,
        JSON.parse(my_arbitrament_approve_form).approvalTimeBt,
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
        case "update": this.update = true;
          break;
      }
    });
  },
  methods: {
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
    passBack(type) {
      this.modal[type] = false;
      this.pageNo = 1;
      this.getList()
    },
    // 子组件的回调
    detail_passBack(obj) {
      this.arbitrament_modal = false;
      if (obj.flag) {
        this.getList();
      }
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
          window.sessionStorage.setItem('my_arbitrament_approve_form', JSON.stringify(this.formItem));
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 查看详情
    async arb_detail(obj, type) {
      const res = await arb_detail({
        approvalId: obj.approvalId
      });
      if (res.code === 1) {
        if (type === 'edit') {
          this.zhongcai_set_data = {
            title: '请修改',
            idNoHid: res.data.idCardNoHid,
            billNo: res.data.billNo,
            userNmHid: res.data.userNameHid,
            caseNo: res.data.caseNo,
            voucherNo: res.data.voucherNo,
            idAddress: res.data.idAddress,
            userGender: res.data.userGender,
            userNation: res.data.userNation,
            idCardFront: res.data.idCardFront,
            idCardOpposite: res.data.idCardOpposite,
            voucherImg: res.data.voucherImg,
            standImg: res.data.standImg,
            routertype: 'my_zhongcai',
            standAgreeDate: res.data.standAgreeDate
          };
          this.modal['zhongcai'] = true;
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
      delete this.formItem.applyTime;
      delete this.formItem.approvalTime;
      const res = await arb_myArbList({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
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
      window.sessionStorage.removeItem('my_arbitrament_approve_form');
      this.$refs[name].resetFields();
    }
  }
};
