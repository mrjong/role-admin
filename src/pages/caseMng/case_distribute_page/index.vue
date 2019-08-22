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
            <FormItem span="6" label="案件处理状态:">
              <Select
                clearable
                size="small"
                placeholder="请选择案件处理状态"
                v-model="formItem.caseHandleStatus"
              >
                <Option
                  v-for="item in getDirObj.CASE_HANDLE_STATUS"
                  :value="item.itemCode"
                  :key="item.itemCode"
                  v-if="userType === '01'?item.itemName !=='出催': item.itemName !== '出催' && item.itemName !== '停催' && item.itemName !== '待分配'"
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
                v-model="formItem.maxPerdCnts"
              >
                <Option
                  v-for="item in getDirObj.PROD_NUM"
                  :value="item.itemCode"
                  :key="item.itemName"
                >{{ item.itemName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="客户姓名:">
              <Input size="small" clearable v-model.trim="formItem.userNm" placeholder="请输入客户姓名"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="身份证号:" prop="idNo">
              <Input size="small" clearable v-model.trim="formItem.idNo" placeholder="请输入身份证号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="手机号:" prop="mblNo">
              <Input
                size="small"
                clearable
                v-model.trim="formItem.mblNo"
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
                    clearable
                    v-model.trim="formItem.minOverdueDays"
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
                    clearable
                    v-model.trim="formItem.maxOverdueDays"
                  ></Input>
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="逾期应还金额:">
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="minOverdueAmt">
                  <Input size="small" clearable v-model.trim="formItem.minOverdueAmt"></Input>
                </FormItem>
              </Col>
              <Col :xs="2" :sm="2" :md="2" :lg="2" span="2">
                <div class="text-center">-</div>
              </Col>
              <Col :xs="11" :sm="11" :md="11" :lg="11" span="11">
                <FormItem prop="maxOverdueAmt">
                  <Input size="small" clearable v-model.trim="formItem.maxOverdueAmt"></Input>
                </FormItem>
              </Col>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="分配日期:">
              <DatePicker
                type="daterange"
                v-model="formItem.date"
                @on-change="dateChange"
                :editable="false"
                size='small'
                clearable
                placeholder="请选择分配日期"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="案件编号:">
              <Input size="small" clearable v-model.trim="formItem.id" placeholder="请输入案件编号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="账单号:">
              <Input size="small" clearable v-model.trim="formItem.billNo" placeholder="请输入账单号"/>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="电催中心:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择电催中心"
                @on-change="companyChange"
                v-model="formItem.opCompayUuid"
              >
                <Option
                  v-for="item in company_list_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem span="6" label="组别:">
              <Select
                size="small"
                clearable
                filterable
                @on-change="departmentChange"
                placeholder="请选择组别"
                v-model="formItem.opOrganizationUuid"
              >
                <Option
                  v-for="item in department_list_data"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
            <FormItem label="经办人:">
              <Select
                size="small"
                clearable
                filterable
                placeholder="请选择经办人"
                v-model="formItem.opUserUuid"
              >
                <Option
                  v-for="(item,index) in collect_list_data"
                  :value="item.id"
                  :key="item.id + index"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="6" :lg="6" span="6">
          <FormItem label="登录状态:">
            <Select
              size="small"
              clearable
              filterable
              placeholder="请选择登录状态"
              v-model="formItem.appLoginStatus"
            >
              <Option
                v-for="(item,index) in getDirObj.APP_LOGIN_STATUS"
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
                style="width:80px"
                long
                size="small"
                :loading="queryLoading"
                @click="handleSubmit('formItem')"
              >
                <span v-if="!queryLoading">检索</span>
                <span v-else>检索...</span>
              </Button>
              <Button
                size="small"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
              <Button
                size="small"
                icon="ios-cloud-download-outline"
                type="primary"
                v-if="import_search"
                style="min-width:80px;margin-left: 8px"
                @click="download_import"
                :loading="download_import_data"
              >
                <span v-if="!download_import_data">下载导入查询模板</span>
                <span v-else>下载中...</span>
              </Button>
              <Upload
                :action="file_url"
                v-if="import_search"
                :show-upload-list="false"
                :headers="headers"
                :format="['xls', 'xlsx']"
                :max-size="1024"
                :on-success="handleSuccess"
                :on-error='handleError'
                :on-progress="handleProgress"
                :on-exceeded-size="handleMaxSize"
                :on-format-error="handleFormatError"
                :disabled="import_data_loading"
                :data='{
                  pageType: 2
                }'
                style="display: inline-block; margin-left:8px"
              >
                <Button
                  icon="ios-cloud-upload-outline"
                  type="primary"
                  size="small"
                  style="min-width: 80px;"
                  :loading="import_data_loading"
                >
                  <span v-if="!import_data_loading">导入查询</span>
                  <span v-else>导入中...</span>
                </Button>
              </Upload>
              <span style="line-height: 24px;color: #ed4014" v-if="import_search">（*导入查询和条件查询的数据没有关联）</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- 检索结果 -->
    <Card class="vue-panel-table">
      <p slot="title">
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'" @click="showPanel2=!showPanel2"></Icon>检索结果
        <span style="margin-left: 10px; font-weight: 400">案件数（笔）: {{total}}，</span>
        <span style="font-weight: 400">案件金额（元）: {{totalOverdueAmt | money}}</span>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          @click.stop="allot_export"
          :loading="exportLoading"
          v-if="case_export"
        >
          <span v-if="!exportLoading">案件导出</span>
          <span v-else>导出中...</span>
        </Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          v-if="recover"
          @click.stop="handeldBtnClick('2')"
        >批量回收</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          v-if="batch_distribute"
          @click.stop="handeldBtnClick('1')"
        >批量分配</Button>
        <Button
          class="fr vue-back-btn header-btn"
          type="primary"
          size="small"
          v-if="send_message"
          @click.stop="messageFlag = !messageFlag"
        >站内信批量发送</Button>
      </p>
      <!-- 表格 -->
      <div v-if="!showPanel2">
        <Table
          :data="tableData"
          border
          :columns="tableColumns"
          stripe
          @on-selection-change="changeSelect"
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
    <!-- 批量分配的modal -->
    <div v-if="distributeFlag">
      <Modal
        v-model="distributeFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px;">
          <span>提示</span>
        </p>
        <Alert show-icon type="warning">
          <template
            slot="desc"
          >共查询出{{Number(allotCaseMounts)}}笔可分配案件，{{allotCaseIds.length > 0?stopCases.length: stopCaseMounts}}笔停催案件，您确认要全部分配么?</template>
        </Alert>
        <div slot="footer">
          <Button size="small" @click="cancel('1')">取消</Button>
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
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; height: auto">
          <Button
            type="primary"
            @click="selectTreeNode(0)"
            style="width:80px"
            long
            size="small"
          >选择人员</Button>
          <Button
            type="primary"
            @click="selectTreeNode(1)"
            style="width:80px;margin-left: 10px;"
            long
            size="small"
          >选择公司</Button>
        </p>
        <!-- <div v-if="treeFlag === 0"> -->
        <Tree
          :data="data5"
          :render="renderContent"
          multiple
          show-checkbox
          @on-select-change="selectNode"
          @on-check-change="checkChange"
          v-if="treeFlag === 0"
        ></Tree>
        <!-- </div> -->
        <Tree
          :data="data"
          :render="renderContent"
          multiple
          show-checkbox
          @on-select-change="selectNode"
          @on-check-change="checkChange"
          v-if="treeFlag === 1"
        ></Tree>
        <div slot="footer">
          <Button size="small" @click="cancel('2')">取消</Button>
          <Button type="primary" size="small" :loading="batch_distribute_loading" @click="ok('2')">
            <span v-if="!batch_distribute_loading">确定</span>
            <span v-else>分配中...</span>
          </Button>
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
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px">
          <span>批量回收</span>
        </p>
        <Alert show-icon type="warning">
          <template slot="desc">共查询出{{recycleCaseMounts}}条案件,确定要回收吗？</template>
        </Alert>
        <div slot="footer">
          <Button size="small" @click="cancel('3')">取消</Button>
          <Button type="primary" size="small" @click="ok('3')" :loading="recoverLoading">
            <span v-if="!recoverLoading">确定</span>
            <span v-else>回收中...</span>
          </Button>
        </div>
      </Modal>
    </div>
    <!-- 停催的modal -->
    <div v-if="stopCollectionFlag">
      <Modal
        v-model="stopCollectionFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px">
          <span>案件停催</span>
        </p>
        <Form ref="stopFormItem" :model="stopFormItem" :label-width="90" :rules="ruleValidate1">
          <FormItem span="4" label="停催原因:" prop="operRemark">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model.trim="stopFormItem.operRemark"
              placeholder="请输入100字以内"
            ></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button size="small" @click="cancel('4')">取消</Button>
          <Button
            type="primary"
            size="small"
            @click="ok('4', 'stopFormItem')"
            :loading="stop_urge_loading"
          >
            <span v-if="!stop_urge_loading">确定</span>
            <span v-else>停催中...</span>
          </Button>
        </div>
      </Modal>
    </div>
    <!-- 恢复催收的modal -->
    <div v-if="recoverCollectionFlag">
      <Modal
        v-model="recoverCollectionFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 12px">
          <span>恢复催收</span>
        </p>
        <Form
          ref="recoverFormItem"
          :model="recoverFormItem"
          :label-width="120"
          :rules="ruleValidate2"
        >
          <FormItem span="4" label="恢复催收原因:" prop="operRemark">
            <Input
              type="textarea"
              size="small"
              :maxlength="100"
              v-model.trim="recoverFormItem.operRemark"
              placeholder="请输入100字以内"
            ></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button size="small" @click="cancel('5')">取消</Button>
          <Button
            type="primary"
            size="small"
            @click="ok('5', 'recoverFormItem')"
            :loading="regain_urge_loading"
          >
            <span v-if="!regain_urge_loading">确定</span>
            <span v-else>恢复催收中...</span>
          </Button>
        </div>
      </Modal>
    </div>
    <!-- 站内信的批量发送内容 -->
    <div v-if="messageFlag">
      <Modal
        v-model="messageFlag"
        width="800"
        class-name="user_info_form_modal"
        :mask-closable="false"
      >
        <p slot="header" style="color:#333; font-size: 20px; font-weight: 600; line-height: 14px;">
          <span>站内信发送总数：{{recycleCaseMounts}}</span>
        </p>
        <Form
          ref="messageFormItem"
          :model="messageFormItem"
          :label-width="120"
          :rules="ruleValidate3"
        >
          <Col :xs="24" :sm="24" :md="10" :lg="10" span="6">
            <FormItem span="4" label="标题:" prop="msgTitle">
              <Input
                type="text"
                size="small"
                :maxlength="100"
                v-model.trim="messageFormItem.msgTitle"
                placeholder="请输入标题"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
            <FormItem span="4" label="内容:" prop="msgContent">
              <Input
                type="textarea"
                size="small"
                :maxlength="500"
                v-model.trim="messageFormItem.msgContent"
                placeholder="请输入500字以内内容"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="16" :lg="16" span="6">
            <FormItem span="4" label="备注:">
              <Input
                type="textarea"
                size="small"
                :maxlength="100"
                v-model.trim="messageFormItem.remark"
                placeholder="请输入100字以内备注"
              ></Input>
            </FormItem>
          </Col>
        </Form>
        <div slot="footer">
          <Button size="small" @click="cancel('6')">取消</Button>
          <Button
            type="primary"
            size="small"
            @click="ok('6','messageFormItem')"
            :loading="send_message_loading"
          >
            <span v-if="!send_message_loading">确定</span>
            <span v-else>发送中...</span>
          </Button>
        </div>
      </Modal>
    </div>
    <!-- 减免组件 -->
    <jianmian v-model="breaks_flag" v-if="breaks_flag" v-on:passBack="passBackBreaks" :edit_flag='true' :breaks_data='breaks_data'></jianmian>
  </div>
</template>
<script src='./index.js'></script>


