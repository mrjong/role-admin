<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        用户列表
        <Button
          @click="download"
          icon="ios-download"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
        >导出数据</Button>
      </p>
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="80"
        :rules="ruleValidate"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <FormItem label="注册时间:">
            <DatePicker
              style="width:100%"
              v-model="formItem.reg_time"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              placement="bottom-start"
              placeholder="请选择注册时间"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <FormItem
            label="用户ID:"
            prop="id"
          >
            <Input
              clearable
              v-model="formItem.id"
              placeholder="请输入用户ID"
              clearable
            ></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>

          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <FormItem label="用户名:">
            <Input
              clearable
              v-model="formItem.username"
              placeholder="请输入用户名"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <FormItem
            label="手机号:"
            prop="phone"
          >
            <Input
              clearable
              v-model="formItem.phone"
              placeholder="请输入手机号"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <FormItem label="性别:">
            <Select v-model="formItem.gender">
              <Option value='1'>男</Option>
              <Option value="2">女</Option>
              <Option value="0">保密</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
          >
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formItem')"
              style="width:80px"
              long
            >查询</Button>
            <Button
              type="ghost"
              style="width:80px;margin-left: 8px"
              @click="clearForm('formItem')"
            >清除</Button>
          </FormItem>
          </Col>
        </Row>

      </Form>
    </Card>
    <Card class="vue-panel-table">
      <Table
        :data="tableData"
        :columns="tableColumns"
        stripe
      ></Table>
      <div
        class="vue-panel-page"
        v-if="tableData.length<total"
      >
        <div style="float: right;">
          <Page
            :total="total"
            show-total
            show-elevator
            show-sizer
            :page-size="pageSize"
            :current="pageNo"
            @on-page-size-change="changeSize"
            @on-change="changePage"
          ></Page>
        </div>

      </div>
    </Card>
  </div>
</template>

