<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/coupon/coupon_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加卡券</Button>
        </router-link>
      </p>
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="添加时间:">
            <DatePicker style="width:100%" v-model="formItem.add_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择添加时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="卡券ID:" prop="id">
            <Input v-model="formItem.id" placeholder="请输入卡券ID" clearable></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="卡券名称:">
            <Input v-model="formItem.name" placeholder="请输入卡券名称" clearable></Input>
          </FormItem>
          </Col>
           <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="卡券类型:">
            <Select v-model="formItem.category">
              <Option value='1'>次卡</Option>
              <Option value="0">月卡</Option>
            </Select>
          </FormItem>
          </Col>
           <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="开启分享:">
            <Select v-model="formItem.is_share">
              <Option value='1'>是</Option>
              <Option value="0">否</Option>
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
import { coupon_list, coupon_del } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "coupon_list",
  data() {
    return {
      ruleValidate: {
        price: [{ type: "number", message: "价格格式错误", trigger: "blur" }],
        id: [
          { pattern: /^[0-9]*$/, message: "卡券ID格式不正确", trigger: "blur" }
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
          title: "卡券ID",
          width: 100,
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
          title: "卡券名称",
          searchOperator: "like",
          key: "name",
          sortable: true
        },
        {
          title: "卡券所值的金额",
          searchOperator: "=",
          sortable: true,
          key: "money"
        },
          {
          title: "使用时最低金额",
          searchOperator: "=",
          sortable: true,
          key: "min_price"
        },
        // {
        //   title: "会员价",
        //   searchOperator: "=",
        //   sortable: true,
        //   key: "rank_price"
        // },
        {
          title: "可使用次数",
          searchOperator: "=",
          sortable: true,
          key: "use_times"
        },
        {
          title: "卡券类型",
          key: "category",
          searchOperator: "=",
          render: (h, params) => {
            const row = params.row
            const category = filters.coupon_category(Number(row.category))
            return h("span", category)
          }
        },
        {
          title: "是否开启分享",
          key: "is_share",
          searchOperator: "=",
          render: (h, params) => {
            const row = params.row
            const is_share = filters.is_share(Number(row.is_share))
            return h("span", is_share)
          }
        },
        {
          title: "抢购数量",
          key: "limit_num",
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
                      this.deleteGoods(params.row.id)
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
    async deleteGoods(id) {
      console.log(id)
      const res = await coupon_del({
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
      console.log(searchParam, this.formItem)
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
      console.log(searchParam, "-------------")
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
      console.log(this.getParam())
      const res = await coupon_list({
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
        name: "coupon_add",
        query: obj
      })
    },
    show(obj) {
    //   let imgstring = "<span>"
    //   for (let i = 0; i < obj.goods_img.length; i++) {
    //     imgstring =
    //       imgstring +
    //       `<img src=${obj.goods_img[i]} style="width:58px;margin-left:5px">`
    //   }
    //   imgstring + "</span>"

      this.$Modal.info({
        // closable: true,
        title: "卡券详情",
        // closable: true,
        content: `卡券名称：${obj.name}<br>
        卡券ID：${obj.id}<br>
        卡券所值的金额：${obj.money}<br>
        卡券类型：${filters.coupon_category(Number(obj.category))}<br>
        卡券可使用次数：${obj.use_times}<br>
        微缩图片：<br><img src="${obj.thumbnail_url}" style="width:58px;"><br>
        卡券是否开启分享：${filters.is_share(Number(obj.is_share))}<br>
        卡券可限制抢购数量：${obj.limit_num}<br>
          可使用卡券时设定的最低金额：${obj.min_price}<br>
          
        卡券的添加时间：${filters.formatDate(
          new Date(obj.add_time * 1000),
          "yyyy-MM-dd hh:mm:ss"
        )}<br>
         卡券可使用开始时间：${filters.formatDate(
          new Date(obj.use_begin_time * 1000),
          "yyyy-MM-dd hh:mm:ss"
        )}<br>
         卡券可使用结束时间：${filters.formatDate(
          new Date(obj.use_end_time * 1000),
          "yyyy-MM-dd hh:mm:ss"
        )}<br>
        简短描述：<br>${obj.remark}<br>
                  `
      })
    }
  }
}
</script>

<style>
</style>
