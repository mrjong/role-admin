
import { divide_rules_list, divide_rules_changeStatus, divide_rules_order, divide_rules_his, divide_allot_ready_case } from '@/service/getData';
import AddDispose from './addDispose'
import UpdateDispose from './updateDispose'
import Safeguard from './safeguard'
export default {
  name: 'case_rule_page',
  components: {
    UpdateDispose,
    Safeguard,
    AddDispose
  },
  data() {
    return {
      showAddDispose: false,
      showUpdateDispose: false,
      showSafeguard: false,
      query: false,//查询权限
      update: false,//修改权限
      query_loading: false,//查询按钮loading
      executeFlag: false,
      query_execute: false,
      execute: false,
      disposed: false,
      accept_case: false,
      updateData: {},
      formItem: {
        prodTypeList: [],
        ruleType: '02',
        status: ''
      },
      ruleValidate: {
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [
      ],
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
          title: '适用逾期天数',
          width: 200,
          searchOperator: '=',
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
          title: '适用分案日期',
          width: 200,
          searchOperator: '=',
          key: 'effectMinDt',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const effectMinDt = params.row.effectMinDt ?
              this.$options.filters['tableDate'](params.row.effectMinDt) : null
            return h('span', effectMinDt);
          }
        },
        {
          title: '预设案件量时间',
          width: 200,
          searchOperator: '=',
          key: 'collectDateSta',
          align: 'center',
        },
        {
          title: '接案截至时间',
          width: 200,
          searchOperator: '=',
          key: 'collectDateEnd',
          align: 'center',
        },
        {
          title: '余案分配方式',
          width: 200,
          searchOperator: '=',
          key: 'remainAllotType',
          align: 'center',
        },
        {
          title: '创建人',
          width: 150,
          searchOperator: '=',
          key: 'createUser',
          align: 'center',
        },
        {
          title: '状态',
          width: 150,
          searchOperator: '=',
          key: 'execStatusName',
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
                      if (!this.query_execute) {
                        this.$Message.error('很抱歉，暂无权限查看');
                        return;
                      }
                      this.updateData = JSON.parse(JSON.stringify(params.row))
                      this.updateData.disabled= true
                      this.showUpdateDispose = true
                    }
                  }
                },
                '查看率值'
              ),
              h(
                'a',
                {
                  class: 'edit-btn',
                  style: {
                    display: params.row.execStatus === '01' ? 'inline-block' : 'none'
                  },
                  props: {},
                  on: {
                    click: () => {
                      if (!this.update) {
                        this.$Message.error('很抱歉，暂无权限变更状态');
                        return;
                      }
                      this.showUpdateDispose = true
                      this.updateData = JSON.parse(JSON.stringify(params.row))
                      this.updateData.disabled = false
                      console.log(this.updateData)
                    }
                  }
                },
                '修改'
              ),
              h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      if (!this.execute) {
                        this.$Message.error('很抱歉，暂无权限执行');
                        return;
                      }
                      this.divideAllotReadyCase(JSON.parse(JSON.stringify(params.row)).id)
                    }
                  }
                }
                ,[h('a',
                {
                  class: 'edit-btn',
                  style: {
                    // display: params.row.execStatus === '01' ? 'inline-block' : 'none'
                  },
                },
                '执行'
              )])
            ]);
          }
        },

      ]
    }
  },
  created() {
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query_d3": this.query = true;
          break;
        case "execute": this.execute = true;
          break;
        case "update_d3": this.update = true;
          break;
        case "query_execute": this.query_execute = true;
          break;
        case "disposed": this.disposed = true;
          break;
        case "accept_case": this.accept_case = true;
          break;
      }
    });
    // this.getList()
  },
  methods: {
    // 添加案件或者修改案件入口
    handeldBtnClick(type) {
      this.showAddDispose= true
    },

    handleSubmit() {
      this.getList()
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
    handleBtnCaseCount() {
      this.showSafeguard = true
    },
    // 选择日期回调
    dateChange(val) {
      this.formItem.effectMinDt = this.$options.filters['formatDate'](val , 'YYYYMMDD')
    },
    // 关闭modal
    cancel(type) {
      this.recycleFlag = false;
    },
    // modal提交
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error('很抱歉，暂无权限查询');
        return;
      }
      this.query_loading = true;
      this.formItem.ruleType= '02'
      const res = await divide_rules_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
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
    passBack(val) {
      this.showSafeguard = false
      this.showAddDispose = false
      this.showUpdateDispose = false
      if(val==='change'){
        this.getList()
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

    async divideAllotReadyCase(id) {
      this.executeFlag = true
      if(!this.executeFlag){
        const res = await divide_allot_ready_case({id: id});
        this.executeFlag = false
        if (res.code === 1) {
          this.getList();
        } else {
          this.$Message.error(res.message);
        }
      }
    }
  },
}
