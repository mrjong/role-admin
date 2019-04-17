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
      getDirList: ['DIVIDE_PROD_TYPE', 'PROD_CNT', 'CREDIT_LEVEL', 'CASE_HANDLE_STATUS', '01_02_EFFECT_INVAL'],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      recycleFlag: false,
      stopFlag: false,
      updateRecordFlag: false,
      query: false,//查询权限
      add_rule: false,//添加权限
      update: false,//修改权限
      status_change: false,//状态变更权限
      move_up: false,//上移权限
      view_change_his: false,//查看修改记录权限
      one_distribute: false,//一键分配权限
      one_distribute_loading: false,//一键分配按钮loading
      query_loading: false,//查询按钮loading
      parentData: {},
      startFormItem: {
        date: '',
        effectMinDt: '',
        effectMaxDt: '',
        id: '',
        status: '',
      },
      formItem: {
        prodTypeList: [],
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
          key: 'prodTypeName',
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
              params.row.ovdudaysMin? h(
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
              ) : null,
              params.row.ovdudaysMax? h(
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
              ): null,
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
              params.row.ovduamtMin? h(
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
              ): null,
              params.row.ovduamtMax? h(
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
              ): null,
            ]);
          }
        },
        {
          title: '信用分',
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
          title: '分配人数/机构',
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
              (params.row.effectMinDt || params.row.effectMaxD)? h(
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
              ): null,
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
          title: '规则状态',
          width: 100,
          searchOperator: '=',
          key: 'statusName',
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
              ? this.$options.filters['formatDate'](row.createTime , 'YYYY-MM-DD HH:mm:ss')
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
                      if (!this.update) {
                        this.$Message.error('很抱歉，暂无权限修改');
                        return;
                      }
                      window.sessionStorage.setItem('case_rule_item', JSON.stringify(params.row));
                      window.sessionStorage.removeItem('collectRate');
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
                      if (!this.status_change) {
                        this.$Message.error('很抱歉，暂无权限变更状态');
                        return;
                      }
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
                      if (!this.view_change_his) {
                        this.$Message.error('很抱歉，暂无权限查看记录');
                        return;
                      }
                      this.updateRecordFlag = true;
                      this.parentData = {
                        updateRecordFlag: true,
                        id: params.row.id
                      }
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
                      if (!this.move_up) {
                        this.$Message.error('很抱歉，暂无权限');
                        return;
                      }
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
    //获取缓存的表单值
    let case_rule_form = window.sessionStorage.getItem('case_rule_form');
    if (case_rule_form) {
      this.formItem = JSON.parse(case_rule_form);
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
        case "one_distribute": this.one_distribute = true;
          break;
        case "add": this.add_rule = true;
          break;
        case "update": this.update = true;
          break;
        case "status_change": this.status_change = true;
          break;
        case "move_up": this.move_up = true;
          break;
        case "view_change_his": this.view_change_his = true;
          break;
      }
    });
    // this.getList()
  },
  methods: {
    // 添加案件或者修改案件入口
    handeldBtnClick(type) {
      window.sessionStorage.removeItem('case_rule_item');
      window.sessionStorage.removeItem('collectRate');
      this.$router.push({ name: 'case_add_distribute_page' });
    },
    handleSubmit(name) {
      window.sessionStorage.setItem('case_rule_form', JSON.stringify(this.formItem));
      this.pageNo = 1;
      this.getList();
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
      window.sessionStorage.removeItem('collectRate');
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
          }
        });
      } else {
        this.startFormItem.status = '02';
        this.divide_rules_changeStatus(this.startFormItem);
      };
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      }
      this.query_loading = true;
      const res = await divide_rules_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
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
      if (res.code === 1) {
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
      if (res.code === 1) {
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {
        prodTypeList: [],
        status: ''
      };
      window.sessionStorage.removeItem('case_rule_form');
      this.$refs[name].resetFields();
    },
  },
}
