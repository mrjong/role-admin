import { relief_relieford_reviewlist, relief_relieford_reviewrelief, relief_relieford_refuserelief, relief_relieford_resultlist } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
import ApplyDetail from './components/apply_tableData_detail_page';
import FeedbackDetail from './components/feedback_tableData_detail_page';
import jianmian from '@/components/caseDesc/jianmian.vue';

export default {
  name: 'transfer_mng_page',
  mixins: [sysDictionary],
  components: {
    ApplyDetail,
    FeedbackDetail,
    jianmian
  },
  data() {
    var alignCenter = 'center';
    var widthVal = 150;
    var widthMidVal = 100;
    var _this = this;
    return {
      getDirList: ['REPAY_ORD_STS', 'PROD_TYPE', 'RELIEF_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      apply_data: {},// 申请详情数据
      query: false,//查询权限按钮
      query_loading: false,//查询权限按钮loding
      applyDate: '', //申请日期区间
      reliefNos: [],//批量提交的list
      submit_flag: false,//批量提交flag
      reject_flag: false,//批量驳回flag
      reject_loading: false,//驳回提交loading
      submit_loading: false,//批量提交loading
      breaks_data: {},//传给减免的data
      tab_flag: 'reduce_mng_apply_data',//tab切换的标识符
      formValidate: {},//查询条件表单
      modal: {
        apply: false,//申请数据详情modal_flag
        feedback: false,//反馈结果详情modal_flag
        breaks: false,//减免详情modal_flag
      },
      ruleValidate: {},//查询条件校验
      rejectFormItem: {},//驳回 表单
      rejectRuleValidate: {
        refuseReason: [
          {
            required: true,
            message: '请填写驳回原因',
            trigger: 'blur'
          }
        ]
      },//驳回校验
      pageNo: 1,
      pageSize: 10,
      total: 0,
      checkStartAndEnd: [],
      reduce_mng_apply_tableData: [],//申请数据表格数据
      reduce_mng_apply_tableColumns: [
        {
          type: 'selection', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter,
          fixed: 'left',
        },
        {
          type: 'index', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter,
          fixed: 'left',
          title: '序号'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const caseHandleStatus = params.row.caseHandleStatus;
            return h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.apply_data = params.row;
                      this.modal.apply = true
                    }
                  }
                },
                '查看凭证'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.breaks_data = {
                        id: params.row.id,
                      }
                      this.modal.breaks = true
                    }
                  }
                },
                '修改'
              ),
            ]);
          }
        },
        {
          title: '案件编号',
          searchOperator: 'like',
          key: 'caseNo',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '申请减免金额',
          searchOperator: '=',
          key: 'reliefAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: 150
        },
        {
          title: '减免类型',
          searchOperator: 'like',
          key: 'reliefTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '减免期数',
          searchOperator: 'like',
          key: 'perdNum',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '减免原因',
          searchOperator: 'like',
          key: 'reliefReasonName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '减免标记',
          searchOperator: 'like',
          key: 'reliefRemark',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期罚息',
          searchOperator: 'like',
          key: 'perdFineAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期利息',
          searchOperator: 'like',
          key: 'perdItrtAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期服务费',
          searchOperator: 'like',
          key: 'perdMngAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期信审费',
          searchOperator: 'like',
          key: 'perdAprAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期滞纳金',
          searchOperator: 'like',
          key: 'perdOvduAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '产品名称',
          searchOperator: 'like',
          key: 'prodTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '借款期限',
          searchOperator: 'like',
          key: 'perdCnt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '账单号',
          searchOperator: 'like',
          key: 'billNo',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '客户姓名',
          searchOperator: 'like',
          key: 'userNameHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '身份证号',
          searchOperator: 'like',
          key: 'idNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '手机号',
          searchOperator: 'like',
          key: 'mblNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '逾期应还金额',
          searchOperator: 'like',
          key: 'overdueAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '申请人',
          searchOperator: 'like',
          key: 'applyUserName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthMidVal,
        },
        {
          title: '电催中心',
          searchOperator: 'like',
          key: 'applyCompanyName',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '申请时间',
          searchOperator: 'like',
          key: 'applyTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render(h, params) {
            console.log(_this.$options, 'opopopopo');
            let res = params.row.applyTime;
            res = res ? _this.$options.filters['formatDate'](res, 'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span', res);
          }
        },
      ],//申请数据表头
      reduce_mng_feedback_tableData: [],//反馈结果表格数据
      reduce_mng_feedback_tableColumns: [
        {
          type: 'index', // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
          width: 60,
          align: alignCenter,
          fixed: 'left',
          title: '序号'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const caseHandleStatus = params.row.caseHandleStatus;
            return h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.modal.feedback = true
                    }
                  }
                },
                '查看凭证'
              ),
            ]);
          }
        },
        {
          title: '减免状态',
          searchOperator: 'like',
          key: 'reliefStatusName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '失败原因',
          searchOperator: 'like',
          key: 'faildReason',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '案件编号',
          searchOperator: 'like',
          key: 'caseNo',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '减免金额',
          searchOperator: '=',
          key: 'reliefAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: 150
        },
        {
          title: '减免类型',
          searchOperator: 'like',
          key: 'reliefTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '减免期数',
          searchOperator: 'like',
          key: 'perdNum',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '减免原因',
          searchOperator: 'like',
          key: 'reliefReasonName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '减免标记',
          searchOperator: 'like',
          key: 'reliefRemark',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期罚息',
          searchOperator: 'like',
          key: 'perdFineAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期利息',
          searchOperator: 'like',
          key: 'perdItrtAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期服务费',
          searchOperator: 'like',
          key: 'perdMngAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期信审费',
          searchOperator: 'like',
          key: 'perdAprAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '本期滞纳金',
          searchOperator: 'like',
          key: 'perdOvduAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '产品名称',
          searchOperator: 'like',
          key: 'prodTypeName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '借款期限',
          searchOperator: 'like',
          key: 'perdCnt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '账单号',
          searchOperator: 'like',
          key: 'billNo',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '客户姓名',
          searchOperator: 'like',
          key: 'userNameHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '身份证号',
          searchOperator: 'like',
          key: 'idNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: 200
        },
        {
          title: '手机号',
          searchOperator: 'like',
          key: 'mblNoHid',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '逾期应还金额',
          searchOperator: 'like',
          key: 'overdueAmt',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '申请人',
          searchOperator: 'like',
          key: 'applyUserName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '电催中心',
          searchOperator: 'like',
          key: 'applyCompanyName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '申请时间',
          searchOperator: 'like',
          key: 'applyTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render(h, params) {
            let res = params.row.applyTime;
            res = res ? _this.$options.filters['formatDate'](res, 'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span', res);
          }
        },
        {
          title: '审核人',
          searchOperator: 'like',
          key: 'auditLoginName',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal
        },
        {
          title: '审核时间',
          searchOperator: 'like',
          key: 'auditTime',
          className: 'tableMainW',
          align: alignCenter,
          width: widthVal,
          render(h, params) {
            console.log(_this.$options, 'opopopopo');
            let res = params.row.auditTime;
            res = res ? _this.$options.filters['formatDate'](res, 'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span', res);
          }
        },
      ],//反馈结果表头
    };
  },
  created() {
    //获取缓存的表单值
    let transfer_manager_form = window.sessionStorage.getItem('transfer_manager_form');
    if (transfer_manager_form) {
      this.formValidate = JSON.parse(transfer_manager_form);
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
      }
    });
    this.relief_relieford_reviewlist();
  },
  methods: {
    //table勾选回调
    changeSelect(selection) {
      this.reliefNos = [];
      selection.forEach((item, index) => {
        this.reliefNos.push(item.reliefNo);
      });
    },
    // modal的回调函数
    passBack(name) {
      this.modal[name] = false;
    },
    //减免modal
    passBackBreaks(obj) {
      console.log(obj)
      this.modal.breaks = obj.flag;
      if (obj.status === 'ok') {
        this.$Message.success('申请成功');
        this.relief_relieford_reviewlist();
      }
    },
    // tab 所有点击
    tabClick(name) {
      // this[`${name}_pageNo`] = 1;
      // this[name]();
      this.tab_flag = name;
      this.pageNo = 1;
      if (name === 'reduce_mng_apply_data') {
        this.relief_relieford_reviewlist();
      } else {
        this.relief_relieford_resultlist();
      }
    },
    // 改变日期区间的格式之后进行处理
    changeApplyDate(val1, val2) {
      this.formValidate.applayDateLt = val1[0];
      this.formValidate.applayDateBt = val1[1];
      console.log('123', this.formValidate);
    },
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      if (this.tab_flag === 'reduce_mng_apply_data') {
        this.relief_relieford_reviewlist();
      } else {
        this.relief_relieford_resultlist();
      }
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      if (this.tab_flag === 'reduce_mng_apply_data') {
        this.relief_relieford_reviewlist();
      } else {
        this.relief_relieford_resultlist();
      }
    },
    handleSubmit(name) {
      // if (this.formValidate.applyDate) {
      //   this.formValidate.applyDate = [
      //     this.formValidate.applayDateLt,
      //     this.formValidate.applayDateBt
      //   ]
      // }
      // window.sessionStorage.setItem('transfer_manager_form', JSON.stringify(this.formValidate));
      this.pageNo = 1;
      if (this.tab_flag === 'reduce_mng_apply_data') {
        this.relief_relieford_reviewlist();
      } else {
        this.relief_relieford_resultlist();
      }
    },
    rejectHandleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.relief_relieford_refuserelief();
        }
      })
    },
    // modal取消操作
    cancel(type) {
      if (type === '1') {
        this.submit_flag = false;
      } else {
        this.reject_flag = false;
      }
    },
    // 获取申请数据表格数据
    async relief_relieford_reviewlist() {
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无权限查询');
      //   return;
      // }
      this.query_loading = true;
      let res = await relief_relieford_reviewlist({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        //repayOrdTyp: this.repayOrdTyp,
        ...this.formValidate
      })
      this.query_loading = false;
      // 请求成功之后需要做分页处理，然后将拿到的数据进行数据处理，总数目和展示条数
      if (res && res.code === 1) {
        this.reduce_mng_apply_tableData = res.data.content;
        this.total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取反馈结果list数据
    async relief_relieford_resultlist() {
      this.query_loading = true;
      const res = await relief_relieford_resultlist({
        ...this.formValidate
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.reduce_mng_feedback_tableData = res.data.content;
        this.total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 批量提交接口
    async relief_relieford_reviewrelief() {
      this.submit_loading = true;
      const res = await relief_relieford_reviewrelief({
        ...this.formValidate,
        reliefNos: this.reliefNos
      });
      this.submit_loading = false;
      if (res.code === 1) {
        this.$Message.success('提交成功');
        this.submit_flag = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 批量驳回接口
    async relief_relieford_refuserelief() {
      this.reject_loading = true;
      const res = await relief_relieford_refuserelief(
        {
          ...this.formValidate,
          reliefNos: this.reliefNos,
          ...this.rejectFormItem,
        }
      );
      this.reject_loading = false;
      if (res.code === 1) {
        this.$Message.success('驳回成功');
        this.reject_flag = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.formValidate = {};
      window.sessionStorage.removeItem('transfer_manager_form');
      this.$refs[name].resetFields();
    }
  }
};
