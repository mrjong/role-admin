import {
  system_role_list,
  system_role_add,
  system_role_update,
  system_role_detail,
  system_role_menu_list,
  stytem_role_menu_opration
} from "@/service/getData";
export default {
  name: "role_manage_page",
  data() {
    var alignCenter = "center";
    var widthVal = 180;
    var widthMidVal = 180;
    return {
      getDirList: ["ROLE_TYPE", "1_0_EFFECT_INVAL"],
      status: [
        {
          name: "有效",
          code: "1"
        },
        {
          name: "无效",
          code: "0"
        }
      ],
      getDirObj: {},
      showPanel: false,
      showPanel2: false,
      menuModal: false,
      query: false, //查询权限
      add: false, //添加权限
      detail: false, //删除权限
      update: false, //修改权限
      allot: false, //查询菜单权限树
      allot_submit: false, //分配菜单权限树
      query_loading: false, //查询按钮loading
      update_loading: false, //修改按钮loading
      allot_loading: false, //分配按钮loading
      add_loading: false, //添加按钮loading
      roleName: "",
      userId: "",
      roleId: "",
      menuIds: [],
      data5: [],
      modalSee: false,
      modalChange: false,
      modalAddRole: false,
      formValidate: {},
      formValidateChange: { roleCode: "" },
      formValidateAdd: {
        roleName: "",
        roleStatus: "1"
      },
      ruleValidate: {
        mblNo: [
          {
            pattern: this.GLOBAL.mblNo,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ]
      },
      ruleValidateChange: {
        roleName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],

        roleStatus: [
          {
            required: true,
            message: "请设置角色状态",
            trigger: "change"
          }
        ]
      },
      ruleValidateAdd: {
        roleName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],

        roleStatus: [
          {
            required: true,
            message: "请设置角色状态",
            trigger: "change"
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formValidateInfo: {},
      tableData: [],
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          searchOperator: "=",
          align: alignCenter,
          fixed: "left"
        },
        {
          title: "角色名称",
          searchOperator: "=",
          key: "roleName",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "角色状态",
          searchOperator: "like",
          key: "sts",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal
        },
        {
          title: "创建人",
          searchOperator: "like",
          key: "creator",
          width: 100,
          align: alignCenter
        },
        {
          title: "创建时间",
          searchOperator: "like",
          key: "createtime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let createDate = params.row.createTime;
            createDate = createDate
              ? this.$options.filters["formatDate"](
                  createDate,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : createDate;
            return h("span", createDate);
          }
        },
        {
          title: "修改人",
          searchOperator: "like",
          key: "updator",
          width: 100,
          align: alignCenter
        },
        {
          title: "修改时间",
          searchOperator: "like",
          key: "updatetime",
          className: "tableMainW",
          align: alignCenter,
          width: widthVal,
          render: (h, params) => {
            let createDate = params.row.updateTime;
            createDate = createDate
              ? this.$options.filters["formatDate"](
                  createDate,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : createDate;
            return h("span", createDate);
          }
        },
        {
          title: "操作",
          width: 220,
          key: "edit",
          align: alignCenter,
          width: widthMidVal,
          fixed: "left",
          render: (h, params) => {
            let id = params.row.id;
            let changeInfo = params.row;
            return this.detail || this.update || this.allot
              ? h("div", [
                  this.detail
                    ? h(
                        "a",
                        {
                          class: "edit-btn",
                          props: {},
                          on: {
                            click: () => {
                              this.checkSeeClick(id);
                            }
                          }
                        },
                        "查看"
                      )
                    : null,
                  this.update
                    ? h(
                        "a",
                        {
                          class: "edit-btn",
                          props: {},
                          on: {
                            click: () => {
                              this.changeRole(changeInfo);
                            }
                          }
                        },
                        "修改"
                      )
                    : null,
                  this.allot
                    ? h(
                        "a",
                        {
                          class: "edit-btn",
                          props: {},
                          on: {
                            click: () => {
                              this.roleId = params.row.id;
                              this.roleName = params.row.roleName;
                              this.getMenuList();
                              this.menuModal = true;
                            }
                          }
                        },
                        "菜单分配"
                      )
                    : null
                ])
              : h("span", "无");
          }
        }
      ]
    };
  },
  created() {
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    console.log(buttonPermissionList,'buttonPermissionList')
    buttonPermissionList.forEach(item => {
      console.log(item.url)
      switch (item.url) {
        case "/list":
          this.query = true;
          break;
        case "/add":
          this.add = true;
          break;
        case "/queryDetail":
          this.detail = true;
          break;
        case "/update":
          this.update = true;
          break;
        case "/queryPermissionTree":
          this.allot = true;
          break;
        case "/updatePermisson":
          console.log(908)

          this.allot_submit = true;
          break;
      }
    });
  },
  watch: {
    data5() {
      this.menuIds = []; //清空
      //获取反显被勾选的节点
      let checkTreeNodes = this.$refs.tree.getCheckedNodes();
      if (checkTreeNodes.length <= 0) {
        return;
      }
      console.log(checkTreeNodes, "checkTreeNodes");
      checkTreeNodes.reduce((previousValue, currentValue, index, array) => {
        this.menuIds.push(currentValue.id);
      }, 0);
    }
  },
  methods: {
    // 勾选节点的回调函数
    checkChange(arr) {
      this.menuIds = [];
      arr.forEach(item => {
        this.menuIds.push(item.id);
      });
    },
    // 选中节点的回调函数
    selectNode(node) {
      console.log(node, "node----");
    },
    renderContent(h, { root, node, data }) {
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
                class: "tree_title"
              },
              data.text
            )
          ])
        ]
      );
    },
    ok() {},
    changeRole(params) {
      this.modalChange = true;
      this.formValidateChange = params;
      this.formValidateChange.roleStatus = params.sts === "有效" ? "1" : "0";
    },
    // 确认修改信息
    modalChangeOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.toChangeRole();
        } else {
          return false;
        }
      });
    },
    sureAddRole(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.toAddRole();
        }
      });
    },
    // 关闭菜单分配和提交
    menuModalClose() {
      this.allot_loading = false;
      this.menuModal = false;
    },
    // 页码改变的回调
    changePage(pageNo) {
      //默认带入一个参数是当前的页码数
      this.pageNo = pageNo;
      this.getList();
    },
    addRole() {
      this.modalAddRole = true;
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.pageNo = 1;
          this.getList();
        }
      });
    },
    checkSeeClick(id) {
      this.getInfo(id);
      this.modalSee = true;
    },
    closeModal(tr) {
      if (tr === "1") {
        this.modalSee = false;
      } else if (tr == "2") {
        this.update_loading = false;
        this.modalChange = false;
      } else if (tr === "3") {
        this.add_loading = false;
        this.modalAddRole = false;
      }
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无查询权限");
        return;
      }
      this.query_loading = true;
      let res = await system_role_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        ...this.formValidate
      });
      this.query_loading = false;
      if (res.code === "0000") {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.$Message.error(res.message);
      }
    },
    //查看详情
    async getInfo(id) {
      let res = await system_role_detail(id);
      if (res.code === "0000") {
        this.formValidateInfo = res.data;
        const { createTime, updateTime } = this.formValidateInfo;
        this.formValidateInfo.updateTime = updateTime
          ? this.$options.filters["formatDate"](
              updateTime,
              "YYYY-MM-DD HH:mm:ss"
            )
          : updateTime;
        this.formValidateInfo.createTime = createTime
          ? this.$options.filters["formatDate"](
              createTime,
              "YYYY-MM-DD HH:mm:ss"
            )
          : createTime;
      } else {
        this.$Message.error(res.msg);
      }
    },
    // 提交修改角色的接口
    async toChangeRole() {
      this.update_loading = true;
      let res = await system_role_update({
        ...this.formValidateChange,
        sts: this.formValidateChange.roleStatus
      });
      this.update_loading = false;
      if (res && res.code === "0000") {
        this.$Message.success("修改成功");
        this.$refs["formValidateChange"].resetFields();
        this.modalChange = false;
        // 刷新页面
        this.getList();
      } else {
        this.$Message.error(res.msg);
      }
    },
    async toAddRole() {
      this.add_loading = true;
      const { roleName, roleStatus } = this.formValidateAdd;
      let res = await system_role_add({ roleName, sts: roleStatus });
      this.add_loading = true;
      if (res && res.code === "0000") {
        this.$Message.success("添加成功");
        this.modalAddRole = false;
        this.$refs["formValidateAdd"].resetFields();
        this.formValidateAdd = {};
        this.getList();
      } else {
        this.formValidateAdd = {};
        this.$Message.error(res.msg);
      }
    },
    // 获取菜单列表数据
    async getMenuList() {
      let res = await system_role_menu_list(this.roleId);
      if (res.code === "0000") {
        res.data[0].expand = true;
        this.data5 = res.data;
      } else {
        this.$Message.error(res.msg);
      }
    },
    // 菜单分配的接口
    async menuUpdate() {
      this.allot_loading = true;
      let res = await stytem_role_menu_opration({
        id: this.roleId,
        menuIds: this.menuIds
      });
      this.allot_loading = false;
      if (res.code === "0000") {
        this.menuModal = false;
      } else {
        this.$Message.error(res.msg);
      }
    },
    // 重置
    clearForm(name) {
      //这里可以不用改变当前的分页组件之中的页码数值
      this.formValidate = {};
      this.$refs[name].resetFields();
    }
  }
};
