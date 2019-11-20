import sysDictionary from '@/mixin/sysDictionary';
import { relief_relieford_getreliefinfo, relief_relieford_applyrelief, relief_relieford_detailinfo, relief_relieford_updatereliefdetail, offlineScanPay_generate } from '@/service/getData'
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
      error_text: '',//错误提示的文字
      jianmian_loading: false,//减免提交loading
      perdNum_flag: false,
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
                      let row = this.tableData.splice(params.index, 1);
                      this.deal_table_repayment('reduce', row);
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
          key: 'perdTotSur',
          render: (h, params) => {
            let perdTotSur = params.row.perdTotSur;
            perdTotSur = perdTotSur ? this.$options.filters['money'](perdTotSur) : perdTotSur;
            return h('span', perdTotSur);
          }
        },
        {
          title: '总减免金额',
          searchOperator: 'like',
          key: 'reliefAmt',
          align: 'center',
          slot: 'reliefAmt'
        },
        {
          title: '还款金额',
          searchOperator: 'like',
          key: 'repayAmt',
          align: 'center',
          slot: 'repayAmt',
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
      totRepayAmt: 0,//还款总额
    };
  },
  created() {
    console.log(this.edit_flag)
    if (this.edit_flag) {
      this.relief_relieford_getreliefinfo();
    } else {
      this.relief_relieford_detailinfo(this.breaks_data.id)
    };
    // 初始化table数据
    this.breaks_data.tableData.forEach(item => {
      if (item.perdSts === '0' || item.perdSts === '1') {
        item.error_flag = false;
        item.input_edit_flag = true;
        item.reliefAmt = 0.00;
        item.repayAmt = 0;
        this.tableData_repayment.push(item);
      }
    })
    // this.tableData_repayment = this.breaks_data.tableData;
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    // 设置左右两边的border
    this.$nextTick(() => {
      let left = this.$refs.left;
      let right = this.$refs.right;
      if (parseFloat(left.scrollHeight) > parseFloat(right.scrollHeight)/2) {
        left.style.borderRight = '1px solid #e8eaec';
      } else {
        right.style.borderLeft = '1px solid #e8eaec';
      }
    })
  },
  methods: {
    // 处理左右表单联动
    deal_table_repayment(type, row) {
      // 处理右侧还款信息的表单联动
      this.totRepayAmt = 0;
      this.tableData_repayment.forEach((i, index) => {
        let reliefAmt = 0;
        if (type === 'add') {
          // 增加减免的联动
          this.tableData.forEach((j) => {
            if (parseFloat(i.perdNum) === parseFloat(j.perdNum)) {
              i.error_flag = false;
              i.input_edit_flag = false;
              reliefAmt += parseFloat(j.reliefAmt);
              i.reliefAmt = reliefAmt;
              i.repayAmt = (parseFloat(i.perdTotSur) - parseFloat(i.reliefAmt)).toFixed(2);
              this.$set(this.tableData_repayment, index, i)
            }
          });
        } else {
          // 删除减免的联动
          if (parseFloat(i.perdNum) === parseFloat(row[0].perdNum)) {
            i.error_flag = false;
            i.input_edit_flag = true;
            reliefAmt = parseFloat(i.reliefAmt) - parseFloat(row[0].reliefAmt);
            // i.reliefAmt = reliefAmt.toFixed(2);
            i.reliefAmt = reliefAmt;
            i.repayAmt = i.reliefAmt > 0 ? parseFloat(i.perdTotSur) - parseFloat(i.reliefAmt).toFixed(2): 0;
            this.$set(this.tableData_repayment, index, i)
          }
        }
        this.totRepayAmt += parseFloat(i.repayAmt);
      });
    },
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
      // 类型，期数，金额校验通过后执行添加的逻辑
      if (reliefType && perdNum && reliefAmt) {
        if (this.reliefAmt_max > 0) {
          if (parseFloat(this.reliefAmt_max) < parseFloat(this.formItem.reliefAmt)) {
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
          };
          // return
        } else {
          this.tableData.push(obj);
        };
        this.deal_table_repayment('add');
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
      this.$set(this.formItem, "reliefAmt", parseFloat(val).toFixed(2));
    },
    // 处理还款金额
    repayAmt_blur(row, index, event) {
      // 处理为空的字符串
      if (event.target.value === '' || event.target.value < 0) {
        row.repayAmt = 0;
      };
      if (parseFloat(event.target.value) + parseFloat(row.reliefAmt) > parseFloat(row.perdTotSur)) {
        row.error_flag = true;
        this.error_text = '金额填写有误'
        this.$set(this.tableData_repayment, index, row);
        return
      } else {
        row.error_flag = false;
        this.$set(this.tableData_repayment, index, row);
      }
      this.$set(this.tableData_repayment, index, row);
      this.totReliefAmt = 0;
      this.totRepayAmt = 0;
      this.tableData_repayment.forEach(item => {
        item.remainTotAmt = item.perdTotSur;//处理剩余应还金额
        this.totRepayAmt += parseFloat(item.repayAmt)
        if (parseFloat(item.reliefAmt) > 0) {
          this.totReliefAmt += parseFloat(item.reliefAmt);
        }
      })
    },
    // 减免类型selectchange
    reliefTypeSelectChange(obj) {
      console.log(obj);
      if (obj) {
        this.formItem.reliefTypeName = obj.label;
        this.reliefPerdInfoVos.forEach(item => {
          // // 还到、现金分期执行新的罚息计算逻辑
          // if (this.breaks_data.prdTyp === '01' || this.breaks_data.prdTyp === '11') {
          //   if (obj.value === item.reliefType && String(item.perdNum) === '0' && (obj.value === 'FINE' || obj.value === 'OVDU')) {
          //     this.$set(this.formItem, "reliefAmt", item.perdAmt.toFixed(2));
          //     this.reliefAmt_max = (item.perdAmt).toFixed(2);
          //     this.$set(this.formItem, 'perdNum', '0');
          //     this.perdNum_flag = true;
          //     return;
          //   }
          // }
          // 商户贷、钱包不变
          if (this.formItem.reliefType === item.reliefType && this.formItem.perdNum === String(item.perdNum)) {
            this.$set(this.formItem, "reliefAmt", item.perdAmt.toFixed(2));
            this.reliefAmt_max = (item.perdAmt).toFixed(2);
            this.perdNum_flag = false;
            return;
          }
        })
      }
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
      // 判断左边减免是否有数据，没有的话直接提交还款信息，否则校验减免信息
      let submit_flag = true;
      if (this.tableData.length > 0) {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            this.tableData_repayment.forEach(item => {
              if (item.error_flag) {
                submit_flag = false;
              }
            })
          } else {
            submit_flag = valid;
          }
        });
      } else {
        this.tableData_repayment.forEach(item => {
          if (item.error_flag) {
            submit_flag = false;
          }
        })
      };
      console.log(submit_flag)
      submit_flag && this.deal_send_data();

    },
    handleSuccess(res, file) {
      if (res.code === 1) {
        this.uploadList = [
          {
            url: this.prefix + res.data.relativePath,
            relativePath: res.data.relativePath,
            status: 'finished'
          }
        ];
        file.url = res.data.relativePath;
        this.file_url_list = res.data;
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
      this.$emit('passBack', { flag: false, name: 'gathering' });
    },
    // 处理发送前的数据
    deal_send_data() {
      this.detailList = [];
      this.totReliefAmt = 0;
      this.tableData_repayment.forEach(item => {
        item.remainTotAmt = item.perdTotSur;//处理剩余应还金额
        item.repayAmt > 0 && (item.repayAmt = parseFloat(item.repayAmt));
        if (parseFloat(item.reliefAmt) > 0) {
          this.totReliefAmt += parseFloat(item.reliefAmt);
        }
      })
      this.offlineScanPay_generate()
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
    // 减免申请接口
    async offlineScanPay_generate() {
      if (this.totRepayAmt === 0) {
        this.$Message.error('还款金额不能为0');
        return;
      }
      console.log(this.tableData_repayment);
      this.jianmian_loading = true;
      // this.formItem.reliefRemark = JSON.stringify(this.formItem.reliefRemark);
      const res = await offlineScanPay_generate(
        {
          caseNo: this.overdue_info.caseNo,
          billNo: this.overdue_info.billNo,
          userNmHid: this.overdue_info.userNameHid,
          userMblNoHid: this.overdue_info.mblNoHid,
          billPerdInfos: this.overdue_info.billPerdInfos,
          totReliefAmt: parseFloat(this.totReliefAmt.toFixed(2)),
          totRepayAmt: parseFloat(this.totRepayAmt.toFixed(2)),
          ...this.formItem,
          reliefStatus: 'O',
          reliefOrigin: 'OS',
          reliefLists: this.tableData,
          ...this.file_url_list,
          detailList: this.tableData_repayment,
        },
        {
          transformRequest: [
            function (data) {
              let unicodeJson = qs.stringify(data); //利用对应方法转换格式
              return unicodeJson; //利用对应方法转换格式
            }
          ]
        }
      );
      this.jianmian_loading = false
      console.log(res);
      if (res.code === 1) {
        this.$emit('passBack', { flag: false, status: 'ok', name: 'gathering' });
      } else {
        this.$Message.error(res.message)
      }
    }
  },
};
