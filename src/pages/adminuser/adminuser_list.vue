<style lang="less">
</style>

<template>

  <Card class="vue-panel-table">
    <p slot="title">
      管理员列表
      <router-link to="/adminuser/adminuser_add">
        <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加管理员</Button>
      </router-link>
    </p>

    <Table :data="tableData" :columns="tableColumns " stripe></Table>
  </Card>
</template>

<script>
import { adminuser_list, adminuser_resetpassword } from "@/service/getData"
import filters from "@/filters"
import Cookie from "js-Cookie"
export default {
  name: "adminuser_list",
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          title: "用户ID",
          sortable: true,
          key: "id"
        },
        {
          title: "用户名",
          key: "username",
          sortable: true,
          render: (h, params) => {
            console.log(params.row.username)
            const row = params.row
            const color = "green"
            let user = Cookie.get("user")
            if (params.row.username === user) {
              return h("div", [
                h("span", {}, params.row.username),
                h(
                  "Tag",
                  {
                    props: {
                      // type: "dot",
                      color: color
                    },
                    style: {
                      marginLeft: "8px"
                    }
                  },
                  "It's you"
                )
              ])
            } else {
              return h("div", {}, params.row.username)
            }
          }
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "操作",
          width: 200,
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editPwd(params.row.id, params.row.username)
                    }
                  }
                },
                "修改密码"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    }
                  }
                },
                "详情"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取表格数据
    async getList() {
      const res = await adminuser_list({
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list) {
        this.tableData = res.data.list
      } else {
        this.tableData = []
      }
    },
    edit(userObj) {
      this.$router.push({
        name: "adminuser_add",
        query: userObj
      })
    },
    editPwd(id, username) {
      // this.$Modal.remove()
      this.$Modal.confirm({
        // closable: true,
        title: "修改密码",
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              type: "password",
              maxlength: 30,
              clearable: true,
              placeholder: "请输入长度6~30的密码"
            },
            style: {
              marginTop: "20px"
            },
            on: {
              input: val => {
                this.value = val
              }
            }
          })
        },
        onOk: async () => {
          if (this.value && this.value.length < 6) {
            this.$Message.error("密码必须由6至30个字符串组成!", 3)
            return
          }
          await adminuser_resetpassword({
            password: this.value,
            userid: id
          })
          let user = Cookie.get("user")
          if (user === username) {
            setTimeout(() => {
              this.$Message.loading("请重新登录,正在退出...", 4)
              setTimeout(() => {
                localStorage.clear()
                sessionStorage.clear()
                Cookie.remove("user")
                Cookie.remove("password")
                Cookie.remove("access")
                this.$router.push({
                  name: "login"
                })
              }, 3000)
            }, 3000)
          }
          this.value = ""
        }
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "管理员详情",
        content: `用户名：${obj.username}<br>
                  昵称：${obj.nickname}<br>
                  用户ID：${obj.id}<br>
                  邮箱：${obj.email}<br>
                  手机号：${obj.phone}<br>
                  `
      })
    }
  }
}
</script>

<style>
</style>
