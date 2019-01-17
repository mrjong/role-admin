<template>

  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p
        slot="title"
        @click="showPanel=!showPanel"
      >
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
        检索条件
        <router-link to="/demo/demo_desc">
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >详情</Button>
        </router-link>
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
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
            span="6"
            label="产品线:"
            prop="buffet_id"
          >
            <!-- <Select
              size="small"
              v-model="formItem.productLine"
            >
              <Option
                v-for="item in productLineList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select> -->
            <Input
              size="small"
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
            label="产品期数:"
            prop="buffet_id"
          >
            <Select
              size="small"
              v-model="formItem.productTime"
            >
              <Option
                v-for="item in productTimeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
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
              size="small"
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
              size="small"
              clearable
              v-model="formItem.device_id"
              placeholder="请输入设备ID"
            />
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
            prop="buffet_id"
          >
            <Input
              size="small"
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
              size="small"
              clearable
              v-model="formItem.address"
              placeholder="请输入餐柜详细地址"
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
              size="small"
            >检索</Button>
            <Button
              size="small"
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
      <p
        slot="title"
        @click="showPanel2=!showPanel2"
      >
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
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

      <div v-if="!showPanel2">
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
      </div>
    </Card>

    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p>
        <Tabs
          type="card"
          size="small"
          :animated="false"
        >
          <TabPane label="标签一">
            <div>
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
            </div>
          </TabPane>
          <TabPane label="标签二">标签二的内容</TabPane>
          <TabPane label="标签三">标签三的内容</TabPane>
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            @click="handleTabsAdd"
            size="small"
            slot="extra"
          >增加</Button>
        </Tabs>
      </p>
      <!-- <p slot="title">
        检索结果
        <router-link to="/buffet/buffet_add">
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
          >导出数据</Button>
        </router-link>
      </p> -->
      <!-- 表格 -->
    </Card>
  </div>
</template>
<script src="./demo_list.js"></script>
