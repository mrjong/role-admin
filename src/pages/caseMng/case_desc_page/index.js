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
  case_collect_switch_case,//下一个接口
} from '@/service/getData';
import util from '../../../libs/util';
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
    const _this = this;
    const call_number_validator = (rule, value, callback) => {
      // 手机号码校验
      const mblNo = /^1\d{10}$/;
      // 座机号校验
      const isMobile = /^([0-9]{3,4})?[0-9]{7,8}$/;
      if (!mblNo.test(value) && !isMobile.test(value)) {
        return callback(new Error('请输入正确格式的座机号或手机号'))
      } else {
        return callback();
      }
    }
    return {
      base_info_data: {},//基础信息组件的传参
      address_list_data: {},//通讯录组件的传参
      message_detail_flag: false,//站内信modal是否显示
      collectCategory: false,//M1用户标识符
      imglist: {},
      case_collect_case_list_data: {},
      prdTyp: '',
      userNm: '',
      tabName: '',
      getDirList: ['GENDER', 'NATION', 'CONTACT_REL_TYPE'],
      getDirObj: {},
      img_list: [],//图片列表
      mblNo: '',
      caseNo: '',
      userId: '',
      showBtn: false,
      showPanel: false,
      showPanel2: false,
      visible: false,
      modalTitle: '',
      visible1: false,
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
    delete queryData.prdTyptest;
    // delete queryData.seatType;
    delete queryData.userIdtest;
    if (queryData.readType === 'edit') {
      // this.case_collect_case_list(); // 我的案件
      await this.case_list()
    }
    delete queryData.readType;
    this.queryData = queryData;
    this.collectCategory && this.case_collect_switch_case();//查询下一个案件
  },
  mounted() {
    // 禁止右键
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=false");
    });
  },
  methods: {
    deliveryData(obj) {
      switch (obj.type) {
        case 'BASE_INFO':
          this.address_list_data = obj.data;
          break;
        case 'CASE_INFO':
          this.base_info_data = obj.data;
          break;
        case 'ADDRESS_LIST':
          // console.log(this.$refs[])
          this.$refs[BASE_INFO].case_detail_case_identity_info();
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
    // tab 所有点击（除通讯录以外的）
    tabClick(name) {
      this[`${name}_pageNo`] = 1;
      this[name]();
    },
    isShow() {
      this.showBtn = !this.showBtn;
    },
    // 页码改变的回调
    changePage(pageNum, name) {
      this[name]();
    },

    // 查询下一个案件
    async case_collect_switch_case() {
      const res = await case_collect_switch_case({
        caseNo: this.caseNo,
      });
      if (res.code === 1) {
        this.next_case_list = res.data;
      } else {
        // this.$Message.error(res.message);
      }
    },
  }
};
