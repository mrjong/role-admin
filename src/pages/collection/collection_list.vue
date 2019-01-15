<template>

  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title">
        检索条件
        <router-link to="/buffet/buffet_add">
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加</Button>
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
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="产品线:"
            prop="buffet_id"
          >
            <Input
              v-model="formItem.buffet_id"
              placeholder="请输入餐柜ID"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="添加时间:"
            prop="addtime"
          >
            <DatePicker
              style="width:100%"
              v-model="formItem.addtime"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              placement="bottom-start"
              placeholder="请选择餐柜添加时间"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="设备ID:"
            prop="device_id"
          >
            <Input
              clearable
              v-model="formItem.device_id"
              placeholder="请输入设备ID"
            ></Input>
          </FormItem>
          </Col>

          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="餐柜名称:"
            prop="buffet_name"
          >
            <Input
              clearable
              v-model="formItem.buffet_name"
              placeholder="请输入餐柜名称"
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem
            label="餐柜地址:"
            prop="address"
          >
            <Input
              clearable
              v-model="formItem.address"
              placeholder="请输入餐柜详细地址"
              clearable
            ></Input>
          </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formItem')"
              style="width:80px"
              long
            >检索</Button>
            <Button
              type="ghost"
              style="width:80px;margin-left: 8px"
              @click="clearForm('formItem')"
            >重置</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title">
        检索结果
        <router-link to="/buffet/buffet_add">
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >导出数据</Button>
        </router-link>
      </p>
      <!-- 表格 -->
      <Table
        :data="tableData"
        :columns="tableColumns"
        stripe
      ></Table>
      <!-- 分页 -->
      <div class="vue-panel-page">

        <div style="float: right;">
          <Page
            :total="total"
            show-total
            size="small"
            :page-size-opts="[10, 20, 50, 100]"
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
  buffet_list,
  buffet_del,
  buffet_delGrid,
  buffet_getPresetTime,
  buffet_delPresetTime,
  buffet_addPresetTime,
  buffet_setAd,
  buffet_editGrid,
  buffet_addGrid
} from "@/service/getData"
// import filters from '@/filters'
export default {
  name: "collection_list",
  data() {
    return {
      modal12: false,
      inputGrid: "",
      modal11: false,
      formValidate2: {},
      ruleValidate: {
        buffet_id: [
          {
            required: true,
            message: "请输入网格编号",
            trigger: "blur"
          }
        ]
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      formValidate3: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      },
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
          title: "设备ID",
          searchOperator: "=",
          key: "device_id"
        },
        {
          title: "餐柜添加时间",
          key: "addtime",
          sortable: true,
          width: 160,
          render: (h, params) => {
            const row = params.row
            const addtime = row.addtime
              ? this.$options.filters['formatDate'](
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
          key: "address",
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  style: {
                    margin: "0 5px"
                  },
                  props: {
                    content: params.row.address,
                    placement: "top"
                  },
                },
                [
                  h(
                    "div",
                    {
                    },
                    params.row.address
                  )
                ],
              )
            ])
          }
        },
        {
          title: "操作",
          width: 100,
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
                    "a",
                    {
                      class: 'edit-btn',
                      props: {
                      }
                    },
                    "删除"
                  ), h(
                    "a",
                    {
                      class: 'edit-btn',
                      props: {
                      }
                    },
                    "删除"
                  )
                ]
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
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo
      this.getList()
    },
    // 切换每页条数时的回调
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
    // 重置
    clearForm(name) {
      this.pageNo = 1
      this.formItem = {}
      this.$refs[name].resetFields()
    }
  }
}
</script>
