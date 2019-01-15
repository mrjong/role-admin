<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel-table">
      <p slot="title">
        答题奖励列表
        <router-link to="/award/award_add">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加答题奖励</Button>
        </router-link>
      </p>
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
import { answer_award, answer_delAward } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "answer_award_list",
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
          title: "奖励ID",
          searchOperator: "=",
          key: "id"
        },
        {
          title: "红包名称",
          searchOperator: "like",
          key: "name",
          sortable: true
        },
        {
          title: "所值金额",
          searchOperator: "like",
          key: "money",
          sortable: true
        },
        {
          title: "最低消费金额",
          searchOperator: "like",
          key: "min_goods_amount",
          sortable: true
        },
        {
          title: "百分比",
          searchOperator: "like",
          key: "percent",
          sortable: true
        },
        {
          title: "红包所值的金额",
          searchOperator: "like",
          key: "money",
          sortable: true
        },
        {
          title: "红包使用时长 ",
          searchOperator: "like",
          key: "use_date_length",
          sortable: true
        },
        {
          title: "红包开始时间",
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
              : row.use_start_date
            return h("span", use_start_date)
          }
        },
        {
          title: "红包使用结束时间",
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
              : row.use_end_date
            return h("span", use_end_date)
          }
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
    this.getList()
  },
  methods: {
    async deletepoints(id) {
      console.log(id)
      const res = await answer_delAward({
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
      const res = await answer_award()
      if (res.data) {
          this.tableData=[]
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
      this.$router.push({
        name: "award_add",
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
