<template>
  <div>
    <div class="border-one">
      <Form
        ref="discountForm"
        :rules="rules"
        :model="formData"
        :label-width="120"
      >
        <div
          style="position: relative;"
          v-for="(item, index) in formData.items"
          :key="index"
        >
        <div class="border-one">
          <h5>折扣时间{{ index + 1 }}</h5>
          <Icon
            type="close-circled"
            class="close-icon"
            @click="handleRemove(index)"
            v-if="formData.items.length !==1"
          ></Icon>
          <FormItem
            label="折扣价:"
            :prop="`items.${index}.discount_price`"
          >
            <Input
              clearable
              v-model="item.discount_price"
              placeholder="请输入折扣价"
            ></Input>
          </FormItem>
          <FormItem
            :label="`折扣时间:`"
            :prop="`items.${index}.discount_time`"
          >
          <TimePicker format="HH:mm" type="timerange" placement="bottom-start" v-model="item.discount_time" placeholder="请选择折扣时间" style="width: 100%"></TimePicker>
          </FormItem>
        </div>
          </div>
        <FormItem>
          <Row>
            <Col span="12">
            <Button
              type="dashed"
              @click="addDiscount"
              icon="plus-round "
            >添加时间折扣价</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'discount',
  props: {},
  data() {
    return {
      formData: {
        items: [{
          discount_time: [],
          discount_price: ''
        }]
      },
      rules: {},
      rulesTempl: {
        discount_price: [{
          required: true,
          message: '请输入折扣价',
          trigger: 'change'
        }],
        discount_time: [{
          required: true,
          type: 'array',
          message: '请选择折扣时间',
          trigger: 'change'
        }],
      }
    }
  },
  created() {
    this.handleRenderRuler();
  },
  methods: {
    // 生成 ruler
    handleRenderRuler() {
      const goodsItemLength = this.formData.items.length;
      const rulesTempl = this.rulesTempl;
      let rulesResult = {};
      for (let i = 0; i < goodsItemLength; i += 1) {
        Object.entries(rulesTempl).forEach(item => {
          rulesResult[`items.${i}.${item[0]}`] = item[1];
        });
      }
      console.log(rulesResult, 'rulesResultChild');
      this.rules = rulesResult
    },

    // 添加优惠折扣
    addDiscount() {
      this.$refs.discountForm.validate(value => {
        console.log(value, 'value11')
      });
      this.formData.items.push({
        discount_time: '',
        discount_price: ''
      });
      this.handleRenderRuler();
    },

    // 校验单个值
    handleCheckValidate(key, index) {
      this.$refs.discountForm.validateField(`items.${index}.${key}`);
    },

    // 删除优惠折扣
    handleRemove(index) {
      this.formData.items.splice(index, 1);
    },

    // 导出本组件的数据
    exportSubmitData() {
      let currentValid = false;
      this.$refs.discountForm.validate(valid => {
        currentValid = valid;
      });
      if (!currentValid) {
        return false;
      }
      return JSON.stringify(this.formData.items);
    },
  }
};
</script>
<style>
.border-one {
  border: 1px dashed #e5e5e5;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0 20px;
  position: relative;
}
.close-icon {
  font-size: 20px;
  position: absolute;
  right: -10px;
  top: -10px;
  color: #ed1a26;
}
</style>
