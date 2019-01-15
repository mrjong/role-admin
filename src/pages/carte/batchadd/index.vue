<template>
  <Card class="vue-panel">
    <p slot="title">
      {{breadcrumbTitle}}
      <Button
        class="fr vue-back-btn header-btn"
        type="default"
        size="small"
        @click="$router.go(-1)"
      >返回</Button>
    </p>
    <Steps :current="current">
      <Step
        title="预约时间"
        content="批量添加预约时间"
      >
      </Step>
      <Step
        title="选择餐柜与菜单类型"
        content="批量选择餐柜与菜单类型"
      ></Step>
      <Step
        title="添加商品"
        content="批量添加上架商品"
      ></Step>
    </Steps>
    <div class="vue-panel-desc">
      <Row
        type="flex"
        justify="center"
      >
        <Col
          :md="14"
          :lg="12"
          :xs="24"
          :sm="24"
        >
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="100"
        >
          <div
            class="border-one"
            v-show="current===0"
          >
            <div
              class="border-one"
              v-for="(item, index) in formValidate.preset_time_arr"
              :key="index"
            >
              <Icon
                type="close-circled"
                class="close-icon"
                v-if="formValidate.preset_time_arr.length!==1"
                @click="handleRemove(index)"
              ></Icon>
              <FormItem
                :label="'预约时间'+index+'：'"
                :prop="'preset_time_arr.' + index + '.time'"
                :rules="{required: true, message: '预约时间不能为空',
                  type:'date',
                  trigger: 'change'
                  }"
              >

                <DatePicker
                  v-model="item.time"
                  placeholder="请选择预约时间"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </div>
            <FormItem>
              <Row>
                <Col span="12 ">
                <Button
                  type="dashed"
                  @click="addTime"
                  icon="plus-round "
                >添加预约时间</Button>
                </Col>
              </Row>
            </FormItem>
          </div>
        </Form>

        <div
          ref="test2"
          class="border-one"
          v-show="current===1"
        >
          <Form
            ref="formValidate2"
            :model="formValidate2"
            :rules="ruleValidate2"
          >
            <FormItem
              label="菜单类型:"
              prop="carte_type"
            >
              <Select
                filterable
                clearable
                v-model="formValidate2.carte_type"
              >
                <Option
                  :key="item.id"
                  v-for="item in carte_typeList"
                  :value="Number(item.id)"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem
              label="餐柜:"
              prop="buffet_id_arr"
            >
              <Select
                filterable
                clearable
                multiple
                v-model="formValidate2.buffet_id_arr"
              >
                <Option
                  :key="item.buffet_id"
                  v-for="item in buffetList"
                  :value="Number(item.buffet_id)"
                >{{item.buffet_name}}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <Form>
          <div
            class="border-one"
            v-show="current===2"
          >
            <goods-add ref="goodsAdd"></goods-add>
          </div>
          <FormItem>
            <Button
              type="primary"
              v-if="current!==0"
              @click="current--"
            >上一步</Button>
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
            >
              {{current===2?'保存':'下一步'}}
            </Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
  </Card>
</template>
<script src="./script.js"></script>
<style >
.border-one {
  border: 1px dashed #e5e5e5;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0 20px;
  position: relative;
}
</style>
