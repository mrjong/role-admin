import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import { case_list } from '@/service/getData';

export default {
  name: 'case_distribute_page',
  mixins: [formValidateFun, sysDictionary],
  data() {
    console.log(this.GLOBAL);

    return {
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      distributeFlag: false,
      distributeRoleFlag: false,
      recycleFlag: false,
      stopCollectionFlag: false,
      recoverCollectionFlag: false,
      data5: [],
      phoneCallList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      productTimeList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      productLineList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
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
            validator: this.validate_yqts_start,
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
            validator: this.validate_yqts_end,
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
            validator: this.validate_yqyhje_start,
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
            validator: this.validate_yqyhje_end,
            trigger: 'blur'
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      billDate: [],
      formItem: {
        caseStatus: '',
        prodTypes: [],
        periodCounts: [],
        userNm: '',
        idNo: '',
        mblNo: '',
        minOverdueDays: '',
        maxOverdueDays: '',
        minOverdueAmt: '',
        maxOverdueAmt: '',
        beginDueDate: '',
        endDueDate: '',
        billNo: '',
        id: '',
        creditLevels: [],
        opCompayName: '',
        opUserName: '',
      },
      tableData: [
        {
          caseNo: '1231312312313123',
          userNm: '二维码',
          idNoHid: '110123199808082229',
          mblNoHid: '188866668888',
          prdTyp: '商户贷',
          billNo: 'BL091837478596599387',
          overdueAmt: '9000'
        },
      ],
      tableColumns: [
        {
          type: 'selection',
          width: 60,
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
        },
        {
          title: '案件编码',
          width: 150,
          searchOperator: '=',
          key: 'caseNo',
          align: 'center',
        },
        {
          title: '客户姓名',
          width: 120,
          searchOperator: '=',
          key: 'userNm',
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
          key: 'prdTyp',
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
              ? this.$options.filters['formatDate'](new Date(row.allotDate * 1000), 'yyyy-MM-dd hh:mm:ss')
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
          key: 'caseStatus',
          align: 'center',
        },
        {
          title: '操作',
          width: 150,
          key: 'edit',
          align: 'center',
          render: (h, params) => {
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
                      this.deleteGoods(params.row.buffet_id);
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
                  ),
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
        }
      ]
    };
  },
  created() {
    this.getList();
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
                type: '',
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
            }, data.text)
          ]),
        ]);
    },
    // 勾选节点的回调函数
    checkChange(arr) {
      console.log(this.arr);
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
    // 日期变更回调
    dateChange(arr,date) {
      console.log(arr, date);
      this.formItem.beginDueDate = arr[0];
      this.formItem.endDueDate = arr[1];
    },
    // 获取表格数据
    async getList() {
      const res = await case_list(JSON.stringify(this.formItem));
      if (res.code === 1) {
        console.log(res);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    },
    // 批量分配弹窗
    handeldBtnClick(type) {
      switch (type) {
        case '1':
          this.distributeFlag = true;
          break;
        case '2': this.recycleFlag = true;
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
        case '2': this.distributeRoleFlag = false;
          break;
        case '3': this.recycleFlag = false;
          break;
        case '4': this.stopCollectionFlag = false;
          break;
        case '5': this.recoverCollectionFlag = false;
          break;
      }
    }
  }
};
