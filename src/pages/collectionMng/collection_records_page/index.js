import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { case_collect_collect_list, case_collect_tape_download, getLeafTypeList, case_collect_tape } from '@/service/getData';
import tablePage from '@/mixin/tablePage';
import util from '@/libs/util';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'


export default {
  name: 'case_search_page',
  mixins: [tablePage, formValidateFun, sysDictionary],
  components: {
    videoPlayer,
  },
  data() {
    console.log(this.GLOBAL);
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
          align: 'center'
        },
        {
          title: '关联录音',
          width: 120,
          searchOperator: '=',
          key: 'buffet_code',
          align: 'center',
          render: (h, params) => {
            const soundUuid = params.row.soundUuid;
            return h('div', [
              h(
                'a',
                {
                  props: {},
                  style: {
                    display: soundUuid ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      this.case_collect_tape(soundUuid);
                      this.modal1 = true;
                    }
                  }
                },
                '播放'
              )
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
          title: '客户姓名',
          width: 120,
          key: 'userNmHid',
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
        },
        {
          title: '账单号',
          width: 180,
          sortable: true,
          key: 'billNo',
          align: 'center',
        },
        {
          title: '催收期数',
          width: 120,
          key: 'perdCount',
          align: 'center',
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
          width: 400,
          key: 'collectRmk',
          render: (h, params) => {
            let collectRmk = params.row.collectRmk;
            return h(
              'Tooltip',
              {
                style: {
                  margin: '0 5px'
                },
                props: {
                  content: collectRmk,
                  placement: 'top'
                }
              },
              [h('div', {}, collectRmk)]
            );
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
    this.getList();
    this.getLeafTypeList()
    this.getLeafTypeList2()
  },
  methods: {
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
    async case_collect_tape(id) {
      const res = await case_collect_tape(
        {
          id: id,
        },
        {
          responseType: 'blob',
          timeout: 90000,
        }
      );
      this.playerOptions.sources[0].src = util.dowloadAudio(res);
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
    cancel() {
      this.$Message.info('Clicked cancel');
      console.log(this.$Modal);
      this.$Modal.remove();
    },

    async getLeafTypeList() {
      const res = await getLeafTypeList({
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
    async getList() {
      const res = await case_collect_collect_list({
        ...this.formItem,
        pageSize: this.pageSize,
        pageNum: this.pageNo
      });
      if (res.code === 1) {
        this.tableData = res.data.page.content;
        this.total = res.data.page.totalElements;
        console.log(res);
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
