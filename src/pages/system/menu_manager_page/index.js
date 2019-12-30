import {
  system_menu_update,
  system_menu_add,
  system_menu_delete,
  system_menu_findTree,
  system_menu_detail
} from "@/service/getData";
import IconList from "@/components/iconList";
import sysDictionary from "@/mixin/sysDictionary";

export default {
  components: {
    IconList
  },
  mixins: [sysDictionary],
  data() {
    return {
      getDirList: ["MENU_TYPE"],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      detailFlag: false,
      showIconFlag: false,
      query: false, //查询权限
      add: false, //添加权限
      delete: false, //删除权限
      update: false, //修改权限
      queryDetail: false, //查询菜单详情
      query_loading: false, //查询，刷新loading
      add_loading: false, //添加loading
      update_loading: false, //修改loading
      delete_loading: false, //删除loading
      iconType: "",
      modal: "",
      itemName: "",
      data: {},
      data5: [],
      buttonProps: {
        type: "primary",
        size: "small"
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
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ]
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
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ]
      },
      menuFormItem: {
        parent: "",
        text: "",
        icon: "",
        url: ""
      },
      menuAddFormItem: {
        text: "",
        icon: "",
        url: "",
        parent: ""
      }
    };
  },
  created() {
    this.getList();
  },
  watch: {
    $route: {
      handler: function() {
        // 按钮权限初始化
        let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
        buttonPermissionList.forEach(item => {
          console.log(item.url, "9087");
          switch (item.url) {
            case "/findTree":
              if (item.hasPermission) {
                this.query = true;
              }
              break;
            case "/add":
              if (item.hasPermission) {
                this.add = true;
              }
              break;
            case "/delete":
              if (item.hasPermission) {
                this.delete = true;
              }
              break;
            case "/update":
              if (item.hasPermission) {
                this.update = true;
              }
              break;
            case "/queryDetail":
              if (item.hasPermission) {
                this.queryDetail = true;
              }
              break;
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node);
    },
    renderContent(h, { root, node, data }) {
      console.log(this.delete,'delete-btn');
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "94%",
            boxSizing: "border-box"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: data.icon
              },
              style: {
                marginRight: "4px"
              }
            }),
            h(
              "span",
              {
                props: {},
                style: {
                  cursor: "pointer"
                },
                class: "tree_title",
                on: {
                  click: e => {
                    let titleSpan = document.querySelectorAll(".tree_title");
                    titleSpan.forEach(item => {
                      item.className = "tree_title";
                    });
                    if (
                      e.target.className.indexOf("ivu-tree-title-selected") ===
                      -1
                    ) {
                      e.target.className = "tree_title ivu-tree-title-selected";
                    }
                    if (this.queryDetail) {
                      this.menuDetail(data.id);
                    }
                  }
                }
              },
              data.text
            )
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "20px"
              }
            },
            [
              this.add
                ? h(
                    "Button",
                    {
                      props: Object.assign({}, this.buttonProps, {
                        type: "primary"
                      }),
                      on: {
                        click: () => {
                          this.addItem(data);
                        }
                      }
                    },
                    "添加"
                  )
                : null,
              this.delete
                ? h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        title: "您确定要删除这条数据吗?",
                        transfer: true
                      },
                      on: {
                        "on-ok": () => {
                          this.system_menu_delete(data.id);
                        }
                      }
                    },
                    [
                      h(
                        "Button",
                        {
                          props: Object.assign({}, this.buttonProps, {
                            type: "error"
                          }),
                          style: {
                            marginLeft: "4px"
                          }
                        },
                        "删除"
                      )
                    ]
                  )
                : null
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
          this.menuAddFormItem.icon = "";
        } else {
          this.menuFormItem.icon = "";
        }
      }
      this.showIconFlag = false;
    },
    // 提交保存修改
    handleSubmit(name, type) {
      this.$refs[name].validate(valid => {
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
        text: "",
        icon: "",
        url: "",
        parent: ""
      };
      this.modal = "0";
      this.data = data;
    },
    cancel() {
      this.update_loading = false;
      this.delete_loading = false;
      this.add_loading = false;
      this.modal = "";
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.data5 = [];
        return;
      }
      this.query_loading = true;
      const res = await system_menu_findTree();
      this.query_loading = false;
      if (res.code === "0000") {
        this.data5 = res.data;
        this.data5[0].expand = true;
      } else {
        this.$Message.error(res.message);
      }
    },
    // 修改菜单项
    async menuUpdate(params) {
      this.update_loading = true;
      const res = await system_menu_update(params);
      this.update_loading = false;
      if (res.code === "0000") {
        this.$Message.success("更新成功");
        this.modal = "";
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 菜单项详情
    async menuDetail(id) {
      const res = await system_menu_detail(id);
      if (res.code === "0000") {
        this.modal = "1";

        this.menuFormItem = {
          parent: res.data.parent,
          id: res.data.id,
          text: res.data.text,
          icon: res.data.icon,
          url: res.data.url,
          sort: String(res.data.sort)
        };
      } else {
        this.$Message.error(res.message);
      }
    },
    // 新增菜单项
    async menuAdd(params) {
      this.add_loading = true;
      const res = await system_menu_add(params);
      this.add_loading = false;
      if (res.code === "0000") {
        this.$Message.success("添加成功");
        this.modal = "";
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    },
    // 删除菜单项
    async system_menu_delete(id) {
      this.delete_loading = true;
      const res = await system_menu_delete(id);
      this.delete_loading = false;
      if (res.code === "0000") {
        this.$Message.success("删除成功");
        this.getList();
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
