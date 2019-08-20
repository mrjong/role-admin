import jianmian from '@/components/caseDesc/jianmian.vue';
import huakou from '@/components/caseDesc/huakou.vue';
import zhongcai from '@/components/caseDesc/zhongcai.vue';
import gathering from '@/components/caseDesc/gathering.vue';
import QRdetail from '@/components/caseDesc/QR_code_detail.vue';
import QRcode from '@/components/caseDesc/QR_code.vue';
import TimeLine from '@/components/time_line_page';
import qs from 'qs';
import dayjs from 'dayjs';
import Cookie from 'js-cookie';
import sysDictionary from '@/mixin/sysDictionary';
import { mapGetters } from "vuex";
import { init, callOut, hangUp } from '@/libs/news_crowd';//讯众插件
import {
  case_detail_remark_list, // 催收
  case_detail_repay_ord_list, // 回款
  case_detail_user_repay_list, // 用户主动
  case_detail_system_repay_list, // 系统代扣
  case_detail_bindcard_list, // 绑卡信息
  case_detail_allot_list, // 分配
  case_detail_getcaselog,// 操作记录
  case_detail_siteletter_list, // 站内
  case_detail_address_info, // 地址

  case_detail_mail_detail_list, // 通话明细
  case_detail_mail_list, // 通讯录（指定案件）
  case_detail_mail_list_appended, // 定案件后追加的
  case_detail_mail_statistics_list, // 通信记录统计
  case_detail_urgent_contact, // 紧急联系人
  case_detail_case_base_info, // 查询案件详情基础信息
  case_detail_case_identity_info, // 查询案件详情身份信息
  mail_list_add, // 新增通讯录
  case_remark_his_add, // 新增催记
  collectcode_getCollectRelate, // 获取沟通状态
  collectcode_getCodeList, // 获取沟通状态
  collectcode_getListByCodeType,// 获取拨打状态
  call_kt_hung_on, // 客天外拨
  call_moor_hung_on, // 容联外拨
  call_moor_hung_up,//容联挂断
  call_xz_hung_on,//讯众接通
  call_xz_hung_off,//讯众挂断
  syscommon_decrypt, // 明文展示
  case_collect_case_list, // 我的案件
  case_list,
  credit_case_process, //获取时间轴接口
  case_detail_getimgurls,//获取图片信息街口
  offlineScanPay_apply,//判断二维码是否生成
  callout_rout_get_seat,//重新获取坐席参数
  callout_hung_on, //新路由模式的外呼
  callout_hung_off,//新路由模式的挂断
} from '@/service/getData';
let callFlag = false;
export default {
  name: 'case_desc',
  components: {
    jianmian,
    huakou,
    zhongcai,
    TimeLine,
    gathering,
    QRdetail,
    QRcode
  },
  mixins: [sysDictionary],
  data() {
    const _this = this;
    const call_number_validator = (rule, value, callback) => {
      // 手机号码校验
      const mblNo = /^1\d{10}$/;
      // 座机号校验
      const isMobile = /^([0-9]{3,4})?[0-9]{7,8}$/;
      if (!mblNo.test(value) && !isMobile.test(value)) {
        return callback(new Error('请输入正确格式的座机号或手机号'))
      } else {
        return callback();
      }
    }
    return {
      HUNG_UP_FLAG: window.sessionStorage.getItem('HUNG_UP_FLAG'),//挂断标识
      moorToCallMblHid: '',//容联电话呼叫成功显示的电话密文
      moorToCallUser: '',//容联电话呼叫成功显示的姓名
      showMoorTel: false,//容联电话弹窗flag
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      apply_arbitrament: false,//案件详情申请仲裁权限
      apply_deduct: false,//案件详情申请划扣权限
      apply_remission: false,//案件详情申请减免权限
      APPLY_QR_CODE: false,//收款二维码权限
      add_collect_loading: false,//添加催记按钮loading
      add_txl_loading: false,//添加通讯录提交按钮loading
      message_detail_flag: false,//站内信modal是否显示
      message_detail_data: {},//站内信modal展示的数据
      credit_panel: false,//信用进度的折叠flag
      time_loading: false,// 时间轴loading
      time_line_data: {},//传给时间轴的数据
      breaks_data: {},//减免info入参
      message_list_loading: false,//通讯录table loading
      address_list_name: 'case_detail_mail_statistics_list',//通讯录默认name
      imglist: {},
      actionId: '',
      objCopy: {},
      mingwenData: '',
      parentData: {},
      case_collect_case_list_data: {},
      prdTyp: '',
      userNm: '',
      modal: {
        huakou: false,
        jianmian: false,
        zhongcai: false,
        QR_CODE: false,
        gathering: false,
        QR_code_detail: false,
      },
      formItem2: {},
      tabName: '',
      collectType: '',
      btnDisable: true,
      ruleValidate2: {
        mblNo: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur',
            validator: call_number_validator,
          },
          // {
          //   pattern: this.GLOBAL.isMobile,
          //   message: '请输入正确座机号',
          //   trigger: 'blur'
          // },
        ],
      },
      getDirList: ['GENDER', 'NATION', 'CONTACT_REL_TYPE'],
      getDirObj: {},
      userNmClearCopy: '',// 保存的明文名字
      img_list: [],//图片列表
      mblNo: '',
      caseNo: '',
      userId: '',
      readtype: 'md-create',
      showBtn: false,
      showPanel: false,
      showPanel2: false,
      imgName: '',
      visible: false,
      showBottom: false,//添加、编辑催记弹窗
      callUserType: '',//催记里面的关系
      call_status: '',// 拨打状态暂存
      modalTitle: '',
      visible1: false,
      address_list_modal: false,
      queryData: {},
      collectcode_getCollectRelate_Data: [],
      collectcode_getCollectRelate_childItem: [],
      formValidate: {},
      case_detail_case_identity_info_Data: {},
      zhongcai_set_data: {},
      case_detail_urgent_contact_Data: {},
      ruleValidate: {
        collectResult: [
          {
            required: true,
            message: '请选择拨打状态',
            trigger: 'change'
          }
        ],
        communicateResult: [
          {
            required: true,
            message: '请选择沟通状态',
            trigger: 'change'
          }
        ],
        callUserType: [
          {
            required: true,
            message: '请选择关系',
            trigger: 'change'
          }
        ]
      },

      formItem: {},
      tableColumns: [
        {
          title: '期数',
          width: 60,
          align: 'center',
          key: 'perdNum'
        },
        {
          title: '逾期天数',
          width: 80,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '还款日',
          width: 120,
          align: 'center',
          key: 'perdDueDt',
          render: (h, params) => {
            let perdDueDt = params.row.perdDueDt;
            perdDueDt = perdDueDt ? this.$options.filters['tableDate'](perdDueDt) : perdDueDt;
            return h('span', perdDueDt);
          }
        },
        {
          title: '逾期状态',
          width: 100,
          align: 'center',
          key: 'overdueFlgName'
        },
        {
          title: '应还利息',
          width: 100,
          align: 'center',
          key: 'perdItrtAmt',
          render: (h, params) => {
            let perdItrtAmt = params.row.perdItrtAmt;
            perdItrtAmt = perdItrtAmt ? this.$options.filters['money'](perdItrtAmt) : perdItrtAmt;
            return h('span', perdItrtAmt);
          }
        },
        {
          title: '应还服务费',
          width: 100,
          align: 'center',
          key: 'perdMngAmt',
          render: (h, params) => {
            let perdMngAmt =
              parseFloat(params.row.perdMngAmt) +
              parseFloat(params.row.perdAprAmt) +
              parseFloat(params.row.perdWtdwAmt);
            perdMngAmt = perdMngAmt ? this.$options.filters['money'](perdMngAmt) : perdMngAmt;
            return h('span', perdMngAmt);
          }
        },
        {
          title: '应还罚息',
          width: 100,
          align: 'center',
          key: 'perdFineAmt',
          render: (h, params) => {
            let perdFineAmt = params.row.perdFineAmt;
            perdFineAmt = perdFineAmt ? this.$options.filters['money'](perdFineAmt) : perdFineAmt;
            return h('span', perdFineAmt);
          }
        },
        {
          title: '应还滞纳金',
          width: 100,
          align: 'center',
          key: 'perdOvduAmt',
          render: (h, params) => {
            let perdOvduAmt = params.row.perdOvduAmt;
            perdOvduAmt = perdOvduAmt ? this.$options.filters['money'](perdOvduAmt) : perdOvduAmt;
            return h('span', perdOvduAmt);
          }
        },
        {
          title: '应还总金额',
          width: 100,
          align: 'center',
          key: 'perdTotAmt',
          render: (h, params) => {
            let perdTotAmt = params.row.perdTotAmt;
            perdTotAmt = perdTotAmt ? this.$options.filters['money'](perdTotAmt) : perdTotAmt;
            return h('span', perdTotAmt);
          }
        },
        {
          title: '已还总金额',
          width: 100,
          align: 'center',
          key: 'perdTotRep',
          render: (h, params) => {
            let perdTotRep = params.row.perdTotRep;
            perdTotRep = perdTotRep ? this.$options.filters['money'](perdTotRep) : perdTotRep;
            return h('span', perdTotRep);
          }
        },
        {
          title: '未还总金额',
          width: 100,
          align: 'center',
          key: 'perdTotSur',
          render: (h, params) => {
            let perdTotSur = params.row.perdTotSur;
            perdTotSur = perdTotSur ? this.$options.filters['money'](perdTotSur) : perdTotSur;
            return h('span', perdTotSur);
          }
        },
        {
          title: '已还本金',
          width: 100,
          align: 'center',
          key: 'perdPrcpRep',
          render: (h, params) => {
            let perdPrcpRep = params.row.perdPrcpRep;
            perdPrcpRep = perdPrcpRep ? this.$options.filters['money'](perdPrcpRep) : perdPrcpRep;
            return h('span', perdPrcpRep);
          }
        },
        {
          title: '已还利息',
          width: 100,
          align: 'center',
          key: 'perdItrtRep',
          render: (h, params) => {
            let perdItrtRep = params.row.perdItrtRep;
            perdItrtRep = perdItrtRep ? this.$options.filters['money'](perdItrtRep) : perdItrtRep;
            return h('span', perdItrtRep);
          }
        },
        {
          title: '已还服务费',
          width: 100,
          align: 'center',
          key: 'perdMngRep',
          render: (h, params) => {
            let perdMngRep =
              parseFloat(params.row.perdMngRep) +
              parseFloat(params.row.perdWtdwRep) +
              parseFloat(params.row.perdAprRep);
            perdMngRep = perdMngRep ? this.$options.filters['money'](perdMngRep) : perdMngRep;
            return h('span', perdMngRep);
          }
        },
        {
          title: '已还罚息',
          width: 100,
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
          width: 100,
          align: 'center',
          key: 'perdOvduRep',
          render: (h, params) => {
            let perdOvduRep = params.row.perdOvduRep;
            perdOvduRep = perdOvduRep ? this.$options.filters['money'](perdOvduRep) : perdOvduRep;
            return h('span', perdOvduRep);
          }
        },

      ],
      case_detail_address_info_Data: {},
      // 催收信息
      case_detail_remark_list_spin: false,
      tableData: [],
      case_detail_remark_list_pageNo: 1,
      case_detail_remark_list_pageSize: 10,
      case_detail_remark_list_total: 0,
      case_detail_remark_list_tableData: [],
      case_detail_case_base_info_Data: {},
      case_detail_remark_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '催收时间',
          align: 'center',
          key: 'remarkDate',
          width: 180,
          render: (h, params) => {
            let remarkDate = params.row.remarkDate;
            remarkDate = remarkDate
              ? this.$options.filters['formatDate'](remarkDate, 'YYYY-MM-DD HH:mm:ss')
              : remarkDate;
            return h('span', remarkDate);
          }
        },
        {
          title: '催收电话',
          align: 'center',
          width: 120,
          key: 'mblNoHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.mblNoHid),
            ]);
          }
        },
        {
          title: '催收姓名',
          align: 'center',
          width: 100,
          key: 'userNmHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.userNmClear),
            ]);
          }
        },
        {
          title: '关系',
          align: 'center',
          width: 100,
          key: 'callUserTypeName'
        },
        {
          title: '经办人',
          align: 'center',
          width: 100,
          key: 'opUserName'
        },
        {
          title: '拨打状态',
          align: 'center',
          width: 100,
          key: 'collectResultName'
        },
        {
          title: '沟通状态',
          align: 'center',
          width: 100,
          key: 'communicateResultName'
        },
        {
          title: '备注',
          align: 'center',
          width: 280,
          key: 'collectRmk',
          tooltip: true,
        },
        {
          title: '通话来源',
          align: 'center',
          width: 100,
          key: 'collectTypeName'
        },
        {
          title: '承诺还款时间',
          align: 'center',
          width: 180,
          key: 'promiseRepayDate',
          render: (h, params) => {
            let promiseRepayDate = params.row.promiseRepayDate;
            promiseRepayDate = promiseRepayDate
              ? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD')
              : promiseRepayDate;
            return h('span', promiseRepayDate);
          }
        },

      ],

      // 回款信息
      case_detail_repay_ord_list_spin: false,
      case_detail_repay_ord_list_pageNo: 1,
      case_detail_repay_ord_list_pageSize: 10,
      case_detail_repay_ord_list_total: 0,
      case_detail_repay_ord_list_tableData: [],
      case_detail_repay_ord_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '账单号',
          width: 200,
          align: 'center',
          key: 'billNo',
          sortable: true,
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
          title: '还款时间',
          align: 'center',
          key: 'repayDate',
          width: 180,
          render: (h, params) => {
            let repayDate = params.row.repayDate;
            repayDate = repayDate
              ? this.$options.filters['formatDate'](repayDate, 'YYYY-MM-DD HH:mm:ss')
              : repayDate;
            return h('span', repayDate);
          }
        },
        {
          title: '还款金额',
          align: 'center',
          width: 100,
          key: 'repayAmt',
          render: (h, params) => {
            let repayAmt = params.row.repayAmt;
            repayAmt = repayAmt ? this.$options.filters['money'](repayAmt) : repayAmt;
            return h('span', repayAmt);
          }
        },
        {
          title: '还款状态',
          align: 'center',
          width: 100,
          key: 'repayOrdStsName'
        },
        {
          title: '还款方式',
          align: 'center',
          width: 100,
          key: 'repayOrdTypName'
        },
        {
          title: '还款银行',
          align: 'center',
          width: 100,
          key: 'crdCorpOrgName'
        },
        {
          title: '还款账号',
          align: 'center',
          width: 180,
          key: 'crdNoHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.crdNoHid)
              // h(
              // 	'Poptip',
              // 	{
              // 		props: {
              // 			content: _this.mingwenData
              // 		}
              // 	},
              // 	[
              // 		h('Icon', {
              // 			style: {
              // 				display: params.row.crdNoHid ? 'inline-block' : 'none'
              // 			},
              // 			props: {
              // 				type: 'md-eye'
              // 			},
              // 			on: {
              // 				click: () => {
              // 					_this.syscommon_decrypt({
              // 						type: 'BANK_CARD',
              // 						data: params.row.crdNo
              // 					});
              // 				}
              // 			},
              // 			class: 'eye-class'
              // 		})
              // 	]
              // )
            ]);
          }
        }
      ],

      // 用户主动还款
      case_detail_user_repay_list_spin: false,
      case_detail_user_repay_list_pageNo: 1,
      case_detail_user_repay_list_pageSize: 10,
      case_detail_user_repay_list_total: 0,
      case_detail_user_repay_list_tableData: [],
      case_detail_user_repay_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '还款金额',
          align: 'center',
          width: 100,
          key: 'repayOrdAmt',
          render: (h, params) => {
            let repayOrdAmt = params.row.repayOrdAmt;
            repayOrdAmt = repayOrdAmt ? this.$options.filters['money'](repayOrdAmt) : repayOrdAmt;
            return h('span', repayOrdAmt);
          }
        },
        {
          title: '订单状态',
          align: 'center',
          width: 100,
          key: 'ordStsName'
        },
        {
          title: '失败原因',
          align: 'center',
          width: 280,
          key: 'orgFnlMsg',
          render: (h, params) => {
            let orgFnlMsg = params.row.orgFnlMsg;
            return h(
              'Tooltip',
              {
                style: {
                  margin: '0 5px'
                },
                props: {
                  content: params.row.orgFnlMsg,
                  placement: 'top'
                }
              },
              [h('div', {}, params.row.orgFnlMsg)]
            );
          }
        },
        {
          title: '还款日期',
          align: 'center',
          width: 100,
          key: 'ordDt',
          render: (h, params) => {
            let ordDt = params.row.ordDt;
            ordDt = ordDt ? this.$options.filters['formatDate'](ordDt, 'YYYY-MM-DD') : ordDt;
            return h('span', ordDt);
          }
        },
        {
          title: '卡类型',
          align: 'center',
          width: 100,
          key: 'crdAcTypName'
        },
        {
          title: '还款银行',
          align: 'center',
          width: 100,
          key: 'crdCorpOrgName'
        },
        {
          title: '还款银行卡后四位',
          align: 'center',
          width: 150,
          key: 'crdNoLast'
        },

        {
          title: '已还本金',
          align: 'center',
          width: 100,
          key: 'repayOrdPrcp',
          render: (h, params) => {
            let repayOrdPrcp = params.row.repayOrdPrcp;
            repayOrdPrcp = repayOrdPrcp ? this.$options.filters['money'](repayOrdPrcp) : repayOrdPrcp;
            return h('span', repayOrdPrcp);
          }
        }
      ],

      // 系统代扣还款
      case_detail_system_repay_list_spin: false,
      case_detail_system_repay_list_pageNo: 1,
      case_detail_system_repay_list_pageSize: 10,
      case_detail_system_repay_list_total: 0,
      case_detail_system_repay_list_tableData: [],
      case_detail_system_repay_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '还款金额',
          align: 'center',
          width: 100,
          key: 'repayOrdAmt',
          render: (h, params) => {
            let repayOrdAmt = params.row.repayOrdAmt;
            repayOrdAmt = repayOrdAmt ? this.$options.filters['money'](repayOrdAmt) : repayOrdAmt;
            return h('span', repayOrdAmt);
          }
        },
        {
          title: '订单状态',
          align: 'center',
          width: 100,
          key: 'ordStsName'
        },
        {
          title: '失败原因',
          align: 'center',
          width: 280,
          tooltip: true,
          key: 'orgFnlMsg',
          render: (h, params) => {
            let orgFnlMsg = params.row.orgFnlMsg;
            return h(
              'div', orgFnlMsg
            );
          }
        },
        {
          title: '还款日期',
          align: 'center',
          width: 120,
          key: 'ordDt',
          render: (h, params) => {
            let ordDt = params.row.ordDt;
            ordDt = ordDt ? this.$options.filters['formatDate'](ordDt, 'YYYY-MM-DD') : ordDt;
            return h('span', ordDt);
          }
        },
        {
          title: '卡类型',
          align: 'center',
          width: 100,
          key: 'crdAcTypName'
        },
        {
          title: '还款银行',
          align: 'center',
          width: 100,
          key: 'crdCorpOrgName'
        },
        {
          title: '还款银行卡后四位',
          align: 'center',
          width: 150,
          key: 'crdNoLast'
        },

        {
          title: '已还本金',
          align: 'center',
          width: 100,
          key: 'repayOrdPrcp',
          render: (h, params) => {
            let repayOrdPrcp = params.row.repayOrdPrcp;
            repayOrdPrcp = repayOrdPrcp ? this.$options.filters['money'](repayOrdPrcp) : repayOrdPrcp;
            return h('span', repayOrdPrcp);
          }
        }
      ],

      // 用户绑卡信息
      case_detail_bindcard_list_spin: false,
      case_detail_bindcard_list_pageNo: 1,
      case_detail_bindcard_list_pageSize: 10,
      case_detail_bindcard_list_total: 0,
      case_detail_bindcard_list_tableData: [],
      case_detail_bindcard_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '用户姓名',
          align: 'center',
          width: 100,
          key: 'usrNmHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.usrNmHid),
            ]);
          }
        },
        {
          title: '卡类型',
          align: 'center',
          width: 100,
          key: 'crdAcTypName'
        },
        {
          title: '银行',
          align: 'center',
          width: 100,
          key: 'corpOrgNm'
        },
        {
          title: '银行卡号',
          align: 'center',
          width: 150,
          key: 'crdNoHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.crdNoHid),
            ]);
          }
        },
        {
          title: '银行卡后四位',
          align: 'center',
          width: 100,
          key: 'crdNoLast'
        },
        {
          title: '绑卡时间',
          align: 'center',
          width: 150,
          key: 'signDt',
          render: (h, params) => {
            let signDt = params.row.signDt;
            let signTm = params.row.signTm;
            signDt = signDt
              ? this.$options.filters['formatDate'](signDt, 'YYYY-MM-DD') +
              ' ' +
              signTm.slice(0, 2) +
              ':' +
              signTm.slice(2, 4) +
              ':' +
              signTm.slice(4, 6)
              : signDt;
            return h('span', signDt);
          }
        },
        {
          title: '身份证号',
          align: 'center',
          width: 150,
          key: 'idNoHid',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.idNoHid),
            ]);
          }
        },
        {
          title: '状态',
          align: 'center',
          width: 100,
          key: 'agrEffFlgName'
        },
        {
          title: '解绑时间',
          align: 'center',
          width: 150,
          key: 'unsignTm',
          render: (h, params) => {
            let unsignDt = params.row.unsignDt;
            let unsignTm = params.row.unsignTm;
            unsignDt = unsignDt
              ? this.$options.filters['formatDate'](unsignDt, 'YYYY-MM-DD') +
              ' ' +
              unsignTm.slice(0, 2) +
              ':' +
              unsignTm.slice(2, 4) +
              ':' +
              unsignTm.slice(4, 6)
              : unsignDt;
            return h('span', unsignDt);
          }
        },
        {
          title: '业务类型',
          align: 'center',
          width: 100,
          key: 'businessName'
        }
      ],

      // 操作记录
      case_detail_getcaselog_spin: false,
      case_detail_getcaselog_pageNo: 1,
      case_detail_getcaselog_pageSize: 10,
      case_detail_getcaselog_total: 0,
      case_detail_getcaselog_tableData: [],
      case_detail_getcaselog_tableColumns: [
        {
          title: '序号',
          width: 100,
          align: 'center',
          type: 'index',
          sortable: true
        },
        {
          title: '操作时间',
          align: 'center',
          key: 'operTime',
          width: 200,
          render: (h, params) => {
            let operTime = params.row.operTime;
            operTime = operTime
              ? this.$options.filters['formatDate'](operTime, 'YYYY-MM-DD HH:mm:ss')
              : operTime;
            return h('span', operTime);
          }
        },
        {
          title: '操作人',
          align: 'center',
          width: 120,
          key: 'operName'
        },
        {
          title: '操作动作',
          align: 'center',
          width: 120,
          key: 'operTypeName'
        },
        {
          title: '经办人',
          align: 'center',
          width: 120,
          key: 'caseUserName'
        },
        {
          title: '详情',
          align: 'center',
          // width: 400,
          tooltip: true,
          key: 'operRemark',
          render: (h, params) => {
            let operRemark = params.row.operRemark;
            return h('div', operRemark)
          }
        }
      ],

      // 站内信记录
      case_detail_siteletter_list_spin: false,
      case_detail_siteletter_list_pageNo: 1,
      case_detail_siteletter_list_pageSize: 10,
      case_detail_siteletter_list_total: 0,
      case_detail_siteletter_list_tableData: [],
      case_detail_siteletter_list_tableColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          type: 'index',
          fixed: 'left',
          sortable: true
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          fixed: 'left',
          render(h, params) {
            return h('a', {
              class: 'edit-btn',
              props: {},
              on: {
                'click': () => {
                  _this.message_detail_data = params.row;
                  _this.message_detail_flag = true;
                }
              }
            }, '查看')
          },
        },
        {
          title: '发送时间',
          align: 'center',
          key: 'sendTime',
          width: 200,
          render: (h, params) => {
            let sendTime = params.row.sendTime;
            sendTime = sendTime
              ? this.$options.filters['formatDate'](sendTime, 'YYYY-MM-DD HH:mm:ss')
              : sendTime;
            return h('span', sendTime);
          }
        },
        {
          title: '收件人',
          align: 'center',
          width: 100,
          key: 'userName'
        },
        {
          title: '发送结果',
          align: 'center',
          width: 100,
          key: 'sendStatus'
        },
        {
          title: '发送内容',
          align: 'center',
          width: 400,
          key: 'sendContent',
          ellipsis: true,
          render: (h, params) => {
            let sendContent = params.row.sendContent;
            return h(
              'div', sendContent
            );
          }
        }
      ],
      //地址信息spin
      case_detail_address_info_spin: false,
      // 通话统计
      case_detail_mail_statistics_list_pageNo: 1,
      case_detail_mail_statistics_list_pageSize: 20,
      case_detail_mail_statistics_list_total: 0,
      case_detail_mail_statistics_list_tableData: [],
      case_detail_mail_statistics_list_tableColumns: [
        {
          title: '姓名（关系）',
          align: 'center',
          width: 140,
          key: 'userNm',
          render: (h, params) => {
            let callUserTypeName = params.row.callUserTypeName;
            let userNm = params.row.userNmClear;

            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'md-create'
                  }
                },
                `${userNm === null ? '' : userNm}${callUserTypeName === null ? '' : '(' + callUserTypeName + ')'}`
              )
            ]);
          }
        },
        {
          title: '通话次数',
          align: 'center',
          key: 'count',
          width: 80
        },
        {
          title: '操作',
          align: 'center',
          key: 'edit',
          fixed: 'left',
          width: 40,
          render: (h, params) => {
            return h('div', [
              _this.all_opt ? h(
                'span',
                {
                  style: {
                    display: _this.readType !== 'read' ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      _this.handCall(params.row, null, '03');
                    }
                  }
                },
                [
                  h('Icon', {
                    class: 'edit-btn',
                    props: {
                      type: 'md-create'
                    }
                  })
                ]
              ) : '无'
            ]);
          }
        },
        {
          title: '手机(状态)',
          align: 'center',
          // width: 180,
          key: 'opUserName',
          fixed: 'left',
          render: (h, params) => {
            let callStateName = params.row.callStateName;
            let mblNoHid = params.row.mblNoHid;
            return h('div', [
              h('Badge', {
                props: {
                  count: params.row.callCount,
                  className: 'badge_wrap'
                },
                style: {
                  height: '35px',
                  lineHeight: '36px',
                }
              }, [
                  h(
                    'a',
                    {
                      props: {
                        type: 'md-create'
                      },
                      on: {
                        click: () => {
                          _this.handCall(params.row, 'call', '03');
                        }
                      }
                    },
                    `${mblNoHid === null ? '' : mblNoHid}${callStateName === null ? '' : '(' + callStateName + ')'}`
                  ),
                  this.plaintext ? h(
                    'Poptip',
                    {
                      props: {
                        content: _this.mingwenData,
                        transfer: true,
                      }
                    },
                    [
                      h(
                        'span',
                        {
                          on: {
                            click: () => {
                              _this.syscommon_decrypt({
                                type: 'MBL',
                                data: params.row.mblNo,
                                tripartite: 'tripartite'
                              });
                            }
                          },
                          style: {
                            display: params.row.mblNoHid ? 'inline-block' : 'none'
                          }
                        },
                        [
                          h('Icon', {
                            props: {
                              type: 'md-eye'
                            },
                            class: 'eye-class'
                          })
                        ]
                      )
                    ]
                  ) : null
                ]),
            ]);
          }
        },
      ],

      // 通话明细
      case_detail_mail_detail_list_pageNo: 1,
      case_detail_mail_detail_list_pageSize: 20,
      case_detail_mail_detail_list_total: 0,
      case_detail_mail_detail_list_tableData: [],
      case_detail_mail_detail_list_tableColumns: [
        {
          title: '操作',
          align: 'center',
          width: 40,
          key: 'edit',
          fixed: 'left',
          render: (h, params) => {
            return h('div', [
              _this.all_opt ? h(
                'span',
                {
                  style: {
                    display: _this.readType !== 'read' ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      _this.handCall(params.row, null, '03');
                    }
                  }
                },
                [
                  h('Icon', {
                    class: 'edit-btn',
                    props: {
                      type: 'md-create'
                    }
                  })
                ]
              ) : '无'
            ]);
          }
        },
        {
          title: '姓名（关系）',
          align: 'center',
          width: 120,
          key: 'userNm',
          render: (h, params) => {
            let callUserTypeName = params.row.callUserTypeName;
            let userNm = params.row.userNmClear;
            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'md-create'
                  }
                },
                `${userNm === null ? '' : userNm}${callUserTypeName === null ? '' : '(' + callUserTypeName + ')'}`
              )
            ]);
          }
        },
        {
          title: '通话时长(时间)',
          align: 'center',
          key: 'count',
          width: 130,
          render: (h, params) => {
            let callTime = params.row.callTime;
            let callDuration = params.row.callDuration;

            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: '#2d8cf0'
                  },
                  props: {
                    type: 'md-create'
                  }
                },
                callDuration
              ),
              h(
                'div',
                {
                  props: {
                    type: 'md-create'
                  }
                },
                callTime ? this.$options.filters['formatDate'](callTime, 'YYYY-MM-DD HH:mm:ss') : ''
              )
            ]);
          }
        },
        {
          title: '手机(状态)',
          align: 'center',
          width: 180,
          key: 'mblNoHid',
          fixed: 'left',
          render: (h, params) => {
            let callStateName = params.row.callStateName;
            let mblNoHid = params.row.mblNoHid;
            return h('Badge', {
              props: {
                count: params.row.callCount,
                className: 'badge_wrap'
              },
              style: {
                height: '35px',
                lineHeight: '36px',
              }
            }, [
                h(
                  'a',
                  {
                    class: 'edit-btn',
                    on: {
                      click: () => {
                        _this.handCall(params.row, 'call', '03');
                      }
                    }
                  },
                  `${mblNoHid === null ? '' : mblNoHid}${callStateName === null ? '' : '(' + callStateName + ')'}`
                ),
                this.plaintext ? h(
                  'Poptip',
                  {
                    props: {
                      content: _this.mingwenData,
                      transfer: true,
                    }
                  },
                  [
                    h(
                      'span',
                      {
                        on: {
                          click: () => {
                            _this.syscommon_decrypt({
                              type: 'MBL',
                              data: params.row.mblNo,
                              tripartite: 'tripartite'
                            });
                          }
                        },
                        style: {
                          display: params.row.mblNoHid ? 'inline-block' : 'none'
                        }
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'md-eye'
                          },

                          class: 'eye-class'
                        })
                      ]
                    )
                  ]
                ) : null
              ]);
          }
        },
        {
          title: '呼叫类型',
          align: 'center',
          key: 'callType',
          width: 100
        },
      ],

      // 通讯录
      case_detail_mail_list_pageNo: 1,
      case_detail_mail_list_pageSize: 20,
      case_detail_mail_list_total: 0,
      case_detail_mail_list_tableData: [],
      case_detail_mail_list_tableColumns: [
        {
          title: '操作',
          align: 'center',
          width: 40,
          key: 'edit',
          fixed: 'left',
          render: (h, params) => {
            return h('div', [
              _this.all_opt ? h(
                'span',
                {
                  style: {
                    display: _this.readType !== 'read' ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      _this.handCall(params.row, null, '03');
                    }
                  }
                },
                [
                  h('Icon', {
                    class: 'edit-btn',
                    props: {
                      type: 'md-create'
                    }
                  })
                ]
              ) : '无'
            ]);
          }
        },
        {
          title: '姓名（关系）',
          align: 'center',
          width: 140,
          key: 'userNmHid',
          render: (h, params) => {
            let callUserTypeName = params.row.callUserTypeName;
            let userNm = params.row.userNmClear;

            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'md-create'
                  }
                },
                `${userNm === null ? '' : userNm}${callUserTypeName === null ? '' : '(' + callUserTypeName + ')'}`
              )
            ]);
          }
        },
        {
          title: '手机(状态)',
          align: 'center',
          // width: 180,
          key: 'mblNoHid',
          fixed: 'left',
          render: (h, params) => {
            let callStateName = params.row.callStateName;
            let mblNoHid = params.row.mblNoHid;
            return h('Badge', {
              props: {
                count: params.row.callCount,
                className: 'badge_wrap'
              },
              style: {
                height: '35px',
                lineHeight: '36px',
              }
            }, [
                h(
                  'a',
                  {
                    class: 'edit-btn',
                    on: {
                      click: () => {
                        _this.handCall(params.row, 'call', '03');
                      }
                    }
                  },
                  `${mblNoHid === null ? '' : mblNoHid}${callStateName === null ? '' : '(' + callStateName + ')'}`
                ),
                this.plaintext ? h(
                  'Poptip',
                  {
                    props: {
                      content: _this.mingwenData,
                      transfer: true,
                    }
                  },
                  [
                    h(
                      'span',
                      {
                        on: {
                          click: () => {
                            _this.syscommon_decrypt({
                              type: 'MBL',
                              data: params.row.mblNo,
                              tripartite: 'tripartite'
                            });
                          }
                        },
                        style: {
                          display: params.row.mblNoHid ? 'inline-block' : 'none'
                        }
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'md-eye'
                          },

                          class: 'eye-class'
                        })
                      ]
                    )
                  ]
                ) : null
              ]);
          }
        },
      ],

      // 通话更新
      case_detail_mail_list_appended_pageNo: 1,
      case_detail_mail_list_appended_pageSize: 20,
      case_detail_mail_list_appended_total: 0,
      case_detail_mail_list_appended_tableData: [],
      case_detail_mail_list_appended_tableColumns: [
        {
          title: '操作',
          align: 'center',
          key: 'edit',
          fixed: 'left',
          width: 40,
          render: (h, params) => {
            return h('div', [
              _this.all_opt ? h(
                'span',
                {
                  style: {
                    display: _this.readType !== 'read' ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      _this.handCall(params.row, null, '03');
                    }
                  }
                },
                [
                  h('Icon', {
                    class: 'edit-btn',
                    props: {
                      type: 'md-create'
                    }
                  })
                ]
              ) : '无'
            ]);
          }
        },
        {
          title: '姓名(关系)',
          align: 'center',
          width: 150,
          key: 'userNm',
          render: (h, params) => {
            let callUserTypeName = params.row.callUserTypeName;
            let userNm = params.row.userNmClear;

            return h('div', [
              h(
                'span',
                {
                  props: {
                    type: 'md-create'
                  }
                },
                `${userNm === null ? '' : userNm}${callUserTypeName === null ? '' : '(' + callUserTypeName + ')'}`
              )
            ]);
          }
        },
        {
          title: '手机(状态)',
          align: 'center',
          // width: 170,
          key: 'mblNoHid',
          fixed: 'left',
          render: (h, params) => {
            let callStateName = params.row.callStateName;
            let mblNoHid = params.row.mblNoHid;
            return h('Badge', {
              props: {
                count: params.row.callCount,
                className: 'badge_wrap'
              },
              style: {
                height: '35px',
                lineHeight: '36px',
              }
            }, [
                h(
                  'a',
                  {
                    class: 'edit-btn',
                    props: {
                      type: 'md-create'
                    },
                    on: {
                      click: () => {
                        _this.handCall(params.row, 'call', '03');
                      }
                    }
                  },
                  `${mblNoHid === null ? '' : mblNoHid}${callStateName === null ? '' : '(' + callStateName + ')'}`
                ),
                this.plaintext ? h(
                  'Poptip',
                  {
                    props: {
                      content: _this.mingwenData,
                      transfer: true,
                    }
                  },
                  [
                    h(
                      'span',
                      {
                        on: {
                          click: () => {
                            _this.syscommon_decrypt({
                              type: 'MBL',
                              data: params.row.mblNo,
                              tripartite: 'tripartite'
                            });
                          }
                        },
                        style: {
                          display: params.row.mblNoHid ? 'inline-block' : 'none'
                        }
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'md-eye'
                          },

                          class: 'eye-class'
                        })
                      ]
                    )
                  ]
                ) : null
              ]);
          }
        },
      ]
    };
  },
  watch: {
    changeXZHungUpFlag(val) {
      console.log(val)
      if (val === 'YES') {
        this.call_xz_hung_off();
      }
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["changeXZHungUpFlag"])
  },
  async created() {
    console.log(Cookie.get('all_opt'));
    if (Cookie.get('all_opt') === 'true') {
      this.all_opt = true;
    };
    if (Cookie.get('plaintext') === 'true') {
      this.plaintext = true;
    };
    if (Cookie.get('apply_arbitrament') === 'true') {
      this.apply_arbitrament = true;
    };
    if (Cookie.get('apply_deduct') === 'true') {
      this.apply_deduct = true;
    };
    if (Cookie.get('apply_remission') === 'true') {
      this.apply_remission = true;
    };
    if (Cookie.get('APPLY_QR_CODE') === 'true') {
      this.APPLY_QR_CODE = true;
    };
    let params = location.hash.split('?');
    const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
    this.caseNo = window.atob(queryData.caseNotest);
    this.seatType = queryData.seatType;
    this.prdTyp = queryData.prdTyptest;
    this.userId = queryData.userIdtest;
    this.readType = queryData.readType;
    delete queryData.caseNotest;
    delete queryData.prdTyptest;
    delete queryData.seatType;
    delete queryData.userIdtest;
    if (queryData.readType === 'edit') {
      // this.case_collect_case_list(); // 我的案件
      await this.case_list()
    }
    delete queryData.readType;
    this.queryData = queryData;
    this.case_detail_remark_list(); // 催收信息
    this.case_detail_urgent_contact(); // 紧急联系人
    this.case_detail_case_base_info(); // 基本信息
    this.case_detail_bindcard_list(); // 绑卡信息
    // this.collectcode_getCollectRelate(); // 获取沟通状态
    this.case_detail_mail_statistics_list(); // 通话统计
    this.case_detail_case_identity_info(); // 查询案件详情身份信息
    this.case_detail_getimgurls();
    this.collectcode_getListByCodeType();//获取拨打状态
  },
  mounted() {
    // 禁止右键
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=false");
    });
  },
  methods: {
    // 获取时间轴
    async get_credit_process() {
      if (this.credit_panel) {
        this.credit_panel = false;
        return;
      }
      this.time_loading = true;
      const res = await credit_case_process({
        caseNo: this.caseNo
      });
      if (res.code === 1) {
        this.time_line_data = res.data;
        this.time_loading = false;
        this.credit_panel = true;
      } else {
        this.time_loading = false;
        this.$Message.error(res.message);
      }
    },
    // 获取表格数据
    async case_list() {
      const res = await case_list({
        ...this.queryData,
        id: this.caseNo,
        pageNum: 1
      });
      console.log(res);
      if (res.code === 1) {
        this.case_collect_case_list_data =
          res.data && res.data.page && res.data.page.content && res.data.page.content[0];
        this.userId = res.data.page.content[0].userId;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取表格数据
    async case_collect_case_list() {
      console.log(this.queryData, '---------------');
      const res = await case_collect_case_list({
        ...this.queryData,
        id: this.caseNo,
        pageNum: 1
      });
      if (res.code === 1) {
        this.case_collect_case_list_data =
          res.data && res.data.page && res.data.page.content && res.data.page.content[0];
        this.userId = res.data.page.content[0].userId;
      } else {
        this.$Message.error(res.message);
      }
    },
    call(obj) {
      var config = {
        uname: obj.loginName,
        pwd: obj.password,
        debug: true,
        isAutoAnswer: false,
        stateListenerCallBack: this.stateCallback,
        forceAnswerWhenRing: false, // 是否振铃自动接通
        autoReady: true,
        url: obj.url
      };
      console.log(config);
      CallHelper.init(config, this.initCallback);
    },
    /**
      * 设置状态监听回调
      */
    stateCallback(data) {
      console.log(data, '------------111111-------------')
      let callObj = {
        telNoHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
        usrNameHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
      };
      localStorage.setItem('callObj', JSON.stringify(callObj));
      this.$store.commit('changeCallData', data);
    },
    /**
          * 初始化方法回调是否成功
          */
    initCallback(data) {
      console.log(data, '-------------');
      if (data.successChange) {
        console.log(data);
        console.log('您已登录成功！desc_page');
        if (!callFlag) {
          return;
        }
        this.call_hung_on({
          callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
          callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
          toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
          toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
          toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
          toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
          collectType: this.objCopy.collectType,
        });
        callFlag = false;
      } else {
        // this.$Message.error('登录失败，请联系管理员！');
      }
    },
    async syscommon_decrypt(obj) {
      this.mingwenData = '';
      const res = await syscommon_decrypt(obj);
      if (res.code === 1) {
        this.mingwenData = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    async call_hung_on(obj) {
      let callData = JSON.parse(localStorage.getItem('callData'));
      let params = {
        callno: obj.callno,
        caseNo: this.caseNo,
        toCallUser: obj.toCallUser,
        toCallUserHid: obj.toCallUserHid,
        toCallMbl: obj.toCallMbl,
        toCallMblHid: obj.toCallMblHid,
        callUserType: obj.callUserType,
        userId: this.userId,
        collectType: obj.collectType,
      };
      if (callData.seatType === 'KT') {
        params.actionId = callData.id;
        // localStorage.removeItem('callObj');
      }
      let res = {};
      // 判断外呼模式，2  新路由， 1  传统方式
      if (callData.callType === '2') {
        // 新路由拨打方式三合一
        res = await this.callout_hung_on(params, callData);
      } else if (callData.callType === '1') {
        if (callData.seatType === 'RL') {
          res = await call_moor_hung_on(params);
        } else if (callData.seatType === 'KT') {
          res = await call_kt_hung_on(params);
        }
      };
      if (res.code === 1) {
        this.actionId = res.data.actionId;
        this.$Message.success('呼出成功');
        if (callData.seatType === 'RL') {
          this.showMoorTel = true;
          this.moorToCallMblHid = obj.toCallMblHid;
          this.moorToCallUser = obj.toCallUserHid;
        } else if (callData.seatType === 'KT') {
          localStorage.removeItem('callObj');
        }
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (params.collectType === '01')
            this.case_detail_case_identity_info();
          if (params.collectType === '02')
            this.case_detail_urgent_contact();
          if (params.collectType === '03')
            this[this.address_list_name]();
        }, 1500)
      } else {
        callData.callType === '2' && this.call_xz_hung_off();//呼叫失败调用挂断
        this.$Message.error(res.message);
      }
    },
    // 外呼合并（路由模式）
    async callout_hung_on(params, obj) {
      const res = await callout_hung_on({
        callRecordDomain: params,
        calloutVo: obj,
      }, {
          transformRequest: [
            function (data) {
              return JSON.stringify(data); //利用对应方法转换格式
            }
          ]
        });
      return res;
    },

    // 讯众外呼接口（传统模式 || 路由模式）
    async call_xz_hung_on(obj) {
      const callData = JSON.parse(localStorage.getItem('callData'));
      const XZ_STATE = sessionStorage.getItem('XZ_STATE');
      const XZ_ERROR_MSG = sessionStorage.getItem('XZ_ERROR_MSG');
      let res;
      if (callData.callType === '2') {
        res = await this.callout_hung_on(obj, callData);
        // if (XZ_STATE == '1') {
        // } else {
        //   this.$Message.error('请启动讯众新版软电话！');
        //   this.call_xz_hung_off();
        //   return;
        // }
      } else {
        res = await call_xz_hung_on(obj);
      }
      console.log(res)
      if (res.code === 1) {
        callData.callType === '2' && callOut(res.data.calloutVo.phoneNo);//调用拨打的方法
        // callData.callType === '2' && callOut();//调用拨打的方法
        this.showMoorTel = true;
        this.$Message.success('呼出成功');
        this.actionId = res.data.actionId;
        this.moorToCallMblHid = obj.toCallMblHid;
        this.moorToCallUser = obj.toCallUserHid;
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (obj.collectType === '01')
            this.case_detail_case_identity_info();
          if (obj.collectType === '02')
            this.case_detail_urgent_contact();
          if (obj.collectType === '03')
            this[this.address_list_name]();
        }, 1500);
      } else {
        callData.callType === '2' && this.call_xz_hung_off();//呼叫失败调用挂断
        this.$Message.error(res.message);
      }
    },
    // 讯众挂断接口（传统模式||路由模式）
    async call_xz_hung_off() {
      let callData = JSON.parse(localStorage.getItem('callData'));
      let XZ_INIT_DATA = JSON.parse(window.sessionStorage.getItem('XZ_INIT_DATA'));
      let res;
      if (callData.callType === '2') {
        res = await callout_hung_off({
          seatType: callData.seatType,//坐席类型
          actionId: this.actionId,
          callno: XZ_INIT_DATA.agentid,//坐席号
        })
      } else {
        res = await call_xz_hung_off({
          actionId: this.actionId
        });
      }
      if (res.code === 1) {
        if (callData.callType === '2') {
          hangUp();
        }
        this.showMoorTel = false;
      } else {
        this.$Message.error(res.message);
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.showMoorTel = false;
        }, 2000);
      }
      this.$store.commit('changeXZHungUpFlag','');//置空挂断标识符
    },
    // 容联挂断方法
    async call_moor_hung_up() {
      const res = await call_moor_hung_up();
      if (res.code === 1) {
        this.showMoorTel = false;
      } else {
        this.$Message.error(res.message);
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.showMoorTel = false;
        }, 2000);
      }
    },
    rowClassName(row, index) {
      if (row.overdueFlgName === '已逾期' || row.overdueFlgName === '处理中') {
        return 'table-info-row-red';
      } else {
        return 'table-info-row-black';
      }
    },
    // 保存通讯录
    saveTxl() {
      this.$refs.formItem2.validate((valid) => {
        if (valid) {
          this.mail_list_add();
        }
      });
    },
    // 新增通讯录
    async mail_list_add() {
      this.add_txl_loading = true;
      const res = await mail_list_add({
        ...this.formItem2,
        caseNo: this.caseNo,
        userId: this.userId
      });
      this.add_txl_loading = false;
      if (res.code === 1) {
        // 更新list
        this.case_detail_mail_list_appended();
        this.address_list_modal = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    closeTxl() {
      this.address_list_modal = false;
    },
    addtxl() {
      this.address_list_modal = true;
    },
    // 催收信息
    async case_detail_remark_list() {
      console.log(this.caseNo);
      this.case_detail_remark_list_spin = true
      const res = await case_detail_remark_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_remark_list_pageNo,
        pageSize: this.case_detail_remark_list_pageSize
      });
      this.case_detail_remark_list_spin = false
      if (res.code === 1) {
        this.case_detail_remark_list_tableData = res.data && res.data.content;
        this.case_detail_remark_list_pageSize = res.data.size;
        this.case_detail_remark_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 回款信息
    async case_detail_repay_ord_list() {
      this.case_detail_repay_ord_list_spin = true
      const res = await case_detail_repay_ord_list({
        userId: this.userId,
        // caseNo: this.caseNo,
        pageNum: this.case_detail_repay_ord_list_pageNo,
        pageSize: this.case_detail_repay_ord_list_pageSize
      });
      this.case_detail_repay_ord_list_spin = false
      if (res.code === 1) {
        this.case_detail_repay_ord_list_tableData = res.data && res.data.content;
        this.case_detail_repay_ord_list_pageSize = res.data.size;
        this.case_detail_repay_ord_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 用户主动还款
    async case_detail_user_repay_list() {
      this.case_detail_user_repay_list_spin = true
      const res = await case_detail_user_repay_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_user_repay_list_pageNo,
        pageSize: this.case_detail_user_repay_list_pageSize
      });
      this.case_detail_user_repay_list_spin = false
      if (res.code === 1) {
        this.case_detail_user_repay_list_tableData = res.data && res.data.content;
        this.case_detail_user_repay_list_pageSize = res.data.size;
        this.case_detail_user_repay_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 系统代扣还款
    async case_detail_system_repay_list() {
      this.case_detail_system_repay_list_spin = true
      const res = await case_detail_system_repay_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_system_repay_list_pageNo,
        pageSize: this.case_detail_system_repay_list_pageSize
      });
      this.case_detail_system_repay_list_spin = false
      if (res.code === 1) {
        this.case_detail_system_repay_list_tableData = res.data && res.data.content;
        this.case_detail_system_repay_list_pageSize = res.data.size;
        this.case_detail_system_repay_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 用户绑卡信息
    async case_detail_bindcard_list() {
      this.case_detail_bindcard_list_spin = true
      const res = await case_detail_bindcard_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_bindcard_list_pageNo,
        pageSize: this.case_detail_bindcard_list_pageSize
      });
      this.case_detail_bindcard_list_spin = false
      if (res.code === 1) {
        this.case_detail_bindcard_list_tableData = res.data && res.data.content;
        this.case_detail_bindcard_list_pageSize = res.data.size;
        this.case_detail_bindcard_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 操作记录
    async case_detail_getcaselog() {
      this.case_detail_getcaselog_spin = true
      const res = await case_detail_getcaselog({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_getcaselog_pageNo,
        pageSize: this.case_detail_getcaselog_pageSize
      });
      this.case_detail_getcaselog_spin = false
      if (res.code === 1) {
        this.case_detail_getcaselog_tableData = res.data && res.data.content;
        this.case_detail_getcaselog_pageSize = res.data.size;
        this.case_detail_getcaselog_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 站内信记录
    async case_detail_siteletter_list() {
      this.case_detail_siteletter_list_spin = true
      const res = await case_detail_siteletter_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_siteletter_list_pageNo,
        pageSize: this.case_detail_siteletter_list_pageSize
      });
      this.case_detail_siteletter_list_spin = false
      if (res.code === 1) {
        this.case_detail_siteletter_list_tableData = res.data && res.data.content;
        this.case_detail_siteletter_list_pageSize = res.data.size;
        this.case_detail_siteletter_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 通信记录统计
    async case_detail_mail_statistics_list() {
      this.message_list_loading = true;
      const res = await case_detail_mail_statistics_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_mail_statistics_list_pageNo,
        pageSize: this.case_detail_mail_statistics_list_pageSize
      });
      this.message_list_loading = false;
      if (res.code === 1) {
        this.case_detail_mail_statistics_list_tableData = res.data && res.data.content;
        this.case_detail_mail_statistics_list_pageSize = res.data.size;
        this.case_detail_mail_statistics_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 通话明细
    async case_detail_mail_detail_list() {
      this.message_list_loading = true;
      const res = await case_detail_mail_detail_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_mail_detail_list_pageNo,
        pageSize: this.case_detail_mail_detail_list_pageSize
      });
      this.message_list_loading = false;
      if (res.code === 1) {
        this.case_detail_mail_detail_list_tableData = res.data && res.data.content;
        this.case_detail_mail_detail_list_pageSize = res.data.size;
        this.case_detail_mail_detail_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 通讯录
    async case_detail_mail_list() {
      this.message_list_loading = true;
      const res = await case_detail_mail_list({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_mail_list_pageNo,
        pageSize: this.case_detail_mail_list_pageSize
      });
      this.message_list_loading = false;
      if (res.code === 1) {
        this.case_detail_mail_list_tableData = res.data && res.data.content;
        this.case_detail_mail_list_pageSize = res.data.size;
        this.case_detail_mail_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 通话更新
    async case_detail_mail_list_appended() {
      this.message_list_loading = true;
      const res = await case_detail_mail_list_appended({
        caseNo: this.caseNo,
        userId: this.userId,
        pageNum: this.case_detail_mail_list_appended_pageNo,
        pageSize: this.case_detail_mail_list_appended_pageSize
      })
      this.message_list_loading = false;
      if (res.code === 1) {
        this.case_detail_mail_list_appended_tableData = res.data && res.data.content;
        this.case_detail_mail_list_appended_pageSize = res.data.size;
        this.case_detail_mail_list_appended_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 紧急联系人
    async case_detail_urgent_contact() {
      const res = await case_detail_urgent_contact({
        caseNo: this.caseNo,
        userId: this.userId
      });
      if (res.code === 1) {
        this.case_detail_urgent_contact_Data = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 地址信息
    async case_detail_address_info() {
      this.case_detail_address_info_spin = true
      const res = await case_detail_address_info({
        caseNo: this.caseNo,
        userId: this.userId
      });
      this.case_detail_address_info_spin = false

      if (res.code === 1) {
        this.case_detail_address_info_Data = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },

    // 查询案件详情基础信息
    async case_detail_case_base_info() {
      const res = await case_detail_case_base_info({
        ...this.queryData,
        id: this.caseNo
      });
      if (res.code === 1) {
        this.case_detail_case_base_info_Data = res.data && res.data;
        this.tableData = res.data && res.data.caseBasePerdVoList;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查询案件详情身份信息
    async case_detail_case_identity_info() {
      const res = await case_detail_case_identity_info({
        ...this.queryData,
        id: this.caseNo
      });
      if (res.code === 1) {
        this.btnDisable = false;
        this.case_detail_case_identity_info_Data = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取图片接口
    async case_detail_getimgurls() {
      const res = await case_detail_getimgurls({
        caseNo: this.caseNo,
      });
      console.log(res);
      if (res.code === 1) {
        this.img_list = res.data;
      } else {
        this.$Message.error('获取图片异常')
      }
    },
    // tab 所有点击（除通讯录以外的）
    tabClick(name) {
      this[`${name}_pageNo`] = 1;
      this[name]();
    },
    // tab 通讯录点击
    tab_click_address(name) {
      this.address_list_name = name;
      this[`${name}_pageNo`] = 1;
      this[name]();
    },

    // 取消催记
    handleCancle(flag) {
      this.add_collect_loading = false;
      // 重置初始化数据
      this.mblNo = '';
      this.userNmClearCopy = '';
      this.mblNoHid = '';
      this.userNm = '';
      this.collectType = '';
      this.collectcode_getCollectRelate_childItem = []
      this.formValidate.communicateResult = null;
      this.formValidate = {};
      // this.formValidate.callUserType = '';
      this.$refs.formValidate.resetFields();
      this.showBottom = false;
      console.log(this.formValidate)
    },

    // 点击电话
    handCall(obj, type, tag) {
      if (!this.all_opt) {
        this.$Message.error('很抱歉，暂无权限拨打');
        return;
      }
      if (obj.callUserType || obj.cntRelTyp) {
        this.callUserType = (obj.callUserType || obj.cntRelTyp) === '00' ? '1' : '2';
      } else {
        this.callUserTyp = '';
      }
      let callData = JSON.parse(localStorage.getItem('callData'));
      this.handleCancle();
      // 判断拨打模式，是新路由还是传统模式
      if (type === 'call' && this.readType !== 'read') {
        this.objCopy = obj;
        this.objCopy.collectType = tag;
        // type ['call] 拨打电话
        if (localStorage.getItem('callData') && this.seatType === 'KT') {
          if (localStorage.getItem('callObj')) {
            this.$Message.info('请先挂断其他电话，再重试');
            return
          }
          callFlag = true;
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '/dist/callhelper.min.js';
          head.appendChild(script);
          if (callData.callType === '2') {
            this.callout_rout_get_seat(obj, tag)
          } else if (callData.callType === '1') {
            setTimeout(() => {
              this.call(callData);
            }, 500)
          }
        } else if (this.seatType === 'RL') {
          // 容联外呼传参
          this.call_hung_on({
            callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
            toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
            toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
            toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
            collectType: tag,
          });
        } else if (this.seatType === 'XZ') {
          // 讯众外呼传参
          this.call_xz_hung_on({
            callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
            toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
            toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
            toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
            userId: this.userId,
            caseNo: this.caseNo,
            collectType: tag,
          });
        }
      } else {
        this.objCopy = {};
        this.actionId = '';
      }

      if (this.readType !== 'read') {
        if (obj.callUserType || obj.cntRelTyp) {
          this.formValidate.callUserType = obj.callUserType || obj.cntRelTyp;
        } else {
          this.handleCancle()
        }
        this.collectType = tag;
        this.formValidate.userNmHid = obj.userNmHid || obj.cntUserNameHid;
        this.formValidate.userNmClear = obj.userNmClear || obj.cntUserNameClear;
        this.userNmClearCopy = obj.userNmClear || obj.cntUserNameClear;
        this.mblNoHid = obj.mblNoHid || obj.cntUserMblNoHid;
        this.userNm = obj.userNm || obj.cntUserName;
        this.mblNo = obj.mblNo || obj.cntUserMblNo;
        this.showBottom = true;
      } else {
        this.$Message.info('权限不足');
      }
    },
    passBack(type) {
      this.modal[type] = false;
    },
    passBackBreaks(obj) {
      console.log(obj)
      this.modal[obj.name] = obj.flag;
      if (obj.status === 'ok') {
        switch (obj.name) {
          case 'QR_code_detail':
            this.breaks_data = {
              caseNo: this.caseNo,
            }
            this.modal.QR_CODE = true;
            break;
          case 'jianmian':
            this.$Message.success('申请成功');
            break;
          case 'gathering':
            this.breaks_data = {
              caseNo: this.caseNo,
            }
            this.modal.QR_CODE = true;
            break;
          default:
            break;
        }
      }
    },
    async handOpen(type, userId) {
      // 时时判断当前案件是否出催，是的话不走下面的逻辑
      await this.case_detail_case_identity_info();
      if (this.case_detail_case_identity_info_Data.caseHandleStatus === 'OUT') {
        this.$Message.info({
          content: '当前案件已出催！',
          duration: 3
        });
        return;
      };
      if (type === 'zhongcai') {
        let idCardFront = '';
        let idCardOpposite = '';
        if (this.img_list.length > 0) {
          this.img_list.forEach((item) => {
            if (item.imgType == 1) {
              idCardFront = item.imgPath;
            } else if (item.imgType == 2) {
              idCardOpposite = item.imgPath;
            }
          });
        }
        this.zhongcai_set_data = {
          idNoHid: this.case_detail_case_identity_info_Data.idNoHid,
          billNo: this.case_detail_case_base_info_Data.billNo,
          userNmHid: this.case_detail_case_identity_info_Data.userNmHid,
          caseNo: this.caseNo,
          userGender: this.case_detail_case_identity_info_Data.userGender,
          userNation: this.case_detail_case_identity_info_Data.userNation,
          idCardFront,
          idCardOpposite
        };
      } else if (type === 'jianmian') {
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_detail_case_base_info_Data.billNo,
        }
      } else if (type === 'huakou') {
        this.$set(this, 'userId', userId);
      } else if (type === 'gathering') {
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_detail_case_base_info_Data.billNo,
          tableData: this.tableData
        };
        this.offlineScanPay_apply(type);
        return;
      }
      this.modal[type] = true;
    },
    // 判断是否存在二维码
    async offlineScanPay_apply(name) {
      const res = await offlineScanPay_apply({
        caseNo: this.caseNo,
      })
      if (res.code === 3000001) {
        // 新创建收款码
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_detail_case_base_info_Data.billNo,
          tableData: this.tableData
        };
        this.modal[name] = true;
      } else if (res.code === 3000002) {
        this.$Message.info('二维码正在失效中，请稍后重试！')
      } else {
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_detail_case_base_info_Data.billNo,
          data: res.data,
        }
        this.modal.QR_code_detail = true;
      }
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    isShow() {
      this.showBtn = !this.showBtn;
    },
    // 页码改变的回调
    changePage(name) {
      this[name]();
    },
    nextCase(caseNo) {
      let params = location.hash.split('?');
      const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
      queryData.caseNotest = window.btoa(caseNo);
      // delete queryData.userIdtest
      // queryData.userIdtest = this.case_collect_case_list_data.userId
      // console.log(queryData,'++++')
      // return
      location.href = params[0] + '?' + qs.stringify(queryData);
      location.reload();
    },
    // 切换每页条数时的回调
    changeSize(pageSize, name) {
      console.log(this.case_detail_getcaselog_pageSize);
      console.log(pageSize, name);
      this.pageSize = pageSize;
      this.pageNo = 1;
    },
    // 新增催记
    async case_remark_his_add() {
      this.add_collect_loading = true;
      const res = await case_remark_his_add({
        ...this.formValidate,
        promiseRepayDate: this.formValidate.promiseRepayDate
          ? dayjs(this.formValidate.promiseRepayDate).format('YYYY-MM-DD HH:mm')
          : '',
        userId: this.userId,
        userNm: this.userNm,
        mblNo: this.mblNo,
        mblNoHid: this.mblNoHid,
        caseNo: this.caseNo,
        collectType: this.collectType,
        // userNmHid: this.userNmHidCopy,
        soundUuid: this.actionId,
        userNmNew: this.formValidate.userNmClear === this.userNmClearCopy ? '' : this.formValidate.userNmClear
      });
      this.add_collect_loading = false;
      if (res.code === 1) {
        this.$Message.success('添加成功');
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.case_detail_remark_list_pageNo = 1;
          this.case_detail_remark_list();
          // debugger
          if (this.collectType === '01') {
            this.case_detail_case_identity_info();
          }
          if (this.collectType === '02') {
            this.case_detail_urgent_contact();
          }
          if (this.collectType === '03') {
            this[this.address_list_name]();
          }
          this.handleCancle(true);
        }, 1500);
      } else {
        this.$Message.error(res.message);
      }
    },
    //获取拨打状态
    async collectcode_getListByCodeType() {
      const res = await collectcode_getListByCodeType({
        codeType: 'TALK_RESULT_NEW'
      });
      console.log(res);
      if (res.code === 1) {
        this.collectcode_getCollectRelate_Data = res.data;
      } else {
        this.$Message.error('获取拨打状态异常')
      }
    },
    // 获取沟通状态
    async collectcode_getCodeList(id, type) {
      const res = await collectcode_getCodeList({
        codeKeyOrigin: id,
        relateType: type
      });
      if (res.code === 1) {
        if (res.data.length === 0) {
          this.$refs.formValidate.validateField('callUserType');
        }
        if (res.data.length === 1) {
          // this.$set(this.formValidate, 'communicateResult', res.data[0].codeKeyResult);
          this.formValidate.communicateResult = res.data[0].codeKeyResult;
        }
        this.collectcode_getCollectRelate_childItem = res.data;
      } else {
        this.$Message.error('获取沟通状态异常')
      }
    },
    // 拨打状态change
    SelectChange(code) {
      console.log(code)
      this.call_status = code;
      this.formValidate.communicateResult = null;
      if (code) {
        this.collectcode_getCodeList(code, this.callUserType);
      }
    },
    // 关系状态change
    select_relation(key) {
      console.log(key)
      this.formValidate.communicateResult = null;
      if (key) {
        this.callUserType = key === '00' ? '1' : '2';
      } else {
        this.callUserType = '';
      }
      if (key) {
        this.collectcode_getCodeList(this.call_status, this.callUserType);
      }
    },
    // 新增催记按钮
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.case_remark_his_add();
        }
      });
    },
    // 重新获取坐席信息
    async callout_rout_get_seat(obj, tag) {
      let callData = JSON.parse(localStorage.getItem('callData'));
      const res = await callout_rout_get_seat({
        callType: callData.callType,
        planId: callData.planId,
        phoneNo: obj.mblNo,
        caseNo: this.caseNo,
      })
      if (res.code === 1) {
        localStorage.setItem('callData', JSON.stringify(res.data));
        if (res.data.seatType === 'KT') {
          this.call(res.data);
        } else if (res.data.seatType === 'XZ') {
          let obj = { compid: '830058', telephone: res.data.agentid, agentid: res.data.seatNo, telephonePassword: res.data.passwordMd5, serverid: '', password: res.data.password };
          window.sessionStorage.setItem('XZ_INIT_DATA', JSON.stringify(obj));
          await init();
          this.call_xz_hung_on({
            callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
            toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
            toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
            toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
            userId: this.userId,
            caseNo: this.caseNo,
            collectType: tag,
          });
        }
      } else {
        this.$Message.error(res.message);
      }
    },
  }
};
