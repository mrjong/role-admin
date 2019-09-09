import callPermissions from './components/call_permissions'
import callTimesLimit from './components/call_times_limit'
import casePushOrder from './components/case_push_order'
import callStartTime from './components/call_start_time'
import Cookie from 'js-cookie';
import { callRoundsConfig_list, callRoundsConfig_update, callRoundsConfig_display } from '@/service/getData';


export default {
  name: 'roune_config',
  components: {
    callPermissions,
    callTimesLimit,
    casePushOrder,
    callStartTime
  },
  data() {
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      file_url: '/admin/callRoundsConfig/import ',//文件上传地址
      import_data_loading: false,// 导入loading
      formItem: {
        // 1 勾选   0未勾选
        debtorCallLimit: '1', //拨打权限本人
        urgencyCallLimit: '1', //拨打权限紧连
        contactCallLimit: '1', //拨打权限通讯录
        debtorCallCeil: '0',//单个号码拨打次数本人
        urgencyCallCeil: '0',//单个号码拨打次数紧连
        contactCallCeil: '0',//单个号码拨打次数通讯录
        overdueDaysSort: '1',// 排序规则 1 升序  0降序
        configSortList: [
          {
            sortCode: '01',
            isAsc: '1'
          }
        ],
        floorFollowTime: '16:00',//跟进时间开启时间
      },
      tableData: [],
      tableColumns: [
        {
          title: '逾期天数',
          key: 'overdueDays',
          align: 'center',
        },
        {
          title: '轮次下限',
          key: 'roundsFloor',
          align: 'center',
        },
        {
          title: '轮次上限',
          key: 'roundsCeil',
          align: 'center',
        },
        {
          title: '通讯录拨打下限',
          key: 'adsCallFloor',
          align: 'center',
        },
        {
          title: '通讯录接通下限',
          key: 'adsAnswerFloor',
          align: 'center',
        },
        {
          title: '通讯录接通上限',
          key: 'adsAnswerCeil',
          align: 'center',
        },
      ]
    }
  },
  created() {
    // this.callRoundsConfig_list();
    this.callRoundsConfig_display()
  },
  mounted() {
    console.log(this);
  },
  methods: {
    tabClick() {

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
        this.query_flag = true;
        this.callRoundsConfig_list();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 子组件的回调
    passBack(obj) {
      console.log(obj)
    },
    // 轮次配置表
    async callRoundsConfig_list() {
      const res = await callRoundsConfig_list();
      if (res.code === 1) {
        this.tableData = res.data;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 轮次配置反显
    async callRoundsConfig_display() {
      const res = await callRoundsConfig_display()
    },
    // 轮次配置更改
    async callRoundsConfig_update() {
      const res = await callRoundsConfig_update(
        {
          ...this.formItem
        },
        {
          transformRequest: [
            function (data) {
              return qs.stringify(data); //利用对应方法转换格式
            }
          ]
        },
      );
      if (res.code === 1) {
        this.formItem = res.data;
      } else {
        this.$Message.error(res.message);
      }
    }
  },
}
