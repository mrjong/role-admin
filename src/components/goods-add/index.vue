<template>
  <div>
    <div class="border-one">
      <Form
        ref="goodsAddForm"
        :rules="rules"
        :model="formData"
        :label-width="120"
      >
        <div
          class="border-one"
          v-for="(item, index) in formData.items"
          :key="index"
        >
          <Icon
            type="close-circled"
            class="close-icon"
            @click="handleRemove(index)"
            v-if="index > 0"
          ></Icon>
          <FormItem
            label="商品:"
            :prop="`items.${index}.goods_id`"
          >
            <Select
              filterable
              clearable
              @on-change="handleCheckValidate('goods_id', index)"
              v-model="item.goods_id"
            >
              <Option
                :disabled="goodItem.disabled"
                v-for="goodItem in goodsList"
                :key="goodItem.goods_id"
                :value="goodItem.goods_id"
              >{{goodItem.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            :label-width="120"
            label="商品数量"
            :prop="`items.${index}.goods_num`"
          >
            <Input
              clearable
              v-model="item.goods_num"
              placeholder="请输入商品剩余数量"
            ></Input>
          </FormItem>
          <FormItem
            :label-width="120"
            label="是否可以使用红包"
            :prop="`items.${index}.is_use_bonus`"
          >
            <i-switch
              v-model="item.is_use_bonus"
              size="large"
              @on-change="handleCheckValidate('is_use_bonus', index)"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>

          <FormItem
            :label-width="120"
            label="是否可以使用卡券"
            :prop="`items.${index}.is_use_coupon`"
          >
            <i-switch
              v-model="item.is_use_coupon"
              size="large"
              @on-change="handleCheckValidate('is_use_coupon', index)"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>

          <FormItem
            label="是否参加促销"
            :prop="`items.${index}.is_promotion`"
          >
            <i-switch
              v-model="item.is_promotion"
              size="large"
              @on-change="handleCheckValidate('is_promotion', index)"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem
            v-if="item.is_promotion"
            label="促销价:"
            :prop="'items.' + index + '.promotion_price'"
          >
            <Input
              clearable
              v-model="item.promotion_price"
              placeholder="请输入促销价"
            ></Input>
          </FormItem>

          <FormItem
            label="有无预约价"
            :prop="'items.' + index + '.is_preset_depreciate'"
          >
            <i-switch
              v-model="item.is_preset_depreciate"
              size="large"
              @on-change="handleCheckValidate('is_preset_depreciate', index)"
            >
              <span slot="open">有</span>
              <span slot="close">无</span>
            </i-switch>
          </FormItem>
          <FormItem
            v-if="item.is_preset_depreciate"
            label="预约价:"
            :prop="'items.' + index + '.preset_depreciate'"
          >
            <Input
              clearable
              v-model="item.preset_depreciate"
              placeholder="请输入预约价"
            ></Input>
          </FormItem>

          <FormItem
            label="是否参加团购"
            :prop="'items.' + index + '.is_group_buy'"
          >
            <i-switch
              v-model="item.is_group_buy"
              size="large"
              @on-change="handleCheckValidate('is_group_buy', index)"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <FormItem
            v-if="item.is_group_buy"
            label="团购价:"
            :prop="'items.' + index + '.group_buy_price'"
          >
            <Input
              clearable
              v-model="item.group_buy_price"
              placeholder="请输入团购价"
            ></Input>
          </FormItem>
          <FormItem
            label="销售时间:"
            :prop="'items.' + index + '.sale_time'"
          >
            <Select
              filterable
              clearable
              v-model="item.sale_time"
            >
              <Option
                :key="item2.id"
                v-for="item2 in item.sale_timeList"
                :value="Number(item2.id)"
              >{{item2.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            label="开始售卖时间:"
            :prop="'items.' + index + '.start_sale_time'"
          >
            <DatePicker
              style="width:100%"
              v-model="item.start_sale_time"
              type="datetime"
              placement="bottom-start"
              placeholder="请选择开始售卖时间"
              @on-change="handleCheckValidate('start_sale_time', index)"
            ></DatePicker>
          </FormItem>
          <FormItem
            label="结束售卖时间:"
            :prop="'items.' + index + '.end_sale_time'"
          >
            <DatePicker
              style="width:100%"
              v-model="item.end_sale_time"
              type="datetime"
              placement="bottom-start"
              placeholder="请选择结束售卖时间"
              @on-change="handleCheckValidate('end_sale_time', index)"
            ></DatePicker>
          </FormItem>
          <FormItem
            label="备注:"
            prop="remarks"
            :prop="'items.' + index + '.remarks'"
          >
            <Input
              clearable
              v-model="item.remarks"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 3}"
              placeholder="请输入备注"
            ></Input>
          </FormItem>
          <FormItem
            :label-width="110"
            label="是否参加折扣"
            :prop="'items.' + index + '.is_discount'"
          >
            <i-switch
              v-model="item.is_discount"
              size="large"
              @on-change="handleCheckValidate('is_discount', index)"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
          <discount
            v-if="item.is_discount"
            ref="discount"
          ></discount>
        </div>
        <FormItem>
          <Row>
            <Col span="12">
            <Button
              type="dashed"
              @click="addGoods"
              icon="plus-round "
            >添加商品</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script src="./script.js"></script>
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
