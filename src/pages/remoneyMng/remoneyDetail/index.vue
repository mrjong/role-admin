<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <Row style="margin: 30px 0 15px 0;">
        <Col span="8" style="text-align: right">
          实际还款日期：<Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
        <Col span="8" style="text-align: right">
          应还款日期：<Date-picker type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
        <Col span="8" style="text-align: right;">
          还款状态：
          <Select v-model="model12" style="width: 200px;display: inline-block">
            <Option v-for="item in stateList" :value="item.value" :key="item">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span = "8" style="text-align: right">
          案件编码:<Input v-model="value" style="width: 200px"></Input>
        </Col>
        <Col span = "8" style="text-align: right">
          账单号:<Input v-model="value"  style="width: 200px"></Input>
        </Col>
        <Col span = "8" style="text-align: right">
          经办人:<Input v-model="value"  style="width: 200px"></Input>
        </Col>
      </Row>
      <Row>
        <Col span = "8" style="text-align: right">
          电催中心:<Input v-model="value" style="width: 200px"></Input>
        </Col>
        <Col span = "8" style="text-align: right">
          客户姓名:<Input v-model="value"  style="width: 200px"></Input>
        </Col>
        <Col span = "8" style="text-align: right">
          <button>检索</button> <button>检索</button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script src="./index.js"></script>
