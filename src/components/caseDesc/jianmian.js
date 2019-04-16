import sysDictionary from '@/mixin/sysDictionary';
import { relief_relieford_getreliefinfo, relief_relieford_applyrelief, relief_relieford_detailinfo, relief_relieford_updatereliefdetail } from '@/service/getData'
import Cookie from 'js-cookie'

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
        // billNo: 'BIL2017102715354800000248',//账单号
        // userNameHid: '**卓',//客户姓名
        // mblNoHid: '186****5566',//手机号
        // perdCnt: 6,//产品期数
        // ovduNums: [3, 4],//逾期期数
        // ovduFineAmt: 666,//逾期罚息
        // ovduItrtAmt: 888,//逾期利息
        // ovduMngAmt: 68,// 逾期服务费
        // ovduOvduAmt: 123.12,//逾期滞纳金
        // ovduAprAmt: 321.12,//逾期信审费
      },//逾期展示信息
      visible: false,
      tableData: [],//表格数组
      tableColumns: [
        {
          title: '序号',
          width: 100,
          searchOperator: '=',
          sortable: true,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '操作',
          width: 150,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const caseHandleStatus = params.row.caseHandleStatus;
            return h('div', [
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      console.log(params.index)
                      this.tableData.splice(params.index, 1);
                    }
                  }
                },
                [
                  h(
                    'a',
                    {
                      class: 'edit-btn',
                      props: {}
                    },
                    '删除'
                  )
                ]
              )
            ]);
          }
        },
        {
          title: '减免类型',
          searchOperator: 'like',
          width: 200,
          key: 'reliefTypeName',
          align: 'center',
        },
        {
          title: '减免期数',
          searchOperator: 'like',
          width: 200,
          key: 'perdNum',
          align: 'center',
        },
        {
          title: '减免金额',
          searchOperator: 'like',
          width: 200,
          key: 'reliefAmt',
          align: 'center',
        },
      ],//表头
      uploadList: [],
      reliefType: false,//减免类型关键字
      perdNum: false,//减免期数关键字
      reliefAmt: false,//减免金额关键字
    };
  },
  created() {
    console.log(this.edit_flag)
    if (this.edit_flag) {
      this.relief_relieford_getreliefinfo();
    } else {
      this.relief_relieford_detailinfo(this.breaks_data.id)
    }
  },
  mounted() {
    if (this.edit_flag) {
      this.handelAdd();
    }
  },
  methods: {
    // 添加减免记录，本地暂存
    handelAdd() {
      let { reliefType, perdNum, reliefAmt } = this, obj = {};
      //校验类型
      this.$refs.formItem.validateField('reliefType', (error) => {
        if (!error) {
          return reliefType = true;
        } else {
          return reliefType = false;
        }
      });
      //校验期数
      this.$refs.formItem.validateField('perdNum', (error) => {
        if (!error) {
          return perdNum = true;
        } else {
          return perdNum = false;
        }
      });
      //校验金额
      this.$refs.formItem.validateField('reliefAmt', (error) => {
        if (!error) {
          return reliefAmt = true;
        } else {
          return reliefAmt = false;
        }
      });
      // this.formitem_validateField('reliefType');
      // this.formitem_validateField('perdNum');
      // this.formitem_validateField('reliefAmt');
      // 类型，期数，金额校验通过后执行添加的逻辑
      if (reliefType && perdNum && reliefAmt) {
        if (this.reliefAmt_max > 0) {
          if (this.reliefAmt_max < this.formItem.reliefAmt) {
            this.$Message.error(`减免最大金额不能超过${this.reliefAmt_max}`);
            this.$set(this.formItem, "reliefAmt", this.reliefAmt_max);
            return;
          }
        } else if (this.formItem.reliefAmt <= 0) {
          this.$Message.error(`减免金额不能为0`);
          return;
        }
        Object.assign(obj, this.formItem)
        if (this.tableData.length > 0) {
          let result = this.tableData.some((item, index, arr) => {
            return obj.reliefType === item.reliefType && obj.perdNum === item.perdNum
          })
          if (result) {
            this.$Message.error(`当前添加的减免信息已经存在，请勿重复添加`);
          } else {
            this.tableData.push(obj);
          }
          return
        } else {
          this.tableData.push(obj);
        }
      }

    },
    // 单独交验规则
    formitem_validateField(type) {
      this.$refs.formItem.validateField(type, (error) => {
        if (!error) {
          return this[type] = true;
        } else {
          return this[type] = false;
        }
      });
    },
    // 减免金额处理小数点
    reliefAmt_blur(val) {
      this.$set(this.formItem, "reliefAmt", Number(val).toFixed(2));
    },
    // 减免类型selectchange
    reliefTypeSelectChange(obj) {
      console.log(obj);
      this.formItem.reliefTypeName = obj.label;
      this.reliefPerdInfoVos.forEach(item => {
        if (this.formItem.reliefType === item.reliefType && this.formItem.perdNum === String(item.perdNum)) {
          this.$set(this.formItem, "reliefAmt", item.perdAmt.toFixed(2));
          this.reliefAmt_max = (item.perdAmt).toFixed(2);
          return;
        }
      })
    },
    // 减免期数 selectchange
    perdNumSelectChange(val) {
      this.reliefPerdInfoVos.forEach(item => {
        if (this.formItem.reliefType === item.reliefType && this.formItem.perdNum === String(item.perdNum)) {
          this.$set(this.formItem, "reliefAmt", item.perdAmt.toFixed(2));
          this.reliefAmt_max = item.perdAmt.toFixed(2);
          return;
        }
      })
    },
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
      console.log(this.formItem);
      this.$refs.formItem.validate((valid) => {
        console.log(valid, '----------------');
        if (valid) {
          if (this.edit_flag) {
            this.relief_relieford_applyrelief();
          } else {
            this.relief_relieford_updatereliefdetail();
          }
        }
      });
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
    del() {
      this.$emit('passBack', { flag: false });
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
    // 减免数据修改
    async relief_relieford_updatereliefdetail() {
      const res = await relief_relieford_updatereliefdetail({
        id: this.breaks_data.id,
        reliefAmt: this.formItem.reliefAmt
      });
      console.log(res);
      if (res.code === 1) {
        this.$emit('passBack', { flag: false, status: 'ok' });
      } else {
        this.$Message.error(res.message)
      }
    },
    // 减免申请接口
    async relief_relieford_applyrelief() {
      if (this.tableData.length < 1) {
        this.$Message.error('暂无减免信息，请添加后再提交');
        return;
      }
      console.log(this.tableData);
      this.jianmian_loading = true;
      const res = await relief_relieford_applyrelief(
        {
          ...this.overdue_info,
          ...this.formItem,
          reliefLists: this.tableData,
          ...this.file_url_list
        },
        {
          transformRequest: [
            function (data) {
              return JSON.stringify(data); //利用对应方法转换格式
            }
          ]
        }
      );
      this.jianmian_loading = false
      console.log(res);
      if (res.code === 1) {
        this.$emit('passBack', { flag: false, status: 'ok' });
      } else {
        this.$Message.error(res.message)
      }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
