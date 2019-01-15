<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <router-link to="/buffet/buffet_add">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加餐柜</Button>
        </router-link>
        <router-link to="/buffet/buffet_desc">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >餐柜使用情况</Button>
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
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="餐柜ID:"
            prop="buffet_id"
          >
            <Input
              clearable
              v-model="formItem.buffet_id"
              placeholder="请输入餐柜ID"
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
            label="设备ID:"
            prop="device_id"
          >
            <Input
              clearable
              v-model="formItem.device_id"
              placeholder="请输入设备ID"
              clearable
            ></Input>
            <!-- <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="请选择日期"></DatePicker> -->
          </FormItem>
          </Col>
          <!-- <Col :xs="24" :sm="24" :md="8" :lg="8" span="8">
            <FormItem label="设备状态:" prop="state">
            <Select v-model="formItem.state">
            <Option value=''>全部</Option>
              <Option value='0'>在线</Option>
              <Option value='1'>掉线</Option>
            </Select>
          </FormItem>
          </Col> -->

          <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="餐柜名称:"
            prop="buffet_name"
          >
            <Input
              clearable
              v-model="formItem.buffet_name"
              placeholder="请输入餐柜名称"
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
    <Modal
      title="预约时间段"
      v-model="modal11"
      class-name="test vertical-center-modal"
    >
      <Button
        style="margin-top: -5px;margin-bottom: 10px;"
        type="primary"
        icon="plus"
        size="small"
        @click="modal12 = true"
      >添加预约时间</Button>
      <Table
        border
        :columns="columns8"
        :data="data7"
      ></Table>
      <div slot="footer">
      </div>
    </Modal>
    <Modal
      title="添加时间段"
      v-model="modal12"
      class-name="test vertical-center-modal"
    >
      <Form
        ref="formValidate3"
        :model="formValidate3"
        :rules="ruleValidate"
      >
        <div
          v-for="(item, index) in formValidate3.items"
          :key="index"
        >
          <Row
            v-if="item.status"
            :gutter="16"
          >
            <Col span="9">
            <FormItem
              :prop="'items.' + index + '.name'"
              :rules="{required: true, message: '请输入预约时间段名称', trigger: 'blur'}"
            >
              <Input
                type="text"
                v-model="item.name"
                placeholder="请输入预约时间段名称"
              ></Input>
            </FormItem>
            </Col>

            <Col span="9">
            <FormItem
              :prop="'items.' + index + '.time'"
              :rules="{validator: use_start_date_validator,  trigger: 'change'}"
            >
              <TimePicker
                v-model="item.time"
                format="HH:mm"
                type="timerange"
                placement="bottom-end"
                placeholder="请选择预约时间段"
              ></TimePicker>
            </FormItem>
            </Col>
            <Col
              span="4"
              offset="1"
            >
            <Button
              type="error"
              @click="handleRemove(index)"
            >删除</Button>
            </Col>
          </Row>
        </div>
        <FormItem>
          <Row>
            <Col span="12 ">
            <Button
              type="dashed"
              long
              @click="handleAdd"
              icon="plus-round "
            >添加预约时间段</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            @click="handleSubmit2('formValidate3') "
          >保存</Button>
          <!-- <Button type="ghost " @click="handleReset( 'formValidate') " style="margin-left: 8px ">清空</Button> -->
        </FormItem>
      </Form>

      <div slot="footer">
      </div>
    </Modal>
    <Modal
      title="餐柜网格"
      v-model="modal10"
      class-name="test vertical-center-modal"
    >
      <Form
        ref="formInline"
        :rules="ruleValidate"
      >
        <Row
          :gutter="16"
          class="add-grid"
        >
          <Col
            :md="19"
            span="19"
            :lg="19"
            :xs="24"
            :sm="24"
          >
          <FormItem prop="inputGrid">
            <Input
              clearable
              v-model="inputGrid"
              placeholder="请输入网格编号，批量多个可用，隔开"
            />
          </FormItem>
          </Col>
          <Col
            :md="4"
            :lg="4"
            :xs="24"
            :sm="24"
          >
          <FormItem>
            <Button
              type="primary"
              @click="addGrid"
            >添加网格</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        border
        :columns="columns7"
        :data="data6"
      ></Table>
      <div slot="footer">
      </div>
    </Modal>
    <Modal
      title="编辑网格"
      :on-ok="sure"
      class="test vertical-center-modal"
      v-model="modal9"
    >
      <Form
        ref="formValidate"
        :model="formValidate2"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem
          label="网格编号"
          prop="grid_code"
        >
          <Input
            clearable
            v-model="formValidate2.grid_code"
            placeholder="请输入网格编号"
          ></Input>
        </FormItem>
        <!-- <FormItem label="状态" prop="is_lock">
          <Select placeholder="请选择使用状态" v-model="formValidate2.is_lock">
              <Option value='1'>使用中</Option>
              <Option value='0'>未使用</Option>
            </Select>
        </FormItem> -->
        <FormItem>
          <Button
            type="primary"
            @click="sure"
          >保存</Button>
          <Button
            type="ghost"
            @click="cancle"
            style="margin-left: 8px"
          >取消</Button>
        </FormItem>
      </Form>

      <div slot="footer">
      </div>
    </Modal>
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
import filters from "@/filters"
export default {
  name: "buffet_list",
  data() {
    const use_start_date_validator = (rule, value, callback) => {
      console.log(value)
      if (!value[0] || !value[1]) {
        callback(new Error("请选择预约时间段"))
      } else {
        callback()
      }
    }
    return {
      modal12: false,
      inputGrid: "",
      data6: [],
      use_start_date_validator,
      data7: [],
      modal11: false,
      formValidate2: {},
      columns7: [
        {
          title: "网格编号",
          key: "grid_code"
        },
        //   {
        //   title: "使用状态",
        //   key: "is_lock",
        //    render: (h, params) => {
        //      console.log(params.row.is_lock)
        //     return h("span", filters.is_lock(Number(params.row.is_lock)))}
        // },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
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
                      this.deleteGrid(params.row.grid_id)
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
                  on: {
                    click: () => {
                      this.modal9 = true
                      this.formValidate2 = {
                        ...params.row,
                        is_lock: params.row.is_lock ? params.row.is_lock + '' : '0'
                      }
                    }
                  }
                },
                "编辑"
              )
            ])
          }
        }
      ],
      columns8: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "开始时间",
          key: "start_time"
        },
        {
          title: "结束时间",
          key: "end_time"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
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
                      this.delPresetTime(params.row.id)
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
              )
            ])
          }
        }
      ],
      ruleValidate: {
        grid_code: [
          {
            required: true,
            message: "请输入网格编号",
            trigger: "blur"
          }
        ],
        is_lock: [
          {
            required: true,
            type: 'string',
            message: "请选择使用状态",
            trigger: "change"
          }
        ],
        id: [
          { pattern: /^[0-9]*$/, message: "餐柜ID格式不正确", trigger: "blur" }
        ]
      },
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
      modal9: false,
      modal10: false,
      pageNo: 1,
      modal6: false,
      itemBuffet: {},
      // 对话框
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      buffet_idItem: "",
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
          title: "状态",
          searchOperator: "=",
          key: "state",
          render: (h, params) => {
            const row = params.row
            const state = filters.state(row.state)
            return h("Tag", {
              props: {
                type: 'dot',
                color: row.state === 0 ? 'green' : 'red'
              },

            }, state)
          }
        },
        {
          title: "操作",
          width: 450,
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.go_grid(params.row)
                    }
                  }
                },
                "编辑网格"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show11(params.row.buffet_id)
                    }
                  }
                },
                "预约时间段"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.setAd(params.row.device_id, params.row.buffet_id)
                    }
                  }
                },
                "设置餐柜首页"
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
    handleAdd() {
      this.index++
      this.formValidate3.items.push({
        name: "",
        time: "",
        index: this.index,
        status: 1
      })
    },
    handleRemove(index) {
      this.formValidate3.items[index].status = 0
    },
    async show11(id) {
      const res = await buffet_getPresetTime({
        buffet_id: id
      })
      if (res) {
        this.modal11 = true
        this.buffet_idItem = id
        this.data7 = res.data
      }
    },
    async setAd(id, buffet_id) {
      const res = await buffet_setAd({
        device_id: id,
        buffet_id
      })
      if (res) {
        console.log(res, '0000000000000000')
      }
    },
    async sure() {
      const res = await buffet_editGrid({
        grid_id: this.formValidate2.grid_id,
        is_lock: this.formValidate2.is_lock,
        grid_code: this.formValidate2.grid_code
      })
      if (res) {
        setTimeout(() => {
          this.getList()
        }, 2000)
        setTimeout(() => {
          this.modal10 = false
          this.modal9 = false
        }, 3000)
      }
    },
    cancle() {
      this.modal9 = false

    },
    async addTime() {
      console.log(this.formValidate3)
      if (!this.formValidate3.name) {
        this.$Message.error("请输入预约时间名称", 3)
        return
      }
      if (
        !this.formValidate3.timerRange[0] ||
        !this.formValidate3.timerRange[1]
      ) {
        this.$Message.error("请选择预约时间段", 3)
        return
      }
      let inputGrid = ""
      inputGrid = this.inputGrid
      if (inputGrid.indexOf(",") > -1) {
        inputGrid = this.inputGrid.split(",")
      }
      const res = await buffet_addGrid({
        buffet_id: this.itemBuffet.buffet_id,
        grid_code: inputGrid
      })
      if (res) {
        setTimeout(() => {
          this.getList()
        }, 2000)
        setTimeout(() => {
          this.modal10 = false
          this.inputGrid = ""
        }, 3000)
      }
    },
    addGrid() {
      if (!this.inputGrid) {
        this.$Message.error("请输入网格编号", 3)
        return
      }
      this.getList2()
    },
    async getList2() {
      let inputGrid = ""
      inputGrid = this.inputGrid
      if (inputGrid.indexOf(",") > -1) {
        inputGrid = this.inputGrid.split(",")
      }
      const res = await buffet_addGrid({
        buffet_id: this.itemBuffet.buffet_id,
        grid_code: inputGrid
      })
      if (res) {
        setTimeout(() => {
          this.getList()
        }, 2000)
        setTimeout(() => {
          this.modal10 = false
          this.inputGrid = ""
        }, 3000)
      }
    },
    async deleteGrid(id) {
      console.log(id)
      const res = await buffet_delGrid({
        grid_id: id
      })
      if (res) {
        this.data6.forEach((element, index) => {
          if (id === element.grid_id) {
            this.data6.splice(index, 1)
          }
        })

        setTimeout(() => {
          this.getList()
        }, 2000)
      }
    },
    async delPresetTime(id) {
      console.log(id)
      const res = await buffet_delPresetTime({
        id: id
      })
      if (res) {
        this.data7.forEach((element, index) => {
          if (id === element.id) {
            this.data7.splice(index, 1)
          }
        })
      }
    },
    go_grid(obj) {
      this.data6 = obj.buffet_grid
      this.itemBuffet = obj
      this.modal10 = true
    },
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
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getList5()
        } else {
          this.$Message.error("查询条件格式有误，请重新填写")
        }
      })
    },
    // 获取表格数据
    async getList5() {
      console.log(this.formValidate3)
      let preset_time = []
      this.formValidate3.items.forEach(element => {
        if (element.name && element.time[0] && element.time[1]) {
          preset_time.push({
            name: element.name,
            start_time: element.time[0],
            end_time: element.time[1]
          })
        }
      })
      const res = await buffet_addPresetTime({
        buffet_id: this.buffet_idItem,
        preset_time
      })
      if (res) {
        this.buffet_idItem = ""
        this.formValidate3 = {
          items: [
            {
              value: "",
              index: 1,
              status: 1
            }
          ]
        }
        this.modal12 = false
        this.modal11 = false
      }
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
    clearForm(name) {    this.pageNo = 1
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
        餐柜ID：${obj.buffet_id}<br>
        设备状态：${filters.state(obj.state)}<br>
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
<style lang="less">
.test {
  .ivu-modal-footer {
    border: none;
    padding: 0;
  }
}
</style>
