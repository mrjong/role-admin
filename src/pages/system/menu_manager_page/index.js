import { stytem_menu_list, stytem_menu_update, stytem_menu_add } from '@/service/getData';
export default {
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      detailFlag: false,
      modal: false,
      itemName: '',
      data: {},
      data5: [],
      buttonProps: {
        type: 'primary',
        size: 'small',
      },
      menuFormItem: {
        text: '',
        icon: '',
        url: '',
        sort: '',
      },
      newMenuItem: {
        text: '',
        parent: '',
      },
      ruleValidate1: {
        text: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: "请输入位置",
            trigger: "blur"
          }
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node)
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '94%',
          boxSizing: 'border-box',
        }
      }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.icon,
              },
              style: {
                marginRight: '4px'
              }
            }),
            h('span', {
              props: {
              },
              style: {
                cursor: 'pointer'
              },
              class: 'tree_title',
              on: {
                'click': (e) => {
                  let titleSpan = document.querySelectorAll('.tree_title');
                  titleSpan.forEach(item => {
                    item.className = 'tree_title';
                  });
                  if (e.target.className.indexOf('ivu-tree-title-selected') === -1) {
                    e.target.className = 'tree_title ivu-tree-title-selected';
                  };
                  this.detailFlag = true;
                  this.menuFormItem = {
                    id: data.id,
                    text: data.text,
                    icon: data.icon,
                    url: data.url,
                    sort: data.sort,
                  }
                }
              }
            }, data.text)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '20px'
            }
          }, [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  // icon: 'ios-plus-empty'
                  type: 'primary'
                }),
                style: {
                  // marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                },
                on: {
                  click: () => { this.addItem(data) }
                }
              }, '添加'),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  // icon: 'ios-plus-empty'
                  type: 'error'
                }),
                style: {
                  marginLeft: '4px'
                },
                on: {
                  click: () => {
                    this.menuUpdate({id: data.id, state: '00'});
                  }
                }
              }, '删除'),
            ])
        ]);
    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.getList();
          // this.$Message.success("ok");
          this.menuUpdate(this.menuFormItem)
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },

    // 添加菜单项
    addItem(data) {
      this.modal = true;
      this.data = data;
    },
    ok() {
      // const children = this.data.children || [];
      // children.push({
      //   text: this.itemName,
      //   expand: true
      // });
      // this.$set(this.data, 'children', children);
      this.newMenuItem.parent = this.data.id;
      this.menuAdd(this.newMenuItem)
      this.modal = false;
    },
    cancel() {
      this.modal = false;
    },
    // 获取表格数据
    async getList(params) {
      const res = await stytem_menu_list({state: '01'});
      console.log(res)
      if (res.code) {
        this.data5 = res.data;
        this.data5[0].expand = true;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 修改菜单项
    async menuUpdate(params) {
      const res = await stytem_menu_update(params);
      if (res.code === 1) {
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
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    }
  },
}
