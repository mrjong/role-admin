import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import Cookie from 'js-cookie';
import util from '@/libs/util';
import { cases_allot_list, getLeafTypeList, import_list, cases_batch_allot, cases_batch_recycle, cases_collect_recover, cases_collect_stop, allot_export, collect_show_children, cases_case_sendwebmessage, cases_download_template } from '@/service/getData';
import jianmian from '@/components/caseDesc/jianmian.vue';
import qs from 'qs';

export default {
  name: 'case_distribute_page',
  mixins: [formValidateFun, sysDictionary],
  components: {
    jianmian,
  },
  data() {
    const validate_money_start = (rule, value, callback) => {
      if (value && this.formItem.maxOverdueAmt && Number(value) > Number(this.formItem.maxOverdueAmt)) {
        callback(new Error('逾期应还开始金额不能大于逾期应还结束金额'));
      } else {
        callback();
      }
    };
    const validate_money_end = (rule, value, callback) => {
      if (this.formItem.minOverdueAmt) {
        this.$refs.formItem.validateField('minOverdueAmt');
      }
      callback();
    };
    const validate_day_start = (rule, value, callback) => {
      if (value && this.formItem.maxOverdueDays && Number(value) > Number(this.formItem.maxOverdueDays)) {
        console.log(this.formItem.maxOverdueDays)
        callback(new Error('逾期开始天数不能大于逾期结束天数'));
      } else {
        callback();
      }
    };
    const validate_day_end = (rule, value, callback) => {
      if (this.formItem.minOverdueDays) {
        this.$refs.formItem.validateField('minOverdueDays');
      }
      callback();
    };
    let _this = this;
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      file_url: '/admin/cases/batch/import ',//文件上传地址
      import_data_loading: false,// 导入loading
      query_flag: false, // false 默认查getList  true查询cases_import_list
      file_csaeIds: [],//上传文件返回的案件编号list集合
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS', 'PROD_NUM', 'APP_LOGIN_STATUS'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      distributeFlag: false,//分配flag
      distributeRoleFlag: false,//分配人员flag
      recycleFlag: false,//回收flag
      stopCollectionFlag: false,//停催flag
      recoverCollectionFlag: false, //恢复催收flag
      messageFlag: false,//站内信flag
      breaks_flag: false,// 减免flag
      breaks_data: {}, //减免的数据
      userType: Cookie.get("userType"),//获取人员类型 01 系统 02催收
      queryList: false,//查询权限
      batch_distribute: false,//批量分配权限
      recover: false,//回收权限
      stop_urge: false,//停催权限
      regain_urge: false,//恢复催收权限
      send_message: false,//站内信权限
      case_export: false,//导出权限
      all_opt: false,//案件详情全部操作权限
      plaintext: false,//案件详情查看明文权限
      import_search: false,//导入查询权限
      apply_remission: false, //申请减免权限
      queryLoading: false,//查询按钮loading
      exportLoading: false,//案件导出loading
      recoverLoading: false,//回收按钮loading
      batch_distribute_loading: false,//批量分配分配按钮loading
      stop_urge_loading: false,//停催提交按钮loading
      regain_urge_loading: false,//恢复催收提交按钮loading
      send_message_loading: false,//批量发送站内信按钮loading
      download_import_data: false,// 下载导入查询的loading
      company_list_data: [],//电催中心list
      department_list_data: [],//组别list
      collect_list_data: [],//经办人list
      data5: [],
      data: [],
      collectRoleIds: [],
      allotCaseIds: [],//勾选分配案件集合
      recycleCaseIds: [],//勾选回收案件集合
      caseID: '',//单个案件
      initStopCases: [],//初始停催案件集合
      stopCases: [],//停催案件集合
      stopCaseMounts: 0,//停催案件总数
      treeFlag: '',
      allotCaseMounts: 0,
      recycleCaseMounts: 0,
      totalCase: 0,
      totalOverdueAmt: 0,
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
        minOverdueDays: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: validate_day_start,
            trigger: 'blur'
          }
        ],
        maxOverdueDays: [
          {
            pattern: this.GLOBAL.num,
            message: '逾期天数为正整数',
            trigger: 'blur'
          },
          {
            validator: validate_day_end,
            trigger: 'blur'
          }
        ],
        minOverdueAmt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: validate_money_start,
            trigger: 'blur'
          }
        ],
        maxOverdueAmt: [
          {
            pattern: this.GLOBAL.money,
            message: '金额格式不正确',
            trigger: 'blur'
          },
          {
            validator: validate_money_end,
            trigger: 'blur'
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      billDate: [],
      formItem: {
        prodTypes: [],
        periodCounts: [],
        maxPerdCnts: [],
        creditLevels: [],
        opCompayUuid: '',
      },
      messageFormItem: {},
      ruleValidate1: {
        operRemark: [
          {
            required: true,
            message: '请输入停催原因',
            trigger: 'blur'
          }
        ],
      },
      ruleValidate2: {
        operRemark: [
          {
            required: true,
            message: '请输入停催原因',
            trigger: 'blur'
          }
        ],
      },
      ruleValidate3: {
        msgTitle: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          },
        ],
        msgContent: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          },
        ],
      },
      stopFormItem: {
        operRemark: ''
      },
      recoverFormItem: {
        operRemark: ''
      },
      tableData: [],
      tableColumns: [
        {
          type: 'selection',
          width: 40,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '序号',
          width: 80,
          searchOperator: '=',
          sortable: true,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '操作',
          width: 120,
          key: 'edit',
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            const caseHandleStatus = params.row.caseHandleStatus;
            return h('div', [
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      if (caseHandleStatus === 'SUSPEND') {
                        if (!this.regain_urge) {
                          this.$Message.error('暂无恢复催收权限');
                          return;
                        }
                        this.handeldBtnClick('4');
                        this.caseID = params.row.id;
                      } else {
                        if (!this.stop_urge) {
                          this.$Message.error('暂无停催权限');
                          return;
                        }
                        this.handeldBtnClick('3');
                        this.caseID = params.row.id;
                      }
                    }
                  }
                },
                caseHandleStatus === 'SUSPEND' ? '恢复催收' : '停催'
              ),
              this.apply_remission?h('a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.breaks_data = {
                        caseNo: params.row.id,
                        billNo: params.row.billNo,
                      };
                      this.breaks_flag = true;
                    }
                  }
                },'减免'
              ): null
            ]);
          }
        },
        {
          title: '案件编号',
          width: 180,
          searchOperator: '=',
          key: 'id',
          align: 'center',
          fixed: 'left',
          render(h, params) {
            const id = params.row.id;
            const prdTyp = params.row.prdTyp;
            const userId = params.row.userId;
            const eyeFlag = params.row.eyeFlag;
            return h('div', [
              h(
                'Tooltip',
                {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    content: '查看详情',
                    placement: 'top'
                  }
                },
                [
                  h('Icon', {
                    props: {
                      type: 'ios-ionitron-outline',
                      size: '16'
                    },
                    style: {
                      'vertical-align': 'top',
                      'margin-right': '5px',
                      color: '#EF0D33',
                      display: eyeFlag? 'inline-block': 'none'
                    }
                  }),
                  h(
                    'a',
                    {
                      class: 'edit-desc',
                      on: {
                        click: () => {
                          window.open(
                            `${location.origin}/#/case_desc_page?caseNotest=${window.btoa(id)}&prdTyptest=${prdTyp}&readType=read&userIdtest=${userId}&pageNum=${_this.pageNo}&pageSize=${_this.pageSize}&${qs.stringify(
                              _this.formItem
                            )}`
                          );
                        }
                      }
                    },
                    params.row.id
                  )
                ]
              )
            ]);
          }
        },
        {
          title: '案件状态',
          searchOperator: 'like',
          width: 100,
          key: 'caseHandleStatusName',
          align: 'center',
        },
        {
          title: '客户姓名',
          width: 120,
          searchOperator: '=',
          key: 'userNmHid',
          align: 'center',
        },
        {
          title: '身份证号',
          width: 200,
          searchOperator: 'like',
          key: 'idNoHid',
          align: 'center',
        },
        {
          title: '身份证归属地',
          width: 160,
          align: 'center',
          key: 'idAddr',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '手机号',
          searchOperator: 'like',
          width: 150,
          key: 'mblNoHid',
          align: 'center',
        },
        {
          title: '产品线',
          searchOperator: 'like',
          width: 100,
          align: 'center',
          key: 'prdName',
        },
        {
          title: '账单号',
          searchOperator: 'like',
          width: 200,
          key: 'billNo',
          align: 'center',
          render(h, params) {
            return h('div', [
              h('Tooltip',
                {
                  style: {
                    margin: '0 5px'
                  },
                  props: {
                    content: params.row.billNo,
                    placement: 'top'
                  }
                },
                [
                  h('span', {
                  }, params.row.billNo)
                ]
              )
            ])
          }
        },
        {
          title: '逾期金额',
          searchOperator: 'like',
          width: 120,
          key: 'overdueAmt',
          align: 'center',
        },
        {
          title: '逾期天数',
          searchOperator: 'like',
          width: 100,
          key: 'overdueDays',
          align: 'center',
        },
        {
          title: '到期期数',
          searchOperator: 'like',
          width: 100,
          key: 'maxPerdCnt',
          align: 'center',
        },
        {
          title: '产品期数',
          searchOperator: 'like',
          width: 100,
          key: 'perdCnt',
          align: 'center',
        },
        {
          title: '应还款日期',
          key: 'dueDate',
          width: 150,
          sortable: true,
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const dueDate = row.dueDate
              ? this.$options.filters['formatDate'](row.dueDate, 'YYYY-MM-DD')
              : row.dueDate;
            return h('span', dueDate);
          }
        },
        {
          title: '信用级别',
          searchOperator: 'like',
          width: 120,
          key: 'creditLevel',
          align: 'center',
        },
        {
          title: '分配时间',
          key: 'allotDate',
          width: 200,
          sortable: true,
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const allotDate = row.allotDate
              ? this.$options.filters['formatDate'](row.allotDate, 'YYYY-MM-DD HH:mm:ss')
              : row.allotDate;
            return h('span', allotDate);
          }
        },
        {
          title: '电催公司',
          searchOperator: 'like',
          width: 150,
          key: 'opCompayName',
          align: 'center',
        },
        {
          title: '组别',
          width: 120,
          align: 'center',
          key: 'opOrganizationName'
        },
        {
          title: '经办人',
          searchOperator: 'like',
          width: 150,
          key: 'opUserName',
          align: 'center',
        },
      ]
    };
  },
  created() {
    //获取缓存的表单值
    let case_distribute_form = window.sessionStorage.getItem('case_distribute_form');
    if (case_distribute_form) {
      this.formItem = JSON.parse(case_distribute_form);
    }
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.queryList = true;
          break;
        case "one_distribute": this.one_distribute = true;
          break;
        case "batch_distribute": this.batch_distribute = true;
          break;
        case "recover": this.recover = true;
          break;
        case "stop_urge": this.stop_urge = true;
          break;
        case "regain_urge": this.regain_urge = true;
          break;
        case "send_message": this.send_message = true;
          break;
        case "plaintext": this.plaintext = true;
          break;
        case "export": this.case_export = true;
          break;
        case "import_search": this.import_search = true;
          break;
        case "apply_remission": this.apply_remission = true;
          break;
      }
    });
    Cookie.set('all_opt', this.all_opt);
    Cookie.set('plaintext', this.plaintext);
    Cookie.set('apply_arbitrament', false);
    Cookie.set('apply_deduct', false);
    Cookie.set('apply_remission', false);
    // this.getList();
    this.getLeafTypeList('02', '');
    this.getLeafTypeList('03', '');
    this.getLeafTypeList('04', '');
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '94%',
          boxSizing: 'border-box',
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.leafType === '04' ? 'md-person' : 'md-home',
              },
              style: {
                marginRight: '4px'
              }
            }),
            h('span', {
              props: {
              },
              style: {
                cursor: 'pointer'
              },
              class: 'tree_title',
              on: {
                'click': (e) => {

                }
              }
            }, data.name)
          ]),
        ]);
    },
    // 勾选节点的回调函数
    checkChange(arr) {
      console.log(arr);
      this.collectRoleIds = [];
      arr.forEach(item => {
        if (item.leafType === '04' && this.treeFlag === 0) {
          this.collectRoleIds.push(item.id);
        };
        if (item.leafType === '02' && this.treeFlag === 1) {
          this.collectRoleIds.push(item.id);
        };
      });
    },
    // table勾选回调
    changeSelect(selection) {
      console.log('---------', selection);
      this.allotCaseIds = [];
      this.recycleCaseIds = [];
      this.stopCases = [];
      selection.forEach((element) => {
        this.recycleCaseIds.push(element.id);
        if (element.caseHandleStatus === 'SUSPEND') {
          this.stopCases.push(element);
        } else {
          this.allotCaseIds.push(element.id);
        }
      });
      // 计算可分配的数，停催的数
      if (this.allotCaseIds.length > 0) {
        this.allotCaseMounts = this.allotCaseIds.length;
      } else if (this.stopCases.length > 0 && this.allotCaseIds.length === 0) {
        this.allotCaseMounts = 0;
      } else if (this.allotCaseIds.length === 0 && this.stopCases.length === 0) {
        this.allotCaseMounts = this.totalCase - this.stopCaseMounts;
      };
      //计算可回收的数
      if (this.recycleCaseIds.length > 0) {
        this.recycleCaseMounts = this.recycleCaseIds.length;
      } else {
        this.recycleCaseMounts = this.totalCase;
      }
      console.log(this.allotCaseIds);
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
    },
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      if (this.query_flag) {
        let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize)
        this.cases_import_list(caseIds);
        caseIds = null;
      } else {
        this.getList();
      }
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      if (this.query_flag) {
        let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize)
        this.cases_import_list(caseIds);
        caseIds = null;
      } else {
        this.getList();
      }
    },
    // 电催中心change
    companyChange(value) {
      this.getLeafTypeList('03', value);
      this.getLeafTypeList('04', value);
    },
    // 部门change
    departmentChange(value) {
      this.getLeafTypeList('04', value);
    },
    handleSubmit(name) {
      this.query_flag = false;
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.date) {
            this.formItem.date = [
              this.formItem.beginDueDate,
              this.formItem.endDueDate
            ]
          }
          window.sessionStorage.setItem('case_distribute_form', JSON.stringify(this.formItem));
          this.pageNo = 1;
          this.getList();
        } else {
          this.$Message.error('查询条件格式有误，请重新填写');
        }
      });
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
        // this.file_csaeIds = res.data;
        this.totalOverdueAmt = res.data.totalOverDuoAmt;// 总金额
        this.totalCase = res.data.caseNoList.length;
        this.stopCaseMounts = res.data.stopCollectCount;
        this.recycleCaseMounts = res.data.caseNoList.length;//回收案件总数
        this.total = res.data.caseNoList.length;//数据总数
        this.allotCaseIds = [];
        this.recycleCaseIds = [];
        this.initStopCases = [];//初始化案件停催集合
        this.allotCaseMounts = this.totalCase - this.stopCaseMounts;//可分配案件总数
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
    // 下拉框监听
    selectChange(value) {
      this.pageNo = 1;
      this.getList();
    },
    // 日期变更回调
    dateChange(arr) {
      console.log(arr);
      this.formItem.beginDueDate = arr[0];
      this.formItem.endDueDate = arr[1];
    },
    // 点击出现tree
    selectTreeNode(type) {
      this.treeFlag = type;
      if (type === 0) {
        this.collect_show_children();
      } else {
        this.initTree();
      }
    },
    // 减免的子组件回调
    passBackBreaks(obj) {
      console.log(obj)
      this.breaks_flag = obj.flag;
      if (obj.status === 'ok') {
        this.$Message.success('申请成功');
      }
    },
    // 获取表格数据
    async getList() {
      if (!this.queryList) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      }
      this.queryLoading = true;
      const res = await cases_allot_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
      });
      this.queryLoading = false;
      if (res.code === 1) {
        this.tableData = res.data.page.content;
        this.totalCase = res.data.summary.totalCount;//案件总数
        if (res.data.summary.stopCollectCount) {
          this.stopCaseMounts = res.data.summary.stopCollectCount;//停催总数
        } else {
          this.stopCaseMounts = 0;
        }
        this.recycleCaseMounts = res.data.summary.totalCount;//回收案件总数
        this.totalOverdueAmt = res.data.summary.totalOverdueAmt;//总金额
        this.pageNo = res.data.page.number;
        this.total = res.data.page.totalElements;//数据总数
        this.allotCaseIds = [];
        this.recycleCaseIds = [];
        this.initStopCases = [];//初始化案件停催集合
        this.allotCaseMounts = this.totalCase - this.stopCaseMounts;//可分配案件总数
      } else {
        this.$Message.error(res.message);
      }
    },
    // 根据导入条件进行查询
    async cases_import_list(caseIds) {
      this.query_flag = true;
      const res = await import_list('/cases/allot', {
        caseIds: caseIds,
      });
      console.log(res);
      if (res.code === 1) {
        this.tableData = res.data;
        this.total = this.file_csaeIds.length;
        this.recycleCaseMounts = this.file_csaeIds.length;
        this.allotCaseIds = [];
        this.recycleCaseIds = [];
        this.initStopCases = [];//初始化案件停催集合
        this.allotCaseMounts = this.totalCase - this.stopCaseMounts;//可分配案件总数
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取init tree数据
    async initTree(id, type) {
      const res = await collect_show_children({
        status: 1,
        ids: [],
      });
      if (res.code === 1) {
        if (res.data.userType === '01') {
          // 系统人员
          res.data.collectRoleTreeVos.forEach(item => {
            item.disableCheckbox = true;
            item.expand = true;
            item.children.forEach((item2, index) => {
              if (item2.leafType === '02') {
                item2.children = [];
              };
            })
          })
        } else {
          // 催收人员
          res.data.collectRoleTreeVos.forEach(item => {
            item.expand = true;
            item.children.forEach((item2, index) => {
              // if (item2.leafType === '02') {
              // };
              item2.disableCheckbox = true;
              item2.children.forEach((item3, index) => {
                item3.disableCheckbox = true;
              })
            })
          })
        }
        this.data = res.data.collectRoleTreeVos;
        console.log(this.data)
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取人员列表
    async collect_show_children() {
      const res = await collect_show_children({
        status: 1,
        ids: []
      });
      console.log(res);
      if (res.code === 1) {
        res.data.collectRoleTreeVos.forEach(item => {
          item.expand = true;
          item.children.forEach(item2 => {
            item2.expand = true;
            item2.children.forEach(item3 => {
              item3.expand = true;
            })
          })
        })
        this.data5 = res.data.collectRoleTreeVos;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 查询机构，公司，部门
    async getLeafTypeList(type, parent) {
      const res = await getLeafTypeList({
        // status: "1",
        leafType: type,
        parentId: parent || ""
      });
      if (res.code === 1) {
        switch (type) {
          case "02":
            this.company_list_data = res.data;
            break;
          case "03":
            this.department_list_data = res.data;
            break;
          case "04":
            this.collect_list_data = res.data;
            break;
        }
      } else {
        this.$Message.error(res.message);
      }
    },
    // 下载导入查询模板
    async download_import() {
      this.download_import_data = true;
      const res = await cases_download_template(
        {},
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      this.download_import_data = false;
      util.dowloadfile('导入查询模板', res);
    },
    // 案件导出
    async allot_export() {
      if (this.tableData.length === 0) {
        this.$Message.error('当前无数据，无法导出');
        return;
      }
      this.exportLoading = true;
      const res = await allot_export(
        {
          ...this.formItem,
          caseIds: this.recycleCaseIds.length < 1 && this.query_flag ? this.file_csaeIds : this.recycleCaseIds,
          preTotalCases: this.recycleCaseMounts,
          caseStatus: '0',
          importQuery: this.query_flag ? 1 : null
        },
        {
          responseType: 'blob',
          timeout: 120000,
        }
      );
      util.dowloadfile('案件分配', res);
      this.exportLoading = false;
      setTimeout(() => {
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.getList();
        }
      }, 1000)
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.date = [];
      this.formItem = {
        prodTypes: [],
        periodCounts: [],
        maxPerdCnts: [],
        creditLevels: [],
        opCompayUuid: '',
      };
      window.sessionStorage.removeItem('case_distribute_form');
      this.$refs[name].resetFields();
    },
    // 批量分配接口
    async cases_batch_allot() {
      this.batch_distribute_loading = true;
      const res = await cases_batch_allot({
        ...this.formItem,
        collectRoleIds: this.collectRoleIds,
        caseIds: this.allotCaseIds.length < 1 && this.query_flag ? this.file_csaeIds : this.allotCaseIds,
        preTotalCases: this.allotCaseMounts,
        importQuery: this.query_flag ? 1 : null
      });
      this.batch_distribute_loading = false;
      if (res.code === 1) {
        this.$Message.success('分配成功');
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.getList();
        }
        this.distributeRoleFlag = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 批量回收接口
    async cases_batch_recycle() {
      this.recoverLoading = true;
      const res = await cases_batch_recycle({
        caseIds: this.recycleCaseIds.length < 1 && this.query_flag ? this.file_csaeIds : this.recycleCaseIds,
        ...this.formItem,
        preTotalCases: this.recycleCaseMounts,
        importQuery: this.query_flag ? 1 : null
      });
      this.recoverLoading = false;
      if (res.code === 1) {
        this.$Message.success('回收成功');
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.getList();
        }
        this.recycleFlag = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 案件停止催收接口
    async cases_collect_stop(id) {
      this.stop_urge_loading = true;
      const res = await cases_collect_stop({
        caseIds: id,
        ...this.stopFormItem
      });
      this.stop_urge_loading = false;
      if (res.code === 1) {
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.getList();
        }
        this.stopCollectionFlag = false;
        this.stopFormItem.operRemark = '';
        this.$Message.success('操作成功');
      } else {
        this.$Message.error(res.message);
      };
    },
    // 案件恢复催收接口
    async cases_collect_recover(id) {
      this.regain_urge_loading = true;
      const res = await cases_collect_recover({
        caseIds: id,
        ...this.recoverFormItem
      });
      this.regain_urge_loading = false;
      if (res.code === 1) {
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.getList();
        }
        this.recoverCollectionFlag = false;
        this.recoverFormItem.operRemark = '';
        this.$Message.success('操作成功');
      } else {
        this.$Message.error(res.message);
      };
    },
    // 站内信发送接口
    async cases_case_sendwebmessage() {
      this.send_message_loading = true;
      const res = await cases_case_sendwebmessage({
        ...this.formItem,
        ...this.messageFormItem,
        caseIds: this.recycleCaseIds.length < 1 && this.query_flag ? this.file_csaeIds : this.recycleCaseIds,
        preTotalCases: this.recycleCaseMounts,
        importQuery: this.query_flag ? 1 : null
      });
      this.send_message_loading = false;
      if (res.code === 1) {
        this.$Message.success('发送成功')
        if (this.query_flag) {
          let caseIds = util.slice_case_number(this.file_csaeIds, (this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize);
          this.cases_import_list(caseIds);
          caseIds = null;
        } else {
          this.getList();
        }
        this.messageFlag = false;
        this.messageFormItem = {};
      } else {
        this.$Message.error(res.message);
      }
    },
    // 根据类型判断提交
    handeldBtnClick(type) {
      switch (type) {
        case '1':
          // this.distributeFlag = true;
          if (this.allotCaseMounts > 0) {
            this.distributeFlag = true;
          } else {
            this.$Message.error('选择可分配的案件为0');
          };
          break;
        case '2':
          // this.recycleFlag = true;
          if (this.recycleCaseMounts > 0) {
            this.recycleFlag = true;
          } else {
            this.$Message.error('选择可回收的案件为0')
          };
          break;
        case '3': this.stopCollectionFlag = true;
          break;
        case '4': this.recoverCollectionFlag = true;
          break;
        default:
          break;
      }
    },
    // 关闭modal
    cancel(type) {
      switch (type) {
        case '1': this.distributeFlag = false;
          break;
        case '2': this.distributeRoleFlag = false;
          this.batch_distribute_loading = false;
          break;
        case '3': this.recycleFlag = false;
          this.recoverLoading = false;
          break;
        case '4': this.stopCollectionFlag = false;
          this.stop_urge_loading = false;
          break;
        case '5': this.recoverCollectionFlag = false;
          this.regain_urge_loading = false;
          break;
        case '6': this.messageFlag = false;
          this.send_message_loading = false;
          this.messageFormItem = {};
          break;
      }
    },
    // modal确定回调
    ok(type, name) {
      switch (type) {
        case '1': this.distributeFlag = false;
          this.distributeRoleFlag = true;
          break;
        case '2':
          this.cases_batch_allot();
          break;
        case '3':
          this.cases_batch_recycle();
          break;
        case '4':
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.cases_collect_stop(this.caseID);
            }
          });
          break;
        case '5':
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.cases_collect_recover(this.caseID);
            }
          });
          break;
        case '6':
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.cases_case_sendwebmessage();
            }
          });
          break;
      }
    }
  }
};
