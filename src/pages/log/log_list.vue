<style lang="less">
</style>

<template>

  <div class="logs_list">
    <Card class="vue-panel">
      <p slot="title">
        操作记录
      </p>
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
          <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="添加时间:">
            <DatePicker style="width:100%" v-model="formItem.add_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择添加时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="操作记录ID:" prop="id">
            <Input clearable v-model="formItem.id" placeholder="请输入操作记录ID" clearable></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="用户名:">
            <Input clearable v-model="formItem.username" placeholder="请输入操作用户名" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="类型:">
            <Select v-model="formItem.category">
              <Option value='1'>餐柜管理</Option>
              <Option value="2">商品管理</Option>
              <Option value="3">预约菜单</Option>
            </Select>
          </FormItem>
          </Col>
             <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="操作类型:">
            <Select v-model="formItem.action_type">
              <Option value='1'>添加</Option>
              <Option value="2">编辑</Option>
              <Option value="3">删除</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')" style="width:80px" long>查询</Button>
            <Button type="ghost" style="width:80px;margin-left: 8px" @click="clearForm('formItem')">清除</Button>
          </FormItem>
          </Col>
        </Row>


      </Form>
    </Card>
    <Card class="vue-panel-table">
      <Table :data="tableData" :columns="tableColumns" stripe></Table>
      <div class="vue-panel-page" v-if="tableData.length<total">
        <div style="float: right;">
          <Page :total="total" show-total show-elevator show-sizer :page-size="pageSize" :current="pageNo" @on-page-size-change="changeSize" @on-change="changePage"></Page>
        </div>

      </div>
    </Card>
  </div>
</template>

<script>
import { log_list,log_setRole, log_resetpassword,log_export } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "log_list",
  data() {
    return {
      ruleValidate: {
        email: [
          { type: "email", message: "电子邮箱格式不正确", trigger: "blur" }
        ],
        id: [
          { pattern: /^[0-9]*$/, message: "操作记录ID格式不正确", trigger: "blur" }
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
          title: "操作记录ID",
          searchOperator: "=",
          sortable: true,
          key: "id"
        },
        {
          title: "添加时间",
          width: 160,
          searchOperator: "=",
          key: "add_time",
          render: (h, params) => {
            const row = params.row
            const add_time = row.add_time
              ? filters.formatDate(
                  new Date(row.add_time * 1000),
                  "yyyy-MM-dd hh:mm:ss"
                )
              : row.add_time
            return h("span", add_time)
          }
        },
  
        {
          title: "用户名",
          searchOperator: "like",
          key: "username"
        },
                {
          title: "内容",
          key: "contents"
        },
        {
          title: "类型",
          key: "category",
          searchOperator: "=",
          render: (h, params) => {
            const row = params.row
            const category = filters.log_category(Number(row.category))
            return h("span", category)
          }
        },
         {
          title: "操作",
          key: "action_type",
          searchOperator: "=",
          render: (h, params) => {
            const row = params.row
            const action_type = filters.action_type(Number(row.action_type))
            return h("span", action_type)
          }
        },
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
          // 获取表格数据
     download() {
         window.open('http://shop.e-blive.com/log/export')
    //   const searchParam = []
    //   console.log(this.getParam())
    //   const res = await log_export({
    //     searchParam:
    //       this.formItem &&
    //       JSON.stringify(this.formItem) !== "{}" &&
    //       this.getParam(),
    //     config: {
    //       hideMessage: true,
    //       aTarget: true
    //     }
    //   })
    //   console.log(res,'--------------')

    },
      async setUser(id, type) {
      const res = await log_setRole({
        role: type,
        logid:id
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
        !(this.formItem.add_time && this.formItem.add_time[0]) ||
        !this.formItem.add_time[1]
      ) {
        delete this.formItem.add_time
      } else {
        let startTime = this.formItem.add_time[0].getTime() / 1000
        let endTime = this.formItem.add_time[1].getTime() / 1000
        console.log()
        let add_time = [
          {
            searchValue: startTime,
            searchColumn: "add_time",
            searchOperator: ">"
          },
          {
            searchValue: endTime,
            searchColumn: "add_time",
            searchOperator: "<"
          }
        ]
        if (this.formItem && JSON.stringify(add_time) !== "[]") {
          for (let i = 0; i < add_time.length; i++) {
            searchParam.push(add_time[i])
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
            key !== "add_time"
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
      const res = await log_list({
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
    clearForm(name) { this.pageNo=1 
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
          await log_resetpassword({
            password: this.value,
            logid: id
          })
          this.value = ""
        }
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "操作记录详情",
        content: `操作记录名：${obj.logname}<br>
                  昵称：${obj.nickname}
                  <img src=${
                    obj.avatar
                  } style="width:58px;border-radius:50%;position:absolute;right:0;top:0" /><br>
                  注册时间:${obj.add_time}<br>
                  操作记录id：${obj.id}<br>
                  性别：${filters.gender(Number(obj.gender))}<br>
                  出生日期:${obj.birthday}<br>
                  现有资金:${obj.log_money}<br>
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
