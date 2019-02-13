import { sysDictionary_list, sysDictionary_save, sysDictionary_delete, sysDictionary_update } from '@/service/getData';
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
        itemName: '',
        itemCode: '',
        itemDesc: '',
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
      console.log(data )

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
              type: 'ios-paper-outline',
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
                  itemName: data.itemName,
                  itemCode: data.itemCode,
                  itemDesc: data.itemDesc,
                  sort: data.sort,
                  id: data.id,
                }
              }
            }
          }, data.itemName)
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
                this.deleteItem({id: data.id});
              }
            }
          }, '删除'),
        ])
      ]);
    },
    // 提交保存修改
    handleSubmit(name) {
      this.menuUpdate(this.menuFormItem)
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      //     // this.getList();
      //     // this.$Message.success("ok");
      //     this.menuUpdate(this.menuFormItem)
      //   } else {
      //     this.$Message.error("查询条件格式有误，请重新填写");
      //   }
      // });
    },
    // 删除菜单项
    deleteItem(param){
      this.menuDelete(param)
    },
    // 添加菜单项
    addItem(data) {
      this.modal = true;
      this.data = data;
    },
    ok() {
     //校验代码表单校验
      this.newMenuItem.parent = this.data.id;
      this.menuAdd(this.newMenuItem)
      //this.modal = false;
    },
    cancel() {
      this.modal = false;
    },
    // 获取表格数据
    async getList(params) {
      const res = await sysDictionary_list();
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
      const res = await sysDictionary_update(params);
      if (res.code === 1) {
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 新增菜单项
    async menuAdd(params) {
      let parm = {
        parentId:this.data.id,
        itemName: '122', //节点名称
        itemCode:'122',
        itemDesc:'123',
        depth: 1,
        sort: 1
      }
      const res = await sysDictionary_save(parm);
      if (res.code === 1) {
        this.$Message.success('添加成功');
        this.modal = false;
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 删除菜单项
    async menuDelete(params){
      const res = await sysDictionary_delete(params);
      if(res && res.code === 1){
        this.$Message.success('删除成功');
        this.getList();
      } else{
        this.$Message.error(res.message);
      }
    }
  },
}
