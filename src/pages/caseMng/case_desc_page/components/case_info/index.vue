<template>
  <div>
    <Card class="vue-panel-table">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>案件信息
        <span
          class="qishu"
        >{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.prdTypName}}（{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.perdCnt}}期）</span>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel">
        <Form ref="formItem" :model="formItem" :label-width="80">
          <div class="panel-desc">
            <Row>
              <Col span="24">
                <Col span="6" class="panel-desc-title">
                  账单号：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.billNo}}</span>
                </Col>
                <Col span="4" class="panel-desc-title">
                  借款本金：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.loanAmount | money}}</span>
                </Col>
                <Col span="5" class="panel-desc-title">
                  借款时间：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.loanTime | formatDatetime}}</span>
                </Col>
                <Col span="5" class="panel-desc-title">
                  银行卡号：
                  <span>
                    {{case_detail_case_base_info_Data && case_detail_case_base_info_Data.crdNoHid}}
                    <Poptip
                      :content="mingwenData"
                      v-if="case_detail_case_base_info_Data&&case_detail_case_base_info_Data.crdNoHid"
                    ></Poptip>
                  </span>
                </Col>
                <Col span="4" class="panel-desc-title">
                  银行卡：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.corgName}}</span>
                </Col>
              </Col>
              <Col
                span="24"
                v-if="case_detail_case_base_info_Data && case_detail_case_base_info_Data.prdTyp === '01' || case_detail_case_base_info_Data && case_detail_case_base_info_Data.prdTyp === '11'"
              >
                <Col span="6" class="panel-desc-title overdue_text">
                  逾期应还本金：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.billPrcpAmt | money}}</span>
                  <!-- <span>2288.16</span> -->
                </Col>
                <Col span="4" class="panel-desc-title overdue_text">
                  逾期应还利息：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.billItrtAmt | money}}</span>
                </Col>
                <Col span="5" class="panel-desc-title overdue_text">
                  逾期应还服务费：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.billMngAmt | money}}</span>
                </Col>
                <Col span="5" class="panel-desc-title overdue_text">
                  逾期应还罚息：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.billFineAmt | money}}</span>
                </Col>
                <Col span="4" class="panel-desc-title overdue_text">
                  逾期应还滞纳金：
                  <span>{{case_detail_case_base_info_Data && case_detail_case_base_info_Data.billOvduAmt | money}}</span>
                </Col>
              </Col>
            </Row>
          </div>
        </Form>
        <Table
          :row-class-name="rowClassName"
          :data="tableData"
          border
          :columns="tableColumns"
          stripe
        ></Table>
      </div>
    </Card>
  </div>
</template>

<script src='./index.js'></script>
