<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
      </p>
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="添加时间:">
            <DatePicker style="width:100%" v-model="formItem.add_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择添加时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="记录ID:" prop="id">
            <Input clearable v-model="formItem.id" placeholder="请输入记录ID"></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>
           <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="用户ID:" prop="user_id">
            <Input clearable v-model="formItem.user_id" placeholder="请输入用户ID"></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>
             <!-- <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="用户名:" prop="username">
            <Input clearable v-model="formItem.username" placeholder="请输入用户名"></Input>
          </FormItem>
          </Col> -->
             <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="奖品ID:" prop="bonus_id">
            <Input clearable v-model="formItem.bonus_id" placeholder="请输入奖品ID"></Input>
          </FormItem>
          </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="活动ID:" prop="activity_id">
            <Input clearable v-model="formItem.activity_id" placeholder="请输入活动ID"></Input>
          </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
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
import {
  activity_loglist,
  answer_award,
  answer_editAward,
  answer_del,
  bonus_list,
  answer_result,
  answer_status
} from "@/service/getData"
import filters from "@/filters"
export default {
  name: "activity_loglist",
  data() {
    return {
      ruleValidate: {
        price: [{ type: "number", message: "价格格式错误", trigger: "blur" }],
        id: [
          { pattern: /^[0-9]*$/, message: "记录ID格式不正确", trigger: "blur" }
        ],
        phone: [
          {
            pattern: /^1\d{10}$/,
            message: "手机号码格式输入错误",
            trigger: "blur"
          }
        ]
      },
      editValue: "",
      editSelect: [],
      editValue2: "",
      editSelect2: "",
      pageSize: 10,
      total: 0,
      editSelect5: "",
      editSelect4: "",
      pageNo: 1,
      bonusList: [],
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
          title: "记录ID",
          width: 100,
          searchOperator: "=",
          sortable: true,
          key: "id"
        },
        {
          title: "添加时间",
          width: 160,
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
          title: "用户ID",
          searchOperator: "=",
          key: "user_id",
          sortable: true
        },
         {
          title: "用户名",
          searchOperator: "like",
          key: "username",
          sortable: true
        },
        {
          title: "奖品ID",
          searchOperator: "=",
          key: "award_id",
          sortable: true
        },
         {
          title: "活动名称",
          searchOperator: "like",
          key: "activity_name",
          sortable: true
        },
          {
          title: "活动ID",
          searchOperator: "like",
          key: "activity_id",
          sortable: true
        },
           {
          title: "奖品名称",
          searchOperator: "like",
          key: "activity_award_name",
          sortable: true
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
    this.getBonus()
  },
  methods: {
    // async getAward() {
    //   const res = await answer_editAward({
    //     bonus_id: "2",
    //     percent: "30"
    //   })
    //   console.log("2222222", res)
    // },
    async getBonus() {
      const res = await bonus_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res && res.data && res.data.list && res.data.list.data) {
        this.bonusList = res.data.list.data
      }
      console.log(res, "---------")
    },
    editPwd3(obj) {
      // this.$Modal.remove()
      this.editValue = obj.contents
      this.editSelect = obj.praise + ""
      this.$Modal.confirm({
        // closable: true,
        title: "设置答题奖励",
        render: h => {
          let l = []
          let r = []
          this.bonusList.forEach(element => {
            l.push(
              h(
                "Option",
                {
                  props: {
                    value: element.bonus_id
                  }
                },
                element.name
              )
            )
          })

          for (let index = 1; index <= 10; index++) {
            r.push(
              h(
                "Option",
                {
                  props: {
                    value: index * 10
                  }
                },
                index * 10 + "%"
              )
            )
          }
          return [
            h(
              "Select",
              {
                props: {
                  value: this.editSelect,
                  clearable: true,
                  placeholder: "请选择红包类型"
                },
                style: {
                  marginTop: "20px"
                },
                on: {
                  input: val => {
                    this.editSelect5 = val
                  }
                }
              },
              l
            ),
            h(
              "Select",
              {
                props: {
                  value: this.editSelect,
                  clearable: true,
                  placeholder: "请选择百分比"
                },
                style: {
                  marginTop: "20px"
                },
                on: {
                  input: val => {
                    this.editSelect4 = val
                  }
                }
              },
              r
            )
          ]
        },
        onOk: async () => {
          if (!this.editSelect5) {
            this.$Message.error("请选择红包", 3)
            return
          }
          if (!this.editSelect4) {
            this.$Message.error("请选择百分比", 3)
            return
          }
          await answer_editAward({
            id: 1,
            bonus_id: this.editSelect5,
            percent: this.editSelect4 + ""
          })
        }
      })
    },
    async getAward() {
      // this.$Modal.remove()
      const res = await answer_award()
      if (res && res.data) {
        let obj = res.data
        this.$Modal.info({
          // closable: true,
          title: "答题奖励",
          content: `奖品名称：${obj.name}<br>
        百分比：${obj.percent}%<br>
        奖品ID：${obj.bonus_id}<br>
        ID：${obj.id}<br>
         红包简短描述：${obj.desc}<br>
        红包所值的金额：${obj.money}<br>
        最低消费金额：${obj.min_goods_amount}<br>
         ${
           obj.use_date_length
             ? `红包使用时长：${obj.use_date_length}天<br>`
             : ""
         }
        ${
          obj.use_start_date
            ? `红包可以使用的开始时间：${filters.formatDate(
                new Date(obj.use_start_date * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )}<br>`
            : ""
        }
         ${
           obj.use_start_date
             ? `红包可以使用的结束时间：${filters.formatDate(
                 new Date(obj.use_end_date * 1000),
                 "yyyy-MM-dd hh:mm:ss"
               )}<br>`
             : ""
         }
        `
        })
      }
    },
    editPwd(obj) {
      // this.$Modal.remove()
      this.editValue = ""
      this.editSelect = []
      this.editValue = obj.result + ""
      this.editSelect = obj.options
      this.$Modal.confirm({
        // closable: true,
        title: "设置答案",
        render: h => {
          const optionList = []
          this.editSelect.forEach(element => {
            optionList.push(
              h(
                "Option",
                {
                  props: {
                    value: element.id + ""
                  }
                },
                element.name
              )
            )
          })
          return [
            h(
              "Select",
              {
                props: {
                  value: this.editValue,
                  clearable: true,
                  placeholder: "请选择答案"
                },
                style: {
                  marginTop: "20px",
                  marginBottom: "40px"
                },
                on: {
                  input: val => {
                    this.editSelect = val
                  }
                }
              },
              optionList
            )
          ]
        },
        onOk: async () => {
          if (!this.editSelect) {
            this.$Message.error("请选择答案", 3)
            return
          }
          await answer_result({
            option_id: Number(this.editSelect) || Number(obj.result),
            id: obj.id
          })
          setTimeout(() => {
            this.getList()
          }, 2000)
          this.editValue = ""
          this.editSelect = ""
        }
      })
    },
    editPwd2(obj) {
      // this.$Modal.remove()
      this.editValue2 = ""
      this.editSelect2 = ""
      this.editValue2 = obj.status
      this.$Modal.confirm({
        // closable: true,
        title: "设置状态",
        render: h => {
          return [
            h(
              "Select",
              {
                props: {
                  value: this.editValue2 + "",
                  clearable: true,
                  placeholder: "请选择答案"
                },
                style: {
                  marginTop: "20px"
                },
                on: {
                  input: val => {
                    this.editSelect2 = val
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    props: {
                      value: "1"
                    }
                  },
                  "正常"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "2"
                    }
                  },
                  "下架"
                )
              ]
            )
          ]
        },
        onOk: async () => {
          if (!this.editSelect2) {
            this.$Message.error("请选择状态", 3)
            return
          }
          await answer_status({
            status: Number(this.editSelect2) || Number(obj.status),
            id: obj.id
          })
          setTimeout(() => {
            this.getList()
          }, 2000)
          this.editValue = ""
          this.editSelect = ""
        }
      })
    },
    async deleteGoods(id) {
      console.log(id)
      const res = await answer_del({
        id: id
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
      const res = await activity_loglist({
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
    edit(obj) {
      this.$router.push({
        name: "answer_add",
        query: {
          ...obj,
          options: JSON.stringify(obj.options)
        }
      })
    },
    show(obj) {
      let str = `<ul style="margin-left:40px">`
      let result = ""
      obj.options.forEach(element => {
        str = str + `<li>${element.name}&nbsp;&nbsp;&nbsp;&nbsp;被选：(<b>${element.checked_num}</b>次)</li>`
        if (obj.result + "" === element.id + "") {
          result = element.name
        }
      })
      str = str + "</ul>"
      this.$Modal.info({
        // closable: true,
        title: "答题详情",
        content: `答题标题：${obj.title}<br>
        记录ID：${obj.id}<br>
        答案：${result}<br>
        选项：${str}<br>
        答题被选次数：${str}<br>
        答案状态：${filters.is_yes(Number(obj.status))}<br>
        添加时间：${filters.formatDate(
          new Date(obj.add_time * 1000),
          "yyyy-MM-dd hh:mm"
        )}<br>
        `
      })
    }
  }
}
</script>

<style>
</style>
