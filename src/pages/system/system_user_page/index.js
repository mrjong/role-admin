import { buffet_list } from '@/service/getData';
import Remodal from './components/user_info_form';
export default {
  components: {
    Remodal
  },
  name: 'demo_list',
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      modal: false,
      parentData: {},
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
      modal12: false,
      inputGrid: '',
      modal11: false,
      formValidate2: {},
      ruleValidate: {
        name: [
          {
            required: true,
            message: '请输入姓名',
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
          name: "啦啦",
          account_number: "123",
          status: "1",
          role: "0",
          email: "123123@qq.com",
          mobile: "123456"
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
          title: '登录账号',
          searchOperator: '=',
          key: 'loginName',
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
          title: '用户名称',
          searchOperator: 'like',
          key: 'name',
          sortable: true,
          align: 'center'
        },
        {
          title: '系统角色名称',
          searchOperator: 'like',
          key: 'uapLoginName',
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
        // {
        //   title: '催收角色名称',
        //   searchOperator: '=',
        //   key: 'collection_role',
        //   align: 'center'
        // },
        // {
        //   title: '呼叫开始时间',
        //   searchOperator: '=',
        //   key: 'call_begin_time',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '状态',
          searchOperator: '=',
          key: 'state',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '手机号',
          searchOperator: '=',
          key: 'mobile',
          align: 'center'
        },
        {
          title: '邮箱',
          searchOperator: '=',
          key: 'email',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '创建时间',
          searchOperator: '=',
          key: 'createtime',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '最后操作时间',
          searchOperator: '=',
          key: 'operate_time',
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
              h(
                'a', {
                  class: 'look-btn',
                  props: {},
                  on: {
                    click: () => {

                    }
                  }
                }, '查看'),
              h('a', {
                class: 'edit-btn',
                props: {},
                on: {
                  click: () => {

                  }
                }
              }, '修改')
            ]);
          }
        },
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getChildrenStatus () {
      this.modal = true;
      this.parentData = {
        modal: this.modal,
        tableData: this.tableData
      }
    },
    // 添加列表新数据按钮
    handleAdd (form) {
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
    getParam() {
      let searchParam = [];

      if (!(this.formItem.addtime && this.formItem.addtime[0]) || !this.formItem.addtime[1]) {
        delete this.formItem.addtime;
      } else {
        let startTime = this.formItem.addtime[0].getTime() / 1000;
        let endTime = this.formItem.addtime[1].getTime() / 1000;
        let addtime = [
          {
            searchValue: startTime,
            searchColumn: 'addtime',
            searchOperator: '>'
          },
          {
            searchValue: endTime,
            searchColumn: 'addtime',
            searchOperator: '<='
          }
        ];
        if (this.formItem && JSON.stringify(addtime) !== '[]') {
          for (let i = 0; i < addtime.length; i++) {
            searchParam.push(addtime[i]);
          }
        }
      }
      console.log(searchParam);
      for (let i = 0; i < this.tableColumns.length; i++) {
        for (const key in this.formItem) {
          if (
            this.formItem[key] &&
            this.tableColumns[i].searchOperator &&
            key === this.tableColumns[i].key &&
            key !== 'addtime'
          ) {
            let item = {};
            item.searchValue = this.formItem[key];
            item.searchColumn = this.tableColumns[i].key;
            item.searchOperator = this.tableColumns[i].searchOperator;
            searchParam.push(item);
          }
        }
      }
      return searchParam;
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
      const searchParam = [];
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
