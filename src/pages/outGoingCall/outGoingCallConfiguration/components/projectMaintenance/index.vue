<template>
  <Card class="vue-panel" style="border-top-left-radius: 0px; border-bottom-right-radius: 0px">
    <p slot="title" @click="aa" style="display: flex">
      <span style="flex: 1">
        <span style="height:30px; ">方案/专线</span>
        <ButtonGroup size="small" style="margin-left: 10px">
          <Button :type="projectFlag" @click="handle_checkout('project')">方案</Button>
          <Button :type="lineFlag" @click="handle_checkout('line')" >专线</Button>
        </ButtonGroup>
      </span>
      <Button size="small"
              style="width:80px"
              @click="addModel"
              type="primary">添加
      </Button>
    </p>
    <div style="width: 70%; margin: auto">
      <el-carousel :interval="4000" type="card" height="500px" arrow="always" indicator-position="none" :autoplay="true" v-if="projectFlag ==='primary'" @change="dd2">
      <el-carousel-item v-for="item, index in 6" :key="index">
        <Card class="carousel-card">
          <p slot="title" @click="aa">方案{{item}}</p>
          <div style="font-weight: 700; font-size: 16px; padding-top: 30px; margin-left: 30px;">第一优先渠道:</div>
          <div style="margin-left: 130px; margin-top: 10px">
            <CheckboxGroup v-model="project">
              <Checkbox label="香蕉"></Checkbox>
              <Checkbox label="苹果"></Checkbox>
              <Checkbox label="西瓜"></Checkbox>
            </CheckboxGroup>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-left: 30px;">第二优先渠道:</div>
          <div style="margin-left: 130px; margin-top: 10px">
            <CheckboxGroup v-model="project">
              <Checkbox label="香蕉"></Checkbox>
              <Checkbox label="苹果"></Checkbox>
              <Checkbox label="西瓜"></Checkbox>
            </CheckboxGroup>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-left: 30px;">
            <span style="width: 120px; display: inline-block">属地外呼:</span>
            <i-switch >
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
            <span style="width: 30px;display: inline-block"></span>
            <span style="width: 120px; display: inline-block">优先手机号外呼:</span>
            <i-switch >
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-top: 20px; margin-left: 30px;">
            <span style="width: 120px; display: inline-block">15天渠道故障率:</span>
            <i-switch >
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
            <span style="width: 30px;display: inline-block"></span>
            <span style="width: 120px; display: inline-block">30天渠道故障率:</span>
            <i-switch >
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </div>
          <div style="display: flex">
            <div style="flex: 1"></div>
            <Button size="small"
                    style="width:80px; margin-top: 30px;"
                    @click="showAddChannel=true"
                    type="primary">修改
            </Button>
          </div>

        </Card>
      </el-carousel-item>
      </el-carousel>
      <el-carousel
        :interval="4000"
        type="card" height="400px"
        arrow="always" indicator-position="none"
        :autoplay="cc"
        v-else
        @change="dd"
      >
        <el-carousel-item v-for="item, index in 6" :key="index">
          <Card class="carousel-card" style="height: 300px">
            <p slot="title">专线{{item}}</p>
            <div style="padding-top: 30px; margin-left: 30px;">
              <div style="margin-bottom: 20px">
                <span style="font-weight: 700; font-size: 16px">渠道: </span>
                <span>科天</span>
              </div>
              <div style="margin-bottom: 20px">
                <span style="font-weight: 700; font-size: 16px">坐席: </span>
                <span>1001；1002</span>
              </div>
              <div style="margin-bottom: 20px">
                <span style="font-weight: 700; font-size: 16px">号码: </span>
                <span>17777777777 ；17777777778</span>
              </div>
              <div style="display: flex">
                <div style="flex: 1"></div>
                <Button size="small"
                        style="width:80px;     margin-top: 20px;"
                        @click="showAddChannel=true"
                        type="primary">修改
                </Button>
              </div>
            </div>
          </Card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <AddModel :showAddModel="showAddModel" @passBack="passBack"/>
  </Card>

</template>
<script src="./index.js"></script>
<style src="./index.less" lang="less" scoped></style>

