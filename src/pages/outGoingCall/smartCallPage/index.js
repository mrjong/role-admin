import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { robotOutbound_list, getLeafTypeList, collectcode_getListByCodeType } from '@/service/getData';
import tablePage from '@/mixin/tablePage';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'
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
      getDirList: ['PROD_TYPE', 'ROBOT_IS_REMINDER', 'ROBOT_JOB_TYPE'],
      getDirObj: {},
      showPanel: false,
      productLineList: [],
      collect_status_list: [], //沟通状态
      call_status_list: [], //拨打状态
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      showPanel2: false,
      query: false,//查询权限
      query_loading: false,//查询按钮loading
      billNo: null,// 播放录音的账单号
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
      tableColumns: [
        {
          title: '序号',
          width: 80,
          type: 'index',
          align: 'center',
          fixed: 'left',
        },
        {
          title: '任务名称',
          width: 120,
          key: 'jobName',
          align: 'center',
        },
        {
          title: '任务类型',
          width: 120,
          key: 'jobTypeName',
          align: 'center',
        },
        {
          title: '时长',
          width: 150,
          key: 'duration',
          align: 'center',
        },
        {
          title: '呼叫电话',
          width: 120,
          key: 'mblNoHid',
          align: 'center',
        },
        {
          title: '呼叫开始时间',
          width: 150,
          key: 'callTime',
          align: 'center',
          render: (h, params) => {
            let callTime = params.row.callTime;
            callTime = callTime
              ? this.$options.filters['formatDate'](callTime, 'YYYY-MM-DD HH:mm:ss')
              : callTime;
            return h('span', callTime);
          }
        },
        {
          title: '呼叫结束时间',
          width: 150,
          key: 'createTime',
          align: 'center',
          render: (h, params) => {
            let callEndTime = params.row.callEndTime;
            callEndTime = callEndTime
              ? this.$options.filters['formatDate'](callEndTime, 'YYYY-MM-DD HH:mm:ss')
              : '';
            return h('span', callEndTime);
          }
        },
        {
          title: '客户名称',
          width: 120,
          key: 'userNmHid',
          align: 'center',
        },
        {
          title: '关系',
          width: 100,
          key: 'pelTypName',
          align: 'center',
        },
        {
          title: '拨打状态',
          width: 100,
          key: 'collectResultName',
          align: 'center',
        },
        {
          title: '沟通状态',
          width: 100,
          key: 'communicateResultName',
          align: 'center',
        },
        {
          title: '组别',
          width: 120,
          key: 'opOrganizationName',
          align: 'center',
        },
        {
          title: '经办人',
          width: 120,
          key: 'opUserName',
          align: 'center',
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
          title: '是否催记',
          width: 180,
          key: 'isReminderName',
          align: 'center',
        },
      ]
    };
  },
  created() {
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        // case "import_search": this.import_search = true;
        //   break;
      }
    });
    // this.getList();
    this.collectcode_getListByCodeType(1);//获取沟通状态
    this.collectcode_getListByCodeType(2);// 获取拨打状态
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
  },
  methods: {
    // 日历监听
    dateChange(arr) {
      console.log(arr);
      this.formItem.beginDate = arr[0];
      this.formItem.endDate = arr[1];
      console.log(this.formItem)
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
    // 页码改变的回调
    changePage(pageNo) { //默认带入一个参数是当前的页码数
      this.pageNo = pageNo;
      this.getList();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
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
          this.getList();
        }
      });
    },
    // 重置
    clearForm() {
      this.formItem = {};
      this.pageNo = 1;
      this.getList();
    },
    async getList() {
      // if (!this.query) {
      //   this.$Message.error('很抱歉，暂无权限查询');
      //   return;
      // }
      this.query_loading = true;
      const res = await robotOutbound_list({
        ...this.formItem,
        pageSize: this.pageSize,
        pageNum: this.pageNo
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        console.log(res);
      } else {
        this.$Message.error(res.message);
      }
    },
  }
};
