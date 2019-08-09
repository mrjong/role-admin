<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'" @click="showPanel=!showPanel"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="电催中心:">
            <Select
              size="small"
              v-model="formItem.seatType"
              filterable
              clearable
              placeholder="请选择坐席类型"
            >
              <Option
                v-for="item in getDirObj['SEAT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="组别:">
            <Select
              size="small"
              v-model="formItem.seatType"
              filterable
              clearable
              placeholder="请选择坐席类型"
            >
              <Option
                v-for="item in getDirObj['SEAT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem span="6" label="姓名:">
            <Select
              size="small"
              v-model="formItem.seatType"
              filterable
              clearable
              placeholder="请选择坐席类型"
            >
              <Option
                v-for="item in getDirObj['SEAT_TYPE']"
                :value="item.itemCode"
                :key="item.itemCode"
              >{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="坐席编号:">
              <Input size="small" clearable v-model.trim="formItem.callno" placeholder="请输入坐席编号"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="坐席类型:" span="4">
              <Select
                size="small"
                v-model="formItem.seatType"
                filterable
                clearable
                placeholder="请选择坐席类型"
              >
                <Option
                  v-for="item in getDirObj['SEAT_TYPE']"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
            <FormItem>
              <Button
                type="primary"
                @click="handleUpdate('formItem')"
                style="width:80px"
                long
                size="small"
                :loading='query_loading'
              >
              <span v-if="!query_loading">检索</span>
              <span v-else>检索中...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table collection_recording">
      <p slot="title">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索结果
        <!-- <router-link to="/buffet/buffet_add">
          <Button class="fr vue-back-btn header-btn" type="primary" size="small">导出数据</Button>
        </router-link>-->
        <Button
          class="fr header-btn"
          type="primary"
          @click="handleAdd('1')"
          style="width:80px"
          long
          size="small"
          v-if="add"
        >添加</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" :columns="tableColumns" stripe size="small"></Table>
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
    </Card>
    <Addform v-model="parentData" v-if="parentData.modal" @passBack="passBack"></Addform>
    <Reviseform v-model="parentData2" v-if="parentData2.modal" @childPassBack="childPassBack"></Reviseform>
  </div>
</template>
<script src="./index.js"></script>
