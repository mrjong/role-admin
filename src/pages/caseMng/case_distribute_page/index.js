import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { cases_allot_list, getLeafTypeList, collect_parent_children, cases_batch_allot, cases_batch_recycle, cases_collect_recover, cases_collect_stop, collect_show_children } from '@/service/getData';

export default {
  name: 'case_distribute_page',
  mixins: [formValidateFun, sysDictionary],
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
    return {
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS', 'PROD_NUM'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      distributeFlag: false,
      distributeRoleFlag: false,
      recycleFlag: false,
      stopCollectionFlag: false,
      recoverCollectionFlag: false,
      getLeafTypeList2_data: [],
      getLeafTypeList_data: [],
      data5: [],
      collectRoleIds: [],
      caseIds: [],
      caseID: '',
      treeFlag: '',
      caseMounts: 0,
      totalCase: '',
      totalOverdueAmt: '',
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
        opCompayNames: [],
      },
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
          width: 150,
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
                        this.handeldBtnClick('4');
                        this.caseID = params.row.id;
                      } else {
                        this.handeldBtnClick('3');
                        this.caseID = params.row.id;
                      }
                    }
                  }
                },
                caseHandleStatus === 'SUSPEND' ? '恢复催收' : '停催'
              ),
            ]);
          }
        },
        {
          title: '案件编码',
          width: 150,
          searchOperator: '=',
          key: 'id',
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
        },
        {
          title: '逾期金额',
          searchOperator: 'like',
          width: 150,
          key: 'overdueAmt',
          align: 'center',
        },
        {
          title: '逾期天数',
          searchOperator: 'like',
          width: 150,
          key: 'overdueDays',
          align: 'center',
        },
        {
          title: '到期期数',
          searchOperator: 'like',
          width: 150,
          key: 'maxPerdCnt',
          align: 'center',
        },
        {
          title: '信用级别',
          searchOperator: 'like',
          width: 150,
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
              ? this.$options.filters['formatDate'](row.allotDate, 'YYYY-MM-DD hh:mm:ss')
              : row.allotDate;
            return h('span', allotDate);
          }
        },
        {
          title: '电催公司',
          searchOperator: 'like',
          width: 180,
          key: 'opCompayName',
          align: 'center',
        },
        {
          title: '经办人',
          searchOperator: 'like',
          width: 150,
          key: 'opUserName',
          align: 'center',
        },
        {
          title: '案件状态',
          searchOperator: 'like',
          width: 150,
          key: 'caseHandleStatusName',
          align: 'center',
        },
      ]
    };
  },
  created() {
    this.getList();
    this.getLeafTypeList()
    this.getLeafTypeList2()
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
                type: data.leafType === '04' ? 'person' : 'home',
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
        }
      });
    },
    // table勾选回调
    changeSelect(selection) {
      console.log('---------');
      this.caseIds = [];
      selection.forEach((element) => {
        this.caseIds.push(element.id);
      });
      this.caseMounts = this.caseIds.length;
      console.log(this.caseIds);
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getList();
        } else {
          this.$Message.error('查询条件格式有误，请重新填写');
        }
      });
    },
    // 下拉框监听
    selectChange (value) {
      this.getList();
    },
    // 日期变更回调
    dateChange(arr, date) {
      console.log(arr, date);
      this.formItem.beginDueDate = arr[0];
      this.formItem.endDueDate = arr[1];
    },
    // 点击出现tree
    selectTreeNode(type) {
      console.log(12313);
      if (type === 0) {
        this.collect_show_children();
      } else {
        this.initTree();
      }
      this.treeFlag = type;
    },
    // 获取表格数据
    async getList() {
      const res = await cases_allot_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
      });
      if (res.code === 1) {
        console.log(res);
        this.tableData = res.data.page.content;
        this.totalCase = res.data.summary.totalCount;
        this.totalOverdueAmt = res.data.summary.totalOverdueAmt;
        this.caseMounts = res.data.summary.totalCount;
        this.pageNo = res.data.page.number;
        this.total = res.data.page.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    },
    async getLeafTypeList() {
      const res = await getLeafTypeList({
        leafType: '04'
      });
      if (res.code === 1) {
        this.getLeafTypeList_data = res.data
      } else {
        this.$Message.error(res.message);
      }
    },
    async getLeafTypeList2() {
      const res = await getLeafTypeList({
        leafType: '02'
      });
      if (res.code === 1) {
        this.getLeafTypeList2_data = res.data
      } else {
        this.$Message.error(res.message);
      }
    },
    // 获取init tree数据
    async initTree(id, type) {
      const res = await collect_show_children({
        status: 1,
        ids: []
      });
      if (res.code === 1) {
        this.data = res.data;
        this.data.forEach(item => {
          item.disableCheckbox = true;
          item.children.forEach(ele => {
            if (ele.leafType !== '02') {
              item.children = [];
            }
            ele.children = [];
          })
        })
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
        this.data5 = res.data;
      } else {
      }
    },
    // 动态获取表格数据
    async collect_parent_children(id, type, callBack) {
      const res = await collect_parent_children({ parentId: id, status: '1', leafType: type });
      if (res.code === 1) {
        res.data.forEach(item => {
          if (item.leafType != '04') {
            item.disableCheckbox = true;
          }
        });
        callBack(res.data)
      } else {
        this.$Message.error(res.message)
      }
    },
    // 异步加载tree数据
    loadData(item, callBack) {
      console.log(item, '----------------------')
      this.nodeData = item;
      let leafType;
      if (item.leafType === '01') {
        leafType = '02';
      } else if (item.leafType === '02') {
        leafType = '03';
      } else if (item.leafType === '03') {
        leafType = '04';
      } else {
        return;
      };
      this.collect_parent_children(item.id, leafType, callBack);
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {
        prodTypes: [],
        periodCounts: [],
        maxPerdCnts: [],
        creditLevels: [],
        opCompayNames: [],
      };
      this.$refs[name].resetFields();
    },
    // 批量分配接口
    async cases_batch_allot() {
      const res = await cases_batch_allot({
        ...this.formItem,
        collectRoleIds: this.collectRoleIds,
        caseIds: this.caseIds,
      });
      if (res.code === 1) {
        this.$Message.success('分配成功');
        this.distributeRoleFlag = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 批量回收接口
    async cases_batch_recycle() {
      const res = await cases_batch_recycle({
        caseIds: this.caseIds,
        ...this.formItem,
        preTotalCases: this.total,
      });
      if (res.code === 1) {
        this.$Message.success('回收成功');
        this.recycleFlag = false;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 案件停止催收接口
    async cases_collect_stop(id) {
      const res = await cases_collect_stop({
        caseIds: id,
        ...this.stopFormItem
      });
      if (res.code === 1) {
        this.getList();
        this.stopCollectionFlag = false;
        this.stopFormItem.operRemark = '';
        this.$Message.success('操作成功');
      } else {
        this.$Message.error(res.message);
      }
    },
    // 案件恢复催收接口
    async cases_collect_recover(id) {
      const res = await cases_collect_recover({
        caseIds: id,
        ...this.recoverFormItem
      });
      if (res.code === 1) {
        this.getList();
        this.recoverCollectionFlag = false;
        this.recoverFormItem.operRemark = '';
        this.$Message.success('操作成功');
      } else {
        this.$Message.error(res.message);
      }
    },
    // 根据类型判断提交
    handeldBtnClick(type) {
      switch (type) {
        case '1':
          this.distributeFlag = true;
          break;
        case '2':
          console.log(this.formItem.caseHandleStatus);
          if (this.formItem.caseHandleStatus && this.formItem.caseHandleStatus != '') {
            this.recycleFlag = true;
          } else {
            this.$Message.error('请选择案件处理状态再回收')
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
          break;
        case '3': this.recycleFlag = false;
          break;
        case '4': this.stopCollectionFlag = false;
          break;
        case '5': this.recoverCollectionFlag = false;
          break;
      }
    },
    // modal确定回调
    ok(type) {
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
          this.cases_collect_stop(this.caseID);
          break;
        case '5':
          this.cases_collect_recover(this.caseID);
          break;
      }
    }
  }
};
