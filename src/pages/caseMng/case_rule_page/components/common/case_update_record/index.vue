<template>
  <div class="panel_list">
    <Modal
      v-model="model.updateRecordFlag"
      width="80%"
      class-name="user_info_form_modal"
      :mask-closable="false"
      @on-visible-change="close"
    >
      <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
        <span>修改记录</span>
      </p>
      <!-- 表格 -->
      <div>
        <Table :data="tableData" border :columns="tableColumns" stripe></Table>
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
      </div>
      <div slot="footer">
        <!-- <Button   size="small" @click="cancel('1')">取消</Button>
        <Button type="primary" size="small" @click="ok('1', 'startFormItem')">确定</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
import { divide_rules_his } from "@/service/getData";

export default {
  props: { model: "" },
  model: {
    prop: "model",
    event: "passBack"
  },
  data() {
    return {
      tableData: [],
      childrenFlag: false,
      tableColumns: [
        {
          title: "序号",
          width: 80,
          searchOperator: "=",
          type: "index",
          align: "center",
          fixed: "left"
        },
        {
          title: "修改时间",
          width: 100,
          searchOperator: "=",
          key: "updateTime",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const updateTime = row.updateTime
              ? this.$options.filters["formatDate"](
                  row.updateTime,
                  "YYYY-MM-DD HH:mm:ss"
                )
              : row.updateTime;
            return h("span", updateTime);
          }
        },
        {
          title: "修改人",
          width: 100,
          searchOperator: "=",
          key: "updateUser",
          align: "center",
          render: (h, params) => {
            return h("span", {
              domProps: {
                innerHTML: `${params.row.updateUser?params.row.updateUser: ''}`
              }
            });
          }
        },
        {
          title: "产品线",
          width: 80,
          searchOperator: "=",
          key: "prodType",
          align: "center",
          render: (h, params) => {
            return h("div", {
              domProps: {
                innerHTML: `${params.row.prodType?params.row.prodType: ''}`
              }
            });
          }
        },
        {
          title: "期数",
          width: 100,
          searchOperator: "=",
          key: "perdCounts",
          align: "center",
          render: (h, params) => {
            return h("div", {
              domProps: {
                innerHTML: `${params.row.perdCounts?params.row.perdCounts:''}`
              }
            });
          }
        },
        {
          title: "到期期数",
          width: 100,
          searchOperator: "=",
          key: "perdThisCounts",
          align: "center",
          render: (h, params) => {
            return h("div", {
              domProps: {
                innerHTML: `${params.row.perdThisCounts?params.row.perdThisCounts:''}`
              }
            });
          }
        },
        {
          title: "逾期天数",
          width: 100,
          searchOperator: "=",
          key: "ovdudaysMin",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  },
                  domProps: {
                    innerHTML: `${params.row.ovdudaysMin?params.row.ovdudaysMin: ''}-`
                  }
                },
                params.row.ovdudaysMin
              ),
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  },
                  domProps: {
                    innerHTML: `-${params.row.ovdudaysMax?params.row.ovdudaysMax: ''}`
                  }
                },
                params.row.ovdudaysMax
              )
            ]);
          }
        },
        {
          title: "逾期金额",
          width: 100,
          searchOperator: "=",
          key: "ovduamtMin",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  },
                  domProps: {
                    innerHTML: `${params.row.ovduamtMin?params.row.ovduamtMin:''}-`
                  }
                },
                params.row.ovduamtMin
              ),
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  },
                  domProps: {
                    innerHTML: `-${params.row.ovduamtMax?params.row.ovduamtMax:''}`
                  }
                },
                params.row.ovduamtMax
              )
            ]);
          }
        },
        {
          title: "信用分",
          width: 100,
          searchOperator: "=",
          key: "creditLevel",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                domProps: {
                  innerHTML: `${params.row.creditLevel?params.row.creditLevel:''}`
                }
              },
              params.row.creditLevel
            );
          }
        },
        {
          title: "分配方式",
          width: 80,
          searchOperator: "=",
          key: "allotType",
          align: "center",
          render: (h, params) => {
            return h("div", {
              domProps: {
                innerHTML: `${params.row.allotType?params.row.allotType: ''}`
              }
            });
          }
        },
        {
          title: "分配人数",
          width: 80,
          searchOperator: "=",
          key: "allotCounts",
          align: "center",
          render: (h, params) => {
            return h("div", {
              domProps: {
                innerHTML: `${params.row.allotCounts?params.row.allotCounts:''}`
              }
            });
          }
        },
        {
          title: "设定时间",
          width: 180,
          searchOperator: "=",
          key: "effectMinDt",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  },
                  domProps: {
                    innerHTML: `${params.row.effectMinDt?params.row.effectMinDt: ''}`
                  }
                },
                params.row.effectMinDt
                  ? this.$options.filters["tableDate"](params.row.effectMinDt)
                  : null
              ),
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  }
                },
                "至"
              ),
              h(
                "span",
                {
                  class: "edit-btn",
                  props: {},
                  style: {
                    borderRight: "none",
                    padding: "0px"
                  },
                  domProps: {
                    innerHTML: `${params.row.effectMaxDt? params.row.effectMaxDt: ''}`
                  }
                },
                params.row.effectMaxDt
                  ? this.$options.filters["tableDate"](params.row.effectMaxDt)
                  : null
              )
            ]);
          }
        },
        {
          title: "状态",
          width: 80,
          searchOperator: "=",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h("div", {
              domProps: {
                innerHTML: `${params.row.status?params.row.status: ''}`
              }
            });
          }
        }
      ],
      pageNo: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getList(this.model.id);
    console.log(this.model)
  },
  methods: {
    // 页码改变的回调
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList(this.model.id);
    },
    // 切换每页条数时的回调
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.getList(this.model.id);
    },
    // 关闭回调
    close() {
      this.childrenFlag = this.model.updateRecordFlag;
      this.childrenFlag = false;
      this.$emit("passBack", this.childrenFlag);
    },
    // 获取表格数据
    async getList(id) {
      const res = await divide_rules_his({
        uuid: id,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      console.log(res);
      if (res.code === 1) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
      } else {
        this.$Message.error(res.message);
      }
    }
  }
};
</script>
