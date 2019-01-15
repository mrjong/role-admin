<template>
  <Card class="vue-panel">
    <p slot="title">
      {{breadcrumbTitle}}
      <Button class="fr vue-back-btn header-btn" type="default" size="small" @click="$router.go(-1)">返回</Button>
    </p>
    <div class="vue-panel-desc">
      <Row type="flex" justify="center">
        <Col :md="14" :lg="12" :xs="24" :sm="24">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="红包名称:" prop="name">
            <Input clearable v-model="formValidate.name" placeholder="请输入红包名称"></Input>
          </FormItem>
          <FormItem label="红包类型:" prop="type">
            <Select v-model="formValidate.type">
              <Option value='1'>新人红包</Option>
              <Option value='2'>活动红包</Option>
              <Option value='3'>积分红包</Option>
              <Option value="4">个人红包</Option>
              <Option value="5">邀请红包</Option>
            </Select>
          </FormItem>
          <FormItem label="简短描述:" prop="desc">
            <Input clearable v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入简短描述"></Input>
          </FormItem>
          <FormItem label="所值金额:" prop="money">
            <Input clearable v-model="formValidate.money" placeholder="请输入所值金额"></Input>
          </FormItem>
          <FormItem v-if="!(formValidate.use_start_date || formValidate.use_end_date)" label="使用时长(天):" prop="use_date_length">
            <Input clearable v-model="formValidate.use_date_length" placeholder="请输入使用时长"></Input>
          </FormItem>
          <FormItem label="最低消费金额:" prop="min_goods_amount">
            <Input clearable v-model="formValidate.min_goods_amount" placeholder="请输入最低消费金额"></Input>
          </FormItem>
          <!-- <FormItem label="发送开始时间:" prop="send_start_date">
            <DatePicker style="width:100%" v-model="formValidate.send_start_date" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择开始发送时间"></DatePicker>
          </FormItem>
          <FormItem label="发送截止时间:" prop="send_end_date">
            <DatePicker style="width:100%" v-model="formValidate.send_end_date" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择截止发送时间"></DatePicker>
          </FormItem> -->
          <FormItem v-if="!formValidate.use_date_length" label="开始使用时间:" prop="use_start_date">
            <DatePicker style="width:100%" v-model="formValidate.use_start_date" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择开始使用时间"></DatePicker>
          </FormItem>
          <FormItem v-if="!formValidate.use_date_length" label="使用截止时间:" prop="use_end_date">
            <DatePicker style="width:100%" v-model="formValidate.use_end_date" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择使用截止时间"></DatePicker>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button> -->
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
import { bonus_add, bonus_edit } from "@/service/getData"
export default {
  name: "bonus_add",
  data() {
    // const send_start_date_validator = (rule, value, callback) => {
    //   if (value && value.valueOf() < Date.now()) {
    //     callback(new Error("开始发送时间不能小于当前时间"))
    //   } else if (
    //     this.formValidate.use_start_date &&
    //     value &&
    //     value.valueOf() > +new Date(this.formValidate.use_start_date)
    //   ) {
    //     callback(new Error("开始发送时间不能大于开始使用时间"))
    //   } else if (
    //     this.formValidate.use_end_date &&
    //     value &&
    //     value.valueOf() > +new Date(this.formValidate.use_end_date)
    //   ) {
    //     callback(new Error("开始发送时间不能大于结束使用时间"))
    //   } else if (
    //     this.formValidate.send_end_date &&
    //     value &&
    //     value.valueOf() > +new Date(this.formValidate.send_end_date)
    //   ) {
    //     callback(new Error("开始发送时间不能大于结束截止时间"))
    //   } else {
    //     callback()
    //   }
    // }
    // const send_end_date_validator = (rule, value, callback) => {
    //   if (value && value.valueOf() < Date.now()) {
    //     callback(new Error("开始发送时间不能小于当前时间"))
    //   } else if (
    //     this.formValidate.use_start_date &&
    //     value &&
    //     value.valueOf() < +new Date(this.formValidate.use_start_date)
    //   ) {
    //     callback(new Error("截止发送时间不能小于开始使用时间"))
    //   } else if (
    //     this.formValidate.use_end_date &&
    //     value &&
    //     value.valueOf() < +new Date(this.formValidate.use_end_date)
    //   ) {
    //     callback(new Error("截止发送时间不能小于结束使用时间"))
    //   } else if (
    //     this.formValidate.send_end_date &&
    //     value &&
    //     value.valueOf() < +new Date(this.formValidate.send_end_date)
    //   ) {
    //     callback(new Error("截止发送时间不能小于结束截止时间"))
    //   } else {
    //     callback()
    //   }
    // }
    const use_start_date_validator = (rule, value, callback) => {
      if (value && value.valueOf() < Date.now()) {
        callback(new Error("开始使用时间不能小于当前时间"))
      } else if (
        this.formValidate.use_end_date &&
        value &&
        value.valueOf() > +new Date(this.formValidate.use_end_date)
      ) {
        callback(new Error("开始使用时间不能大于结束使用时间"))
      } else {
        callback()
      }
    }
    const use_end_date_validator = (rule, value, callback) => {
      if (value && value.valueOf() < Date.now()) {
        callback(new Error("结束使用时间不能小于当前时间"))
      } else if (
        this.formValidate.use_start_date &&
        value &&
        value.valueOf() < +new Date(this.formValidate.use_start_date)
      ) {
        callback(new Error("结束使用时间不能小于结束使用时间"))
      } else {
        callback()
      }
    }
    return {
      breadcrumbTitle: "编辑红包",
      formValidate: {
        use_date_length: ""
      },
      startTimeOption: {},
      endTimeOption2: {},
      endTimeOption: {},
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入红包名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择红包类型",
            trigger: "change"
          }
        ],
        money: [
          {
            required: true,
            message: "请输入所值金额",
            trigger: "blur"
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        use_date_length: [
          {
            required: true,
            message: "请输入使用时长",
            trigger: "blur",
          },
           {
            pattern: /^[0-9]{0,3}$/,
            message: "使用时长长度不能超过3位",
            max: 3
          },
          {
            pattern: /^[0-9]{0,3}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        min_goods_amount: [
          {
            required: true,
            message: "请输入最低消费金额",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入简短描述",
            trigger: "blur"
          },
          {
            max: 250,
            message: "简短描述长度不能超过250",
            trigger: "blur"
          }
        ],
        // send_start_date: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择发送开始时间",
        //     trigger: "change"
        //   },
        //   { validator: send_start_date_validator, trigger: "change" }
        // ],
        // send_end_date: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择发送结束时间",
        //     trigger: "change"
        //   },
        //   { validator: send_end_date_validator, trigger: "change" }
        // ],
        use_start_date: [
          {
            required: true,
            type: "date",
            message: "请选择开始使用时间",
            trigger: "change"
          },
          { validator: use_start_date_validator, trigger: "change" }
        ],
        use_end_date: [
          {
            required: true,
            type: "date",
            message: "请选择使用截止时间",
            trigger: "change"
          },
          { validator: use_end_date_validator, trigger: "change" }
        ]
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.bonus_id) {
      console.log("-------", this.$route.query)
      this.formValidate = {
        bonus_id: this.$route.query.bonus_id,
        name: this.$route.query.name,
        money: this.$route.query.money,
        type: this.$route.query.type + "",
        desc: this.$route.query.desc,
        min_goods_amount: this.$route.query.min_goods_amount,
        use_date_length: this.$route.query.use_date_length+'',
        // send_start_date: +new Date(this.$route.query.send_start_date) / 1000,
        // send_end_date: +new Date(this.$route.query.send_end_date) / 1000,
        use_start_date: Number(this.$route.query.use_start_date)
          ? new Date(+new Date(Number(this.$route.query.use_start_date)) * 1000)
          : "",
        use_end_date: Number(this.$route.query.use_end_date)
          ? new Date(+new Date(Number(this.$route.query.use_end_date)) * 1000)
          : "",
        min_goods_amount: this.$route.query.min_goods_amount
      }
      this.breadcrumbTitle = "编辑红包"
    } else {
      // 新增用户时提示一下
      this.breadcrumbTitle = "添加红包"
    }
  },
  mounted() {
    this.onStartTimeChange()
    this.onEndTimeChange()
  },
  methods: {
    /**
     * 开始时间发生变化时触发,设置结束时间不可选择的日期
     * 结束时间应大于等于开始时间,且小于等于当前时间
     * @param {string} startTime 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onStartTimeChange(startTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return (
            endTime < new Date(startTime) ||
            (endTime && endTime.valueOf() > Date.now() - 1000 * 3600)
          )
        }
      }
    },
    /**
     * 结束时间发生变化时触发,设置开始时间不可选择的日期
     * 开始时间小于等于结束时间,且小于等于当前时间
     * @param {string} date 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onEndTimeChange(endTime, type) {
      this.startTimeOption = {
        disabledDate(startTime) {
          return (
            startTime.getTime() > new Date(endTime).getTime() ||
            startTime < Date.now()
          )
        }
      }
    },
    /**
     * 结束时间发生变化时触发,设置开始时间不可选择的日期
     * 开始时间小于等于结束时间,且小于等于当前时间
     * @param {string} date 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onEndUseTimeChange(endTime, type) {
      this.endTimeOption = {
        disabledDate(startTime) {
          return startTime.getTime() > new Date(endTime).getTime()
        }
      }
    },
    onBlur() {
      console.log("2222222222")
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.bonus_id) {
        // 更新用户信息
        res = await bonus_edit({
          id: this.$route.query.bonus_id,
          name: this.formValidate.name,
          money: this.formValidate.money,
          type: this.formValidate.type,
          desc: this.formValidate.desc,
          min_goods_amount: this.formValidate.min_goods_amount,
          use_date_length: this.formValidate.use_date_length+'',
          // send_start_date: +new Date(this.formValidate.send_start_date) / 1000,
          // send_end_date: +new Date(this.formValidate.send_end_date) / 1000,
          use_start_date: +new Date(this.formValidate.use_start_date) / 1000,
          use_end_date: +new Date(this.formValidate.use_end_date) / 1000,
          min_goods_amount: this.formValidate.min_goods_amount
        })
      } else {
        // 新增用户
        console.log(this.formValidate.use_start_date)
        res = await bonus_add({
          name: this.formValidate.name,
          money: this.formValidate.money,
          type: this.formValidate.type,
          desc: this.formValidate.desc,
          min_goods_amount: this.formValidate.min_goods_amount,
          use_date_length: this.formValidate.use_date_length,
          // send_start_date: +new Date(this.formValidate.send_start_date) / 1000,
          // send_end_date: +new Date(this.formValidate.send_end_date) / 1000,
          use_start_date: +new Date(this.formValidate.use_start_date) / 1000,
          use_end_date: +new Date(this.formValidate.use_end_date) / 1000,
          min_goods_amount: this.formValidate.min_goods_amount
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/bonus/bonus_list")
        }, 2000)
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate)
          this.register()
        } else {
          //   this.$Message.error("Fail!");
        }
      })
    },
    handleReset(name) {
      this.formValidate.desc = ""
      tinymce.activeEditor.setContent("")
      this.uploadListthumb = []
      this.uploadListBig = []
      if (this.$route.query && this.$route.query.bonus_id) {
        this.formValidate.bonus_id = this.$route.query.bonus_id
      } else {
        this.formValidate = {
          bonus_img: []
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>