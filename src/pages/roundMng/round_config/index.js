import callPermissions from './components/call_permissions'
import callTimesLimit from './components/call_times_limit'
import casePushOrder from './components/case_push_order'
import callStartTime from './components/call_start_time'
import Cookie from 'js-cookie';

export default {
  name: 'roune_config',
  components: {
    callPermissions,
    callTimesLimit,
    casePushOrder,
    callStartTime
  },
  data () {
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      file_url: '/admin/cases/batch/import ',//文件上传地址
      import_data_loading: false,// 导入loading
      tableData: [],
      tableColumns: [
        {
          title: '逾期天数',
          key: 'caseHandleStatusName',
          align: 'center',
        },
        {
          title: '轮次下限',
          key: 'caseHandleStatusName',
          align: 'center',
        },
        {
          title: '轮次上限',
          key: 'caseHandleStatusName',
          align: 'center',
        },
        {
          title: '通讯录拨打下限',
          key: 'caseHandleStatusName',
          align: 'center',
        },
        {
          title: '通讯录接通下限',
          key: 'caseHandleStatusName',
          align: 'center',
        },
        {
          title: '通讯录接通上限',
          key: 'caseHandleStatusName',
          align: 'center',
        },
      ]
    }
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
        console.log(res);
        this.tableData = [];
        this.query_flag = true;
        this.$set(this, 'file_csaeIds', res.data.caseNoList);
        let caseIds;
        // 判断返回的案件号是否为空，空 不执行下面分页请求操作
        if (res.data.caseNoList.length > 0) {
          caseIds = util.slice_case_number(res.data.caseNoList, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.$Message.error('暂时查询不到相关数据')
        }
      } else {
        this.$Message.error(res.message);
      }
    },
  },
}
