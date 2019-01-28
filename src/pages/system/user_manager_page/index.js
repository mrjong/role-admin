import { buffet_list } from '@/service/getData';
import organizationForm from './components/organization_form_page';
import invalidEmployees from './components/invalid_employees_page';
import componeyForm from './components/componey_form_page';
import departmentForm from './components/department_form_page';
import staffForm from './components/staff_form_page';
import addRole from './components/add_staff_page';
import addOrganization from './components/add_organization_page';
import { collect_user_list, collect_user_leader_add, collect_user_clerk_add, collect_parent_children } from '@/service/getData';
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
      parentId: '',
      leafType: '',
      nodeId: '',
      nodeData: {},
      parentData: {},
      data5: [
        {
          title: '大机构',
          expand: true,
          loading: false,
          children: []
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
    // this.getList();
    this.getList('#', '01');
  },
  methods: {
    // 判断添加的机构类别
    getOrganization(type) {
      if (type === '01') {
        return '添加公司'
      }
      if (type === '02') {
        return '添加部门'
      }
      if (type === '00') {
        return '添加机构'
      }
      if (type === '04' || type == null) {
        return null;
      }
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        },
        on: {
          'click': () => {
            console.log(data);
            this.nodeData = data;
            this.nodeId = data.nodeKey;
            this.parentId = data.uuid;
            this.leafType = data.leafType;
            this.setModalType(data.leafType);
          }
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
              style: {
                cursor: 'pointer'
              },

            }, data.name)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '20px'
            }
          }, [
              data.leafType === '04' || data.leafType === '03' ? null :
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    // icon: 'ios-plus-empty'
                  }),
                  style: {
                    marginRight: data.leafType === '04' || data.leafType === '03' ? 0 : '4px'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      this.nodeData = data;
                      this.addOrganization(data);
                    }
                  }
                }, this.getOrganization(data.leafType)),
              data.leafType === '04' ? null :
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    // icon: 'ios-plus-empty'
                  }),
                  style: {
                    // marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      this.addRole(data)
                    }
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
      this.modalType = '';
      this.roleModal = true;
      this.roleType = data.leafType;
      this.organizationModal = false;
    },
    // 新增机构
    addOrganization(data) {
      console.log(data.leafType)
      this.modalType = '';
      this.organizationModal = true;
      this.parentData = {
        type: data.leafType,
        nodeData: this.nodeData,
      };
      this.organizationType = data.leafType;
      this.roleModal = false;
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
    },
    // 控制右侧几个卡片的显隐
    setModalType(type) {
      console.log(13123213);
      this.modalType = type;
      this.parentData = {
        type: type,
        nodeData: this.nodeData,
      };
      this.organizationModal = false;
      this.roleModal = false;
    },
    // 获取表格数据
    async getList(id, type) {
      const res = await collect_parent_children({parentId: id, status: '1', leafType: type});
      console.log()
      if (res.code === 1) {
        this.data5 = res.data;
        this.data5.forEach(item => {
          item.loading = false;
          item.children = [];
        });
      } else {
        this.$Message.error(res.message)
      }
    },
    // 动态获取表格数据
    async collect_parent_children(id,type) {
      const res = await collect_parent_children({parentId: id, status: '1', leafType: type});
      if (res.code === 1) {
        this.data5 = res.data;
        return this.data5;
      } else {
        this.$Message.error(res.message)
      }
    },
    // 异步加载tree数据
    loadData(item, callBack) {
      console.log('异步')
      callBack(this.collect_parent_children(this.parentId, this.leafType))
    }
  }
};
