import formValidateFun from '@/mixin/formValidateFun';
import sysDictionary from '@/mixin/sysDictionary';
import caseUpdateRecord from './components/case_update_record';
import { divide_rules_list, divide_rules_changeStatus, divide_rules_order, divide_rules_his } from '@/service/getData';
export default {
  name: 'case_rule_page',
  mixins: [formValidateFun, sysDictionary],
  components: {
    caseUpdateRecord,
  },
  data() {
    return {
      getDirList: ['PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      recycleFlag: false,
      stopFlag: false,
      updateRecordFlag: false,
      startFormItem: {
        date: '',
        effectMinDt: '',
        effectMaxDt: '',
        id: '',
        status: '',
      },
      formItem: {
        prodTypeList: '',
        status: ''
      },
      ruleValidate: {
      },
      ruleValidate1: {
        date: [
          {
            required: true,
            message: "请选择有效时间",
            type: 'array'
          }
        ],
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          searchOperator: '=',
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '产品线',
          width: 80,
          searchOperator: '=',
          key: 'prdName',
          align: 'center',
        },
        {
          title: '期数',
          width: 100,
          searchOperator: '=',
          key: 'perdCounts',
          align: 'center',
        },
        {
          title: '到期期数',
          width: 100,
          searchOperator: '=',
          key: 'perdThisCounts',
          align: 'center',
        },
        {
          title: '逾期天数',
          width: 100,
          searchOperator: '=',
          key: 'ovdudaysMin',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                params.row.ovdudaysMin + '-'
              ),
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                '-' + params.row.ovdudaysMax
              ),
            ]);
          }
        },
        {
          title: '逾期金额',
          width: 100,
          searchOperator: '=',
          key: 'ovduamtMin',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                params.row.ovduamtMin + '-'
              ),
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                '-' + params.row.ovduamtMax
              ),
            ]);
          }
        },
        {
          title: '引用分',
          width: 100,
          searchOperator: '=',
          key: 'creditLevel',
          align: 'center',
        },
        {
          title: '分配方式',
          width: 100,
          searchOperator: '=',
          key: 'allotType',
          align: 'center',
        },
        {
          title: '分配人数',
          width: 100,
          searchOperator: '=',
          key: 'allotCounts',
          align: 'center',
        },
        {
          title: '设定时间',
          width: 180,
          searchOperator: '=',
          key: 'effectMinDt',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                params.row.effectMinDt ? this.$options.filters['tableDate'](params.row.effectMinDt) : null
              ),
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                '至'
              ),
              h(
                'span',
                {
                  class: 'edit-btn',
                  props: {},
                  style: {
                    borderRight: 'none',
                    padding: '0px'
                  }
                },
                params.row.effectMaxDt ? this.$options.filters['tableDate'](params.row.effectMaxDt) : null
              ),
            ]);
          }
        },
        {
          title: '状态',
          width: 100,
          searchOperator: '=',
          key: 'status',
          align: 'center',
        },
        {
          title: '创建人',
          width: 100,
          searchOperator: '=',
          key: 'createUser',
          align: 'center',
        },
        {
          title: '创建时间',
          width: 150,
          searchOperator: '=',
          key: 'createTime',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const createTime = row.createTime
              ? this.$options.filters['formatDate'](row.createTime , 'YYYY-MM-DD hh:mm:ss')
              : row.createTime;
            return h('span', createTime);
          }
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
                      window.sessionStorage.setItem('case_rule_item', JSON.stringify(params.row));
                      this.$router.push({ name: 'case_update_distribute_page' });
                    }
                  }
                },
                '修改'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      if (params.row.status === '02') {
                        this.recycleFlag = true;
                        this.startFormItem.id = params.row.id;
                      } else {
                        this.stopFlag = true;
                        this.startFormItem.id = params.row.id;
                      }
                    }
                  }
                },
                params.row.status === '02' ? '启用' : '停用'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.updateRecordFlag = true;
                    }
                  }
                },
                '查看'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.divide_rules_order({id: params.row.id, orderType: 'up'});
                    }
                  }
                },
                '上移'
              ),
            ]);
          }
        },

      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 添加案件或者修改案件入口
    handeldBtnClick(type) {
      this.$router.push({ name: 'case_add_distribute_page' });
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
    // 一键分配的方法
    handleBtnDistribute() {
      console.log(this.$router.history);
      this.$router.push({ path: '/caseMng/case_key_distribute_page' });
    },
    // 选择日期回调
    dateChange(arr) {
      console.log(arr);
      this.startFormItem.effectMinDt = arr[0];
      this.startFormItem.effectMaxDt = arr[1];
    },
    // 关闭modal
    cancel(type) {
      this.recycleFlag = false;
    },
    // modal提交
    ok(type, name) {
      if (type === '1') {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.startFormItem.status = '01';
            this.divide_rules_changeStatus(this.startFormItem);
          } else {
            this.$Message.error('查询条件格式有误，请重新填写');
          }
        });
      } else {
        this.startFormItem.status = '02';
        this.divide_rules_changeStatus(this.startFormItem);
      };
    },
    // 获取表格数据
    async getList() {
      const res = await divide_rules_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      console.log(res);
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.pageNo = res.data.number;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 案件启用，停用接口
    async divide_rules_changeStatus(params) {
      const res = await divide_rules_changeStatus(params);
      console.log(res);
      if (res.code === 200) {
        this.recycleFlag = false;
        this.stopFlag = false;
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 分案规则顺序
    async divide_rules_order(params) {
      const res = await divide_rules_order(params);
      console.log(res);
      if (res.code === 200) {
        this.getList();
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
  },
}
