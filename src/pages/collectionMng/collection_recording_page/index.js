import { case_collect_collect_list, getLeafTypeList, case_collect_tape_download } from '@/service/getData';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import tablePage from '@/mixin/tablePage';
import util from '@/libs/util';

export default {
  name: 'collecttion_recording_page',
  components: {
    videoPlayer
  },
  mixins: [tablePage, formValidateFun, sysDictionary],
  data() {

    return {
      getDirList: ['PROD_TYPE'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      getLeafTypeList_data: [],
      getLeafTypeList2_data: [],
      modal1: false,
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }
        ],
        poster: '/static/images/author.jpg'
      },
      phoneCallList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      productTimeList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      productLineList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      modal12: false,
      inputGrid: '',
      modal11: false,
      formValidate2: {},
      ruleValidate: {
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
      tableData: [
      ],
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
          align: 'center',
          key: 'buffet_code',
          render: (h, params) => {
            const soundUuid = params.row.soundUuid;
            return soundUuid? h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    // display: soundUuid ? 'inline-block' : 'none'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true;
                    }
                  }
                },
                '播放'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none'
                  },
                  on: {
                    click: () => {
                      this.case_collect_tape_download(soundUuid);
                    }
                  }
                },
                '下载'
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
          title: '时长',
          width: 80,
          key: 'callTime',
          align: 'center'
        },
        {
          title: '呼叫电话',
          width: 150,
          key: 'mblNoHid',
          align: 'center',
        },
        {
          title: '呼叫开始时间',
          width: 150,
          key: 'startTime',
          align: 'center',
          render: (h, params) => {
            let startTime = params.row.startTime;
            startTime = startTime
              ? this.$options.filters['formatDate'](startTime, 'YYYY-MM-DD HH:mm:ss')
              : startTime;
            return h('span', startTime);
          }
        },
        {
          title: '呼叫结束时间',
          width: 150,
          key: 'endTime',
          align: 'center',
          render: (h, params) => {
            let endTime = params.row.endTime;
            endTime = endTime
              ? this.$options.filters['formatDate'](endTime, 'YYYY-MM-DD HH:mm:ss')
              : endTime;
            return h('span', endTime);
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
          title: '客户身份证号',
          width: 180,
          key: 'idNoHid',
          align: 'center',
        }
      ]
    };
  },
  created() {
    this.getList();
    this.getLeafTypeList()
    this.getLeafTypeList2()
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
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
      console.log('the player is readied', player);
      // you can use it to do something...
      // player.[methods]
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
    },
    async case_collect_tape_download (id) {
      const res = await case_collect_tape_download(
        {
          ids: id,
        },
        {
          responseType: 'blob'
        }
        // util.dowloadZip(res);
        )
        console.log(res);
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
    cancel() {
      this.$Message.info('Clicked cancel');
      console.log(this.$Modal);
      this.$Modal.remove();
    }
  }
};
