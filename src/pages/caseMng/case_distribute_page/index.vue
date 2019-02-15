<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p slot="title" @click="showPanel=!showPanel">
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="95"
        :rules="ruleValidate"
      >
        <Row>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="案件状态:">
              <Select clearable size="small" placeholder="请选择案件状态" v-model="formItem.caseStatus">
                <Option
                  v-for="item in getDirObj.CASE_HANDLE_STATUS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品线:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择产品线"
                v-model="formItem.prodTypes"
              >
                <Option
                  v-for="item in getDirObj.PROD_TYPE"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="产品期数:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择产品期数"
                v-model="formItem.periodCounts"
              >
                <Option
                  v-for="item in getDirObj.PROD_CNT"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="到期期数:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择到期期数"
                v-model="formItem.periodCounts"
              >
                <Option
                  v-for="item in getDirObj.PROD_CNT"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:">
              <Input size="small" clearable v-model="formItem.userNm" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="身份证号:" prop="idNo">
              <Input size="small" clearable v-model="formItem.idNo" placeholder="请输入身份证号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="手机号:" prop="mblNo">
              <Input
                type="number"
                number
                size="small"
                clearable
                v-model="formItem.mblNo"
                placeholder="请输入手机号"
              />
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="逾期天数:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="minOverdueDays">
                  <Input
                    size="small"
                    number
                    type="number"
                    clearable
                    v-model="formItem.minOverdueDays"
                  ></Input>
                </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="maxOverdueDays">
                  <Input
                    size="small"
                    number
                    type="number"
                    clearable
                    v-model="formItem.maxOverdueDays"
                  ></Input>
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="逾期应还金额:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="minOverdueAmt">
                  <Input size="small" number clearable v-model="formItem.minOverdueAmt"></Input>
                </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="maxOverdueAmt">
                  <Input size="small" number clearable v-model="formItem.maxOverdueAmt"></Input>
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="还款日期:">
              <DatePicker
                type="daterange"
                @on-change="dateChange"
                :editable="false"
                placeholder="请选择还款日期"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:">
              <Input size="small" clearable v-model="formItem.id" placeholder="请输入案件编号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:">
              <Input size="small" clearable v-model="formItem.billNo" placeholder="请输入账单号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="信用级别:">
              <Select
                size="small"
                multiple
                clearable
                placeholder="请选择信用级别"
                v-model="formItem.creditLevels"
              >
                <Option
                  v-for="item in getDirObj.CREDIT_LEVEL"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="电催中心:">
              <Select size="small" clearable placeholder="请选择电催中心" v-model="formItem.opCompayNames">
                <Option
                  v-for="item in getLeafTypeList2_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="经办人:">
              <Select size="small" clearable placeholder="请选择经办人" v-model="formItem.opUserName">
                <Option
                  v-for="item in getLeafTypeList_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="24" :lg="24" span="6">
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
      <p slot="title">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索结果
        <span style="margin-left: 10px;">总共{{totalCase}}笔案件，</span>
        <span>总共逾期金额{{totalOverdueAmt}}元</span>
        <!-- <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handeldBtnClick('4')"
        >恢复催收</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handeldBtnClick('3')"
        >停催</Button> -->
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handeldBtnClick('2')"
        >批量回收</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="handeldBtnClick('1')"
        >批量分配</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table :data="tableData" border :columns="tableColumns" stripe @on-selection-change='changeSelect'></Table>
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
    <!-- 批量分配的modal -->
    <div v-if="distributeFlag">
      <Modal
        v-model="distributeFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>提示</span>
        </p>
        <Alert show-icon type="warning">
          <template slot="desc">该操作将分配所有查询出的结果,共{{caseMounts}}笔案件，您确认要全部分配么?</template>
        </Alert>
        <div slot="footer">
          <Button type="ghost" size="small" @click="cancel('1')">取消</Button>
          <Button type="primary" size="small" @click="ok('1')">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 分配成员modal -->
    <div v-if="distributeRoleFlag">
      <Modal
        v-model="distributeRoleFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>分配</span>
        </p>
        <Tree
          :data="data5"
          :render="renderContent"
          multiple
          show-checkbox
          :load-data="loadData"
          @on-select-change="selectNode"
          @on-check-change="checkChange"
        ></Tree>
        <div slot="footer">
          <Button type="ghost" size="small" @click="cancel('2')">取消</Button>
          <Button type="primary" size="small" @click="ok('2')">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 批量回收的modal -->
    <div v-if="recycleFlag">
      <Modal
        v-model="recycleFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>批量回收</span>
        </p>
        <Alert show-icon type="warning">
          <template slot="desc">共查询出1条案件,确定要回收吗？</template>
        </Alert>
        <div slot="footer">
          <Button type="ghost" size="small" @click="cancel('3')">取消</Button>
          <Button type="primary" size="small" @click="ok('3')">确定</Button>
        </div>
      </Modal>
    </div>
    <!-- 批量停催的modal -->
    <div v-if="stopCollectionFlag">
      <Modal
        v-model="stopCollectionFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600">
          <span>批量回收</span>
        </p>
        <!-- <Form ref="menuFormItem" :model="menuFormItem" :label-width="90" :rules="ruleValidate1"></Form> -->
        <div slot="footer">
          <Button type="ghost" size="small" @click="cancel('3')">取消</Button>
          <Button type="primary" size="small" @click="ok('3')">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script src='./index.js'></script>


