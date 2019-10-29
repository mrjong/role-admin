import { case_collect_record_file_list, getLeafTypeList, case_collect_tape_download, case_collect_tape, case_collect_tape_link, collectcode_getListByCodeType } from '@/service/getData';
import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import tablePage from '@/mixin/tablePage';
import util from '@/libs/util';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import ReportModal from './components/reportModal';
import Cookie from 'js-cookie';
import videojs from 'video.js'
import 'vue-video-player/src/custom-theme.css'
// import SWF_URL from 'videojs-swf/dist/video-js.swf'
// videojs.options.flash.swf = SWF_URL
import qs from 'qs';

export default {
  name: 'collecttion_recording_page',
  components: {
    videoPlayer,
    ReportModal
  },
  mixins: [tablePage, formValidateFun, sysDictionary],
  data() {
    let _this = this;
    return {
      getDirList: ['PROD_TYPE', 'VQC_RULE_LEVEL', 'VQC_RESULT', 'VQC_RULE_CATEGORY'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      collect_status_list: [], //沟通状态
      call_status_list: [], //拨打状态
      query: false,//查询权限
      play: false,//播放权限
      download: false,//下载权限
      checkReport: false, //查看报告权限
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      query_loading: false,//查询权限按钮loading
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      modal1: false,
      billNo: null, //录音显示的账单号
      dataId: '', //质检查看报告
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'audio/mpeg',
            // type: 'rtmp/flv',
            // src: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131229550.m4a?tflag=1546606800&pin=97bb2268ae26c20fe093fd5b0f04be80#.mp3'
            src: ''
          }
        ],
        // flash: {
        //   hls: {
        //     withCredentials: false
        //   },
        //   swf: SWF_URL
        // },
        // techOrder: ['flash'],
        autoplay: false,
        controls: true
        // poster: '/static/images/author.jpg'
      },
      modal12: false,
      inputGrid: '',
      modal11: false,
      formValidate2: {},
      ruleValidate: {
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {},
      tableData: [
      ],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '操作',
          width: 120,
          searchOperator: '=',
          align: 'center',
          key: 'buffet_code',
          fixed: 'left',
          render: (h, params) => {
            const actionId = params.row.actionId;
            return actionId ? h('div', [
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
                      // if (!this.play) {
                      //   this.$Message.error('很抱歉，暂无播放权限');
                      //   return;
                      // }
                      this.case_collect_tape(actionId);
                      this.billNo = params.row.billNo;
                      // this.case_collect_tape_link(soundUuid);
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
                      if (!this.download) {
                        this.$Message.error('很抱歉，暂无下载权限');
                        return;
                      }
                      this.case_collect_tape_download(actionId);
                    }
                  }
                },
                '下载'
              ),h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    // display: params.row.id ? 'block' : 'none',
                    color: params.row.id ? '': '#CCC'
                  },
                  on: {
                    click: () => {
                      if(params.row.id){
                        this.dataId = params.row.id
                      } else {
                        return
                      }
                      if (!this.checkReport) {
                        this.$Message.error('很抱歉，暂无下载权限');
                        return;
                      }

                      // this.case_collect_tape_download(actionId);
                    }
                  }
                },
                params.row.id ? '查看报告' : '暂无报告'
              ),
            ]) : h('div', [
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
          title: '时长（s）',
          width: 80,
          key: 'callTime',
          align: 'center'
        },
        {
          title: '呼叫电话',
          width: 150,
          key: 'callMbl',
          align: 'center',
        },
        {
          title: '呼叫开始时间',
          width: 150,
          key: 'callStartTime',
          align: 'center',
          render: (h, params) => {
            let callStartTime = params.row.callStartTime;
            callStartTime = callStartTime
              ? this.$options.filters['formatDate'](callStartTime, 'YYYY-MM-DD HH:mm:ss')
              : callStartTime;
            return h('span', callStartTime);
          }
        },
        {
          title: '呼叫结束时间',
          width: 150,
          key: 'callEndTime',
          align: 'center',
          render: (h, params) => {
            let callEndTime = params.row.callEndTime;
            callEndTime = callEndTime
              ? this.$options.filters['formatDate'](callEndTime, 'YYYY-MM-DD HH:mm:ss')
              : callEndTime;
            return h('span', callEndTime);
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
          title: '拨打状态',
          width: 100,
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
          title: '组别',
          width: 120,
          key: 'groupName',
          align: 'center',
        },
        {
          title: '经办人',
          width: 120,
          key: 'opUserName',
          align: 'center',
        },
        {
          title: '案件编号',
          width: 200,
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
                            `${location.origin}/#/case_desc_page?caseNotest=${window.btoa(id)}&prdTyptest=${prdTyp}&readType=read&userIdtest=${userId}&caseType=myCase&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
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
          width: 200,
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
                  }, params.row.billNo)
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
          title: '质检结果',
          width: 180,
          key: 'vqcResult',
          align: 'center',
        },
        {
          title: '质检得分',
          width: 180,
          key: 'vqcScore',
          align: 'center',
        },
        {
          title: '违规级别',
          width: 180,
          key: 'violationLevel',
          align: 'center',
        },
        {
          title: '问题类别',
          width: 180,
          key: 'violationCategory',
          align: 'center',
        },
        {
          title: '录音编号',
          width: 180,
          key: 'recordNumber',
          align: 'center',
        },
        // {
        //   title: '稽核人',
        //   width: 180,
        //   key: 'ruleName',
        //   align: 'center',
        // }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let collecttion_recording_form = window.sessionStorage.getItem('collecttion_recording_form');
    if (collecttion_recording_form) {
      this.formItem = JSON.parse(collecttion_recording_form);
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
        case "download": this.download = true;
          break;
        case "plaintext": this.plaintext = true;
          break;
        case "checkReport": this.checkReport = true;
          break;
      }
    });
    Cookie.set('all_opt', this.all_opt);
    Cookie.set('plaintext', this.plaintext);
    Cookie.set('apply_arbitrament', false);
    Cookie.set('apply_deduct', false);
    Cookie.set('apply_remission', false);
    // this.getList();
    this.collectcode_getListByCodeType(1);//获取沟通状态
    this.collectcode_getListByCodeType(2);// 获取拨打状态
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
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
      console.log('the player is readied', player);
      // you can use it to do something...
      // player.[methods]
    },
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await getLeafTypeList({
        // status: "1",
        leafType: type,
        parentId: parent || ""
      });
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.company_list_data = res.data;
            break;
          case "03":
            this.department_list_data = res.data;
            break;
          case "04":
            this.collect_list_data = res.data;
            break;
        }
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
          window.sessionStorage.setItem('collecttion_recording_form', JSON.stringify(this.formItem));
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 重置
    clearForm() {
      this.formItem = {};
      window.sessionStorage.removeItem('collecttion_recording_form');
      this.pageNo = 1;
      this.getList();
    },
    // 沟通状态
    async collectcode_getListByCodeType(type) {
      const res = await collectcode_getListByCodeType({
        codeType: type === 1? 'COLLECT_STS': 'TALK_RESULT'
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
    // 列表
    async getList() {
      console.log(this.formItem)
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无权限查询');
      //   return;
      // };
      this.query_loading = true;
      const res = await case_collect_record_file_list({
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
    async case_collect_tape_download(id) {
      const res = await case_collect_tape_download(
        {
          ids: id,
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      util.dowloadZip(res);
      console.log(res);
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
    async case_collect_tape_link(id) {
      const res = await case_collect_tape_link({ id: id });
      console.log(res);
      if (res.code === 1) {
        this.playerOptions.sources[0].src = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
    cancel() {
      this.$Modal.remove();
    },
    passBask(val) {
      this.dataId = ''
    }
  }
};
