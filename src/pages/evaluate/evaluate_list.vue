<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/evaluate/evaluate_add">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加评价</Button>
        </router-link>
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
          <FormItem
            label="添加时间:"
            prop="add_time"
          >
            <DatePicker
              style="width:100%"
              v-model="formItem.add_time"
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
            label="餐柜/菜品名称:"
            prop="contents"
          >
            <Input
              clearable
              v-model="formItem.contents"
              placeholder="请输入餐柜/菜品名称"
              clearable
            ></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
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
            label="口碑:"
            prop="praise"
          >
            <Select v-model="formItem.praise">
              <Option value='3'>好评</Option>
              <Option value='1'>差评</Option>
              <Option value='2'>一般</Option>
            </Select>
            <!-- <Input clearable v-model="formItem.title" placeholder="请输入口碑" clearable></Input> -->
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
            label="类型:"
            prop="category"
          >
            <Select v-model="formItem.category">
              <Option value='1'>餐柜</Option>
              <Option value='2'>菜品</Option>
            </Select>
            <!-- <Input clearable v-model="formItem.title" placeholder="请输入口碑" clearable></Input> -->
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
            label="发布状态:"
            prop="isCheck"
          >
            <Select v-model="formItem.isCheck">
              <Option value='2'>已发布</Option>
              <Option value='1'>待发布</Option>
            </Select>
            <!-- <Input clearable v-model="formItem.title" placeholder="请输入口碑" clearable></Input> -->
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
            label="用户ID:"
            prop="user_id"
          >
            <Input
              clearable
              v-model="formItem.user_id"
              placeholder="请输入用户ID"
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
      <p slot="title">
        <Button
          @click="handleDelAll()"
          class="fl vue-back-btn header-btn"
          type="error"
          size="small"
        >批量删除</Button>
        <Button
          @click="handleSelectAll(true)"
          class="fl vue-back-btn header-btn"
          type="success"
          size="small"
        >批量发布</Button>
        <Button
          @click="handleSelectAll(false)"
          class="fl vue-back-btn header-btn"
          type="warning"
          size="small"
        >批量撤回</Button>
      </p>
      <Table
        @on-selection-change="selectOne"
        @on-select-all="selectOne"
        :data="tableData"
        ref="selection"
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
import {
  evaluate_list,
  evaluate_del,
  evaluate_check,
  evaluate_edit
} from "@/service/getData"
import filters from "@/filters"
export default {
  name: "evaluate_list",
  data() {
    return {
      ruleValidate: {
        id: [
          { pattern: /^[0-9]*$/, message: "新闻ID格式不正确", trigger: "blur" }
        ]
      },
      pageSize: 10,
      status: false,
      total: 0,
      pageNo: 1,
      modal6: false,
      // 对话框
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      formItem: {},
      editValue: "",
      editSelect: "",
      selectList: [],
      tableData: [],
      tableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "新闻ID",
          width: 100,
          searchOperator: "=",
          sortable: true,
          key: "id"
        },
        {
          title: "添加时间",
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
          title: "口碑",
          searchOperator: "=",
          key: "praise",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            const praise = filters.praise(row.praise)
            return h("span", praise)
          }
        },
        {
          title: "类型",
          searchOperator: "=",
          key: "category",
          sortable: true,
          render: (h, params) => {
            const row = params.row
            const category = filters.category(row.category)
            return h("span", category)
          }
        },
        {
          title: "用户ID",
          searchOperator: "like",
          key: "user_id"
        },
        {
          title: "餐柜/菜品名称",
          searchOperator: "like",
          key: "unionName"
        },
        {
          title: "发布状态",
          searchOperator: "=",
          key: "isCheck",
          render: (h, params) => {
            const row = params.row
            const isCheck = filters.isCheck(Number(row.isCheck))
            return h("span", isCheck)
          }
        },
        {
          title: "评价内容",
          key: "contents"
        },
        {
          title: "操作",
          width: 240,
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
                      this.deleteGoods(JSON.stringify([params.row.id]))
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
                      this.editPwd(params.row)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: `您确定要${
                      params.row.isCheck === 1 ? "发布" : "撤回"
                      }这条数据吗?`,
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.isCheckConfirm(
                        params.row.id,
                        params.row.isCheck === 1 ? "2" : "1"
                      )
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
                        type: params.row.isCheck === 1 ? "success" : "warning",
                        placement: "top"
                      }
                    },
                    params.row.isCheck === 1 ? "发布" : "撤回"
                  )
                ]
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
    editPwd(obj) {
      // this.$Modal.remove()
      this.editValue = obj.contents
      this.editSelect = obj.praise + ""
      this.$Modal.confirm({
        // closable: true,
        title: "编辑评论",
        render: h => {
          return [
            h(
              "Select",
              {
                props: {
                  value: this.editSelect,
                  clearable: true,
                  placeholder: "请选择口碑"
                },
                style: {
                  marginTop: "20px"
                },
                on: {
                  input: val => {
                    this.editSelect = val
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    props: {
                      value: "3"
                    }
                  },
                  "好评"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "1"
                    }
                  },
                  "差评"
                ),
                h(
                  "Option",
                  {
                    props: {
                      value: "2"
                    }
                  },
                  "一般"
                )
              ]
            ),
            h("Input", {
              props: {
                value: this.editValue,
                type: "textarea",
                maxlength: 250,
                clearable: true,
                placeholder: "请输入评价内容"
              },
              style: {
                marginTop: "15px",
                marginBottom: "-20px"
              },
              on: {
                input: val => {
                  this.editValue = val
                }
              }
            })
          ]
        },
        onOk: async () => {
          if (!this.editSelect) {
            this.$Message.error("请选择口碑", 3)
            return
          }
          if (!this.editValue) {
            this.$Message.error("请输入评价内容", 3)
            return
          }
          await evaluate_edit({
            id: obj.id,
            praise: this.editSelect || obj.praise,
            contents: this.editValue || obj.contents
          })
          setTimeout(() => {
            this.getList()
          }, 2000)
          this.editValue = ""
          this.editSelect = ""
        }
      })
    },
    selectOne(selection, row) {
      this.selectList = []
      selection &&
        selection.forEach(element => {
          this.selectList.push(element.id + "")
        })
      console.log(this.selectList)
    },
    handleDelAll() {
      if (this.selectList.length !== 0) {
        this.deleteGoods(JSON.stringify(this.selectList))
      } else {
        this.$Message.error("请勾选需要操作的数据")
      }
    },
    handleSelectAll(status) {
      if (this.selectList.length !== 0) {
        this.isCheckConfirm(this.selectList, status ? "2" : "1")
      } else {
        this.$Message.error("请勾选需要操作的数据")
      }
    },
    async isCheckConfirm(id, isCheck) {
      console.log(id)
      let ids = []
      if (Object.prototype.toString.call(id) !== "[object Array]") {
        ids.push(id + "")
      } else {
        ids = id
      }

      const res = await evaluate_check({
        ids: JSON.stringify(ids),
        isCheck
      })
      if (res) {
        this.selectList = []
        setTimeout(() => {
          this.getList()
        }, 2000)
      }
    },
    async deleteGoods(id) {
      console.log(id)
      const res = await evaluate_del({
        id: id
      })
      if (res) {
        setTimeout(() => {
          this.page = 1
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
      const res = await evaluate_list({
        searchParam:
          this.formItem &&
          JSON.stringify(this.formItem) !== "{}" &&
          this.getParam(),
        page: this.pageNo,
        perPage: this.pageSize,
        type222:1,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list) {
        this.tableData = []
        res.data.list.forEach(element => {
          if (element.isCheck === 1) {
            element._checked = false
          } else {
            element._checked = false
          }
          this.tableData.push(element)
        })
        this.total = res.data.total
        // this.pageNo = res.data.current_page
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
        name: "evaluate_add",
        query: obj
      })
    },
    show(obj) {
      this.$Modal.info({
        // closable: true,
        title: "评价详情",
        content: `类型：${filters.category(obj.category)}<br>
        用户ID：${obj.user_id}<br>
        餐柜/菜品名称：${obj.unionName}<br>
        用户名：${obj.userName}<br>
        口碑：${filters.praise(obj.praise)}<br>
        发布状态：${filters.isCheck(obj.isCheck)}<br>
        创建时间：${filters.formatDate(
            new Date(obj.add_time * 1000),
            "yyyy-MM-dd hh:mm"
          )}<br>
        评价内容：<br>${obj.contents}<br>
        `
      })
    }
  }
}
</script>

<style>
</style>
