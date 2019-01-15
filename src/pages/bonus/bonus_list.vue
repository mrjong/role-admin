<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/bonus/bonus_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加红包</Button>
        </router-link>
      </p>
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
        <Row>
          <!-- <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="添加时间:">
            <DatePicker style="width:100%" v-model="formItem.add_time" format="yyyy-MM-dd hh:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择添加时间"></DatePicker>
          </FormItem>
          </Col> -->
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="红包ID:" prop="bonus_id">
            <Input clearable v-model="formItem.bonus_id" placeholder="请输入红包ID" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="红包类型:" prop="type">
            <Select v-model="formItem.type">
              <Option value='1'>新人红包</Option>
              <Option value='2'>活动红包</Option>
              <Option value='3'>积分红包</Option>
              <Option value="4">个人红包</Option>
              <Option value="5">邀请红包</Option>
            </Select>
          </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="红包名称:">
            <Input clearable v-model="formItem.name" placeholder="请输入红包名称" clearable></Input>
          </FormItem>
          </Col>
          <!-- <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="是否开放销售:">
            <Select v-model="formItem.is_on_sale">
              <Option value='1'>是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="是否是精品:">
            <Select v-model="formItem.is_best">
              <Option value='1'>是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="是否热销:">
            <Select v-model="formItem.is_hot">
              <Option value='1'>是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
          </Col> -->
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
import { bonus_list, bonus_del } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "bonus_list",
  data() {
    return {
      ruleValidate: {
        price: [{ type: "number", message: "价格格式错误", trigger: "blur" }],
        id: [
          { pattern: /^[0-9]*$/, message: "红包ID格式不正确", trigger: "blur" }
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
          title: "红包ID",
          width: 100,
          searchOperator: "=",
          sortable: true,
          key: "bonus_id"
        },
        {
          title: "红包名称",
          searchOperator: "like",
          key: "name",
          sortable: true
        },
        {
          title: "红包类型",
          searchOperator: "=",
          key: "type",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            const type = row.type ? filters.bonusType(row.type) : row.type
            return h("span", type)
          }
        },
        // {
        //   title: "发送开始时间",
        //   width: 160,
        //   searchOperator: "=",
        //   key: "send_start_date",
        //   render: (h, params) => {
        //     const row = params.row
        //     const send_start_date = row.send_start_date
        //       ? filters.formatDate(
        //           new Date(row.send_start_date * 1000),
        //           "yyyy-MM-dd hh:mm:ss"
        //         )
        //       : row.send_start_date
        //     return h("span", send_start_date)
        //   }
        // },
        // {
        //   title: "发送结束时间",
        //   width: 160,
        //   searchOperator: "=",
        //   key: "send_end_date",
        //   render: (h, params) => {
        //     const row = params.row
        //     const send_end_date = row.send_end_date
        //       ? filters.formatDate(
        //           new Date(row.send_end_date * 1000),
        //           "yyyy-MM-dd hh:mm:ss"
        //         )
        //       : row.send_end_date
        //     return h("span", send_end_date)
        //   }
        // },
        {
          title: "开始使用时间",
          width: 160,
          searchOperator: "=",
          key: "use_start_date",
          render: (h, params) => {
            const row = params.row
            const use_start_date = row.use_start_date
              ? filters.formatDate(
                  new Date(row.use_start_date * 1000),
                  "yyyy-MM-dd hh:mm:ss"
                )
              : '-'
            return h("span", use_start_date)
          }
        },
        {
          title: "结束使用时间",
          width: 160,
          searchOperator: "=",
          key: "use_end_date",
          render: (h, params) => {
            const row = params.row
            const use_end_date = row.use_end_date
              ? filters.formatDate(
                  new Date(row.use_end_date * 1000),
                  "yyyy-MM-dd hh:mm:ss"
                )
              : '-'
            return h("span", use_end_date)
          }
        },
        {
          title: "所值金额",
          searchOperator: "=",
          sortable: true,
          key: "money"
        },
        {
          title: "使用时长(天)",
          searchOperator: "=",
          sortable: true,
          key: "use_date_length",
          render:(h,params)=>{
            return h('span',params.row.use_date_length?params.row.use_date_length:'-')
          }
        },
        {
          title: "最低消费金额",
          searchOperator: "=",
          sortable: true,
          key: "min_goods_amount"
        },
        {
          title: "简短描述",
          key: "desc",
          searchOperator: "="
        },
        {
          title: "操作",
          width: 180,
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.deletebonus(params.row.bonus_id)
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
                        type: "error",
                        placement: "top"
                      }
                    },
                    "删除"
                  )
                ]
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
    async deletebonus(id) {
      console.log(id)
      const res = await bonus_del({
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
      const res = await bonus_list({
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
        this.total = res.data.list.data.total
        this.pageNo = res.data.list.data.current_page
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
        name: "bonus_add",
        query: obj
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "红包详情",
        content: `红包名称：${obj.name}<br>
        红包所值的金额：${obj.money}<br>
        红包类型：${filters.bonusType(obj.type)}<br>
        最低消费金额：${obj.min_goods_amount}<br>
        红包ID：${obj.bonus_id}<br>
        简短描述：${obj.desc}<br>
        ${obj.use_date_length ? `使用时长：${obj.use_date_length}天<br>` : ""}
        ${
          obj.use_start_date
            ? `开始使用时间：${filters.formatDate(
                new Date(obj.use_start_date * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )}<br>`
            : ""
        }
         ${
           obj.use_start_date
             ? `结束使用时间：${filters.formatDate(
                 new Date(obj.use_end_date * 1000),
                 "yyyy-MM-dd hh:mm:ss"
               )}<br>`
             : ""
         }
        `
      })
    }
  }
}
</script>

<style>
</style>
