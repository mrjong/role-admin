import { stytem_menu_list, stytem_menu_update, stytem_menu_add, system_menu_del } from '@/service/getData';
import IconList from '@/components/iconList';
export default {
  components: {
    IconList
  },
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      detailFlag: false,
      showIconFlag: false,
      iconType: '',
      modal: '',
      itemName: '',
      data: {},
      data5: [],
      buttonProps: {
        type: 'primary',
        size: 'small'
      },
      ruleValidate1: {
        text: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: '请输入位置',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入url',
            trigger: 'blur'
          }
        ]
      },
      ruleValidate2: {
        text: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: '请输入位置',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入url',
            trigger: 'blur'
          }
        ]
      },
      menuFormItem: {
        parent: '',
        text: '',
        icon: '',
        url: ''
      },
      menuAddFormItem: {
        text: '',
        icon: '',
        url: '',
        parent: ''
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node);
    },
    renderContent(h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '94%',
            boxSizing: 'border-box'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: data.icon
              },
              style: {
                marginRight: '4px'
              }
            }),
            h(
              'span',
              {
                props: {},
                style: {
                  cursor: 'pointer'
                },
                class: 'tree_title',
                on: {
                  click: (e) => {
                    let titleSpan = document.querySelectorAll('.tree_title');
                    titleSpan.forEach((item) => {
                      item.className = 'tree_title';
                    });
                    if (e.target.className.indexOf('ivu-tree-title-selected') === -1) {
                      e.target.className = 'tree_title ivu-tree-title-selected';
                    }
                    this.modal = '1';
                    this.menuFormItem = {
                      parent: data.parent,
                      id: data.id,
                      text: data.text,
                      icon: data.icon,
                      url: data.url,
                      sort: String(data.sort)
                    };
                  }
                }
              },
              data.text
            )
          ]),
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '20px'
              }
            },
            [
              h(
                'Button',
                {
                  props: Object.assign({}, this.buttonProps, {
                    // icon: 'ios-plus-empty'
                    type: 'primary'
                  }),
                  style: {
                    // marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                  },
                  on: {
                    click: () => {
                      this.addItem(data);
                    }
                  }
                },
                '添加'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.system_menu_del(data.id);
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: Object.assign({}, this.buttonProps, {
                        // icon: 'ios-plus-empty'
                        type: 'error'
                      }),
                      style: {
                        marginLeft: '4px'
                      },

                    },
                    '删除'
                  )
                ]
              )
            ]
          )
        ]
      );
    },
    showIconList(type) {
      this.iconType = type;
      this.showIconFlag = true;
    },
    // iconlist子组件回调
    passBack(icon) {
      console.log(icon);
      if (this.iconType === 0) {
        this.menuAddFormItem.icon = icon;
      } else {
        this.menuFormItem.icon = icon;
      }
      this.showIconFlag = false;
    },
    selectIcon(type) {
      if (type === 1) {
        if (this.iconType === 0) {
          this.menuAddFormItem.icon = '';
        } else {
          this.menuFormItem.icon = '';
        }
      }
      this.showIconFlag = false;
    },
    // 提交保存修改
    handleSubmit(name, type) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (type === 1) {
            this.menuUpdate(this.menuFormItem);
          } else {
            this.menuAddFormItem.parent = this.data.id;
            this.menuAdd(this.menuAddFormItem);
          }
        }
      });
    },

    // 添加菜单项
    addItem(data) {
      this.menuAddFormItem = {
        text: '',
        icon: '',
        url: '',
        parent: ''
      };
      this.modal = '0';
      this.data = data;
    },
    cancel() {
      this.modal = '';
    },
    // 获取表格数据
    async getList(params) {
      const res = await stytem_menu_list({ state: '01' });
      console.log(res);
      if (res.code) {
        this.data5 = res.data;
        this.data5[0].expand = true;
        console.log(this.data5);
      } else {
        this.$Message.error(res.message);
      }
    },
    // 修改菜单项
    async menuUpdate(params) {
      const res = await stytem_menu_update(params);
      if (res.code === 1) {
        this.$Message.success('更新成功');
        this.modal = '';
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 新增菜单项
    async menuAdd(params) {
      const res = await stytem_menu_add(params);
      if (res.code === 1) {
        this.$Message.success('添加成功');
        this.modal = '';
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 删除菜单项
    async system_menu_del(id) {
      const res = await system_menu_del({ id: id });
      if (res.code === 1) {
        this.$Message.success('删除成功');
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
