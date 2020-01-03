import {
  system_user_list,
  system_user_reset,
  system_user_detail
} from "@/service/getData";
import Remodal from "./components/user_info_form";
import tablePage from "@/mixin/tablePage";
export default {
  name: 'user_manage_page',
  components: {
    Remodal
  },
  mixins: [tablePage],
  name: "demo_list",
  data() {
    return {
      status: [
        {
          name: "有效",
          code: '1'
        },
        {
          name: "无效",
          code: '0'
        }
      ],
      query: false, //查询权限
      add: false, //添加权限
      detail: false, //删除权限
      update: false, //修改权限
      reset_pwd: false, //重置密码权限
      query_loading: false, //查询按钮loading
      showPanel: false,
      showPanel2: false,
      modal: false,
      parentData: {
        modal: false
      },
      ruleValidate: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formItem: {},
      tableData: [],
      selectList: [],
      tableColumns: [
        {
          title: "",
          type: "selection",
          width: 60,
          searchOperator: "=",
          align: "center",
          fixed: "left"
        },
        {
          title: "序号",
          type: "index",
          width: 60,
          searchOperator: "=",
          align: "center",
          fixed: "left"
        },
        {
          title: "登录账号",
          searchOperator: "=",
          key: "loginName",
          width: 150,
          align: "center"
        },
        {
          title: "用户名称",
          searchOperator: "like",
          key: "nameHid",
          sortable: true,
          width: 150,
          align: "center"
        },
        {
          title: "状态",
          searchOperator: "=",
          key: "sts",
          ellipsis: true,
          width: 150,
          align: "center"
        },
        {
          title: "手机号",
          searchOperator: "=",
          key: "mblHid",
          width: 150,
          align: "center"
        },
        {
          title: "创建人",
          key: "creator",
          ellipsis: true,
          width: 100,
          align: "center"
        },
        {
          title: "创建时间",
          searchOperator: "=",
          key: "createTime",
          ellipsis: true,
          width: 150,
          align: "center",
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime
              ? this.$options.filters["formatDate"](
                  createTime,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : createTime;
            return h("span", createTime);
          }
        },
        {
          title: "操作",
          key: "edit",
          width: 180,
          align: "center",
          fixed: "left",
          render: (h, params) => {
            const obj = params.row;
            return this.detail || this.reset_pwd || this.update
              ? h("div", [
                  this.detail
                    ? h(
                        "a",
                        {
                          class: "edit-btn",
                          props: {},
                          on: {
                            click: () => {
                              this.handleAdd("1", obj.id);
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
                              this.handleAdd("2", obj.id);
                            }
                          }
                        },
                        "修改"
                      )
                    : null,
                  this.reset_pwd
                    ? h(
                        "Poptip",
                        {
                          props: {
                            confirm: true,
                            title: "您确定要重置密码?",
                            transfer: true
                          },
                          on: {
                            "on-ok": () => {
                              this.system_user_reset([Number(obj.id)]);
                            }
                          }
                        },
                        [
                          h(
                            "a",
                            {
                              style: {
                                margin: "0 5px"
                              },
                              class: "edit-btn",
                              props: {
                                size: "small",
                                type: "error",
                                placement: "top"
                              }
                            },
                            "重置密码"
                          )
                        ]
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
    buttonPermissionList.forEach(item => {
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
        case "/resetPwd":
          this.reset_pwd = true;
          break;
      }
    });
  },
  methods: {
    // 接收回调
    passBack(obj) {
      if (obj.action) {
        this.parentData.modal = false;
        this.getList();
      } else {
        this.parentData.modal = false;
      }
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList();
    },
    // 页码改变的回调
    changePage(pageNo) {
      //默认带入一个参数是当前的页码数
      this.pageNo = pageNo;
      this.getList();
    },
    selectOne(selection) {
      this.selectList = [];
      selection &&
        selection.forEach(element => {
          this.selectList.push(Number(element.id));
        });
    },
    //重置所有
    handleResetAll() {
      if (this.selectList.length !== 0) {
        this.system_user_reset(this.selectList);
      } else {
        this.$Message.info("请勾选需要操作的数据");
      }
    },
    handleSubmit() {
      this.pageNo = 1;
      this.getList();
    },
    // 重置
    clearForm(name) {
      //这里可以不用改变当前的分页组件之中的页码数值
      this.formItem = {};
      this.$refs[name].resetFields();
    },
    // 获取表格数据
    async system_user_reset(ids) {

      const res = await system_user_reset(JSON.stringify(ids));
      if (res.code === '0000') {
        this.$Message.success("重置密码成功");
        this.selectList = [];
        this.getList();
      } else {
        this.$Message.error(res.msg);
      }
    },
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无查询权限");
        return;
      }
      this.query_loading = true;

      const res = await system_user_list({
        ...this.formItem,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      this.query_loading = false;
      if (res.code === "0000") {
        this.tableData = res.data.list;
        // this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        // this.pageNo = res.data.pageNum;
      } else {
        this.$Message.error(res.msg);
      }
    },
    // 添加列表新数据按钮
    async handleAdd(type, id) {
      if (type === "1" || type === "2") {
        // 查询或修改数据按钮

        const res = await system_user_detail(id);
        if (res.code === "0000") {
          this.modal = true;
          this.parentData = {
            modal: this.modal,
            type,
            userData: res.data
          };
        } else {
          this.$Message.error(res.msg);
        }
      } else {
        this.modal = true;
        this.parentData = {
          modal: this.modal,
          type
        };
      }
    }
  }
};
