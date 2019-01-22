export default {
  data() {
    return {
      showPanel: false,
      showPanel2: false,
      detailFlag: false,
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
      menuFormItem: {
        text: '',
        icon: '',
        url: '',
        sort: '',
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
                type: '',
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
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  // icon: 'ios-plus-empty'
                  type: 'primary'
                }),
                style: {
                  // marginRight: data.type === '4' || data.type === '3' ? 0 : '4px'
                },
                on: {
                  click: () => { this.addRole(data) }
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
                  click: () => { }
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
          this.$Message.success("ok");
        } else {
          this.$Message.error("查询条件格式有误，请重新填写");
        }
      });
    },
  },
}
