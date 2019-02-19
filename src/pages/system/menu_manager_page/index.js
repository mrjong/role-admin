import { stytem_menu_list, stytem_menu_update, stytem_menu_add } from '@/service/getData';
import IconList from '@/components/iconList'
export default {
  components: {
    IconList,
  },
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      detailFlag: false,
      showIconFlag: false,
      modal: '',
      itemName: '',
      data: {},
      data5: [],
      buttonProps: {
        type: 'primary',
        size: 'small',
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
        url: [
          {
            required: true,
            message: "请输入url",
            trigger: "blur"
          }
        ],
      },
      ruleValidate2: {
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
        url: [
          {
            required: true,
            message: "请输入url",
            trigger: "blur"
          }
        ],
      },
      menuFormItem: {
        parent: '',
        text: '',
        icon: '',
        url: '',
      },
      menuAddFormItem: {
        text: '',
        icon: '',
        url: '',
        parent: '',
      },
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
                  this.modal = '1';
                  this.menuFormItem = {
                    parent: data.parent,
                    id: data.id,
                    text: data.text,
                    icon: data.icon,
                    url: data.url,
                    sort: String(data.sort),
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
                    this.menuUpdate({ id: data.id, state: '00' });
                  }
                }
              }, '删除'),
            ])
        ]);
    },
    showIconList () {
      this.showIconFlag = true;
    },
    // iconlist子组件回调
    passBack(icon) {
      console.log(icon)
    },
    selectIcon () {

    },
    // 提交保存修改
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.menuFormItem.parent = this.data.parent;
          this.menuUpdate(this.menuFormItem)
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },

    // 添加菜单项
    addItem(data) {
      this.menuAddFormItem = {
        text: '',
        icon: '',
        url: '',
        parent: '',
      },
      this.modal = '0';
      this.data = data;
    },
    ok() {
      // const children = this.data.children || [];
      // children.push({
      //   text: this.itemName,
      //   expand: true
      // });
      // this.$set(this.data, 'children', children);
      this.menuAddFormItem.parent = this.data.id;
      this.menuAdd(this.menuAddFormItem);
    },
    cancel() {
      this.modal = '';
    },
    // 获取表格数据
    async getList(params) {
      const res = await stytem_menu_list({ state: '01' });
      console.log(res)
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
    }
  },
}
