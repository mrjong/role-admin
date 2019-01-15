<style lang="less">
</style>

<template>

  <div class="users_list">
    <!-- <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/buffet/buffet_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加网格</Button>
        </router-link>
      </p>
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="添加时间:" prop="addtime">
            <DatePicker style="width:100%" v-model="formItem.addtime" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择餐柜添加时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="餐柜ID:" prop="buffet_id">
            <Input clearable v-model="formItem.buffet_id" placeholder="请输入餐柜ID" clearable></Input>
          </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="餐柜名称:" prop="buffet_name">
            <Input clearable v-model="formItem.buffet_name" placeholder="请输入餐柜名称" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="餐柜地址:" prop="address">
            <Input clearable v-model="formItem.address" placeholder="请输入餐柜详细地址" clearable></Input>
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
    </Card> -->
    <Card class="vue-panel-table">
      <p slot="title">
        <span v-html="buffet_name"></span>
        <router-link to="/buffet/buffet_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加网格</Button>
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
import { buffet_list, buffet_del } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "buffet_list",
  data() {
    return {
      ruleValidate: {
        id: [
          { pattern: /^[0-9]*$/, message: "餐柜ID格式不正确", trigger: "blur" }
        ]
      },
      pageSize: 10,
      total: 0,
      buffet_name: "",
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
          title: "餐柜ID",
          width: 100,
          searchOperator: "=",
          sortable: true,
          key: "buffet_id"
        },
        {
          title: "餐柜编码",
          searchOperator: "=",
          key: "buffet_code"
        },
        {
          title: "餐柜添加时间",
          key: "addtime",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            const addtime = row.addtime
              ? filters.formatDate(
                  new Date(row.addtime * 1000),
                  "yyyy-MM-dd hh:mm:ss"
                )
              : row.addtime
            return h("span", addtime)
          }
        },
        {
          title: "餐柜名称",
          searchOperator: "like",
          key: "buffet_name",
          sortable: true
        },
        {
          title: "餐柜详细地址",
          searchOperator: "like",
          key: "address"
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
                      this.deleteGoods(params.row.buffet_id)
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
    if (this.$route.query && this.$route.query.buffet_id) {
      this.buffet_name =
        "网格编辑-" +
        `<span style="color:#2d8cf0">${this.$route.query.buffet_name}</span>`
    }
    this.formItem.buffet_id = this.$route.query.buffet_id
    this.getList()
  },
  methods: {
    async deleteGoods(id) {
      console.log(id)
      const res = await buffet_del({
        buffet_id: id
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
            searchOperator: "<="
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
    async getList() {
      const searchParam = []
      console.log(this.getParam())
      const res = await buffet_list({
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
      if (res.data && res.data.data) {
        this.tableData = res.data.data
        this.total = res.data.total
        this.pageNo = res.data.current_page
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
        name: "buffet_add",
        query: obj
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "餐柜详情",
        content: `餐柜名称：${obj.buffet_name}<br>
        餐柜ID：${obj.buffet_id}<br>
        餐柜编码：${obj.buffet_code}<br>
        经纬度：${obj.lat}，${obj.lng}<br>
        餐柜详细地址：${obj.address}<br>
        创建时间：${filters.formatDate(
          new Date(obj.addtime * 1000),
          "yyyy-MM-dd hh:mm:ss"
        )}<br>
        `
      })
    }
  }
}
</script>

<style>
</style>
