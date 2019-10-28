import {
  case_detail_mail_detail_list, // 通话明细
  case_detail_mail_list, // 通讯录（指定案件）
  case_detail_mail_list_appended, // 定案件后追加的
  case_detail_mail_statistics_list, // 通信记录统计
  case_detail_urgent_contact, // 紧急联系人
  mail_list_add, // 新增通讯录
  case_remark_his_add, // 新增催记
  // collectcode_getCollectRelate, // 获取沟通状态
  collectcode_getCodeList, // 获取沟通状态
  collectcode_getListByCodeType,// 获取拨打状态
  call_kt_hung_on, // 客天外拨
  call_moor_hung_on, // 容联外拨
  callout_fixed_hung_on, //度言外拨
  callout_fixed_hung_off,//度言挂断
  call_moor_hung_up,//容联挂断
  call_xz_hung_on,//讯众接通
  call_xz_hung_off,//讯众挂断
  syscommon_decrypt, // 明文展示
  callout_rout_get_seat,//重新获取坐席参数
  callout_hung_on, //新路由模式的外呼
  callout_hung_off,//新路由模式的挂断
  rounds_info,//当前案件轮次信息
  rounds_over,//结束当前案件轮次
  rounds_record,//记录当前通话状态
} from '@/service/getData';
import util from '@/libs/util';
import Cookie from 'js-cookie';
import { mapGetters } from "vuex";
import { init, callOut, hangUp } from '@/libs/news_crowd';//讯众插件
import dayjs from 'dayjs';
import sysDictionary from '@/mixin/sysDictionary';
let callFlag = false;
export default {
  name: 'address_list',
  props: ['queryData', 'caseNo', 'collectCategory', 'address_list_data', 'userId'],
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
      getDirList: ['CONTACT_REL_TYPE'],
      getDirObj: {},
      formValidate: {},//新增催记
      formItem: {},//新增通讯录
      ruleValidate2: {
        mblNo: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur',
            validator: call_number_validator,
          },
        ],
      },
      collectType: '',
      readType: '',
      userIdCopy: '',
      userNmClearCopy: '',// 保存的明文名字
      showBottom: false,//添加、编辑催记弹窗
      remark_flag: false,//是否记催记的标识符
      callUserType: '',//催记里面的关系
      call_status: '',// 拨打状态暂存
      all_opt: false,
      plaintext: false,
      showDYFlag: null,
      Dy_data: {},
      recordIdDY: '',
      recordId: '',//后端返回的，做唯一标识用
      recordIdFront: '',//前端定义的16位随机串，做唯一标识用
      xZStyle: false,
      xZStatus: '',
      seatType: String,
      actionId: '',//通话的id
      objCopy: {},//本地拷贝的通话参数
      mingwenData: '',
      HUNG_UP_FLAG: window.sessionStorage.getItem('HUNG_UP_FLAG'),//挂断标识
      moorToCallMblHid: '',//容联电话呼叫成功显示的电话密文
      moorToCallUser: '',//容联电话呼叫成功显示的姓名
      showMoorTel: false,//容联电话弹窗flag
      add_collect_loading: false,//添加催记按钮loading
      add_txl_loading: false,//添加通讯录提交按钮loading
      message_list_loading: false,//通讯录table loading
      address_list_name: 'case_detail_mail_statistics_list',//通讯录默认name
      round_info_data: {},//轮次信息的相关字段
      address_list_modal: false,
      collectcode_getCollectRelate_Data: [],
      collectcode_getCollectRelate_childItem: [],
      formValidate: {},
      case_detail_case_identity_info_Data: {},
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
                    class: !_this.all_opt || (_this.round_info_data.callAccess && !_this.round_info_data.callAccess.contactCallable) ? 'readonly' : 'edit-btn',
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
                  class: !_this.all_opt || (_this.round_info_data.callAccess && !_this.round_info_data.callAccess.contactCallable) ? 'readonly' : 'edit-btn',
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
                  class: !_this.all_opt || (_this.round_info_data.callAccess && !_this.round_info_data.callAccess.contactCallable) ? 'readonly' : 'edit-btn',
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
                  class: !_this.all_opt || (_this.round_info_data.callAccess && !_this.round_info_data.callAccess.contactCallable) ? 'readonly' : 'edit-btn',
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
    }
  },
  watch: {
    userId(userId) {
      this.readType = this.queryData.readType;
      this.userIdCopy = userId;
      this.case_detail_urgent_contact(); // 紧急联系人
      this.case_detail_mail_list(); // 通话统计
      this.collectcode_getListByCodeType();//获取拨打状态
      this.rounds_info();//获取当前案件轮次的信息
    },
    address_list_data(data) {
      this.case_detail_case_identity_info_Data = data;
    },
    changeXZHungUpFlag(val) {
      console.log(val)
      if (val === 'YES') {
        this.call_xz_hung_off();
      }
    },
    changeCallRecord(obj) {
      console.log(obj);
      this.rounds_record(obj);
    }
  },
  created() {
    if (Cookie.get('all_opt') === 'true') {
      this.all_opt = true;
    };
    if (Cookie.get('plaintext') === 'true') {
      this.plaintext = true;
    };

  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["changeXZHungUpFlag", "changeCallRecord"])
  },
  methods: {
    // 刷新通讯录、紧连、本人的接口
    async refreshData(type) {
      if (type === '01')
        await this.$emit('deliveryData', { type: 'ADDRESS_LIST' });
      if (type === '02')
        await this.case_detail_urgent_contact();
      if (type === '03')
        await this[this.address_list_name]();
    },
    // 通讯录缩放功能回调
    isShow() {
      this.$emit('isShow');
    },
    // 初始化科天的标签
    initKTScript(callData) {
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
      setTimeout(() => {
        this.call(callData);
      }, 500)
    },
    call(obj) {
      var config = {
        uname: obj.loginName,
        pwd: obj.password,
        debug: true,
        isAutoAnswer: true,
        stateListenerCallBack: this.stateCallback,
        forceAnswerWhenRing: false, // 是否振铃自动接通
        autoReady: true,
        url: obj.url
      };
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
        console.log('您已登录成功！desc_page');
        if (!callFlag) {
          return;
        }
        this.call_kt_hung_on({
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
    // 度言外呼
    callout_fixed_hung_on(tag, callData) {
      let params = {
        callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
        callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
        toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
        toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
        toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
        toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
        userId: this.userIdCopy,
        caseNo: this.caseNo,
        collectType: tag,
      }
      callout_fixed_hung_on({
        callRecordDomain: params,
        calloutVo: callData,
      }, {
        transformRequest: [
          function (data) {
            return JSON.stringify(data); //利用对应方法转换格式
          }
        ]
      }).then(res => {
        if (res.code === 1) {
          // this.recordIdDY = res.data.callRecordDomain.id
          if (DYSDK.isReady) {
            document.getElementById("dyCti").parentNode.style =
              'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); z-index:100'
            sessionStorage.setItem('recordIdDY', res.data.callRecordDomain.id)
            DYSDK.call(res.data.toCallMbl, function () {
            }, '');
          } else {
            DYSDK.init({ stopBeforeunload: true });
            let timeID = setInterval(() => {
              if (DYSDK.isReady) {
                document.getElementById("dyCti").parentNode.style =
                  'position: fixed; bottom: 200px; background: rgba(55,55,55,.6); overflow: hidden; border-radius: 4px; padding: 10px; display: flex; align-items: flex-start; color: rgb(174, 174, 174); z-index:100'
                sessionStorage.setItem('recordIdDY', res.data.callRecordDomain.id)
                DYSDK.call(res.data.toCallMbl, function () {
                }, '');
                clearInterval(timeID);
              }
            }, 300);
          };
          this.refreshData(tag);
        }
      })
    },
    // 科天的呼叫（callType 1 一对一  2 路由）
    async call_kt_hung_on(obj) {
      let callData = JSON.parse(localStorage.getItem('callData'));
      let params = {
        callno: obj.callno,
        caseNo: this.caseNo,
        toCallUser: obj.toCallUser,
        toCallUserHid: obj.toCallUserHid,
        toCallMbl: obj.toCallMbl,
        toCallMblHid: obj.toCallMblHid,
        callUserType: obj.callUserType,
        userId: this.userIdCopy,
        collectType: obj.collectType,
      };
      if (callData.seatType === 'KT') {
        params.actionId = callData.id;
      }
      let res = {};
      // 判断外呼模式，2  新路由， 1  传统方式
      if (callData.callType === '2') {
        // 新路由拨打方式三合一
        res = await this.callout_hung_on(params, callData);
      } else if (callData.callType === '1') {
        res = await call_kt_hung_on(params);
      };
      if (res.code === 1) {
        this.actionId = res.data.actionId;
        this.$Message.success('呼出成功');
        localStorage.removeItem('callObj');
        callData.actionId = res.data.actionId;
        localStorage.setItem('callData', JSON.stringify(callData));
        callData.callType === '2' && this.$set(this, 'recordIdFront', util.randomRange());
        callData.callType === '2' && this.round_info_data.callAccess.debtorCallable && !this.round_info_data.callAccess.contactCallable && !this.round_info_data.callAccess.urgencyCallable && await this.rounds_record({ seatType: callData.seatType, status: '0' });//本人的呼叫记录假状态
        callData.callType === '2' && this.round_info_data.callAccess.debtorCallable && !this.round_info_data.callAccess.contactCallable && this.round_info_data.callAccess.urgencyCallable && await this.rounds_record({ seatType: callData.seatType, status: '0' });//紧连的呼叫记录假状态
        this.refreshData(params.collectType);//刷新数据
      } else {
        callData.callType === '2' && this.call_xz_hung_off();//呼叫失败调用挂断
        this.$Message.error(res.message);
        this.actionId = '';
      }
    },
    // 容联外呼(一对一模式)
    async call_moor_hung_on(obj) {
      const res = await call_moor_hung_on({
        callno: obj.callno,
        caseNo: this.caseNo,
        toCallUser: obj.toCallUser,
        toCallUserHid: obj.toCallUserHid,
        toCallMbl: obj.toCallMbl,
        toCallMblHid: obj.toCallMblHid,
        callUserType: obj.callUserType,
        userId: this.userIdCopy,
        collectType: obj.collectType,
      });
      if (res.code === 1) {
        this.actionId = res.data.actionId;
        this.$Message.success('呼出成功');
        this.showMoorTel = true;
        this.moorToCallMblHid = obj.toCallMblHid;
        this.moorToCallUser = obj.toCallUserHid;
        this.refreshData(obj.collectType);
      } else {
        this.$Message.error(res.message);
        this.actionId = '';
      }
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
      let res;
      if (callData.callType === '2') {
        res = await this.callout_hung_on(obj, callData);
      } else {
        res = await call_xz_hung_on(obj);
      }
      if (res.code === 1) {
        this.actionId = res.data.actionId;
        this.recordId = res.data.recordId;
        if (callData.callType === '2') {
          await init(res.data.calloutVo.phoneNo, this);//调用拨打的方法
          this.xZStyle = true;
          callData.callType === '2' && this.$set(this, 'recordIdFront', util.randomRange());
          this.round_info_data.callAccess.debtorCallable && !this.round_info_data.callAccess.contactCallable && !this.round_info_data.callAccess.urgencyCallable && await this.rounds_record({ seatType: callData.seatType, status: '0' });//本人呼叫的记录假状态
          this.round_info_data.callAccess.debtorCallable && !this.round_info_data.callAccess.contactCallable && this.round_info_data.callAccess.urgencyCallable && await this.rounds_record({ seatType: callData.seatType, status: '0' });//紧连呼叫的记录假状态
        }
        this.showMoorTel = true;
        this.moorToCallMblHid = obj.toCallMblHid;
        this.moorToCallUser = obj.toCallUserHid;
        this.refreshData(obj.collectType);//刷新数据
      } else {
        callData.callType === '2' && this.call_xz_hung_off();//呼叫失败调用挂断
        this.$Message.error(res.message);
        this.actionId = '';
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
          actionId: sessionStorage.getItem('callId') ? sessionStorage.getItem('callId') : '',
          id: this.recordId,
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
      this.$store.commit('changeXZHungUpFlag', '');//置空挂断标识符
    },
    // 新增通讯录
    async mail_list_add() {
      this.add_txl_loading = true;
      const res = await mail_list_add({
        ...this.formItem,
        caseNo: this.caseNo,
        userId: this.userIdCopy
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
    // 保存通讯录
    saveTxl() {
      this.$refs.formItem.validate((valid) => {
        if (valid) {
          this.mail_list_add();
        }
      });
    },
    closeTxl() {
      this.address_list_modal = false;
    },
    addtxl() {
      this.address_list_modal = true;
    },
    // 通信记录统计
    async case_detail_mail_statistics_list() {
      this.message_list_loading = true;
      const res = await case_detail_mail_statistics_list({
        caseNo: this.caseNo,
        userId: this.userIdCopy,
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
        userId: this.userIdCopy,
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
        userId: this.userIdCopy,
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
        userId: this.userIdCopy,
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
        userId: this.userIdCopy
      });
      if (res.code === 1) {
        this.case_detail_urgent_contact_Data = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },

    // tab 通讯录点击
    tab_click_address(name) {
      this.address_list_name = name;
      this[`${name}_pageNo`] = 1;
      this[name]();
    },
    // 取消催记
    handleCancle(flag) {
      if (this.remark_flag && this.collectCategory) {
        this.$Message.error('请完成当前催记');
        return;
      }
      this.actionId = '';
      this.recordId = '';
      this.recordIdFront = '';
      this.recordIdDY = '';
      sessionStorage.removeItem('callId');
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
    async handCall(obj, type, tag) {
      // 判断权限是否可以拨打或是否上限
      if (this.isCallOut(tag) === false) {
        return;
      };
      // 判断当前催记是否完成
      if (this.remark_flag && this.collectCategory) {
        this.$Message.error('请完成当前催记后再进行拨打');
        return
      }
      // 确定外呼联系人的关系
      if (obj.callUserType || obj.cntRelTyp) {
        this.callUserType = (obj.callUserType || obj.cntRelTyp) === '00' ? '1' : '2';
      } else {
        this.callUserTyp = '';
      };
      let callData = JSON.parse(localStorage.getItem('callData'));
      this.handleCancle();//重置相关外呼的参数
      // 判断拨打模式，是新路由还是传统模式
      if (type === 'call' && this.readType !== 'read') {
        this.objCopy = obj;
        this.objCopy.collectType = tag;
        // type ['call] 拨打电话
        //callType 1 一对一模式，2 路由模式
        if (callData.callType === '2') {
          this.callout_rout_get_seat(obj, tag)
        } else if (callData.callType === '1') {
          this.seatType = callData.seatType;
          callData.seatType === 'DY' && this.callout_fixed_hung_on(tag, callData);
          if (localStorage.getItem('callData') && callData.seatType === 'KT') {
            await this.initKTScript(callData);
          } else if (callData.seatType === 'RL') {
            // 容联外呼传参
            this.call_moor_hung_on({
              callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
              callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
              toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
              toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
              toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
              toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
              collectType: tag,
            });
          } else if (callData.seatType === 'XZ') {
            // 讯众外呼传参
            this.call_xz_hung_on({
              callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
              callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
              toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
              toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
              toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
              toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
              userId: this.userIdCopy,
              caseNo: this.caseNo,
              collectType: tag,
            });
          }
        };
      } else {
        this.objCopy = {};
        this.actionId = '';
      }
      // 不可读状态
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
    // 判断权限是否可以拨打或是否上限
    isCallOut(tag) {
      if (this.all_opt) {
        if (this.collectCategory) {
          switch (tag) {
            case '01':
              if (!this.round_info_data.callAccess.debtorCallable) {
                return false;
              }
              break;
            case '02':
              if (!this.round_info_data.callAccess.urgencyCallable) {
                this.$Message.error('很抱歉，请先拨打本人电话');
                return false;
              }
              break;
            case '03':
              if (!this.round_info_data.callAccess.contactCallable) {
                return false;
              }
              break;
            default:
              break;
          }
        }
      } else {
        this.$Message.error('很抱歉，暂无权限拨打');
        return false;
      }
    },
    // 度言回调
    passBackDY(uid) {
      callout_fixed_hung_off({
        id: this.recordIdDY,
        actionId: uid
      }).then(res => {
        this.showDYFlag = null;
        this.$emit('deliveryData', { type: 'ADDRESS_LIST' });
      })
    },
    // 切换每页条数时的回调
    changeSize(pageSize, name) {
      this[name + '_pageSize'] = pageSize;
      this.pageNo = 1;
      this[name]();
    },
    // 页码改变的回调
    changePage(pageNum, name) {
      this[name]();
    },
    // 新增催记
    async case_remark_his_add() {
      let callData = JSON.parse(localStorage.getItem('callData'));
      if (callData.callType === '2' && callData.seatType === 'XZ') {
        this.actionId = sessionStorage.getItem('callId') ? sessionStorage.getItem('callId') : '';
      }
      if (callData.callType === '1' && callData.seatType === 'DY') {
        this.actionId = sessionStorage.getItem('callId') ? sessionStorage.getItem('callId') : '';
      }
      this.add_collect_loading = true;
      const res = await case_remark_his_add({
        ...this.formValidate,
        promiseRepayDate: this.formValidate.promiseRepayDate
          ? dayjs(this.formValidate.promiseRepayDate).format('YYYY-MM-DD HH:mm')
          : '',
        userId: this.userIdCopy,
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
        this.remark_flag = false;
        this.actionId = '';
        sessionStorage.removeItem('callId');
        await this.$emit('deliveryData', { type: 'ADDRESS_LIST', tag: 'add_remark' });
        this.refreshData(this.collectType);//刷新数据
        this.rounds_info();
        this.handleCancle(true);
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
        phoneNo: obj.mblNo || obj.cntUserMblNo,
        caseNo: this.caseNo,
      })
      if (res.code === 1) {
        localStorage.setItem('callData', JSON.stringify(res.data));
        if (res.data.seatType === 'KT') {
          this.seatType = res.data.seatType;
          await this.initKTScript(res.data);
        } else if (res.data.seatType === 'XZ') {
          this.seatType = res.data.seatType;
          let obj = { compid: '830058', telephone: res.data.agentid, agentid: res.data.seatNo, telephonePassword: res.data.passwordMd5, serverid: '', password: res.data.password };
          window.sessionStorage.setItem('XZ_INIT_DATA', JSON.stringify(obj));
          // await init();
          this.call_xz_hung_on({
            callno: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            callUserType: this.objCopy.callUserType || this.objCopy.cntRelTyp,
            toCallUser: this.objCopy.userNm || this.objCopy.cntUserName,
            toCallUserHid: this.objCopy.userNmHid || this.objCopy.cntUserNameHid,
            toCallMbl: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
            toCallMblHid: this.objCopy.mblNoHid || this.objCopy.cntUserMblNoHid,
            userId: this.userIdCopy,
            caseNo: this.caseNo,
            collectType: tag,
          });
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 轮次信息
    async rounds_info() {
      const res = await rounds_info({
        caseNo: this.caseNo,
      });
      if (res.code === 1) {
        this.round_info_data = res.data;
        this.collectCategory && res.data.callAccess.contactCallable && res.data.callAccess.debtorCallable && res.data.callAccess.urgencyCallable && this.case_collect_switch_case();
        this.collectCategory && !res.data.callAccess.contactCallable && !res.data.callAccess.debtorCallable && !res.data.callAccess.urgencyCallable && this.case_collect_switch_case();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 记录当前通话状态
    async rounds_record(obj) {
      let callId;
      if (obj.seatType === 'KT') {
        callId = this.actionId;
      } else {
        callId = sessionStorage.getItem('callId') ? sessionStorage.getItem('callId') : '';
      }
      const res = await rounds_record({
        callUserType: this.objCopy.collectType,
        caseNo: this.caseNo,
        callStatus: obj.status,
        callId: callId,
        recordId: this.recordIdFront,
        mblNo: this.objCopy.mblNo || this.objCopy.cntUserMblNo,
      });
      if (res.code === 1) {
        this.$set(this, 'remark_flag', true)
        this.rounds_info();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 手动结束本轮呼叫轮次
    async rounds_over() {
      const res = await rounds_over({
        caseNo: this.caseNo
      });
      if (res.code === 1) {
        await this.$Message.success('结束成功');
        this.rounds_info();
      } else {
        this.$Message.success(res.message);
      }
    }
  },
}