<script>
import { user_list, user_setRole, user_resetpassword, user_export } from "@/service/getData"
import filters from "@/filters"
import utils from "@/libs/util"
export default {
  name: "user_list",
  data() {
    return {
      ruleValidate: {
        email: [
          { type: "email", message: "电子邮箱格式不正确", trigger: "blur" }
        ],
        id: [
          { pattern: /^[0-9]*$/, message: "用户ID格式不正确", trigger: "blur" }
        ],
        phone: [
          {
            pattern: /^1\d{10}$/,
            message: "手机号码格式输入错误",
            trigger: "blur"
          }
        ]
      },
      pageSize: 10,
      total: 0,
      pageNo: 1,
      modal6: false,
      // 对话框
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      formItem: {},
      tableData: [],
      tableColumns: [
        {
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h('span', params.index + (this.pageNo - 1) * 10 + 1);
          }
        },
        {
          title: "注册时间",
          width: 160,
          searchOperator: "=",
          key: "reg_time",
          render: (h, params) => {
            const row = params.row
            const reg_time = row.reg_time
              ? filters.formatDate(
                new Date(row.reg_time * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )
              : row.reg_time
            return h("span", reg_time)
          }
        },
        {
          title: "用户ID",
          width: 100,
          searchOperator: "=",
          sortable: true,
          key: "id"
        },
        {
          title: "用户名",
          searchOperator: "like",
          key: "username"
        },
        {
          title: "用户昵称",
          searchOperator: "like",
          key: "nickname",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            return h("div", [
              h("Avatar", {
                props: {
                  src: row.avatar
                },
                style: {
                  marginRight: "5px",
                  borderRadiu: "50%"
                }
              }),
              h(
                "span",
                {
                  props: {
                    color: "green"
                  },
                  style: {
                    marginRight: "5px"
                  }
                },
                row.nickname
              )
            ])
          }
        },
{
          title: "用户积分",
          searchOperator: "like",
          key: "points"
        },
        {
          title: "手机号",
          searchOperator: "=",
          key: "phone"
        },
        {
          title: "角色",
          key: "role",
          searchOperator: "=",
          render: (h, params) => {
            const row = params.row
            const role = filters.role(Number(row.role))
            return h("span", role)
          }
        },
        {
          title: "性别",
          key: "gender",
          searchOperator: "=",
          render: (h, params) => {
            const row = params.row
            const gender = filters.gender(Number(row.gender))
            return h("span", gender)
          }
        },
        {
          title: "操作",
          width: 250,
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
                      this.editPwd(params.row.id)
                    }
                  }
                },
                "修改密码"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: `您确定要${
                      params.row.role === 0 ? "设为配送员" : "设为普通用户"
                      }这条数据吗?`,
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.setUser(
                        params.row.id,
                        params.row.role === 0 ? 1 : 0
                      )
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      style: {
                        margin: "0 5px"
                      },
                      props: {
                        size: "small",
                        type: params.row.role === 1 ? "success" : "warning",
                        placement: "top"
                      }
                    },
                    params.row.role === 1 ? "设为普通用户" : "设为配送员"
                  )
                ]
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
  filters: {
    // formatDate(time) {
    //   let date = new Date(time)
    //   return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss")
    // }
  },
  created() {
    this.getList()
  },
  methods: {
    // 导出数据
    download() {
      utils.download('/admin/user/export', {
        searchParam:
          this.formItem &&
          JSON.stringify(this.formItem) !== "{}" &&
          this.getParam()
      })
    },
    async setUser(id, type) {
      const res = await user_setRole({
        role: type,
        userid: id
      })
      if (res) {
        setTimeout(() => {
          this.getList()
        }, 2000)
      }
    },
    changePage(pageNo) {
      this.pageNo = pageNo
      this.getList()
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.getList()
    },
    getParam() {
      let searchParam = []

      if (
        !(this.formItem.reg_time && this.formItem.reg_time[0]) ||
        !this.formItem.reg_time[1]
      ) {
        delete this.formItem.reg_time
      } else {
        let startTime = this.formItem.reg_time[0].getTime() / 1000
        let endTime = this.formItem.reg_time[1].getTime() / 1000
        console.log()
        let reg_time = [
          {
            searchValue: startTime,
            searchColumn: "reg_time",
            searchOperator: ">"
          },
          {
            searchValue: endTime,
            searchColumn: "reg_time",
            searchOperator: "<"
          }
        ]
        if (this.formItem && JSON.stringify(reg_time) !== "[]") {
          for (let i = 0; i < reg_time.length; i++) {
            searchParam.push(reg_time[i])
          }
        }
      }
      console.log(searchParam)
      for (let i = 0; i < this.tableColumns.length; i++) {
        for (const key in this.formItem) {
          if (
            this.formItem[key] &&
            this.tableColumns[i].searchOperator &&
            key === this.tableColumns[i].key &&
            key !== "reg_time"
          ) {
            let item = {}
            item.searchValue = this.formItem[key]
            item.searchColumn = this.tableColumns[i].key
            item.searchOperator = this.tableColumns[i].searchOperator
            searchParam.push(item)
          }
        }
      }
      return searchParam
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getList()
        } else {
          this.$Message.error("查询条件格式有误，请重新填写")
        }
      })
    },
    // 获取表格数据
    async getList() {
      const searchParam = []
      console.log(this.getParam())
      const res = await user_list({
        searchParam:
          this.formItem &&
          JSON.stringify(this.formItem) !== "{}" &&
          this.getParam(),
        page: this.pageNo,
        perPage: this.pageSize,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.tableData = res.data.list.data
        this.total = res.data.list.total
        this.pageNo = res.data.list.current_page
      } else {
        this.tableData = []
        this.total = 0
        this.pageNo = 1
      }
    },
    clearForm(name) {    this.pageNo = 1
      this.formItem = {}
      this.$refs[name].resetFields()
    },
    editPwd(id) {
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
          await user_resetpassword({
            password: this.value,
            userid: id
          })
          this.value = ""
        }
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "用户详情",
        content: `用户名：${obj.username}<br>
                  昵称：${obj.nickname}
                  <img src=${
          obj.avatar
          } style="width:58px;border-radius:50%;position:absolute;right:0;top:0" /><br>
                  注册时间:${obj.reg_time}<br>
                  用户id：${obj.id}<br>
                  性别：${filters.gender(Number(obj.gender))}<br>
                  出生日期:${obj.birthday}<br>
                  现有资金:${obj.user_money}<br>
                  积分:${obj.points}<br>
                  注册ip:${obj.reg_ip}<br>
                  `
      })
    }
  }
}
</script>

<style>
</style>
