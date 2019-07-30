import { arb_apply, arb_uploadUrl, apply_arbitration_reverse, arb_getVoucherInfo } from '@/service/getData';
import Cookie from 'js-cookie';
import dayjs from 'dayjs';
import PDF_IMG from '@/assets/images/pdf.png'
export default {
  data() {
    return {
      arbitrateTitle: this.zhongcai_data.title ? this.zhongcai_data.title : '申请仲裁',
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      prefix: '/admin/arb/images/',
      formItem: {},
      zhongcai_loading: false,//仲裁提交loading
      ruleValidate: {
        userGender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        userNation: [
          {
            required: true,
            message: '请选择民族',
            trigger: 'change'
          }
        ],
        standAgreeDate: [
          {
            required: true,
            message: '请选择提前到期日期',
            trigger: 'change',
            type: 'date'
          }
        ],
        voucherNo: [
          {
            required: true,
            message: '请输入打款凭证流水号',
            trigger: 'blur'
          }
        ],
        idAddress: [
          {
            required: true,
            message: '请输入身份证地址',
            trigger: 'blur',
          }
        ],
        idCardFront: [
          {
            required: true,
            message: '请上传身份证正面',
            trigger: 'blur'
          }
        ],
        idCardOpposite: [
          {
            required: true,
            message: '请上传身份证反面',
            trigger: 'blur'
          }
        ],
        voucherImg: [
          {
            required: true,
            message: '请上传打款凭证',
            trigger: 'blur'
          }
        ],
        standImg: [
          {
            required: true,
            message: '请上传提前到期通知',
            trigger: 'blur'
          }
        ],
        creditorImg: [
          {
            required: true,
            message: '请上传债权转让通知',
            trigger: 'blur'
          }
        ]
      },
      productTimeList: [],
      defaultList_cardFront: [],
      defaultList_cardOpposite: [],
      defaultList_voucherImg: [],
      defaultList_standImg: [],
      defaultList_creditorImg: [],
      imgName: '',
      visible: false,
      uploadList_cardFront: [],
      uploadList_cardOpposite: [],
      uploadList_voucherImg: [],
      uploadList_standImg: [],
      uploadList_creditorImg: []
    };
  },
  model: {
    prop: 'model',
    event: 'passBack'
  },
  props: {
    zhongcai_data: {},
    getDirObj: {},
    model: {}
  },
  created() {
    console.log(this.zhongcai_data)
    if (this.zhongcai_data.routertype) {
      this.formItem.idAddress = this.zhongcai_data.idAddress;
      this.formItem.voucherNo = this.zhongcai_data.voucherNo;
      this.formItem.standAgreeDate = this.zhongcai_data.standAgreeDate
        ? new Date(this.zhongcai_data.standAgreeDate)
        : null;
    } else {
      this.arb_getVoucherInfo();//案件详情页申请仲裁获取打款信息
    }
    if (this.zhongcai_data.userGender) {
      this.formItem.userGender = this.zhongcai_data.userGender;
      // this.$refs.formItem.validateField('userGender');
    }
    if (this.zhongcai_data.userNation) {
      this.formItem.userNation = this.zhongcai_data.userNation;
      // this.$refs.formItem.validateField('userNation');
    }
    this.showImg();
    if (!this.zhongcai_data.title) {
      apply_arbitration_reverse({ caseNo: this.zhongcai_data.caseNo }).then(res => {
        if (res.code === 1) {
          if (res.data.advanceDueNoticeRelativePath) {
            this.uploadList_standImg.push({
              url: this.prefix + res.data.advanceDueNoticeRelativePath,
              relativePath: res.data.advanceDueNoticeRelativePath,
              status: 'finished'
            });
            this.$set(this.formItem, 'standImg', res.data.advanceDueNoticeRelativePath);
          }
          if (res.data.creditorImgRelativePath) {
            this.uploadList_creditorImg.push({
              url: this.prefix + res.data.creditorImgRelativePath,
              relativePath: res.data.creditorImgRelativePath,
              status: 'finished'
            });
            this.$set(this.formItem, 'creditorImg', res.data.creditorImgRelativePath);
          }
          if (res.data.advanceDueNoticeDate) {
            this.$set(this.formItem, 'standAgreeDate', res.data.advanceDueNoticeDate);
          }
        } else {
          this.$Message.error(res.message);
        }
      }).catch(err => {
        this.$Message.error(err.message);
      })
    };
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    // 详情带入  回显身份证图片
    showImg() {
      console.log(this.zhongcai_data);
      if (this.zhongcai_data.routertype === 'my_zhongcai') {
        if (this.zhongcai_data.idCardFront) {
          this.$set(this.formItem, 'idCardFront', this.zhongcai_data.idCardFront);
          // this.formItem.idCardFront = this.zhongcai_data.idCardFront;
          this.uploadList_cardFront.push({
            url: this.prefix + this.zhongcai_data.idCardFront,
            relativePath: this.zhongcai_data.idCardFront,
            status: 'finished'
          });
          // this.$set(this.formItem, 'idCardFront', this.uploadList_cardFront[0].relativePath)
          // this.$refs.formItem.validateField('idCardFront');
        }

        if (this.zhongcai_data.idCardOpposite) {
          this.$set(this.formItem, 'idCardOpposite', this.zhongcai_data.idCardOpposite);
          // this.formItem.idCardOpposite = this.zhongcai_data.idCardOpposite;
          this.uploadList_cardOpposite.push({
            url: this.prefix + this.zhongcai_data.idCardOpposite,
            relativePath: this.zhongcai_data.idCardOpposite,
            status: 'finished'
          });
          // this.$set(this.formItem, 'idCardOpposite', this.uploadList_cardOpposite[0].relativePath)
          // this.$refs.formItem.validateField('idCardOpposite');
        }
        if (this.zhongcai_data.voucherImg) {
          let flag = false;
          if (this.zhongcai_data.voucherImg.indexOf('.pdf')) {
            flag = true;
          }
          this.$set(this.formItem, 'voucherImg', this.zhongcai_data.voucherImg);
          // this.formItem.voucherImg = this.zhongcai_data.voucherImg;
          this.uploadList_voucherImg.push({
            url: !flag ? this.prefix + this.zhongcai_data.voucherImg : PDF_IMG,
            relativePath: this.zhongcai_data.voucherImg,
            status: 'finished'
          });
          // this.$refs.formItem.validateField('voucherImg');
        }
        if (this.zhongcai_data.standImg) {
          // this.formItem.standImg = this.zhongcai_data.standImg;
          this.$set(this.formItem, 'standImg', this.zhongcai_data.standImg);
          this.uploadList_standImg.push({
            url: this.prefix + this.zhongcai_data.standImg,
            relativePath: this.zhongcai_data.standImg,
            status: 'finished'
          });
          // this.$refs.formItem.validateField('standImg');
        }
        //rrrrr
        if (this.zhongcai_data.creditorImg) {
          // this.formItem.standImg = this.zhongcai_data.standImg;
          this.$set(this.formItem, 'creditorImg', this.zhongcai_data.creditorImg);
          this.uploadList_creditorImg.push({
            url: this.prefix + this.zhongcai_data.creditorImg,
            relativePath: this.zhongcai_data.creditorImg,
            status: 'finished'
          });
          // this.$refs.formItem.validateField('standImg');
        }

      } else {
        console.log(this.zhongcai_data.idCardFront)
        if (this.zhongcai_data.idCardFront) {
          this.arb_uploadUrl({
            key: 'idCardFront',
            path: this.zhongcai_data.idCardFront
          });
        }
        if (this.zhongcai_data.idCardOpposite) {
          this.arb_uploadUrl({
            key: 'idCardOpposite',
            path: this.zhongcai_data.idCardOpposite
          });
        }
      }
    },
    handleSubmit() {
      console.log(this.formItem);
      this.$refs.formItem.validate((valid) => {
        console.log(valid, '----------------');
        if (valid) {
          this.arb_apply();
        } else {
          this.model = true;
        }
      });
    },
    // 获取信息
    async arb_apply() {
      this.zhongcai_loading = true;
      let obj = {
        billNo: this.formItem.billNo,
        caseNo: this.zhongcai_data.caseNo,
        idCardNo: this.zhongcai_data.idNoHid,
        userName: this.zhongcai_data.userName,
        userGender: this.formItem.userGender,
        userNation: this.formItem.userNation,
        voucherNo: this.formItem.voucherNo,
        idAddress: this.formItem.idAddress,
        idCardFront: this.uploadList_cardFront[0].relativePath,
        idCardOpposite: this.uploadList_cardOpposite[0].relativePath,
        voucherImg: this.uploadList_voucherImg[0].relativePath,
        standImg: this.uploadList_standImg[0].relativePath,
        creditorImg: this.uploadList_creditorImg[0].relativePath
      };
      if (this.formItem.standAgreeDate) {
        obj.standAgreeDate = dayjs(this.formItem.standAgreeDate).format('YYYY-MM-DD');
      }
      const res = await arb_apply(obj);
      this.zhongcai_loading = false;
      if (res.code === 1) {
        this.repayinfo_getApplyInfo_data = res.data;
        this.del();
        this.$Message.success('提交成功');
      } else {
        this.del();
        this.$Message.error(res.message);
      }
    },
    del() {
      this.childrenModel = !this.model;
      this.$emit('passBack', this.childrenModel);
      this.$emit("getChildrenStatus", this.childrenData);
    },
    handleRemove_cardFront(file, type) {
      console.log(file);
      this.uploadList_cardFront.splice(this.uploadList_cardFront.indexOf(file), 1);
      this.formItem.idCardFront = ''
    },
    handleRemove_cardOpposite(file, type) {
      this.uploadList_cardOpposite.splice(this.uploadList_cardOpposite.indexOf(file), 1);
      this.formItem.idCardOpposite = ''
    },
    handleRemove_voucherImg(file, type) {
      this.uploadList_voucherImg.splice(this.uploadList_voucherImg.indexOf(file), 1);
      this.formItem.voucherImg = ''
    },
    handleRemove_standImg(file, type) {
      this.uploadList_standImg.splice(this.uploadList_standImg.indexOf(file), 1);
      this.formItem.standImg = ''
    },
    handleRemove_creditorImg(file, type) {
      this.uploadList_creditorImg.splice(this.uploadList_creditorImg.indexOf(file), 1);
      this.formItem.creditorImg = ''
    },
    handleSuccess_cardFront(res, file) {
      console.log(res, '-----------------');
      if (res.code === 1) {
        this.formItem.idCardFront = res.data.relativePath;
        this.uploadList_cardFront = [
          {
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          }
        ];
        // this.$set(this.formItem, 'idCardFront', this.uploadList_cardFront[0].relativePath)
        file.url = res.data.relativePath;
        this.$refs.formItem.validateField('idCardFront');
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSuccess_cardOpposite(res, file) {
      console.log(res, '-----------------');
      if (res.code === 1) {
        this.formItem.idCardOpposite = res.data.relativePath;
        this.uploadList_cardOpposite = [
          {
            relativePath: res.data.relativePath,
            url: this.prefix + res.data.relativePath,
            status: 'finished'
          }
        ];
        // this.$set(this.formItem, 'idCardOpposite', this.uploadList_cardOpposite[0].relativePath)
        file.url = res.data.relativePath;
        this.$refs.formItem.validateField('idCardOpposite');
      } else {
        this.$Message.error(res.message);
      }
    },

    async arb_uploadUrl(obj) {
      const res = await arb_uploadUrl({
        caseNo: this.zhongcai_data.caseNo,
        imgType: obj.key,
        uploadUrlImage: obj.path
      });
      if (res.code === 1) {
        if (obj.key === 'idCardFront') {
          this.formItem.idCardFront = this.zhongcai_data.idCardFront;
          this.uploadList_cardFront.push({
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          });
          this.$refs.formItem.validateField('idCardFront');
        } else if (obj.key === 'idCardOpposite') {
          this.formItem.idCardOpposite = this.zhongcai_data.idCardOpposite;
          this.uploadList_cardOpposite.push({
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          });
          this.$refs.formItem.validateField('idCardOpposite');
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSuccess_voucherImg(res, file) {
      console.log(file, '-----------------');
      console.log(res.data.relativePath.indexOf('.pdf'))
      if (res.code === 1) {
        if (res.data.relativePath.indexOf('.pdf') != -1) {
          this.formItem.voucherImg = PDF_IMG;
          this.uploadList_voucherImg = [
            {
              url: PDF_IMG,
              relativePath: res.data.relativePath,
              status: 'finished'
            }
          ];
        } else {
          this.formItem.voucherImg = res.data.relativePath;
          this.uploadList_voucherImg = [
            {
              url: this.prefix + res.data.relativePath,
              relativePath: res.data.relativePath,
              status: 'finished'
            }
          ];
        }
        file.url = res.data.relativePath;
        this.$refs.formItem.validateField('voucherImg');
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSuccess_standImg(res, file) {
      console.log(res, '-----------------');
      if (res.code === 1) {
        this.formItem.standImg = res.data.relativePath;
        this.uploadList_standImg = [
          {
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          }
        ];
        file.url = res.data.relativePath;
        this.$refs.formItem.validateField('standImg');
      } else {
        this.$Message.error(res.message);
      }
    },

    handleSuccess_creditorImg(res, file) {
      console.log(res, '-----------------');
      if (res.code === 1) {
        this.formItem.creditorImg = res.data.relativePath;
        this.uploadList_creditorImg = [
          {
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          }
        ];
        file.url = res.data.relativePath;
        this.$refs.formItem.validateField('creditorImg');
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
        desc: '图片大小不能超过10M'
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList_cardFront.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    },
    async arb_getVoucherInfo() {
      const res = await arb_getVoucherInfo({
        caseNo: this.zhongcai_data.caseNo,
        billNo: this.zhongcai_data.billNo
      });
      console.log(res);
      if (res.code === 1) {
        // this.formItem.voucherNo = res.data.voucherNo;
        this.$set(this.formItem, 'voucherNo', res.data.voucherNo);
        let flag = false;
        if (res.data.voucherRelativePath.indexOf('.pdf')) {
          flag = true;
        }
        this.$set(this.formItem, 'voucherImg', res.data.voucherRelativePath);
        this.uploadList_voucherImg.push({
          url: !flag ? this.prefix + res.data.voucherRelativePath : PDF_IMG,
          relativePath: res.data.voucherRelativePath,
          status: 'finished'
        });
      } else {
        this.$Message.error(res.message);
      }
    }
  },
  mounted() {
    // if (!this.zhongcai_data.idCardFront) {
    // this.uploadList_cardFront = this.$refs.upload.fileList;
    // }
    // if (!this.zhongcai_data.idCardOpposite) {
    // this.uploadList_cardOpposite = this.$refs.upload1.fileList;
    // }
    // this.uploadList_voucherImg = this.$refs.upload2.fileList;
    // this.uploadList_standImg = this.$refs.upload3.fileList;
    // this.showImg();
  }
};
