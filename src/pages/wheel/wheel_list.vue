<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/wheel/wheel_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加轮播图</Button>
        </router-link>
      </p>
      <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="添加时间:" prop="add_time">
            <DatePicker style="width:100%" v-model="formItem.add_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择添加时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="轮播图ID:" prop="id">
            <Input clearable v-model="formItem.id" placeholder="请输入轮播图ID" clearable></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="标题:" prop="title">
            <Input clearable v-model="formItem.title" placeholder="请输入标题" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="排序号:" prop="rank">
            <Input clearable v-model="formItem.rank" placeholder="请输入排序号" clearable></Input>
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
import { wheel_list, wheel_del } from "@/service/getData"
import filters from "@/filters"
export default {
  name: "wheel_list",
  data() {
    return {
      ruleValidate: {
        id: [
          {
            pattern: /^[0-9]*$/,
            message: "轮播图ID格式不正确",
            trigger: "blur"
          }
        ]
      },
      pageSize: 1,
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
          title: "排序号",
          searchOperator: "=",
          sortable: true,
          key: "rank"
        },
        {
          title: "轮播图ID",
          searchOperator: "=",
          sortable: true,
          key: "id"
        },
        {
          title: "添加时间",
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
          title: "标题",
          searchOperator: "like",
          key: "title",
          sortable: true
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
  created() {
    this.getList()
  },
  methods: {
    async deleteGoods(id) {
      console.log(id)
      const res = await wheel_del({
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
      const res = await wheel_list({
        searchParam:
          this.formItem &&
          JSON.stringify(this.formItem) !== "{}" &&
          this.getParam(),
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list) {
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
      this.formItem = {}
      this.$refs[name].resetFields()
    },
    edit(obj) {
      this.$router.push({
        name: "wheel_add",
        query: obj
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "轮播图详情",
        content: `标题：${obj.title}<br>
        轮播图ID：${obj.id}<br>
        排序号：${obj.rank}<br>
        添加时间：${filters.formatDate(
          new Date(obj.add_time * 1000),
          "yyyy-MM-dd hh:mm:ss"
        )}<br>
        轮播图：<br><img src="${obj.img_url}" style="width:58px;"><br>
        链接地址：<br><a target="_brank" href="${obj.link_url}">${
          obj.link_url
        }</a><br>
        `
      })
    }
  }
}
</script>

<style>
</style>
