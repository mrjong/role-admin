<template>
  <div>
    <Form
      ref="formItem"
      :rules="formRules"
      :model="formItem"
      :label-width="90"
      style="padding: 10px 0"
    >
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="任务类型：" prop="jobType">
            <RadioGroup v-model="formItem.jobType" size="small" @on-change='radioChange'>
              <!-- <Radio label="01">系统任务</Radio>
              <Radio label="02">手动任务</Radio>-->
              <Radio
                :disabled="disabled"
                :label="item.itemCode"
                :key="index + item.itemCode"
                v-for="item,index in getDirObj.MSG_JOB_TYPE"
              >{{ item.itemName }}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="任务名称：" prop="jobName">
            <Input
              size="small"
              :clearable="!disabled"
              :disabled="disabled"
              v-model.trim="formItem.jobName"
              style="width: 100%"
              placeholder="请输入任务名称"
            />
          </FormItem>
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          v-if="formItem.jobType === 'system' && formItem.jobType === 'system'"
        >
          <FormItem label="使用场景：" prop="jobScene">
            <RadioGroup v-model="formItem.jobScene" size="small">
              <!-- <Radio label="01">实时</Radio>
              <Radio label="02">定时</Radio>-->
              <Radio
                :disabled="disabled"
                :label="item.itemCode"
                :key="index + item.itemCode"
                v-for="item,index in getDirObj.MSG_JOB_SCENE"
                v-if="item.itemCode === 'real_time' || item.itemCode === 'timing'"
              >{{ item.itemName }}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          v-if="formItem.jobScene === 'real_time' && formItem.jobType === 'system'"
        >
          <FormItem label="选择节点：" prop="triggerNode">
            <RadioGroup v-model="formItem.triggerNode" size="small">
              <!-- <Radio label="01">仲裁状态</Radio>
              <Radio label="02">信用进度状态</Radio>-->
              <Radio
                :disabled="disabled"
                :label="item.itemCode"
                :key="index + item.itemCode"
                v-for="item,index in getDirObj.MSG_TRIGGER_NODE"
              >{{ item.itemName }}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          v-if="formItem.jobScene === 'timing' || formItem.jobType === 'artificial'"
        >
          <FormItem label="发送时间：" prop="jobScene_children">
            <RadioGroup v-model="formItem.jobScene_children" size="small">
              <!-- <Radio label="01">立即发送</Radio>
              <Radio label="02">指定时间</Radio>-->
              <Radio
                :disabled="disabled"
                :label="item.itemCode"
                :key="index + item.itemCode"
                v-for="item,index in getDirObj.MSG_JOB_SCENE"
                v-if="formItem.jobType === 'system'? (item.itemCode === 'repeat' || item.itemCode === 'immediately'): (item.itemCode === 'timing' || item.itemCode === 'immediately')"
              >{{ item.itemName }}</Radio>
              <FormItem prop="jobTime" :label-width="0" style="display: inline-block" v-if="formItem.jobScene_children === 'repeat' && formItem.jobType === 'system'">
                <TimePicker
                  v-if="formItem.jobScene_children === 'repeat' && formItem.jobType === 'system'"
                  format="HH:mm"
                  v-model="formItem.jobTime"
                  :disabled="disabled"
                  placeholder="Select time"
                  size="small"
                ></TimePicker>
              </FormItem>
              <FormItem prop="jobDateTime" :label-width="0" style="display: inline-block" v-if="formItem.jobScene_children === 'timing' && formItem.jobType === 'artificial'">
                <DatePicker
                  format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  v-model="formItem.jobDateTime"
                  :disabled="disabled"
                  placeholder="Select time"
                  size="small"
                ></DatePicker>
              </FormItem>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          v-if="formItem.jobScene_children || formItem.jobScene"
        >
          <FormItem label="选择用户：" prop="dataType">
            <RadioGroup v-model="formItem.dataType" size="small">
              <Radio label="rule_condition" :disabled="disabled">添加规则</Radio>
              <Radio label="import" :disabled="disabled" v-if="formItem.jobType === 'artificial'">导入</Radio>
              <!-- <Radio :label="item.itemCode" :key="index" v-for="item in getParentCodeList">{{ item.itemName }}</Radio> -->
            </RadioGroup>
          </FormItem>
        </Col>
        <Form
          ref="formItemChildren"
          :rules="formRulesChildren"
          :model="formItemChildren"
          :label-width="90"
          style="padding: 10px 0"
        >
          <Col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="24"
            v-if="formItem.dataType === 'rule_condition' && !disabled"
          >
            <Col :xs="24" :sm="24" :md="6" :lg="6" style="text-align: center">
              <!-- <FormItem :label-width="8"> -->
              字段来源
              <!-- </FormItem> -->
            </Col>
            <Col :xs="24" :sm="24" :md="6" :lg="6" style="text-align: center">
              <!-- <FormItem :label-width="8"> -->
              字段名称
              <!-- </FormItem> -->
            </Col>
            <Col :xs="24" :sm="24" :md="5" :lg="5" style="text-align: center">
              <!-- <FormItem :label-width="8"> -->
              操作符
              <!-- </FormItem> -->
            </Col>
            <Col :xs="24" :sm="24" :md="5" :lg="5" style="text-align: center">
              <!-- <FormItem :label-width="8"> -->
              值域
              <!-- </FormItem> -->
            </Col>
            <Col :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 10px;">
              <FormItem prop="source" :label-width="8">
                <Select
                  size="small"
                  clearable
                  @on-change="changeSelect($event, 'source')"
                  placeholder="请选择来源"
                  label-in-value
                  v-model="formItemChildren.source"
                >
                  <Option
                    v-for="item,index in getDirObj.MSG_DATA_SOURCE"
                    :value="item.itemCode"
                    :key="item.itemCode+index"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="6" :lg="6">
              <FormItem prop="partName" :label-width="8">
                <Select
                  size="small"
                  clearable
                  :disabled="!formItemChildren.source"
                  @on-change="changeSelect($event, 'partName')"
                  placeholder="请选择"
                  label-in-value
                  v-model="formItemChildren.partName"
                >
                  <Option
                    v-for="item,index in partNameList"
                    :value="item.itemCode"
                    :key="item.itemCode+index"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="5" :lg="5">
              <FormItem prop="operator" :label-width="8">
                <Select
                  size="small"
                  clearable
                  :disabled="!formItemChildren.partName"
                  placeholder="请选择"
                  label-in-value
                  @on-change="changeSelect($event, 'operator')"
                  v-model="formItemChildren.operator"
                >
                  <Option
                    v-for="item,index in getDirObj.MSG_OPERATOR"
                    :value="item.itemCode"
                    :key="item.itemCode+ index"
                  >{{ item.itemName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="5" :lg="5">
              <FormItem prop="value" :label-width="8">
                <Select
                  size="small"
                  v-if="operatorList.length>0"
                  clearable
                  label-in-value
                  @on-change="changeSelect($event, 'value')"
                  :disabled="!formItemChildren.operator"
                  placeholder="请选择"
                  v-model="formItemChildren.value"
                >
                  <Option
                    v-for="item,index in operatorList"
                    :value="item.itemCode"
                    :key="item.itemCode + index"
                  >{{ item.itemName }}</Option>
                </Select>
                <Input
                  size="small"
                  v-else
                  v-model.trim="formItemChildren.value"
                  @on-blur="inputBlur"
                  style="width: 100%;"
                  placeholder="请输入"
                  clearable
                  :disabled="!formItemChildren.operator"
                />
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="2" :lg="2" style="padding: 5px 0 0 10px;">
              <Button type="success" size="small" @click="handleAdd">添加</Button>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="24" style="margin-bottom: 20px">
              <Table :data="tableData" border :columns="tableColumns" stripe></Table>
            </Col>
          </Col>
        </Form>
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          style="margin-bottom: 20px"
          v-if="disabled && tableData.length>0"
        >
          <Table :data="tableData" border :columns="tableColumns" stripe></Table>
        </Col>
        <Col span="24" v-if="formItem.dataType === 'import' && !disabled">
          <FormItem :label-width="90">
            <Upload
              type="drag"
              name="file"
              :disabled="default_file_list.length>0? true: false"
              :show-upload-list="true"
              style="width: 100%"
              :format="['xls', 'xlsx']"
              action="/admin/msgJob/uploadData"
              :data="{}"
              :headers="headers"
              :on-remove="handleFileRemove"
              :on-format-error="handleFormatError"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
            >
              <div style="padding: 10px 0">
                <Icon type="ios-cloud-upload" size="36" style="color: #3399ff"></Icon>
                <p>单击或拖动此处以上传文件(最多上传一个文件)</p>
              </div>
            </Upload>
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="24">
          <FormItem label="任务描述：">
            <Input
              size="small"
              type="textarea"
              v-model.trim="formItem.jobDescribe"
              style="width: 100%;"
              :maxlength="500"
              placeholder="请输入500字以内的任务描述"
              :disabled="disabled"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div style="margin-top: 10px;text-align: center;">
      <slot
        :formItem="formItem"
        :validateFormData="validateFormData"
        :conditions="tableData"
        :dataPath="dataPath"
      ></slot>
    </div>
  </div>
</template>

<script src='./index.js'></script>
