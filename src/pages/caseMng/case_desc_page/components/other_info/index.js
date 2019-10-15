import { case_detail_bindcard_list, // 绑卡信息
  case_detail_getcaselog,// 操作记录
  case_detail_siteletter_list, // 站内
  case_detail_address_info, // 地址
 } from '@/service/getData';
export default {
  name: 'other_info',
  props: ['queryData', 'caseNo', 'userId'],
  data () {
    const _this = this;
    return {
      message_detail_flag: false,
      message_detail_data: {},//站内信modal展示的数据
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
      case_detail_address_info_Data: {},
    }
  },
  created () {
    this.case_detail_bindcard_list(); // 绑卡信息
  },
  methods: {
    // 页码改变的回调
    changePage(pageNum, name) {
      this[name]();
    },
    // 切换每页条数时的回调
    changeSize(pageSize, name) {
      this[name + '_pageSize'] = pageSize;
      this.pageNo = 1;
      this[name]();
    },
    // tab 所有点击（除通讯录以外的）
    tabClick(name) {
      this[`${name}_pageNo`] = 1;
      this[name]();
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
  },
}
