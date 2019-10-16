import caseInfo from './components/case_info';
import collectionInfo from './components/collection_info';
import otherInfo from './components/other_info';
import baseInfo from './components/base_info';
import addressList from './components/address_list';
import qs from 'qs';
import Cookie from 'js-cookie';
import sysDictionary from '@/mixin/sysDictionary';
import {
  case_collect_case_list, // 我的案件
  case_list,
} from '@/service/getData';
export default {
  name: 'case_desc',
  components: {
    caseInfo,
    collectionInfo,
    otherInfo,
    baseInfo,
    addressList
  },
  mixins: [sysDictionary],
  data() {
    return {
      base_info_data: {},//基础信息组件的传参
      address_list_data: {},//通讯录组件的传参
      collectCategory: false,//M1用户标识符
      case_collect_case_list_data: {},
      prdTyp: '',
      mblNo: '',
      caseNo: '',
      userId: '',
      showBtn: false,
      queryData: {},
    };
  },
  async created() {
    // 判断是否为M1的用户
    if (Cookie.get('collectCategory') === 'M01') {
      this.collectCategory = true;
    }
    let params = location.hash.split('?');
    const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
    this.caseNo = window.atob(queryData.caseNotest);
    // this.seatType = queryData.seatType;
    this.prdTyp = queryData.prdTyptest;
    this.userId = queryData.userIdtest;
    this.readType = queryData.readType;
    delete queryData.caseNotest;
    // delete queryData.prdTyptest;
    // delete queryData.seatType;
    // delete queryData.userIdtest;
    if (queryData.readType === 'edit') {
      queryData.caseType === 'myCase' && await this.case_collect_case_list(); // 我的案件(过滤过的)
      queryData.caseType === 'allCase' && await this.case_list();//案件查询的案件列表
    }
    // delete queryData.readType;
    this.queryData = queryData;
  },
  mounted() {
    // 禁止右键
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=false");
    });
  },
  methods: {
    // 组件回调（传递）
    deliveryData(obj) {
      switch (obj.type) {
        case 'BASE_INFO':
          this.address_list_data = obj.data;
          break;
        case 'CASE_INFO':
          this.base_info_data = obj.data;
          break;
        case 'ADDRESS_LIST':
          this.$refs['BASE_INFO'].case_detail_case_identity_info();
          break;
        default:
          break;
      }
    },
    // 获取表格数据
    async case_list() {
      const res = await case_list({
        ...this.queryData,
        id: this.caseNo,
        pageNum: 1
      });
      if (res.code === 1) {
        this.case_collect_case_list_data =
          res.data && res.data.page && res.data.page.content && res.data.page.content[0];
        this.userId = res.data.page.content[0].userId;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取表格数据
    async case_collect_case_list() {
      console.log(this.queryData, '---------------');
      const res = await case_collect_case_list({
        ...this.queryData,
        id: this.caseNo,
        pageNum: 1
      });
      if (res.code === 1) {
        this.case_collect_case_list_data =
          res.data && res.data.page && res.data.page.content && res.data.page.content[0];
        this.userId = res.data.page.content[0].userId;
      } else {
        this.$Message.error(res.message);
      }
    },
    isShow() {
      this.showBtn = !this.showBtn;
    },
  }
};
