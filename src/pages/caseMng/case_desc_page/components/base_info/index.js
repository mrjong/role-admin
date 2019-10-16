import jianmian from '@/components/caseDesc/jianmian.vue';
import huakou from '@/components/caseDesc/huakou.vue';
import zhongcai from '@/components/caseDesc/zhongcai.vue';
import gathering from '@/components/caseDesc/gathering.vue';
import QRdetail from '@/components/caseDesc/QR_code_detail.vue';
import QRcode from '@/components/caseDesc/QR_code.vue';
import TimeLine from '@/components/time_line_page';
import sysDictionary from '@/mixin/sysDictionary';
import qs from 'qs';
import Cookie from 'js-cookie';

import {
  case_list,
  case_detail_address_info,
  case_detail_case_identity_info, // 查询案件详情身份信息
  case_detail_getimgurls,
  offlineScanPay_apply,//判断二维码是否生成
  syscommon_decrypt,//解密接口
  credit_case_process,//信用进度
  case_collect_case_list,
  case_collect_switch_case,//下一个接口
} from '@/service/getData';
export default {
  name: 'base_info',
  props: ['queryData', 'caseNo', 'userId', 'collectCategory', 'base_info_data'],
  mixins: [sysDictionary],
  components: {
    jianmian,
    huakou,
    zhongcai,
    TimeLine,
    gathering,
    QRdetail,
    QRcode,
  },
  data() {
    return {
      getDirList: ['GENDER', 'NATION', 'CONTACT_REL_TYPE'],
      getDirObj: {},
      mingwenData: '',
      imgName: '',
      img_list: [],
      visible: false,
      showPanel: false,
      readType: '',
      prdTyp: '',
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      apply_arbitrament: false,//案件详情申请仲裁权限
      apply_deduct: false,//案件详情申请划扣权限
      apply_remission: false,//案件详情申请减免权限
      APPLY_QR_CODE: false,//收款二维码权限
      credit_panel: false,//信用进度的折叠flag
      time_loading: false,// 时间轴loading
      time_line_data: {},//传给时间轴的数据
      breaks_data: {},//减免info入参
      next_case_list: '',//下一个案件的信息
      btnDisable: true,
      case_collect_case_list_data: {},
      case_detail_case_identity_info_Data: {},
      case_detail_address_info_Data: {},
      zhongcai_set_data: {},
      modal: {
        huakou: false,
        jianmian: false,
        zhongcai: false,
        QR_CODE: false,
        gathering: false,
        QR_code_detail: false,
      },
    }
  },
  created() {
    if (Cookie.get('all_opt') === 'true') {
      this.all_opt = true;
    };
    if (Cookie.get('plaintext') === 'true') {
      this.plaintext = true;
    };
    if (Cookie.get('apply_arbitrament') === 'true') {
      this.apply_arbitrament = true;
    };
    if (Cookie.get('apply_deduct') === 'true') {
      this.apply_deduct = true;
    };
    if (Cookie.get('apply_remission') === 'true') {
      this.apply_remission = true;
    };
    if (Cookie.get('APPLY_QR_CODE') === 'true') {
      this.APPLY_QR_CODE = true;
    };
  },
  mounted() {
    this.collectCategory && this.case_collect_switch_case();//查询下一个案件
  },
  watch: {
    async queryData(data) {
      this.prdTyp = data.prdTyptest;
      this.readType = data.readType;
      if (data.readType === 'edit') {
        data.caseType === 'myCase' && await this.case_collect_case_list(); // 我的案件(过滤过的)
        data.caseType === 'allCase' && await this.case_list();//案件查询的案件列表
      }
      this.case_detail_case_identity_info(); // 查询案件详情身份信息
      this.case_detail_address_info();
      this.case_detail_getimgurls();
    }
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    passBack(type) {
      this.modal[type] = false;
    },
    passBackBreaks(obj) {
      console.log(obj)
      this.modal[obj.name] = obj.flag;
      if (obj.status === 'ok') {
        switch (obj.name) {
          case 'QR_code_detail':
            this.breaks_data = {
              caseNo: this.caseNo,
            }
            this.modal.QR_CODE = true;
            break;
          case 'jianmian':
            this.$Message.success('申请成功');
            break;
          case 'gathering':
            this.breaks_data = {
              caseNo: this.caseNo,
            }
            this.modal.QR_CODE = true;
            break;
          default:
            break;
        }
      }
    },
    // 加解密
    async syscommon_decrypt(obj) {
      this.mingwenData = '';
      const res = await syscommon_decrypt(obj);
      if (res.code === 1) {
        this.mingwenData = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取时间轴
    async get_credit_process() {
      if (this.credit_panel) {
        this.credit_panel = false;
        return;
      }
      this.time_loading = true;
      const res = await credit_case_process({
        caseNo: this.caseNo
      });
      if (res.code === 1) {
        this.time_line_data = res.data;
        this.time_loading = false;
        this.credit_panel = true;
      } else {
        this.time_loading = false;
        this.$Message.error(res.message);
      }
    },
    // 案件查询总的数据
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
        this.prdTyp = res.data.page.content[0].prdTyp;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 我的案件列表的数据
    async case_collect_case_list() {
      const res = await case_collect_case_list({
        ...this.queryData,
        id: this.caseNo,
        pageNum: 1
      });
      if (res.code === 1) {
        this.case_collect_case_list_data =
          res.data && res.data.page && res.data.page.content && res.data.page.content[0];
        this.userId = res.data.page.content[0].userId;
        this.prdTyp = res.data.page.content[0].prdTyp;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查询案件详情身份信息
    async case_detail_case_identity_info() {
      const res = await case_detail_case_identity_info({
        ...this.queryData,
        id: this.caseNo
      });
      if (res.code === 1) {
        this.btnDisable = false;
        this.case_detail_case_identity_info_Data = res.data;
        this.$emit('deliveryData', { type: 'BASE_INFO', data: res.data });
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取图片接口
    async case_detail_getimgurls() {
      const res = await case_detail_getimgurls({
        caseNo: this.caseNo,
      });
      if (res.code === 1) {
        this.img_list = res.data;
      } else {
        this.$Message.error('获取图片异常')
      }
    },
    // 获取地址信息
    async case_detail_address_info() {
      this.case_detail_address_info_spin = true
      const res = await case_detail_address_info({
        caseNo: this.caseNo,
        userId: this.userId
      });
      this.case_detail_address_info_spin = false

      if (res.code === 1) {
        this.case_detail_address_info_Data = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 下一个
    nextCase(caseNo) {
      let params = location.hash.split('?');
      const queryData = qs.parse(params[1], { ignoreQueryPrefix: true });
      queryData.caseNotest = window.btoa(caseNo);
      // delete queryData.userIdtest
      // queryData.userIdtest = this.case_collect_case_list_data.userId
      // console.log(queryData,'++++')
      // return
      location.href = params[0] + '?' + qs.stringify(queryData);
      location.reload();
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
    // 判断是否存在二维码
    async offlineScanPay_apply(name) {
      const res = await offlineScanPay_apply({
        caseNo: this.caseNo,
      })
      if (res.code === 3000001) {
        // 新创建收款码
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_collect_case_list_data.billNo,
          prdTyp: this.case_collect_case_list_data.prdTyp,
          tableData: this.base_info_data
        };
        this.modal[name] = true;
      } else if (res.code === 3000002) {
        this.$Message.info('二维码正在失效中，请稍后重试！')
      } else {
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_collect_case_list_data.billNo,
          data: res.data,
        }
        this.modal.QR_code_detail = true;
      }
    },
    // 手动打开按钮弹窗
    async handOpen(type, userId) {
      // 时时判断当前案件是否出催，是的话不走下面的逻辑
      await this.case_detail_case_identity_info();
      if (this.case_detail_case_identity_info_Data.caseHandleStatus === 'OUT') {
        this.$Message.info({
          content: '当前案件已出催！',
          duration: 3
        });
        return;
      };
      if (type === 'zhongcai') {
        let idCardFront = '';
        let idCardOpposite = '';
        if (this.img_list.length > 0) {
          this.img_list.forEach((item) => {
            if (item.imgType == 1) {
              idCardFront = item.imgPath;
            } else if (item.imgType == 2) {
              idCardOpposite = item.imgPath;
            }
          });
        }
        this.zhongcai_set_data = {
          idNoHid: this.case_detail_case_identity_info_Data.idNoHid,
          billNo: this.case_collect_case_list_data.billNo,
          userNmHid: this.case_detail_case_identity_info_Data.userNmHid,
          caseNo: this.caseNo,
          userGender: this.case_detail_case_identity_info_Data.userGender,
          userNation: this.case_detail_case_identity_info_Data.userNation,
          idCardFront,
          idCardOpposite
        };
      } else if (type === 'jianmian') {
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_collect_case_list_data.billNo,
          prdTyp: this.case_collect_case_list_data.prdTyp,
        }
      } else if (type === 'huakou') {
        this.$set(this, 'userId', userId);
      } else if (type === 'gathering') {
        this.breaks_data = {
          caseNo: this.caseNo,
          billNo: this.case_collect_case_list_data.billNo,
          prdTyp: this.case_collect_case_list_data.prdTyp,
          tableData: this.base_info_data
        };
        this.offlineScanPay_apply(type);
        return;
      }
      this.modal[type] = true;
    },
    deliveryData(data) {
      console.log(data)
    }
  },
}
