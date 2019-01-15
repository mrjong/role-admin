<style lang="less">
</style>

<template>

  <div class="users_list">
    <Card class="vue-panel">
      <p slot="title">
        条件查询
        <Button
          @click="download"
          icon="ios-download"
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
        >导出数据</Button>
        <!-- <router-link to="/carte/carte_add">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加菜单</Button>
        </router-link> -->
        <router-link to="/carte/batchadd">
          <Button
            icon="plus"
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >添加菜单</Button>
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
            prop="datetime"
          >
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
          <!-- <Col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            span="8"
          >
          <FormItem
            label="菜单类型:"
            prop="buffet_id"
          >
            <Select
              filterable
              placeholder="请选择菜单类型"
              v-model="formItem.buffet_id"
            >
              <Option
                v-for="item in tableData2"
                :key="item.buffet_id"
                :value="item.buffet_id+''"
              >{{item.buffet_name}}</Option>
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
            label="菜单名称:"
            prop="goods"
          >
            <Input
              clearable
              type="text"
              v-model="formItem.name"
              placeholder="请输入菜单名称"
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
      </p>
      <Table
        @on-selection-change="selectOne"
        @on-select-all="selectOne"
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
import { carte_list, buffet_list, carte_del } from "@/service/getData"
import filters from "@/filters"
import utils from "@/libs/util"
export default {
  name: "carte_list",
  data() {
    return {
      selectList: [],
      ruleValidate: {
        carte_id: [
          { pattern: /^[0-9]*$/, message: "菜品ID格式不正确", trigger: "blur" }
        ],
        goods_num: [
          {
            pattern: /^[0-9]*$/,
            message: "剩余数量格式不正确",
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
      tableData2: [],
      formItem: {},
      tableData: [],
      tableColumns: [
        {
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('span', params.index + (this.pageNo - 1) * 10 + 1);
          }
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "添加时间",
          width: 160,
          searchOperator: "=",
          key: "datetime",
          render: (h, params) => {

            return h("span", `${params.row.preset_year}-${params.row.preset_month}-${params.row.preset_day}`)
          }
        },
        {
          title: "餐柜名称",
          sortable: true,
          searchOperator: "=",
          key: "buffet_id",
          render: (h, params) => {
            const buffet_name = params.row.buffet_name
            return h("span", buffet_name)
          }
        },
        {
          title: "菜单名称",
          searchOperator: "like",
          width: 140,
          key: "name"
        },
        {
          title: "剩余数量",
          searchOperator: "like",
          key: "goods_num",
          sortable: true
        },
        {
          title: "使用红包",
          searchOperator: "like",
          key: "is_use_bonus",
          render: (h, params) => {
            const row = params.row
            const is_use_bonus = filters.is_not(Number(row.is_use_bonus))
            return h("span", is_use_bonus)
          }
        },
        {
          title: "使用卡券",
          searchOperator: "like",
          key: "is_use_coupon",
          render: (h, params) => {
            const row = params.row
            const is_use_coupon = filters.is_not(Number(row.is_use_coupon))
            return h("span", is_use_coupon)
          }
        },
        {
          title: "原价",
          searchOperator: "=",
          sortable: true,
          key: "price"
        },
        {
          title: "菜单类型",
          searchOperator: "like",
          key: "carte_type",
          render: (h, params) => {
            const row = params.row
            const carte_type = filters.carte_type(Number(row.carte_type))
            return h("span", carte_type)
          }
        },
        // {
        //   title: "促销价格",
        //   searchOperator: "=",
        //   sortable: true,
        //   key: "promote_price"
        // },
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
                      this.deleteGoods(params.row.carte_id)
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
    handleDelAll() {
      if (this.selectList.length !== 0) {
        this.deleteGoods(this.selectList)
      } else {
        this.$Message.error("请勾选需要操作的数据")
      }
    },
    selectOne(selection, row) {
      this.selectList = []
      selection &&
        selection.forEach(element => {
          this.selectList.push(element.carte_id + "")
        })
      console.log(this.selectList)
    },
    download() {
      utils.download('/admin/carte/export', {
        buffet_id: this.formItem.buffet_id,
        name_demo: this.formItem.name,
        datetime: +new Date(this.formItem.datetime) / 1000 + 1,
      })
    },
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
    async deleteGoods(id) {
      console.log(id)
      const res = await carte_del({
        carte_id: id
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
      console.log(this.formItem)
      let searchParam = []
      for (let i = 0; i < this.tableColumns.length; i++) {
        for (const key in this.formItem) {
          if (
            this.formItem[key] &&
            this.tableColumns[i].searchOperator &&
            key === this.tableColumns[i].key
          ) {
            let item = {}
            if (key === "datetime") {
              item.searchValue = +new Date(this.formItem[key]) + 3600 / 1000
              console.log("2222222222", item.searchValue)
            } else {
              item.searchValue = this.formItem[key]
            }
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
      console.log(+new Date(this.formItem.datetime) / 1000, '22222222222')
      const res = await carte_list({
        buffet_id: this.formItem.buffet_id,
        name_demo: this.formItem.name,
        datetime: +new Date(this.formItem.datetime) / 1000 + 1,
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
        name: "carte_add",
        query: obj
      })
    },
    show(obj) {
      let imgstring = "<div>"
      for (let i = 0; i < obj.goods_img.length; i++) {
        imgstring =
          imgstring +
          `<img src=${obj.goods_img[i]} style="width:58px;margin-left:5px">`
      }

      let discountstring = "<span>"
      for (let i = 0; i < obj.discount.length; i++) {
        discountstring =
          discountstring +
          `<div>
          <span>时间：${obj.discount[i].discount_start_time}</span>
          <span>- ${obj.discount[i].discount_send_time}</span>
          <span>折扣价：${obj.discount[i].discount_price}</span>
          </div>`
      }

      discountstring + "</div>"

      let onlineCarteInfostring = `<div class="ivu-table-wrapper"><div class="ivu-table"><div class="ivu-table-header"><table>
  <tr>
    <th>格子编码</th>
    <th>是否购买</th>
      <th>是否已补餐</th>
    <th>补餐员</th>
      <th>补餐员电话</th>
    <th>补餐时间</th>
  </tr><tbody class="ivu-table-tbody">`
      for (let i = 0; i < obj.onlineCarteInfo.length; i++) {
        onlineCarteInfostring =
          onlineCarteInfostring +
          ` 
  <tr class="ivu-table-row">
    <td>${obj.onlineCarteInfo[i].grid_code}</td>
    <td>${filters.is_buy(obj.onlineCarteInfo[i].is_buy)}</td>
       <td>${filters.is_push(obj.onlineCarteInfo[i].is_push)}</td>
    <td>${obj.onlineCarteInfo[i].push_user_info && obj.onlineCarteInfo[i].push_user_info.nickname || '-'}</td>
       <td>${obj.onlineCarteInfo[i].push_user_info && obj.onlineCarteInfo[i].push_user_info.phone || '-'}</td>
    <td>${obj.onlineCarteInfo[i].add_goods_time || '-'}</td>
  </tr>

       `
      }

      onlineCarteInfostring + "</tbody></table></div></div></div>"
      this.$Modal.info({
        // closable: true,
        title: "菜单详情",
        content: `菜单名称：${obj.name}<br>
        菜品ID：${obj.carte_id}<br>
        添加时间：${obj.preset_year}-${obj.preset_month}-${obj.preset_day}<br>
        商品ID：${obj.goods_id}<br>
        商品剩余数量：${obj.goods_num}<br>
        是否可以使用红包：${filters.is_not(Number(obj.is_use_bonus))}<br>
        预定降价金额：${obj.preset_depreciate}<br>
        是否商家推荐：${filters.is_not(Number(obj.is_recommend))}<br>
        显示顺序：${obj.sort_order}<br>
        原价：${obj.price}<br>
        简短描述：<br>${obj.brief}<br>
        ${obj.discount.length > 0 ?
            `折扣价：<br>${discountstring}<br>` : ''
          }
        详细描述：<br>${obj.desc || ''}<br>
        微缩图片：<br><img src="${obj.thumb}" style="width:58px;"><br>
        实际大小图片：<br>${imgstring}<br><div>
        创建时间：${filters.formatDate(
            new Date(obj.addtime * 1000),
            "yyyy-MM-dd hh:mm:ss"
          )}</div>
            ${obj.onlineCarteInfo.length > 0 ?
            `格子信息：${onlineCarteInfostring}` : ''
          }
        `
      })
    }
  }
}
</script>

<style>
</style>
