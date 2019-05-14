<template>
  <div>
    <Modal
      class="apply_tableData_detail"
      width="600"
      v-model="model"
      @on-visible-change="del"
      title="减免信息"
      class-name="apply_tableData_detail_modal"
      :mask-closable="false"
      :footer-hide='true'
    >
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
          <span class="apply_detail_info_title">申请减免时间：</span>
          <span class="apply_detail_info_dec">{{applyTime | formatDate}}</span>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
          <span class="apply_detail_info_title">申请减免金额：</span>
          <span class="apply_detail_info_dec">{{reliefAmt}}</span>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12" span="6">
          <span class="apply_detail_info_title">申请减免类型：</span>
          <span class="apply_detail_info_dec">{{reliefTypeName}}</span>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <span class="apply_detail_info_img_title">凭证信息</span>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24" span="24" class="img_col">
            <Spin v-if="file_url == null">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
          <img :src="file_url" alt="" v-else>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  props: {
    model: Boolean,
    apply_data: {},
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
      applyTime: null,//申请时间
      reliefAmt: null,//减免金额
      reliefTypeName: null,//减免类型
      file_url: null,//图片地址
    };
  },
  created() {
    const { applyTime, reliefAmt, reliefTypeName, reliefCertificate } = this.apply_data;
    this.applyTime = applyTime;
    this.reliefAmt = reliefAmt;
    this.reliefTypeName = reliefTypeName;
    // _this.$options.filters['formatDate'](res,'YYYY-MM-DD HH:mm:ss')
    this.file_url = reliefCertificate ? this.prefix + this.apply_data.reliefCertificate : '';
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
.apply_detail_info_title,
.apply_detail_info_dec {
  font-size: 14px;
  color: #333;
}
.apply_detail_info_title {
  margin-right: 8px;
}
.apply_detail_info_img_title {
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
