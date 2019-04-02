import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { case_collect_collect_list, case_collect_collect_export, getLeafTypeList, case_collect_tape } from '@/service/getData';
import tablePage from '@/mixin/tablePage';
import util from '@/libs/util';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'
import qs from 'qs';
import Cookie from 'js-cookie';


export default {
  name: 'case_search_page',
  mixins: [tablePage, formValidateFun, sysDictionary],
  components: {
    videoPlayer,
  },
  data() {
    const _this = this
    return {
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'audio/mpeg',
            src: ''
          }
        ],
        autoplay: false,
        controls: true
        // poster: '/static/images/author.jpg'
      },
      modal1: false,
      getDirList: ['PROD_TYPE'],
      getDirObj: {},
      showPanel: false,
      productLineList: [],
      showPanel2: false,
      query: false,//查询权限
      export_case: false,//导出权限
      play: false,//播放权限
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      apply_arbitrament: false,//案件详情申请仲裁权限
      apply_deduct: false,//案件详情申请划扣权限
      query_loading: false,//查询按钮loading
      export_case_loading: false,//导出按钮loading
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
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formValidate3: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      },
      formItem: {},
      tableData: [],
      getLeafTypeList_data: [],
      getLeafTypeList2_data: [],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          type: 'index',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '关联录音',
          width: 120,
          searchOperator: '=',
          key: 'buffet_code',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const soundUuid = params.row.soundUuid;
            return soundUuid?h('div', [
              h(
                'a',
                {
                  props: {},
                  style: {
                    display: soundUuid ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      // if (!this.play) {
                      //   this.$Message.error('很抱歉，暂无权限播放录音');
                      //   return;
                      // }
                      this.case_collect_tape(soundUuid);
                      this.modal1 = true;
                    }
                  }
                },
                '播放'
              ),
            ]): h('div', [
              h(
                'span',
                {
                  props: {},
                  style: {
                    color: '#CCC'
                  }
                },
                '暂无录音'
              ),
            ]);
          }
        },
        {
          title: '催收时间',
          width: 150,
          key: 'createTime',
          align: 'center',
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime
              ? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
              : createTime;
            return h('span', createTime);
          }
        },
        {
          title: '催收姓名',
          width: 120,
          key: 'userNmHid',
          align: 'center',
        },
        {
          title: '客户姓名',
          width: 120,
          key: 'customerNameHid',
          align: 'center',
        },
        {
          title: '关系',
          width: 100,
          key: 'callUserTypeName',
          align: 'center',
        },
        {
          title: '催收电话',
          width: 150,
          key: 'mblNoHid',
          align: 'center',
        },
        {
          title: '拨打状态',
          width: 120,
          key: 'collectResultName',
          align: 'center',
        },
        {
          title: '沟通结果',
          width: 100,
          key: 'communicateResultName',
          align: 'center',
        },

        {
          title: '承诺还款时间',
          width: 150,
          key: 'promiseRepayDate',
          align: 'center',
          render: (h, params) => {
            let promiseRepayDate = params.row.promiseRepayDate;
            promiseRepayDate = promiseRepayDate
              ? this.$options.filters['formatDate'](promiseRepayDate, 'YYYY-MM-DD HH:mm:ss')
              : promiseRepayDate;
            return h('span', promiseRepayDate);
          }
        },
        {
          title: '经办人',
          width: 120,
          key: 'opUserName',
          align: 'center',
        },
        {
          title: '案件编码',
          width: 180,
          searchOperator: '=',
          key: 'caseNo',
          align: 'center',
          fixed: 'left',
          render(h, params) {
            const id = params.row.caseNo;
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
                          window.open(
                            `${location.origin}/#/case_desc_page?caseNotest=${window.btoa(id)}&prdTyptest=${prdTyp}&readType=read&userIdtest=${userId}&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
                              _this.formItem
                            )}`
                          );
                        }
                      }
                    },
                    id
                  )
                ]
              )
            ]);
          }
        },
        {
          title: '账单号',
          width: 180,
          sortable: true,
          key: 'billNo',
          align: 'center',
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
                  },params.row.billNo)
                ]
              )
            ])
          }
        },
        {
          title: '客户身份证号',
          width: 180,
          key: 'idNoHid',
          align: 'center',
        },
        {
          title: '备注',
          align: 'center',
          width: 220,
          key: 'collectRmk',
          render: (h, params) => {
            let collectRmk = params.row.collectRmk;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: collectRmk,
                    placement: 'top',
                    maxWidth: "200",
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, collectRmk)]
              ),
            ]);
          }
        }
      ]
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created() {
    //获取缓存的表单值
    let collecttion_records_form = window.sessionStorage.getItem('collecttion_records_form');
    if (collecttion_records_form) {
      this.formItem = JSON.parse(collecttion_records_form);
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
        case "play": this.play = true;
          break;
        case "export": this.export_case = true;
          break;
        case "plaintext": this.plaintext = true;
          break;
      }
    });
    Cookie.set('all_opt', this.all_opt);
    Cookie.set('plaintext', this.plaintext);
    Cookie.set('apply_arbitrament', this.apply_arbitrament);
    Cookie.set('apply_deduct', this.apply_deduct);
    // this.getList();
    this.getLeafTypeList()
    this.getLeafTypeList2()
  },
  methods: {
    // 日历监听
    dateChange(arr) {
      console.log(arr);
      this.formItem.beginDate = arr[0];
      this.formItem.endDate = arr[1];
      console.log(this.formItem)
    },
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    // 公司选择change
    companyChange (value) {
      this.getLeafTypeList(value)
    },
    async case_collect_tape(id) {
      const res = await case_collect_tape(
        {
          id: id,
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      this.playerOptions.sources[0].src = util.dowloadAudio(res);
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
    cancel() {
      console.log(this.$Modal);
      this.$Modal.remove();
    },

    async getLeafTypeList(id) {
      const res = await getLeafTypeList({
        parentId: id || '',
        leafType: '04'
      });
      if (res.code === 1) {
        this.getLeafTypeList_data = res.data
      } else {
        this.$Message.error(res.message);
      }
    },
    async getLeafTypeList2() {
      const res = await getLeafTypeList({
        leafType: '02'
      });
      if (res.code === 1) {
        this.getLeafTypeList2_data = res.data
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.csDate) {
            this.formItem.csDate = [
             this.formItem.beginDate,
             this.formItem.endDate,
            ]
          }
          this.pageNo = 1;
          window.sessionStorage.setItem('collecttion_records_form', JSON.stringify(this.formItem));
          this.getList();
        }
      });
    },
    // 重置
    clearForm() {
      this.formItem = {};
      window.sessionStorage.removeItem('collecttion_records_form');
      this.pageNo = 1;
      this.getList();
    },
    async getList() {
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无权限查询');
      //   return;
      // }
      this.query_loading = true;
      const res = await case_collect_collect_list({
        ...this.formItem,
        pageSize: this.pageSize,
        pageNum: this.pageNo
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.page.content;
        this.total = res.data.page.totalElements;
        console.log(res);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 催收记录导出
    async case_collect_collect_export() {
      this.export_case_loading = true;
      const res = await case_collect_collect_export(
        {
          ...this.formItem
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      util.dowloadfile('催收记录', res);
      this.export_case_loading = false;
      setTimeout(() => {
        this.getList();
      }, 1000)
    }
  }
};
