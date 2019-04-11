<template>
  <div>
    <Modal
      class="feedback_tableData_detail"
      width="600"
      v-model="model"
      @on-visible-change="del"
      title="减免信息"
      class-name="feedback_tableData_detail_modal"
      :mask-closable="false"
      :footer-hide="true"
    >
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
          <span class="feedback_detail_info_title">申请减免金额：</span>
          <span class="feedback_detail_info_dec">1000.00</span>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
          <span class="feedback_detail_info_title">申请减免类型：</span>
          <span class="feedback_detail_info_dec">罚息减免</span>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <span class="feedback_detail_info_img_title">操作信息</span>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <Table
            width="550"
            border
            :data="tableData"
            :columns="tableColumns"
            stripe
            class="tableBox"
          ></Table>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <span class="feedback_detail_info_img_title">凭证信息</span>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="24" class="img_col">
          <img src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" alt>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    model: Boolean
  },
  model: {
    prop: "model",
    event: "passBack"
  },
  data() {
    return {
      tableData: [], //表格数据
      tableColumns: [
        {
          title: "操作人",
          searchOperator: "like",
          key: "operator",
          className: "tableMainW",
          align: "center",
          width: 100
        },
        {
          title: "操作时间",
          searchOperator: "like",
          key: "operationTime",
          className: "tableMainW",
          align: "center",
          width: 150
        },
        {
          title: "操作动作",
          searchOperator: "like",
          key: "operationMotion",
          className: "tableMainW",
          align: "center",
          width: 150
        },
        {
          title: "操作备注",
          searchOperator: "like",
          key: "remark",
          className: "tableMainW",
          align: "center",
          width: 150
        }
      ] //表头
    };
  },
  methods: {
    del() {
      this.$emit("passBack", false);
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-col {
  margin-bottom: 10px;
}
.feedback_detail_info_title,
.feedback_detail_info_dec {
  font-size: 14px;
  color: #333;
}
.feedback_detail_info_title {
  margin-right: 8px;
}
.feedback_detail_info_img_title {
  line-height: 20px;
  font-size: 14px;
  color: #17233d;
  font-weight: 700;
}
.img_col {
  text-align: center;
}
</style>

