<template>
  <div>
    <div class="alert-title">基本信息</div>
    <div class="alert-desc">
      <div class="panel-desc">
        <Form
          ref="formItem"
          :model="formItem"
          :label-width="100"
          class="panel_list"
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
              label="工作流名称:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入工作流名称"
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
              label="工作流类型:"
              prop="buffet_id"
            >
              <Select
                size="small"
                placeholder="请选择工作流类型"
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
              :md="12"
              :lg="12"
              span="6"
            >
            <FormItem
              span="6"
              label="工作流编号:"
              prop="buffet_id"
            >
              <Input
                size="small"
                clearable
                v-model="formItem.buffet_name"
                placeholder="请输入工作流编号"
              ></Input>
            </FormItem>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
    <div class="alert-title">节点信息</div>
    <div class="alert-desc">
      <Row
        type="flex"
        justify="center"
      >
        <Col
          span="12"
          :md="14"
          :lg="12"
          :xs="24"
          :sm="24"
        >
        <Form
          ref="formItem"
          :model="formItem"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem
            label="答题标题:"
            prop="title"
          >
            <Input
              clearable
              v-model="formItem.title"
              placeholder="请输入答题标题"
            ></Input>
          </FormItem>
          <FormItem
            v-for="(item, index) in formItem.items"
            v-if="item.status"
            :key="index"
            label="答题选项："
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '答题选项内容不能为空', trigger: 'blur'}"
          >
            <Row>
              <Col span="18">
              <Input
                type="text"
                v-model="item.value"
                placeholder="请输入答题选项内容"
              ></Input>
              </Col>
              <Col
                span="4"
                offset="1"
              >
              <Button
                type="error"
                @click="handleRemove(index)"
              >删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
              <Button
                type="dashed"
                long
                @click="handleAdd"
                icon="plus-round "
              >添加答题选项</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script src="./gongzuoliu.js"></script>

<style lang="less">
@import "./index.less";
</style>
