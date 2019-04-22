import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { case_collect_collect_list, case_collect_collect_export, getLeafTypeList, case_collect_tape, import_list, cases_download_template } from '@/service/getData';
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
      headers: {
				'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
				timeout: 120000,
      },
      file_url: '/admin/cases/batch/import ',//文件上传地址
      import_data_loading: false,// 导入loading
      query_flag: false, // false 默认查getList  true查询cases_import_list
      file_csaeIds: [],//上传文件返回的案件编号list集合
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
      import_search: false,//导入查询权限
      query_loading: false,//查询按钮loading
      export_case_loading: false,//导出按钮loading
      download_import_data: false,// 下载导入查询的loading
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
        // case "import_search": this.import_search = true;
        //   break;
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
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      this.pageNo = pageNo;
      if (this.query_flag) {
        let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize)
        this.cases_import_list(caseIds);
      } else {
        this.getList();
      }
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      if (this.query_flag) {
        let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize)
        this.cases_import_list(caseIds);
      } else {
        this.getList();
      }
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
      this.query_flag = false;
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
    // 上传文件格式校验
    handleFormatError(file) {
			this.$Message.error('请选择Excel文件上传');
    },
    // 上传文件大小校验
		handleMaxSize(file) {
      this.$Message.error('文件大小不得超过1M');
    },
    // 文件上传时
    handleProgress() {
      this.import_data_loading = true;
    },
    // 上传文件失败
    handleError(error, file) {
      console.log(error);
      this.import_data_loading = false;
    },
    // 文件上传成功
    handleSuccess(res, file) {
      this.import_data_loading = false;
      if (res.code === 1) {
        console.log(res);
        this.tableData = [];
        this.query_flag = true;
        this.$set(this, 'file_csaeIds', res.data.caseNoList);
        let caseIds ;
        // 判断返回的案件号是否为空，空 不执行下面分页请求操作
        if (res.data.caseNoList.length>0) {
          caseIds = util.slice_case_number(res.data.caseNoList, (this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize);
          this.cases_import_list(caseIds);
        } else {
          this.$Message.error('暂时查询不到相关数据')
        }
      } else {
        this.$Message.error(res.message);
      }
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
    // 根据导入条件进行查询
    async cases_import_list(caseIds) {
      this.query_flag = true;
      console.log(caseIds)
      const res = await import_list('/case/collect',{
        caseIds: caseIds,
      });
      console.log(res);
      if (res.code === 1) {
        this.tableData = res.data;
        this.total = this.file_csaeIds.length;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 下载导入查询模板
    async download_import() {
      this.download_import_data = true;
      const res = await cases_download_template(
        {},
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      this.download_import_data = false;
      util.dowloadfile('导入查询模板', res);
    },
    // 催收记录导出
    async case_collect_collect_export() {
      this.export_case_loading = true;
      const res = await case_collect_collect_export(
        {
          ...this.formItem,
          importQuery: this.query_flag? 1: null
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      util.dowloadfile('催收记录', res);
      this.export_case_loading = false;
      setTimeout(() => {
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo-1)*this.pageSize, this.pageNo*this.pageSize)
          this.cases_import_list(caseIds);
        } else {
          this.getList();
        }
      }, 1000)
    }
  }
};
