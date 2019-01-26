import { buffet_list } from '@/service/getData';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import tablePage from '@/mixin/tablePage';
export default {
  name: 'demo_list',
  components: {
    videoPlayer,
  },
	mixins: [ tablePage, formValidateFun, sysDictionary ],
  data() {
    return {
        getDirList: [ 'PROD_TYPE' ],
        getDirObj: {},
      showPanel: false,
      showPanel2: false,
      modal1: false,
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        poster: "/static/images/author.jpg",
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
        buffet_id: [
          {
            required: true,
            message: '请输入网格编号',
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
      tableData: [
        {
          recording_id: 1,
          operate: '操作'
        }
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
            key: 'buffet_code',
            render: (h, params) => {
                const uuid = params.row.uuid;
                return h('span', uuid ? '播放' : '');
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
            key: 'mblNoHid'
        },
        {
            title: '呼叫开始时间',
            width: 150,
            key: 'startTime',
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
            key: 'userNmHid'
        },
        {
            title: '关系',
            key: 'callUserTypeName'
        },
        {
            title: '经办人',
            width: 120,
            key: 'opUserName'
        },
        {
            title: '案件编码',
            searchOperator: '=',
            key: 'caseNo'
        },
        {
            title: '账单号',
            width: 180,
            sortable: true,
            key: 'billNo'
        },
        {
            title: '客户身份证号',
            key: 'idNoHid'
        },
    ]
    };
  },
  created() {
    this.getList();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
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
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
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
          this.getList();
        } else {
          this.$Message.error('查询条件格式有误，请重新填写');
        }
      });
    },
    // 获取表格数据
    async getList() {
      const res = await buffet_list({
        searchParam: this.formItem && JSON.stringify(this.formItem) !== '{}' && this.getParam(),
        page: this.pageNo,
        perPage: this.pageSize,
        config: {
          hideMessage: true
        }
      });
      if (res.data && res.data.data) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageNo = res.data.current_page;
      } else {
        this.tableData = [];
        this.total = 0;
        this.pageNo = 1;
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
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
