<template>
    <Modal
      :value="true"
      :footer-hide="true"
      :closable=" false"
      width="50%"
      >
      <div class="content">
        <h3 style="text-align: center">系统将按照率值由高到低排列，请预估若您所处的段位，并设置若您在此段位次日想接收的新案件数量</h3>
        <p >平常时间：
          <span v-for="(item, index) in divideStarList">
            <span>
              {{item.starName}}（默认{{item.normAllotCounts}}，可区间{{item.normCountsSta}}-{{item.normCountsEnd}}）
            </span>
          </span>
        </p>
        <p >高峰时间：
          <span v-for="(item, index) in divideStarList">
            <span>
              {{item.starName}}（默认{{item.peakAllotCounts}}，可区间{{item.peakCountsSta}}-{{item.peakCountsEnd}}）
            </span>
          </span>
        </p>
        <p style="color: #ff5c33">说明：上述值取值“维护结案数量”页面的数据</p>
        <div>
          <div class="list">
            <span>请确认明日是否接收案件</span>
            <RadioGroup style="margin-left: 30px; flex: 1">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </div>
          <div class="list">
            <span>请预估明日接收案件数量</span>
            <div style="margin-left: 30px; flex: 1">
              <div  v-for="(item, index) in divideStarList" class="list_item">
                <span>{{item.starName}}</span>
                <Input size="small" clearable  style="display: inline-block; width: 50%; margin-left: 20px"/>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
          <Button
            type="primary"
            @click="handleSubmit('formItem')"
            style="width:80px"
            long
            size="small"
            :loading='submit_loading'
          >
            <span v-if="!submit_loading">确定</span>
            <span v-else>确定...</span>
          </Button>
          <Button
            @click="handleSubmit('formItem')"
            style="width:80px"
            long
            size="small"
          >
            <span >取消</span>
          </Button>
        </div>
      </div>
    </Modal>
</template>

<script src="./index.js"></script>
<style src="./index.less" scoped  lang="less"></style>
