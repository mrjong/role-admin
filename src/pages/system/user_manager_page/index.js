import { buffet_list } from '@/service/getData';
import organizationForm from './components/organization_form_page';
import invalidEmployees from './components/invalid_employees_page';
import componeyForm from './components/componey_form_page';
import departmentForm from './components/department_form_page';
import staffForm from './components/staff_form_page';
import addRole from './components/add_staff_page';
import addOrganization from './components/add_organization_page';
export default {
  components: {
    organizationForm,
    invalidEmployees,
    componeyForm,
    departmentForm,
    staffForm,
    addRole,
    addOrganization,
  },
  name: 'demo_list',
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      showPanel3: false,
      modal1: false,
      roleModal: false,
      roleType: '',
      organizationModal: false,
      organizationType: '',
      modalType: '',
      formDisabled: '',
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
                    click: () => { this.addOrganization(data) }
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
                    click: () => { this.addRole(data) }
                  }
                }, '添加人员'),
            ])
        ]);
    },
    addRole(data) {
      // const children = data.children || [];
      // children.push({
      //   title: 'appended node',
      //   expand: true
      // });
      // this.$set(data, 'children', children);
      this.roleModal = true;
      this.roleType = data.type;
    },
    // 新增机构
    addOrganization(data) {
      this.organizationModal = true;
      this.organizationType = data.type;
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
    },
    // 控制右侧几个卡片的显隐
    setModalType(type) {
      this.modalType = type;
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
  }
};
