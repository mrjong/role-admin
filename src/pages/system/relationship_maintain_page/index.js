import { buffet_list } from '@/service/getData';
import Addform from './components/add_role_page'
import Reviseform from './components/revise_role_page'
export default {
  name: 'demo_list',
  components: {
    Addform,
    Reviseform,
  },
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      modal: false,
      modal2: false,
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

      modal12: false,
      inputGrid: '',
      modal11: false,
      formValidate2: {},
      ruleValidate: {
        buffet_id: [
          {
            required: true,
            message: '请输入网格编号',
            trigger: 'blur'
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formValidate3: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      },
      formItem: {},
      tableData: [
        {
          recording_id: 1,
          operate: '操作'
        }
      ],
      tableColumns: [
        {
          title: '序号',
          width: 80,
          searchOperator: '=',
          sortable: true,
          key: 'recording_id',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '坐席编号',
          width: 100,
          searchOperator: '=',
          key: 'uuid',
          align: 'center'
        },
        // {
        //   title: '餐柜添加时间',
        //   key: 'addtime',
        //   sortable: true,
        //   width: 160,
        //   render: (h, params) => {
        //     const row = params.row;
        //     const addtime = row.addtime
        //       ? this.$options.filters['formatDate'](new Date(row.addtime * 1000), 'yyyy-MM-dd hh:mm:ss')
        //       : row.addtime;
        //     return h('span', addtime);
        //   }
        // },
        {
          title: '登录账号',
          searchOperator: 'like',
          key: 'loginId',
          sortable: true,
          align: 'center'
        },
        {
          title: '员工姓名',
          searchOperator: 'like',
          key: 'empno',
          sortable: true,
          align: 'center'
        },
        {
          title: '接听方式',
          searchOperator: 'like',
          key: 'extenType',
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
          key: 'status',
          align: 'center'
        },
        {
          title: '创建时间',
          searchOperator: '=',
          key: 'createTime',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '修改时间',
          searchOperator: '=',
          key: 'updateTime',
          ellipsis: true,
          align: 'center'
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
                    this.deleteGoods(params.row.recording_id);
                  }
                }
              },
                [
                  h('a', {
                    class: 'del-btn',
                    props: {}
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
                      this.modal2 = true;
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
    handleAdd(form) {
      this.modal = true;
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
    // 获取表格数据
    async getList() {
      const res = await buffet_list({
        searchParam: this.formItem && JSON.stringify(this.formItem) !== '{}' && this.getParam(),
        page: this.pageNo,
        perPage: this.pageSize,
        config: {
          hideMessage: true
        }
      });
      if (res.data && res.data.data) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageNo = res.data.current_page;
      } else {
        this.tableData = [];
        this.total = 0;
        this.pageNo = 1;
      }
    },
    // 重置
    clearForm(name) {
      this.pageNo = 1;
      this.formItem = {};
      this.$refs[name].resetFields();
    }
  }
};
