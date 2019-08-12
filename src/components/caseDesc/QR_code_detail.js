import sysDictionary from '@/mixin/sysDictionary';
import { relief_relieford_getreliefinfo, offlineScanPay_invalid, relief_relieford_detailinfo, offlineScanPay_generate } from '@/service/getData'
import Cookie from 'js-cookie'
import qs from 'qs';

export default {
  mixins: [sysDictionary],
  model: {
    prop: 'model',
    event: 'passBack'
  },
  props: {
    model: Boolean,
    edit_flag: Boolean,
    breaks_data: {},
  },
  data() {
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      prefix: '/admin/relief/relieford/images/',
      getDirList: ['RELIEF_REASON', 'RELIEF_TYPE'],
      getDirObj: {},
      jianmian_loading: false,//减免提交loading
      reliefAmt_max: 0,//当前减免记录最大金额
      file_url_list: {},//存放图片路径
      formItem: {},
      ruleValidate: {
        reliefReason: [
          {
            required: true,
            message: '请选择减免原因',
            trigger: 'change'
          }
        ],
        reliefType: [
          {
            required: true,
            message: '请选择减免类型',
            trigger: 'change'
          }
        ],
        perdNum: [
          {
            required: true,
            message: '请选择减免期数',
            trigger: 'change',
          }
        ],
        reliefAmt: [
          {
            required: true,
            message: '请输入减免金额',
            trigger: 'blur',
          }
        ],
      },
      relief_counts: [],//减免期数list
      reliefPerdInfoVos: [],//每一期和类型对应的减免金额list
      defaultList: [],
      imgName: '',
      overdue_info: {
      },//逾期展示信息
      visible: false,
      tableData: [],//表格数组
      tableColumns: [
        {
          title: '序号',
          width: 70,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            return h('div', '无');
          }
        },
        {
          title: '减免类型',
          searchOperator: 'like',
          width: 150,
          key: 'reliefTypeName',
          align: 'center',
        },
        {
          title: '减免期数',
          searchOperator: 'like',
          width: 150,
          key: 'perdNum',
          align: 'center',
        },
        {
          title: '减免金额',
          searchOperator: 'like',
          width: 150,
          key: 'reliefAmt',
          align: 'center',
        },
      ],//表头
      tableData_repayment: [],//还款
      tableColumns_repayment: [
        {
          title: '期数',
          width: 65,
          key: 'perdNum',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '当前账单总金额',
          searchOperator: 'like',
          align: 'center',
          width: 125,
          key: 'perdTotAmt',
          render: (h, params) => {
            let perdTotAmt = params.row.perdTotAmt;
            perdTotAmt = perdTotAmt ? this.$options.filters['money'](perdTotAmt) : perdTotAmt;
            return h('span', perdTotAmt);
          }
        },
        {
          title: '剩余应还金额',
          searchOperator: 'like',
          align: 'center',
          key: 'remainTotAmt',
          render: (h, params) => {
            let remainTotAmt = params.row.remainTotAmt;
            remainTotAmt = remainTotAmt ? this.$options.filters['money'](remainTotAmt) : remainTotAmt;
            return h('span', remainTotAmt);
          }
        },
        {
          title: '总减免金额',
          searchOperator: 'like',
          key: 'reliefAmt',
          align: 'center',
        },
        {
          title: '还款金额',
          searchOperator: 'like',
          key: 'repayAmt',
          align: 'center',
        },
        {
          title: '还款状态',
          searchOperator: 'like',
          key: 'perdStsName',
          align: 'center',
        },
      ],
      uploadList: [],
      reliefType: false,//减免类型关键字
      perdNum: false,//减免期数关键字
      reliefAmt: false,//减免金额关键字
      detailList: [],//发送的还款详情list
      totReliefAmt: 0,//减免总额
      totRepayAmt: 0,//减免总额
    };
  },
  created() {
    console.log(this.edit_flag)
    if (this.edit_flag) {
      this.relief_relieford_getreliefinfo();
    } else {
      this.relief_relieford_detailinfo(this.breaks_data.id)
    };
    let obj = {
      url: this.breaks_data.data.reliefCertificate
    }
    this.uploadList.push(obj) ;
    this.tableData = this.breaks_data.data.reliefLists;
    this.tableData_repayment = this.breaks_data.data.detailList;
  },

  methods: {
    //查看图片
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    //移除图片
    handleRemove(file, type) {
      console.log(file);
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    handleSubmit(name) {
      this.$emit('passBack', { flag: false, name: 'QR_code_detail', status: 'ok' });
    },
    handleSuccess(res, file) {
      if (res.code === 1) {
        // this.formItem.idCardFront = res.data.relativePath;
        this.uploadList = [
          {
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          }
        ];
        file.url = res.data.relativePath;
        this.file_url_list = res.data;
        // this.$refs.formItem.validateField('idCardFront');
      } else {
        this.$Message.error(res.message);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '格式不正确',
        desc: '请选择png,jpeg,jpg格式图片'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '大小限制',
        desc: '图片大小不能超过5M'
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    },
    // 关闭弹窗
    del(type) {
      if (type) {
        this.$emit('passBack', { flag: false, name: 'QR_code_detail', status: 'ok' });
      } else {
        this.$emit('passBack', { flag: false, name: 'QR_code_detail' });
      }

    },
    // 查询基础信息接口
    async relief_relieford_getreliefinfo() {
      const res = await relief_relieford_getreliefinfo(this.breaks_data);
      console.log(res);
      if (res.code === 1) {
        this.overdue_info = res.data;
        this.relief_counts = res.data.reliefNums;
        this.reliefPerdInfoVos = res.data.reliefPerdInfoVos
      } else {
        this.$Message.error(res.message)
      }
    },
    //从修改进来的查询信息接口
    async relief_relieford_detailinfo(id) {
      const res = await relief_relieford_detailinfo({
        id: id
      });
      console.log(res)
      if (res.code === 1) {
        this.overdue_info = res.data;
        this.formItem = res.data;
        this.formItem.reliefAmt = this.formItem.reliefAmt.toFixed(2);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 失效二维码
    async offlineScanPay_invalid() {
      this.jianmian_loading = true;
      const res = await offlineScanPay_invalid({
        caseNo: this.breaks_data.caseNo,
      });
      this.jianmian_loading = false;
      if (res.code === 1) {
        this.$Message.success(res.data);
        clearTimeout(timer)
        var timer = setTimeout(() => {
          this.$emit('passBack', { flag: false, name: 'QR_code_detail', });
        }, 2000)
      } else {
        this.$Message.error(res.message)
      }
    }

  },
};
