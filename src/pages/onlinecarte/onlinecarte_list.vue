<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <!-- <router-link to="/onlinecarte/onlinecarte_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加柜前购买</Button>
        </router-link> -->
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
          <FormItem label="添加时间:">
            <DatePicker
              style="width:100%"
              v-model="formItem.datetime"
              format="yyyy-MM-dd"
              type="date"
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
            label="餐柜:"
            prop="buffet_id"
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
          <!-- <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="菜品名称:" prop="name">
            <Input clearable v-model="formItem.name" placeholder="请输入商品名称" clearable></Input>
          </FormItem>
          </Col> -->
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
import { onlinecarte_list, onlinecarte_del, buffet_list } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "onlinecarte_list",
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
      tableData2: [],
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
          title: "添加时间",
          width: 100,
          searchOperator: "=",
          sortable: true,
          key: "year",
          render: (h, params) => {
            return h("span", `${params.row.year}-${params.row.month}-${params.row.day}`)
          }
        },
        {
          title: "商品名称",
          searchOperator: "like",
          key: "name",
          sortable: true
        },
        {
          title: "是否购买",
          searchOperator: "=",
          key: "is_buy",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            const is_buy = row.is_buy + '' ? filters.is_buy(row.is_buy) : row.is_buy
            return h("span", is_buy)
          }
        },
        {
          title: "价格",
          searchOperator: "=",
          sortable: true,
          key: "price"
        },
        {
          title: "优惠价",
          searchOperator: "=",
          sortable: true,
          key: "promote_price"
        },
        {
          title: "缩略图",
          searchOperator: "=",
          key: "thumb",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: params.row.thumb,
                shape: 'square',
                size: "large"
              },
              style: {
                marginRight: "5px",
              }
            })
          }        },
        {
          title: "餐柜名称",
          searchOperator: "=",
          sortable: true,
          key: "buffet_name",
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
                      this.deleteonlinecarte(params.row.id)
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
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "primary",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "5px"
              //       },
              //       on: {
              //         click: () => {
              //           this.edit(params.row)
              //         }
              //       }
              //     },
              //     "编辑"
              //   ),
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
    this.getList2()
  },
  methods: {
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
    async deleteonlinecarte(id) {
      console.log(id)
      const res = await onlinecarte_del({
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
      const res = await onlinecarte_list({
        buffet_id: this.formItem.buffet_id,
        datetime: +new Date(this.formItem.datetime) / 1000 + 1,
        page: this.pageNo,
        perPage: this.pageSize,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.data) {
        const tableData = []
        res.data.data.forEach(element => {
          tableData.push({
            ...element,
            ...element.goods,
            ...element.buffet,
          })
        });
        this.tableData = tableData
        this.total = res.data.total
        this.pageNo = res.data.current_page
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
    edit(obj) {
      this.$router.push({
        name: "onlinecarte_add",
        query: { ...obj, ...obj.buffet_grid }
      })
    },
    show(obj) {
      console.log(obj)
      this.$Modal.info({
        closable: true,
        title: "柜前点餐详情",
        content: `餐柜地址：${obj.address}<br>
        餐柜名称：${obj.buffet_name}<br>
        商品名称：${obj.name}<br>
        商品ID：${obj.goods_id}<br>
        添加时间：${obj.year}-${obj.month}-${obj.day}<br>
        是否购买：${filters.is_buy(obj.is_buy)}<br>
        价格${obj.price}<br>
        优惠价:${obj.promote_price}<br>
        缩略图：<br><img src="${obj.thumb}" style="width:58px;"><br>
 
        `
      })
    }
  }
}
</script>

<style>
</style>
