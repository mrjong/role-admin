import { buffet_list } from '@/service/getData';
import organizationForm from './components/organization_form_page';
import invalidEmployees from './components/invalid_employees_page';
import componeyForm from './components/componey_form_page';
import departmentForm from './components/department_form_page';
import staffForm from './components/staff_form_page';
import addRole from './components/add_staff_page';
import addOrganization from './components/add_organization_page';
import {  collect_parent_children, collect_tree_children } from '@/service/getData';
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
      query: false,//查询权限
      add_org: false,//添加组织权限
      view_invalid_user: false,//查看无效员工权限
      update: false,//修改权限
      add_user: false,//添加人员权限
      status_update: false,//状态变更权限
      reset_pwd: false,//重置密码权限
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
      dataContact: [],
      data5: [
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
    // this.getList('#', '01');
    // 按钮权限初始化
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== '03') {
        return;
      }
      switch (item.url) {
        case "query": this.query = true;
          break;
        case "add_org": this.add_org = true;
          break;
        case "view_invalid_user": this.view_invalid_user = true;
          break;
        case "update": this.update = true;
          break;
        case "add_user": this.add_user = true;
          break;
        case "status_update": this.status_update = true;
          break;
        case "reset_pwd": this.reset_pwd = true;
          break;
      }
    });
    this.collect_tree_children();
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
            this.setModalType(data.leafType, data);
          }
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.leafType === '04' ? 'md-person' : 'md-home',
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
              data.leafType !== '04' && data.leafType !== '03' && this.add_org?
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
                }, this.getOrganization(data.leafType)) : null,
              data.leafType !== '04' && this.add_user ? h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  // icon: 'ios-plus-empty'
                }),
                style: {
                  // marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                },
                on: {
                  click: (e) => {
                    e.stopPropagation();
                    this.nodeData = data;
                    this.addRole(data)
                  }
                }
              }, '添加人员') :null
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
      this.parentData = {
        type: data.leafType,
        nodeData: data,
      };
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
    // 展开折叠tree回调
    expandNode(node) {
      console.log(node)
    },
    // 控制右侧几个卡片的显隐
    setModalType(type, data) {
      console.log(13123213);
      this.modalType = type;
      this.parentData = {
        type: type,
        nodeData: data,
        update: this.update,
        status_update: this.status_update,
        reset_pwd: this.reset_pwd
      };
      this.organizationModal = false;
      this.roleModal = false;
    },
    // 获取表格数据
    async getList(id, type) {
      const res = await collect_parent_children({ parentId: id, status: '1', leafType: type });
      console.log()
      if (res.code === 1) {
        this.data5 = res.data;
        // this.data5.forEach(item => {
        //   item.loading = false;
        //   item.children = [];
        // });
      } else {
        this.$Message.error(res.message)
      }
    },
    // 动态获取表格数据
    async collect_parent_children(id, type, callBack) {
      const res = await collect_parent_children({ parentId: id, status: '1', leafType: type });
      if (res.code === 1) {
        this.dataContact = res.data;
        callBack(this.dataContact);
        // return res.data;
      } else {
        this.$Message.error(res.message)
      }
    },
    async collect_parent_children2(id, type, callBack) {
      const res = await collect_parent_children({ parentId: id, status: '1', leafType: type });
      if (res.code === 1) {
        this.dataContact = this.dataContact.concat(res.data);
        callBack(this.dataContact);
        // return res.data;
      } else {
        this.$Message.error(res.message)
      }
    },
    // tree数据一步到位
    async collect_tree_children() {
      if (!this.query) {
        this.data5 = [];
        return;
      }
      const res = await collect_tree_children({status: 1});
      if (res.code === 1) {
        console.log(res);
        // this.data5 = res.data;
        res.data.forEach(item => {
          item.expand = true;
          item.children.forEach(item2 => {
            item2.expand = true;
          })
        });
        this.data5 = res.data;
        console.log(this.data5);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 异步加载tree数据
    loadData(item, callBack) {
      console.log(item, '----------------------')
      // this.nodeData = item;
      let leafType;
      if (item.leafType === '01') {
        leafType = '02';
      } else if (item.leafType === '02') {
        leafType = '03';
      } else if (item.leafType === '03') {
        leafType = '04';
      } else {
        return;
      };
      this.collect_parent_children(item.id, leafType, callBack);
      setTimeout(() => {
        this.collect_parent_children2(item.id, '04', callBack);
      },0)
    },
  }
};
