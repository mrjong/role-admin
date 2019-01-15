<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel-table">
      <p slot="title">
        活动奖励列表
        <router-link to="/activity_award/activity_award_add">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加活动奖励</Button>
        </router-link>
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
            span="8"
          >
          <FormItem
            label="活动:"
            prop="buffet_id"
          >
            <Select
              @on-change="changeG"
              filterable
              placeholder="请选择活动"
              v-model="formItem.activity_id"
            >
              <Option
                v-for="item in tableData2"
                :key="item.id"
                :value="item.id+''"
              >{{item.name}}</Option>
            </Select>
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
import { activity_award, activity_delAward, activity_list } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "activity_award_list",
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
      tableData2: [],
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
          title: "奖励ID",
          searchOperator: "=",
          key: "id"
        },
        {
          title: "创建时间",
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
          title: "活动ID",
          searchOperator: "=",
          key: "activity_id"
        },
        {
          title: "奖品名称",
          searchOperator: "like",
          key: "name",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            return h("div", [
              h("Avatar", {
                props: {
                  src: row.thumbnail_url
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
                row.name
              )
            ])
          }
        },
        {
          title: "数量(积分有效)",
          searchOperator: "=",
          key: "num"
        },
        {
          title: "关联ID(红包与卡券id)",
          searchOperator: "=",
          key: "union_id"
        },
        {
          title: "奖品类型",
          searchOperator: "like",
          key: "category",
          render: (h, params) => {
            const row = params.row
            const category = filters.activity_award_category(Number(row.category))
            return h("span", category)
          }
        },

        {
          title: "百分比(%)",
          searchOperator: "like",
          key: "percent",
          sortable: true
        },
        {
          title: "操作",
          width: 140,
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
                      this.deletepoints(params.row.id)
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
    this.getactivity_list()
  },
  methods: {
    async deletepoints(id) {
      console.log(id)
      const res = await activity_delAward({
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
      this.getList(this.formItem.activity_id)
    },
    changeG(val) {
      this.getList(val);
    },
    // 获取表格数据
    async getactivity_list() {
      const res = await activity_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.tableData2 = res.data.list.data
        this.formItem.activity_id = res.data.list.data[0].id + "";
        console.log(res.data.list.data[0].id, '-------')
        this.getList(res.data.list.data[0].id + '');
      } else {
        this.tableData2 = []
      }
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.getList(this.formItem.activity_id)
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
    async getList(id) {
      const searchParam = []
      const res = await activity_award({
        activity_id: id
      })
      if (res.data) {
        this.tableData = []
        for (let index = 0; index < res.data.length; index++) {
          this.tableData.push({
            ...res.data[index],
            ...res.data[index].detail
          })

        }
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
      sessionStorage.setItem('activity_award_refresh', true)
      this.$router.push({
        name: "activity_award_add",
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
