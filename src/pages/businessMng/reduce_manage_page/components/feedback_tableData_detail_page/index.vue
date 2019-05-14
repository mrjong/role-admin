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
          <span class="feedback_detail_info_dec">{{reliefAmt}}</span>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
          <span class="feedback_detail_info_title">申请减免类型：</span>
          <span class="feedback_detail_info_dec">{{reliefTypeName}}</span>
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
          <img :src="file_url" alt>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { relief_reliefFlow_getreliefflow } from '@/service/getData';
import Cookie from 'js-cookie';

export default {
  props: {
    model: Boolean,
    feedback_data: {}
  },
  model: {
    prop: "model",
    event: "passBack"
  },
  data() {
    return {
      headers: {
        'SXF-TOKEN': Cookie.get('SXF-TOKEN'),
        timeout: 120000,
      },
      prefix: '/admin/relief/relieford/images/',
      reliefAmt: null,//减免金额
      reliefTypeName: null,//减免类型
      file_url: null,//图片地址
      tableData: [], //表格数据
      tableColumns: [
        {
          title: "操作人",
          searchOperator: "like",
          key: "auditLoginName",
          className: "tableMainW",
          align: "center",
          width: 100
        },
        {
          title: "操作时间",
          searchOperator: "like",
          key: "updateTime",
          className: "tableMainW",
          align: "center",
          width: 150,
          render:(h, params) => {
            console.log(this.$options, 'opopopopo');
            let res = params.row.updateTime;
            res = res ? this.$options.filters['formatDate'](res, 'YYYY-MM-DD HH:mm:ss')
              : res;
            return h('span', res);
          }
        },
        {
          title: "操作动作",
          searchOperator: "like",
          key: "auditTypeName",
          className: "tableMainW",
          align: "center",
          width: 150
        },
        {
          title: "操作备注",
          searchOperator: "like",
          key: "auditRemark",
          className: "tableMainW",
          align: "center",
          width: 150
        }
      ] //表头
    };
  },
  created() {
    const { reliefAmt, reliefTypeName, reliefCertificate } = this.feedback_data;
    this.reliefAmt = reliefAmt;
    this.reliefTypeName = reliefTypeName;
    // _this.$options.filters['formatDate'](res,'YYYY-MM-DD HH:mm:ss')
    this.file_url = reliefCertificate ? this.prefix + this.feedback_data.reliefCertificate : '';
    this.relief_reliefFlow_getreliefflow(this.feedback_data.reliefNo)
  },
  methods: {
    del() {
      this.$emit("passBack", false);
    },
    //查看操作记录接口
    async relief_reliefFlow_getreliefflow(id) {
      const res = await relief_reliefFlow_getreliefflow({
        reliefNo: id
      });
      if (res.code === 1) {
        this.tableData = res.data;
      } else {
        this.$Message.error(res.message);
      }
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
  img {
    max-width: 350px;
  }
}
</style>

