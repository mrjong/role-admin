<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel-table">
         <p slot="title">
        公告列表
        <router-link to="/notice/notice_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加公告</Button>
        </router-link>
      </p>
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
import { notice_list, notice_del } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "notice_list",
  data() {
    return {
      ruleValidate: {
        id: [
          { pattern: /^[0-9]*$/, message: "公告ID格式不正确", trigger: "blur" }
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
          title: "公告ID",
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
          title: "公告状态",
          sortable: true,
           width: 130,
          key: "status",
            render: (h, params) => {
            const row = params.row
            const status = filters.notice_type(Number(row.status))
            return h("span", status)
          }
        },
          {
          title: "公告内容",
          key: "contents",
             render: (h, params) => {
            const row = params.row
            const is_use_bonus = row.contents.substring(1,50)+'...'
            return h("span", is_use_bonus)
          }
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
      const res = await notice_del({
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
            searchOperator: "<="
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
      const res = await notice_list({
        searchParam:
          this.formItem &&
          JSON.stringify(this.formItem) !== "{}" &&
          this.getParam(),
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list ) {
        this.tableData = res.data.list
        this.total = res.data.list.total
        this.pageNo = res.data.list.current_page
      } else {
        this.tableData = []
        this.total = 0
        this.pageNo = 1
      }
    },
    clearForm(name) { this.pageNo=1 
      // this.$Modal.remove()
      this.formItem = {}
      this.$refs[name].resetFields()
    },
    edit(obj) {
      this.$router.push({
        name: "notice_add",
        query: obj
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "公告详情",
        content: `
        公告ID：${obj.id}<br>
        添加时间：${filters.formatDate(
          new Date(obj.add_time * 1000),
          "yyyy-MM-dd hh:mm:ss"
        )}<br>
        公告状态：${filters.notice_type(Number(obj.status))}<br>
        内容：<br>${obj.contents}<br>
        `
      })
    }
  }
}
</script>

<style>
</style>
