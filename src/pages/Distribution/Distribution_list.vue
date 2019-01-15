<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/evaluate/evaluate_add">
          <Button icon="plus" class="fr vue-back-btn header-btn" type="primary" size="small">添加评价</Button>
        </router-link>
      </p>
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="配送时间:" prop="add_goods_time">
            <DatePicker style="width:100%" v-model="formItem.add_goods_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择配送时间"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
           <FormItem label="餐柜:" prop="buffet_id">
                        <Select filterable placeholder="请选择餐柜" v-model="formItem.buffet_id">
                          <Option v-for="item in tableData2" :key="item.buffet_id" :value="item.buffet_id+''">{{item.buffet_name}}</Option>
                        </Select>
                    </FormItem>
          </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
           <FormItem label="配送员:" prop="push_userid">
                        <Select filterable placeholder="请选择配送员" v-model="formItem.push_userid">
                          <Option v-if="item.role===1" v-for="item in tableDataUser" :key="item.id" :value="item.id+''">{{item.nickname}}</Option>
                        </Select>
                    </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
          <FormItem label="配送方式:" prop="type">
            <Select v-model="formItem.type">
              <Option value='1'>预约配送</Option>
              <Option value='2'>柜前配送</Option>
            </Select>
            <!-- <Input clearable v-model="formItem.title" placeholder="请输入口碑" clearable></Input> -->
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
      <Table @on-selection-change="selectOne" @on-select-all="selectOne" :data="tableData" ref="selection" :columns="tableColumns" stripe></Table>
      <div class="vue-panel-page" v-if="tableData.length<total">
        <div style="float: right;">
          <Page :total="total" show-total show-elevator show-sizer :page-size="pageSize" :current="pageNo" @on-page-size-change="changeSize" @on-change="changePage"></Page>
        </div>

      </div>
    </Card>
  </div>
</template>

<script>
import {
  Distribution_record,
  evaluate_del,
  evaluate_check,
  evaluate_edit,
  user_list,
  buffet_list
} from "@/service/getData"
import filters from "@/filters"
export default {
  name: "Distribution_list",
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
      tableDataUser:[],
      pageNo: 1,
      modal6: false,
      // 对话框
      tableData2: [],
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      formItem: {
          type:'1'
      },
      editValue: "",
      editSelect: "",
      selectList: [],
      tableData: [],
      tableColumns: [
        {
          title: "菜品名称",
          searchOperator: "=",
          key: "name",
           render: (h, params) => {
            const row = params.row
            const name = row.goods&&row.goods.name
            return h("span", name)
          }
        },
        {
          title: "配送员",
          searchOperator: "=",
          key: "push_userid",
          render: (h, params) => {
            const row = params.row
            const name = row.push_user&&row.push_user.nickname
            return h("span", name)
          }
        },
        {
          title: "手机号",
          searchOperator: "=",
          key: "phone",
            render: (h, params) => {
            const row = params.row
            const name = row.push_user&&row.push_user.phone
            return h("span", name)
          }
        },
        {
          title: "餐柜",
          searchOperator: "=",
          key: "buffet_id",
             render: (h, params) => {
            const row = params.row
            const name = row.buffet&&row.buffet.buffet_name
            return h("span", name)
          }
        },
        {
          title: "格子编号",
          searchOperator: "=",
          key: "grid_code"
        },
             {
          title: "配送时间",
          width: 160,
          key: "add_goods_time",
          render: (h, params) => {
            const row = params.row
            const add_goods_time = row.add_goods_time
              ? filters.formatDate(
                  new Date(row.add_goods_time * 1000),
                  "yyyy-MM-dd hh:mm:ss"
                )
              : row.add_goods_time
            return h("span", add_goods_time)
          }
        },
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
    this.getUserList()
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
    async getList2() {
                const res = await buffet_list({
                    page: 1,
                    perPage: 99999,
                })
                if (res.data && res.data.data) {
                    this.tableData2 = res.data.data
                } else {
                    this.tableData2 = []
                }
            },
                    // 获取表格数据
    async getUserList() {
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
    async getList3() {
                const res = await buffet_list({
                    page: 1,
                    perPage: 99999,
                })
                if (res.data && res.data.data) {
                    this.tableData2 = res.data.data
                } else {
                    this.tableData2 = []
                }
            },
    selectOne(selection, row) {
      this.selectList = []
      selection &&
        selection.forEach(element => {
          this.selectList.push(element.id + "")
        })
      console.log(this.selectList)
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
      this.selectList=[]
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
        !(this.formItem.add_goods_time && this.formItem.add_goods_time[0]) ||
        !this.formItem.add_goods_time[1]
      ) {
        delete this.formItem.add_goods_time
      } else {
        let startTime = this.formItem.add_goods_time[0].getTime() / 1000
        let endTime = this.formItem.add_goods_time[1].getTime() / 1000
        console.log()
        let add_goods_time = [
          {
            searchValue: startTime,
            searchColumn: "add_goods_time",
            searchOperator: ">"
          },
          {
            searchValue: endTime,
            searchColumn: "add_goods_time",
            searchOperator: "<="
          }
        ]
        if (this.formItem && JSON.stringify(add_goods_time) !== "[]") {
          for (let i = 0; i < add_goods_time.length; i++) {
            searchParam.push(add_goods_time[i])
          }
        }
      }
      console.log(searchParam)
      let a= this.formItem
      for (let i = 0; i < this.tableColumns.length; i++) {
        for (const key in a) {
          if (
            a[key] &&
            this.tableColumns[i].searchOperator &&
            key === this.tableColumns[i].key &&
            key !== "add_goods_time"
          ) {
            let item = {}
            item.searchValue = a[key]
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
      const res = await Distribution_record(this.formItem.type,{
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
      if (res.data && res.data.list) {
        this.tableData = res.data.list
        this.total = res.data.total
        // this.pageNo = res.data.current_page
      } else {
        this.tableData = []
        this.total = 0
        this.pageNo = 1
      }
    },
    clearForm(name) { this.pageNo=1 
      this.formItem = {
          type:'1'
      }
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
          new Date(obj.add_goods_time * 1000),
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
