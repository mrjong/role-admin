
<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
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
        :label-width="100"
        :rules="ruleValidate"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem label="创建时间:">
            <DatePicker
              style="width:100%"
              v-model="formItem.addtime"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              placement="bottom-start"
              placeholder="请选择添加时间"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="订单编号:"
            prop="no"
          >
            <Input
              clearable
              v-model="formItem.no"
              placeholder="请输入订单编号"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="支付订单号:"
            prop="pay_no"
          >
            <Input
              clearable
              v-model="formItem.pay_no"
              placeholder="请输入支付订单号"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="支付方式:"
            prop="pay_method"
          >
            <Select v-model="formItem.pay_method">
              <Option value='1'>余额支付</Option>
              <Option value='2'>微信支付</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="用户名:"
            prop="type"
          >
            <Select
              filterable
              placeholder="请选择用户"
              v-model="formItem.userid"
            >
              <Option
                v-for="item in tableDataUser"
                :key="item.id"
                :value="item.id+''"
              >{{item.nickname}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="餐柜:"
            prop="type"
          >
            <Select
              filterable
              placeholder="请选择餐柜"
              v-model="formItem.buffet_id"
            >
              <Option
                v-for="item in tableData2"
                :key="item.buffet_id"
                :value="item.buffet_id+''"
              >{{item.buffet_name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="订单类型:"
            prop="type"
          >
            <Select v-model="formItem.type">
              <Option value='1'>预约点餐</Option>
              <Option value='2'>柜前点餐</Option>
              <Option value='3'>充值</Option>
            </Select>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="菜品名称:"
            prop="title"
          >
            <Input
              clearable
              v-model="formItem.title"
              placeholder="请输入菜品名称"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
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
        width="100%"
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
import { order_list, user_list, order_del, buffet_list } from "@/service/getData"
import filters from "@/filters"
import utils from "@/libs/util"
export default {
  name: "order_list",
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
      tableData2: [],
      pageSize: 10,
      total: 0,
      tableDataUser: [],
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
          title: "订单编号",
          searchOperator: "like",
          key: "no",
          sortable: true
        },
        {
          title: "标题",
          searchOperator: "like",
          key: "title"
        },
        {
          title: "用户名",
          searchOperator: "=",
          key: "userid",
          render: (h, params) => {
            return h("span", params.row.nickname)
          }
        },
        {
          title: "订单类型",
          searchOperator: "=",
          key: "type",
          render: (h, params) => {
            const row = params.row
            const type = row.type
              ? filters.order_type(Number(row.type))
              : row.type
            return h("span", type)
          }
        },
        {
          title: "原价",
          searchOperator: "like",
          key: "price"
        },
        {
          title: "红包抵扣金额",
          searchOperator: "like",
          key: "bonus_money"
        },
        {
          title: "预定降价金额",
          searchOperator: "like",
          key: "preset_depreciate"
        },
        {
          title: "赠送金额",
          searchOperator: "like",
          key: "money_gift"
        },
        {
          title: "餐柜名称",
          searchOperator: "=",
          key: "buffet_id",
          render: (h, params) => {
            console.log(params)
            return h("span", params.row && params.row.buffet && params.row.buffet.buffet_name)
          }
        },
        {
          title: "支付方式",
          searchOperator: "=",
          key: "pay_method",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            const pay_method = row.pay_method
              ? filters.pay_method(Number(row.pay_method))
              : row.pay_method
            return h("span", pay_method)
          }
        },
        {
          title: "预约时间",
          searchOperator: "=",
          key: "presettime",
        },
        {
          title: "支付时间",
          searchOperator: "=",
          key: "pay_time",
          render: (h, params) => {
            const row = params.row
            const pay_time = row.pay_time
              ? filters.formatDate(
                new Date(row.pay_time * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )
              : '-'
            return h("span", pay_time)
          }
        },
        {
          title: "支付订单号",
          searchOperator: "like",
          key: "pay_no",
          sortable: true
        },
        {
          title: "创建时间",
          searchOperator: "=",
          key: "addtime",
          render: (h, params) => {
            const row = params.row
            const addtime = row.addtime
              ? filters.formatDate(
                new Date(row.addtime * 1000),
                "yyyy-MM-dd hh:mm:ss"
              )
              : '-'
            return h("span", addtime)
          }
        },
        {
          title: "操作",
          width: 80,
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: params.row.type === 3 ? 'none' : 'block'
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
    this.getList2()
    this.getList()
    this.getUserList()
  },
  methods: {
    // 导出数据
    download() {
      utils.download('/admin/order/export', {
        searchParam:
          this.formItem &&
          JSON.stringify(this.formItem) !== "{}" &&
          this.getParam()
      })
    },
    // 获取表格数据
    async getList2() {
      const res = await buffet_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.data) {
        this.tableData2 = res.data.data
      } else {
        this.tableData2 = []
      }
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "订单详情",
        content: `
        菜品名称：${obj.title}<br>
        菜缩略图：<br><img src="${obj.goods && obj.goods.thumb}" style="width:58px;"><br>
        价格：${obj.goods && obj.goods.price}<br>
        促销价：${obj.goods && obj.goods.promote_price}<br>
        餐柜名称：${obj.buffet && obj.buffet.buffet_name}<br>
        餐柜地址：${obj.buffet && obj.buffet.address}<br>
        格子编号：${obj.buffetGrid && obj.buffetGrid.grid_code}<br>
        是否补餐：${filters.is_push(Number(obj.is_push))}<br>
        是否取餐：${filters.is_take(obj.is_take)}<br>
        预约时间：${obj.presettime || '-'}<br>
        ${obj.type!==2?`补餐员昵称：${obj.goods && obj.pushUser.nickname || '-'}<br>`:''}
        ${obj.type!==2?`补餐员联系电话：${obj.goods && obj.pushUser.phone || '-'}<br>`:''}
        取餐时间：${obj.orderInfo && obj.orderInfo.add_good_time || '-'}<br>
        `
      })
    },
    async deleteorder(id) {
      console.log(id)
      const res = await order_del({
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
        !(this.formItem.addtime && this.formItem.addtime[0]) ||
        !this.formItem.addtime[1]
      ) {
        delete this.formItem.addtime
      } else {
        let startTime = this.formItem.addtime[0].getTime() / 1000
        let endTime = this.formItem.addtime[1].getTime() / 1000
        console.log()
        let addtime = [
          {
            searchValue: startTime,
            searchColumn: "addtime",
            searchOperator: ">"
          },
          {
            searchValue: endTime,
            searchColumn: "addtime",
            searchOperator: "<"
          }
        ]
        if (this.formItem && JSON.stringify(addtime) !== "[]") {
          for (let i = 0; i < addtime.length; i++) {
            searchParam.push(addtime[i])
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
            key !== "addtime"
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
    async getUserList() {
      const searchParam = []
      const res = await user_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.tableDataUser = res.data.list.data
      } else {
        this.tableDataUser = []
      }
    },
    // 获取表格数据
    async getList() {
      const searchParam = []
      console.log(this.getParam())
      const res = await order_list({
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
      if (res.data && res.data.list.data) {
        let tableData = []
        res.data.list.data.forEach(element => {
          tableData.push({
            ...element,
            ...element.user
          })
        });
        this.tableData = tableData;
        this.total = res.data.list.total
        this.pageNo = res.data.list.current_page
        this.tableColumns = [...this.tableColumns]
        console.log(res.data.list.current_page, '---------------')
      } else {
        this.tableData = []
        this.total = 0
        this.pageNo = 1
      }
    },
    clearForm(name) {
      this.pageNo = 1
      this.formItem = {}
      this.$refs[name].resetFields()
    },
    edit(obj) {
      this.$router.push({
        name: "order_add",
        query: obj
      })
    },
  }
}
</script>

<style>
</style>
