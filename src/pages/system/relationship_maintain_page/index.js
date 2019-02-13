import { call_employee_list, call_employee_del } from '@/service/getData';
import Addform from './components/add_role_page'
import Reviseform from './components/revise_role_page'
export default {
  name: 'relationship_maintain_page',
  components: {
    Addform,
    Reviseform,
  },
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      parentData: {
        modal: false,
        type: null,
      },
      parentData2: {
        modal: false,
        data: {},
        type: null,
      },
      ruleValidate: {
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {
        loginId: '',
        callno: ''
      },
      tableData: [
      ],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          searchOperator: '=',
          sortable: true,
          type: 'index',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '坐席编号',
          width: 150,
          searchOperator: '=',
          key: 'callno',
          align: 'center'
        },
        {
          title: '登录账号',
          searchOperator: 'like',
          key: 'loginId',
          sortable: true,
          align: 'center',
          width: 150,
        },
        {
          title: '员工姓名',
          searchOperator: 'like',
          key: 'userName',
          sortable: true,
          align: 'center',
          width: 120,
        },
        {
          title: '接听方式',
          searchOperator: 'like',
          key: 'extenTypeName',
          align: 'center'
          // render: (h, params) => {
          //   return h('div', [
          //     h(
          //       'Tooltip',
          //       {
          //         style: {
          //           margin: '0 5px'
          //         },
          //         props: {
          //           content: params.row.address,
          //           placement: 'top'
          //         }
          //       },
          //       [h('div', {}, params.row.address)]
          //     )
          //   ]);
          // }
        },
        {
          title: '状态',
          searchOperator: '=',
          key: 'statusName',
          align: 'center'
        },
        {
          title: '创建时间',
          searchOperator: '=',
          key: 'createTime',
          ellipsis: true,
          align: 'center',
          width: 180,
          render: (h, params) => {
            const row = params.row;
            const createTime = row.createTime
              ? this.$options.filters['formatDate'](createTime, 'YYYY-MM-DD HH:mm:ss')
              : row.createTime;
            return h('span', createTime);
          }
        },
        {
          title: '修改时间',
          searchOperator: '=',
          key: 'updateTime',
          ellipsis: true,
          align: 'center',
          width: 180,
          render: (h, params) => {
            const row = params.row;
            const updateTime = row.updateTime
              ? this.$options.filters['formatDate'](updateTime, 'YYYY-MM-DD HH:mm:ss')
              : row.updateTime;
            return h('span', updateTime);
          }
        },
        {
          title: '创建人',
          searchOperator: '=',
          key: 'createUser',
          align: 'center'
        },
        {
          title: '修改人',
          searchOperator: '=',
          key: 'updateUser',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除这条数据吗?',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.call_employee_del(params.row.loginId);
                  }
                }
              },
                [
                  h('a', {
                    class: 'del-btn',
                    props: {},
                  },
                    '删除'
                  )
                ],
              ),
              h('a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    'click': () => {
                      this.parentData2 = {
                        modal: true,
                        data: params.row,
                        type: null,
                      }
                    }
                  }
                }
                , '更改')
            ])
          }
        },
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 添加列表新数据按钮
    handleAdd(type) {
      this.parentData = {
        modal: true,
        type: type,
      };
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
    handleUpdate(name) {
      console.log(name)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    // 获取表格数据
    async getList() {
      const res = await call_employee_list({
        loginId: this.formItem.loginId,
        callno: this.formItem.callno,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
      });
      console.log(res);
      if (res.data && res.data.data) {
        this.tableData = res.data.data;
        this.total = res.data.totalElements;
        // this.pageNo = res.data.number;
      } else {
        this.tableData = [];
        this.total = 0;
        this.pageNo = 1;
      }
    },
    // 删除坐席
    async call_employee_del(id) {
      const res = await call_employee_del({
        loginId: id,
      });
      console.log(res);
      if (res.code === 1) {
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 子组件回调函数
    passBack() {
      console.log(this.parentData);
      if (this.parentData.type === 'ok') {
        this.getList();
      };
    },
    //
    childPassBack() {
      console.log(this.parentData2);
      if (this.parentData2.type === 'ok') {
        this.getList();
      };
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    }
  }
};

