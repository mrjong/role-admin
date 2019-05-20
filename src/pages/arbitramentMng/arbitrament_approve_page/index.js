import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import dayjs from 'dayjs'
import { arb_operateRecord, arb_list, arb_detail, arb_check, credit_pdf_upload, credit_case_execute, credit_pdf_data, arb_exportlist } from '@/service/getData';
import util from '@/libs/util';
import Cookie from 'js-cookie';

export default {
  name: 'case_search_page',
  mixins: [formValidateFun, sysDictionary],
  data() {
    console.log(this.GLOBAL);
    const _this = this;
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      prefix_pdf_file: '/admin/credit/pdf/data',
      getDirList: ['PROD_TYPE', 'GENDER', 'APPROVAL_STATE'],
      getDirObj: {},
      showPanel: false,
      prefix: '/admin/arb/images/',
      file_list: [],// 上传文件list
      file_url: '',// 暂存的文件url
      arb_detail_data: {},
      showPanel2: false,
      query: false,//查询权限
      audit: false,//审核权限
      upload: false,//上传权限
      execution: false, //申请执行权限
      query_loading: false,//查询按钮loading
      audit_loading: false,//审核按钮loading
      reject_loading: false,//驳回按钮loading
      upload_loading: false,//上传按钮loading
      apply_loading: false,// 申请执行按钮loading
      file_disabled: false,// 是否禁用上传
      approve_list: [],// 申请执行勾选list
      show_file_list: false,// 显示上传的list
      applyTime: [],//申请时间区间
      approvalTime: [],//审核时间区间
      export_case_loading: false,//导出loading
      export_list: [],//导出的list
      showModalType: '',
      shenheObj: {},
      case_detail_remark_list_tableData: [],
      case_detail_remark_list_pageNo: 1,
      case_detail_remark_list_pageSize: 10,
      case_detail_remark_list_total: 0,
      case_detail_remark_list_tableColumns: [
        {
          title: '操作人',
          align: 'center',
          key: 'approvalName'
        },
        {
          title: '操作时间',
          align: 'center',
          key: 'approvalTime',
          width: 200,
          render: (h, params) => {
            let approvalTime = params.row.approvalTime;
            approvalTime = approvalTime
              ? this.$options.filters['formatDate'](approvalTime, 'YYYY-MM-DD HH:mm:ss')
              : approvalTime;
            return h('span', approvalTime);
          }
        },
        {
          title: '操作',
          align: 'center',
          key: 'approvalStateName'
        },
        {
          title: '备注',
          align: 'center',
          width: 400,
          key: 'approvalRmk',
          render: (h, params) => {
            let approvalRmk = params.row.approvalRmk;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: approvalRmk,
                    placement: 'top',
                    maxWidth: "380",
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '380px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, approvalRmk)]
              ),
            ])
          }
        }
      ],
      reject_modal: false,//驳回的modal
      arbitrament_modal: false,//仲裁详情的modal
      upload_modal: false,//上传图片的modal
      recoverFormItem: {},//驳回原因表单
      reject_ruleValidate: {
        approvalRemark: [
          {
            required: true,
            message: '请输入驳回原因',
            trigger: 'blur'
          }
        ]
      },//驳回校验
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
        ],
        overdueDaysLt: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqts_start,
            trigger: 'blur'
          }
        ],
        overdueDaysBt: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqts_end,
            trigger: 'blur'
          }
        ],
        billOvduAmtLt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqyhje_start,
            trigger: 'blur'
          }
        ],
        billOvduAmtBt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: this.validate_yqyhje_end,
            trigger: 'blur'
          }
        ]
      },
      imgName: '',
      visible: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {
        productTypes: []
      },
      tableData: [],
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          type: 'index',
          title: '序号',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '操作',
          width: 150,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            return h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      _this.arb_detail(params.row);
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  style: {
                    display: params.row.approvalState === '01' && _this.audit ? 'inline-block' : 'none'
                  },
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      if (!_this.audit) {
                        _this.$Message.error('很抱歉，暂无审核权限');
                        return;
                      }
                      _this.arb_detail(params.row, 'edit');
                    }
                  }
                },
                '审核'
              ),
              params.row.approvalState === '02' && _this.upload ? h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.file_data = {
                        id: params.row.approvalId,
                        caseNo: params.row.caseNo
                      };
                      this.upload_modal = true;
                      // this.file_list = this.$refs.upload;
                      console.log(this.$refs.upload);
                    }
                  }
                },
                '上传'
              ) : null
            ]);
          }
        },
        {
          title: '案件状态',
          width: 120,
          align: 'center',
          key: 'approvalStateName'
        },
        {
          title: '案件编号',
          width: 180,
          align: 'center',
          key: 'caseNo'
        },
        {
          title: '账单号',
          width: 200,
          align: 'center',
          key: 'billNo'
        },
        {
          title: '产品名称',
          width: 120,
          align: 'center',
          key: 'productName'
        },

        {
          title: '借款期限',
          width: 120,
          align: 'center',
          key: 'perdCnt'
        },
        {
          title: '客户姓名',
          width: 120,
          align: 'center',
          key: 'userNameHid'
        },
        {
          title: '身份证号',
          width: 120,
          align: 'center',
          key: 'idCardNoHid'
        },
        {
          title: '手机号',
          width: 120,
          align: 'center',
          key: 'mblNo'
        },
        {
          title: '逾期天数',
          width: 120,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '逾期应还金额',
          width: 120,
          align: 'center',
          key: 'overdueAmt',
          render: (h, params) => {
            let overdueAmt = params.row.overdueAmt;
            overdueAmt = overdueAmt ? this.$options.filters['money'](overdueAmt) : overdueAmt;
            return h('span', overdueAmt);
          }
        },
        {
          title: '已还罚息',
          width: 120,
          align: 'center',
          key: 'perdFineRep',
          render: (h, params) => {
            let perdFineRep = params.row.perdFineRep;
            perdFineRep = perdFineRep ? this.$options.filters['money'](perdFineRep) : perdFineRep;
            return h('span', perdFineRep);
          }
        },
        {
          title: '已还滞纳金',
          width: 120,
          align: 'center',
          key: 'perdOvduRep',
          render: (h, params) => {
            let perdOvduRep = params.row.perdOvduRep;
            perdOvduRep = perdOvduRep ? this.$options.filters['money'](perdOvduRep) : perdOvduRep;
            return h('span', perdOvduRep);
          }
        },
        {
          title: '申请时间',
          width: 150,
          align: 'center',
          key: 'createTime',
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime
              ? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
              : createTime;
            return h('span', createTime);
          }
        },
        {
          title: '申请人',
          width: 120,
          align: 'center',
          key: 'opUserName'
        },
        {
          title: '电催中心',
          width: 120,
          align: 'center',
          key: 'opCompayName'
        },
        {
          title: '审核人',
          width: 120,
          align: 'center',
          key: 'approvalUserName'
        },
        {
          title: '审核时间',
          width: 150,
          align: 'center',
          key: 'approvalTime',
          render: (h, params) => {
            let approvalTime = params.row.approvalTime;
            approvalTime = approvalTime
              ? this.$options.filters['formatDate'](approvalTime, 'YYYY-MM-DD HH:mm:ss')
              : approvalTime;
            return h('span', approvalTime);
          }
        },
        {
          title: '审核备注',
          width: 120,
          align: 'center',
          key: 'approvalRemark',
          render: (h, params) => {
            let approvalRemark = params.row.approvalRemark;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px',
                  },
                  props: {
                    content: approvalRemark,
                    placement: 'top',
                    maxWidth: "110",
                    transfer: true,
                  }
                },
                [h('div', {
                  style: {
                    cursor: 'pointer',
                    width: '110px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }
                }, approvalRemark)]
              ),
            ]);
          }
        }
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let arbitrament_approve_form = window.sessionStorage.getItem('arbitrament_approve_form');
    if (arbitrament_approve_form) {
      this.formItem = JSON.parse(arbitrament_approve_form);
      // 获取缓存的申请时间
      this.applyTime = [
        JSON.parse(arbitrament_approve_form).applyTimeLt,
        JSON.parse(arbitrament_approve_form).applyTimeBt,
      ];
      // 获取缓存的审核时间
      this.approvalTime = [
        JSON.parse(arbitrament_approve_form).approvalTimeLt,
        JSON.parse(arbitrament_approve_form).approvalTimeBt,
      ];
    }
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        case "audit": this.audit = true;
          break;
        case "upload": this.upload = true;
          break;
        case "execution": this.execution = true;
          break;
      }
    });
    // this.getList();
  },
  methods: {
    // table勾选回调
    changeSelect(arr) {
      this.approve_list = [];
      this.export_list = [];
      let obj = {};
      arr.forEach(item => {
        obj = {
          id: item.approvalId,
          caseNo: item.caseNo,
        }
        this.approve_list.push(obj);
        this.export_list.push(item.approvalId);
      });
      console.log(this.approve_list)
    },
    // 导出数据
    async exportData() {
      if (this.tableData.length === 0) {
        this.$Message.info('当前无数据，无法导出');
        return;
      }
      this.export_case_loading = true;
      const res = await arb_exportlist(
        {
          ...this.formItem,
          ids: this.export_list,
        },
        {
          timeout: 120000,
          responseType: "blob"
        }
      );
      this.export_case_loading = false;
      util.dowloadfile('仲裁审批', res);
    },
    // 申请执行接口
    async apply_execute() {
      if (this.approve_list.length === 0) {
        this.$Message.error('请先勾选案件');
        return;
      }
      this.apply_loading = true;
      const res = await credit_case_execute(
        {
          arbConditions: this.approve_list,
        },
        {
          transformRequest: [
            function (data) {
              return JSON.stringify(data); //利用对应方法转换格式
            }
          ]
        }
      )
      this.apply_loading = false;
      console.log(res);
      if (res.code === 1) {
        this.$Message.success('操作成功');
        this.getList();
        this.approve_list = [];
      } else {
        this.$Message.error(res.message);
      }
    },
    // 上传之前的回调
    handleUpload(file) {
      console.log(file);
      if (file.type != 'application/pdf') {
        this.$Message.error('请选择PDF格式文件');
        return;
      }
      this.show_file_list = true;
      this.file_list.push(file);
      this.file_disabled = true;
      return false;
    },
    // 文件上传过程监听
    file_progress(event, file, fileList) {
      console.log(file);
      // this.$Spin.show();
    },
    // 文件上传成功监听
    file_success(res, file, fileList) {
      if (res.code === 1) {
        this.file_disabled = false;
        this.$Message.success('上传成功');
        this.upload_modal = false;
        this.file_list = [];
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 文件上传失败监听
    file_error(error, file, fileList) {
      console.log(error);
      this.$Message.error('文件上传失败，请重新上传');
      // this.$Spin.hide();
    },
    // 文件格式不正确
    handleFormatError(file) {
      // this.$Message.error('请选择PDF格式文件');
    },
    // 文件大小限制
    handleMaxSize(file) {
      this.$Message.error('图片大小不能超过5M');
    },
    // 移除文件
    handleRemoveFile() {
      this.file_list = [];
      this.file_disabled = false;
    },
    // 上传文件的取消按钮
    cancel() {
      this.upload_modal = false;
      this.file_disabled = false;
      this.file_list = [];
    },
    // 文件提交
    async credit_pdf_data() {
      console.log(this.file_list);
      if (this.file_list.length === 0) {
        this.$Message.error('暂无文件，请上传文件再提交');
        return;
      }
      this.show_file_list = false;
      this.$refs.upload.post(this.file_list[0]);
      this.file_list = [];
    },
    //申请时间监听
    changeApplyTime(val) {
      this.formItem.applyTimeLt = val[0];
      this.formItem.applyTimeBt = val[1];
    },
    //审核时间监听
    changeApprovalTime(val) {
      this.formItem.approvalTimeLt = val[0];
      this.formItem.approvalTimeBt = val[1];
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    // 获取表格数据
    async arb_operateRecord() {
      const res = await arb_operateRecord({
        caseNo: this.shenheObj.caseNo,
        pageNum: this.case_detail_remark_list_pageNo,
        pageSize: this.case_detail_remark_list_pageSize
      });
      if (res.code === 1) {
        this.case_detail_remark_list_tableData = res.data && res.data.content;
        this.case_detail_remark_list_pageSize = res.data.size;
        this.case_detail_remark_list_total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 查看详情
    async arb_detail(obj, type) {
      this.del()
      const res = await arb_detail({
        approvalId: obj.approvalId
      });
      if (res.code === 1) {
        this.shenheObj = obj;
        if (type === 'edit') {
          this.showModalType = 'edit';
        } else {
          this.case_detail_remark_list_pageNo = 1;
          this.arb_operateRecord();
        }
        this.arb_detail_data = res.data;
        this.arbitrament_modal = true;
      } else {
        this.shenheObj = {};
        this.$Message.error(res.message);
      }
    },
    rejectFunc() {
      this.arbitrament_modal = false;
      this.reject_modal = true;
    },
    arb_checkTest() {
      this.$refs.recoverFormItem.validate((valid) => {
        if (valid) {
          this.arb_check('03');
        }
      });
    },
    // 审核
    async arb_check(type) {
      let approvalRemark = '';
      if (type === '03') {
        this.reject_loading = true;
        approvalRemark = this.recoverFormItem.approvalRemark;
      } else if (type === '02') {
        this.audit_loading = true;
        approvalRemark = "仲裁审核通过"
      }
      const res = await arb_check({
        approvalRemark,
        approvalState: type,
        approvalId: this.shenheObj.approvalId,
        caseNo: this.shenheObj.caseNo,
        billNo: this.shenheObj.billNo
      });
      this.audit_loading = false;
      this.reject_loading = false;
      if (res.code === 1) {
        this.arbitrament_modal = false;
        this.reject_modal = false;
        this.$Message.success('操作成功！');
        this.recoverFormItem = {};
        setTimeout(() => {
          this.getList();
        }, 2000);
      } else {
        this.$Message.error(res.message);
      }
    },
    handleSubmit1() {
      this.$refs.formItem.validate((valid) => {
        if (valid) {
        } else {
          this.arbitrament_modal = true;
        }
      });
    },
    del() {
      this.reject_modal = false;
      this.shenheObj = {};
      this.arbitrament_modal = false;
      this.showModalType = '';
    },
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    // 页码改变的回调
    changePage_remark(pageNo) {
      this.case_detail_remark_list_pageNo = pageNo;
      this.arb_operateRecord();
    },
    // 切换每页条数时的回调
    changeSize_remark(pageSize) {
      this.case_detail_remark_list_pageSize = pageSize;
      this.case_detail_remark_list_pageNo = 1;
      this.arb_operateRecord();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.applyTime) {
            this.applyTime = [
              this.formItem.applyTimeLt,
              this.formItem.applyTimeBt
            ]
          };
          if (this.approvalTime) {
            this.approvalTime = [
              this.formItem.approvalTimeLt,
              this.formItem.approvalTimeBt
            ]
          }
          window.sessionStorage.setItem('arbitrament_approve_form', JSON.stringify(this.formItem))
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      };
      this.query_loading = true;
      // delete this.formItem.approvalTimeLt;
      // delete this.formItem.applyTimeLt;
      const res = await arb_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.export_list = [];
        this.pageNo = res.data.number;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {
        productTypes: []
      };
      this.applyTime = [];
      this.approvalTime = [];
      window.sessionStorage.removeItem('arbitrament_approve_form');
      this.$refs[name].resetFields();
    }
  }
};
