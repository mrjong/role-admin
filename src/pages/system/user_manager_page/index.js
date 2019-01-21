import { buffet_list } from '@/service/getData';
export default {
  name: 'demo_list',
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      showPanel3: false,
      modal1: false,
      status: '0',
      acount: '123123',
      modalType: '',
      data5: [
        {
          title: '大机构',
          expand: true,
          type: '1',
          children: [
            {
              title: '催收公司',
              expand: true,
              type: '2',
              children: [
                {
                  title: '催收人员',
                  expand: true,
                  type: '4',

                },
                {
                  title: '催收部门',
                  expand: true,
                  type: '3',

                }
              ]
            },
            {
              title: '催收公司',
              type: '2',
              expand: true,
              children: [
                {
                  title: '催收人员',
                  expand: true,
                  type: '4',
                },
                {
                  title: '催收人员',
                  expand: true,
                  type: '4',
                }
              ]
            },
            {
              title: '催收人员',
              type: '4',
              expand: true,
            }
          ]
        }
      ],
      buttonProps: {
        type: 'primary',
        size: 'small',
      },
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
      ],
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
      formItem: {},
      organizationFormItem: {
name: '',
person: '',
createUser: '',
      },
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
          title: '账号',
          width: 100,
          searchOperator: '=',
          key: 'loginCount',
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
          width: 120,
          key: 'userName',
          sortable: true,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '公司名称',
          width: 150,
          searchOperator: 'like',
          key: 'relation',
          align: 'center',
          ellipsis: true,
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
          title: '部门',
          searchOperator: '=',
          key: 'department',
          align: 'center',
          width: 120
        },
        {
          title: '角色',
          searchOperator: '=',
          key: 'role',
          align: 'center',
          ellipsis: true,
          width: 120,
        },
        {
          title: '创建时间',
          searchOperator: '=',
          key: 'createTime',
          ellipsis: true,
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          width: 100,
          key: 'edit',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('a',
                {
                  class: 'edit-btn',
                  props: {},
                  on: {
                    click: () => {
                      this.modal1 = true;
                    }
                  }
                }, '状态')
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
    // 判断添加的机构类别
    getOrganization(type) {
      if (type === '1') {
        return '添加公司'
      }
      if (type === '2') {
        return '添加部门'
      }
      if (type === '0') {
        return '添加机构'
      }
      if (type === '4') {
        return null;
      }
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.type === '4' ? 'person' : 'home',
              },
              style: {
                marginRight: '4px'
              }
            }),
            h('span', {
              style: {
                cursor: 'pointer'
              },
              on: {
                'click': () => {
                  console.log(data);
                  this.setModalType(data.type);
                }
              }
            }, data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '20px'
            }
          }, [
              data.type === '4' || data.type === '3' ? null :
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    // icon: 'ios-plus-empty'
                  }),
                  style: {
                    marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                }, this.getOrganization(data.type)),
              data.type === '4' ? null :
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    // icon: 'ios-plus-empty'
                  }),
                  style: {
                    // marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                }, '添加人员'),
            ])
        ]);
    },
    // 新增结构
    addOrganization() {

    },
    append(data) {
      const children = data.children || [];
      children.push({
        title: 'appended node',
        expand: true
      });
      this.$set(data, 'children', children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.modal1 = false;
    },
    cancel() {
      this.modal1 = false;
    },
    // 控制右侧几个卡片的显隐
    setModalType(type) {
      this.modalType = type;
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
        console.log();
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
      console.log(this.getParam());
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
