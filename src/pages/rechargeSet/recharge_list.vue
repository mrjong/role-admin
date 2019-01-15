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
          <FormItem label="支付时间:">
            <DatePicker style="width:100%" v-model="formItem.pay_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择支付时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="订单流水号:" prop="no">
            <Input clearable v-model="formItem.no" placeholder="请输入订单流水号" clearable></Input>
          </FormItem>
          </Col>
           <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="支付订单号:" prop="pay_no">
            <Input clearable v-model="formItem.pay_no" placeholder="请输入支付订单号" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="支付方式:" prop="pay_method">
            <Select v-model="formItem.pay_method">
              <Option value='2'>微信支付</Option>
              <Option value='1'>余额支付</Option>
            </Select>
          </FormItem>
          </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="是否支付:" prop="is_pay">
            <Select v-model="formItem.is_pay">
              <Option value='1'>是</Option>
              <Option value='0'>否</Option>
              <Option value='-1'>支付失败</Option>
            </Select>
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
import { recharge_list, points_del } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "recharge_list",
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
          title: "支付时间",
          width: 160,
          searchOperator: "=",
          key: "pay_time",
          render: (h, params) => {
            const row = params.row
            const pay_time = row.pay_time
              ? filters.formatDate(
                  new Date(row.pay_time * 1000),
                  "yyyy-MM-dd hh:mm:ss"
                )
              : row.pay_time
            return h("span", pay_time)
          }
        },
        {
          title: "订单流水号",
          width: 150,
          searchOperator: "like",
          key: "no"
        },
          {
          title: "支付订单号",
          width: 150,
          searchOperator: "like",
          key: "pay_no"
        },
           {
          title: "用户昵称",
          searchOperator: "like",
          key: "nickname",
          sortable: true
        },
        {
          title: "支付方式",
          searchOperator: "like",
          key: "pay_method",
          sortable: true,
               render: (h, params) => {
            const row = params.row
            const is_use_bonus = filters.pay_method(Number(row.pay_method))
            return h("span", is_use_bonus)
          }
        },
         {
          title: "是否支付",
          searchOperator: "like",
          key: "is_pay",
          sortable: true,
            render: (h, params) => {
            const row = params.row
            const is_use_bonus = filters.is_not(Number(row.is_pay))
            return h("span", is_use_bonus)
          }
        },
        {
          title: "赠送金额",
          searchOperator: "like",
          key: "money_gift",
          sortable: true
        },
        {
          title: "支付金额",
          searchOperator: "like",
          key: "pay_price",
          sortable: true
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
    async deletepoints(id) {
      console.log(id)
      const res = await points_del({
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
        !(this.formItem.pay_time && this.formItem.pay_time[0]) ||
        !this.formItem.pay_time[1]
      ) {
        delete this.formItem.pay_time
      } else {
        let startTime = this.formItem.pay_time[0].getTime() / 1000
        let endTime = this.formItem.pay_time[1].getTime() / 1000
        console.log()
        let pay_time = [
          {
            searchValue: startTime,
            searchColumn: "pay_time",
            searchOperator: ">"
          },
          {
            searchValue: endTime,
            searchColumn: "pay_time",
            searchOperator: "<"
          }
        ]
        if (this.formItem && JSON.stringify(pay_time) !== "[]") {
          for (let i = 0; i < pay_time.length; i++) {
            searchParam.push(pay_time[i])
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
            key !== "pay_time"
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
      const res = await recharge_list({
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
        name: "points_add",
        query: obj
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "红包详情",
        content: `红包名称：${obj.name}<br>
        红包所值的金额：${obj.money}<br>
        红包类型：${filters.pointsType(obj.type)}<br>
        最低消费金额：${obj.min_goods_amount}<br>
        红包ID：${obj.points_id}<br>
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
