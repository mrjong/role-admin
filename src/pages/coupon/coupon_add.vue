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
          <FormItem label="卡券名称:" prop="name">
            <Input clearable v-model="formValidate.name" placeholder="请输入卡券名称"></Input>
          </FormItem>
          <Row>
            <FormItem label="所值金额:" prop="money">
              <Input clearable v-model="formValidate.money" placeholder="请输入卡券所值的金额"></Input>
            </FormItem>
            <!-- <Col span="6" :md="6" :lg="6" :xs="24" :sm="24">
            <FormItem :label-width="80" label="会员价:" prop="rank_price">
              <Input clearable v-model="formValidate.rank_price" placeholder="请输入会员价"></Input>
            </FormItem>
            </Col> -->
          </Row>
          
          <Row>
            <FormItem label="抢购限制数量:"  prop="limit_num">
              <Input clearable v-model="formValidate.limit_num" placeholder="请输入卡券可限制抢购数量"></Input>
            </FormItem>
          </Row>
           <Row>
            <FormItem label="可使用次数:"  prop="use_times">
              <Input clearable v-model="formValidate.use_times" placeholder="请输入可使用次数"></Input>
            </FormItem>
          </Row>
           <Row>
            <FormItem label="使用卡券时设定的最低金额:" :label-width="180" prop="min_price">
              <Input clearable v-model="formValidate.min_price" placeholder="请输入使用卡券时设定的最低金额"></Input>
            </FormItem>
          </Row>
           <Row>
                <FormItem label="卡券类型:" prop="category">
            <Select  placeholder="请选择卡券类型" v-model="formValidate.category">
              <Option value="1">次卡</Option>
              <Option value="2">月卡</Option>
            </Select>
          </FormItem>
          </Row>
          
          <Row>
            <Col span="8" :md="8" :lg="8" :xs="24" :sm="24">
            <FormItem label="是否开启分享" prop="is_share">
              <i-switch v-model="formValidate.is_share" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            </Col>
          </Row>
           <FormItem  label="开始使用时间:" prop="use_begin_time">
            <DatePicker style="width:100%" v-model="formValidate.use_begin_time" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择开始使用时间"></DatePicker>
          </FormItem>
          <FormItem  label="使用截止时间:" prop="use_end_time">
            <DatePicker style="width:100%" v-model="formValidate.use_end_time" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择使用截止时间"></DatePicker>
          </FormItem>
          <FormItem label="微缩图片:" prop="thumbnail_url">
            <div class="demo-upload-list" v-for="item in uploadListthumbnail_url">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item,'uploadthumbnail_url')"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload v-show="uploadListthumbnail_url.length===0" ref="uploadthumbnail_url" :show-upload-list="false" name="upfile" :default-file-list="defaultList" :data="{isCompress:1}" :on-success="handleSuccess1" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :headers="headers" action="/admin/upload/img" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <!-- <FormItem label="实际大小图片:" prop="goods_img">
            <div class="demo-upload-list" v-for="item in uploadListBig">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item,'upload')"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload ref="upload" :show-upload-list="false" name="upfile" :default-file-list="defaultList" :data="{isCompress:1}" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :headers="headers" action="/admin/upload/img" style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem> -->

          <FormItem label="简短描述:" prop="remark">
            <Input clearable v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入简短描述"></Input>
          </FormItem>
          <!-- <FormItem label="详细描述:" prop="desc">
            <Input clearable v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细描述"></Input>
          </FormItem> -->
          <!-- <FormItem label="商家备注:" prop="seller_note">
            <Input clearable v-model="formValidate.seller_note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商家备注"></Input>
          </FormItem> -->
          <!-- <FormItem label="详细描述:" prop="desc">
            <vue-ueditor-wrap :destroy="true" placeholder="请输入详细描述" :config="myConfig" v-model="formValidate.desc"></vue-ueditor-wrap>
          </FormItem> -->
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
    <Modal title="预览图片" v-model="visible">
      <img :src="`${imgName}`" v-if="visible" style="width: 100%">
    </Modal>
  </Card>
</template>

<script>
import { coupon_add, coupon_edit } from "@/service/getData"
import Cookie from "js-cookie"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  name: "coupon_add",
  components: { VueUeditorWrap },
  data() {
         const use_begin_date_validator = (rule, value, callback) => {
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
      data1: {},
      headers: {
        token: Cookie.get("token")
      },
      thumbnail_urlImg: {},
      breadcrumbTitle: "编辑卡券",
      formValidate: {
        desc: "",
        sort_order: 1
      },
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListthumbnail_url: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入卡券名称",
            trigger: "blur"
          }
        ],
          category: [
                    {
                        required: true,
                        message: "请选择卡券类型",
                        trigger: "change"
                    }
                ],
        money: [
          {
            required: true,
            message: "请输入卡券所值的金额",
            trigger: "blur"
          },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
         use_begin_time: [
          {
            required: true,
            type: "date",
            message: "请选择开始使用时间",
            trigger: "change"
          },
          { validator: use_begin_date_validator, trigger: "change" }
        ],
        use_end_time: [
          {
            required: true,
            type: "date",
            message: "请选择使用截止时间",
            trigger: "change"
          },
          { validator: use_end_date_validator, trigger: "change" }
        ],
          limit_num: [
          {
            required: true,
            message: "请输入可限制抢购数量",
            trigger: "blur"
          },
          {
            pattern: /^\d*$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
          use_times: [
          {
            required: true,
            message: "请输入可使用次数",
            trigger: "blur"
          },
          {
            pattern: /^\d*$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        // rank_price: [
        //   {
        //     required: true,
        //     message: "请输入会员价格",
        //     trigger: "blur"
        //   },
        //   {
        //     pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        //     message: "格式不正确",
        //     trigger: "blur"
        //   }
        // ],
        min_price: [
          {
            required: true,
            message: "请输入使用卡券时设定的最低金额",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
        thumbnail_url: [
          {
            required: true,
            message: "请上传微缩图片",
            trigger: "blur"
          }
        ],

        remark: [
          {
            required: true,
            message: "请输入简短描述",
            trigger: "blur"
          },
          {
            max: 250,
            message: "简短描述不能超过250个字",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入详细描述",
            trigger: "blur"
          },
          {
            max: 65535,
            message: "详细描述不能太长",
            trigger: "blur"
          }
        ],
        seller_note: [
          {
            required: true,
            message: "请输入商家备注",
            trigger: "blur"
          },
          {
            max: 250,
            message: "详细描述不能超过250个字",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
    this.loadPage()
  },
  mounted() {
    // this.uploadListBig = this.$refs.upload.fileList
    // this.uploadListthumbnail_url = this.$refs.uploadthumbnail_url.fileList
  },
  methods: {
    loadPage() {
      if (this.$route.query && this.$route.query.id) {
        this.formValidate = {
          id: this.$route.query.id,
          name: this.$route.query.name,
          money: this.$route.query.money,
          min_price: this.$route.query.min_price || 0,
          remark: this.$route.query.remark,
          thumbnail_url: this.$route.query.thumbnail_url,
          is_share: this.$route.query.is_share ? true : false,
          use_begin_time:new Date(Number(this.$route.query.use_begin_time)*1000),
          use_end_time:new Date(Number(this.$route.query.use_end_time)*1000),
          category:this.$route.query.category+'',
          use_times:this.$route.query.use_times+'',
          min_price:this.$route.query.min_price,
          limit_num:this.$route.query.limit_num+''

        }
        this.uploadListthumbnail_url.push({
          name: this.$route.query.thumbnail_url,
          url: this.$route.query.thumbnail_url,
          status: "finished"
        })
        this.breadcrumbTitle = "编辑卡券"
      } else {
        // 新增卡券时提示一下
        this.breadcrumbTitle = "添加卡券"
      }
    },
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file, upload) {
      console.log(file)
      if (upload !== "upload") {
        this.uploadListthumbnail_url.splice(this.uploadListthumbnail_url.indexOf(file), 1)
        this.formValidate.thumbnail_url = ""
      } else {
        // this.uploadListBig.forEach((element, index) => {
        //   if (element.url === file.url) {
        //     this.uploadListBig.splice(this.uploadListBig.indexOf(file), 1)
        //     let i = this.formValidate.goods_img.indexOf(file.url)
        //     console.log(i)
        //     this.formValidate.goods_img.splice(i, 1)
        //     console.log(this.uploadListBig)
        //     console.log(this.formValidate.goods_img)
        //   }
        // })
      }
    },
    handleSuccess1(res, file, fileList) {
      if (res && res.code === 200) {
        this.formValidate.thumbnail_url = res.data.path
        this.uploadListthumbnail_url = [
          {
            name: this.formValidate.thumbnail_url,
            url: this.formValidate.thumbnail_url,
            status: "finished"
          }
        ]
        this.$refs.formValidate.validateField("thumbnail_url")
        file.url = res.data.path
        file.name = res.data.path
      }
    },
    handleSuccess(res, file, fileList) {
      console.log(fileList)
      if (res && res.code === 200) {
        // this.formValidate.goods_img &&
        //   this.formValidate.goods_img.push(res.data.path)
        this.uploadListBig.push({
          name: res.data.path,
          url: res.data.path,
          status: "finished"
        })
        // this.$refs.formValidate.validateField("goods_img")
        file.url = res.data.path
        file.name = res.data.path
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " +
          file.name +
          " 格式不正确，请上传jpeg、jpg 或 png 格式的图片。"
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      })
    },
    handleBeforeUpload(file) {
    //   const check = this.uploadListBig.length < 20
    //   if (!check) {
    //     this.$Notice.warning({
    //       title: "最多只能上传 20 张图片。"
    //     })
    //   }
      return 
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新卡券信息
        res = await coupon_edit({
          id: this.$route.query.id,
           name: this.formValidate.name,
          money: this.formValidate.money,
          category:this.formValidate.category,
          min_price: this.formValidate.min_price || 0,
          thumbnail_url: this.formValidate.thumbnail_url,
          is_share: this.formValidate.is_share ? 1 : 0,
          use_times:this.formValidate.use_times,
          limit_num:this.formValidate.limit_num,
          use_begin_time:+new Date(this.formValidate.use_begin_time)/1000,
          use_end_time:+new Date(this.formValidate.use_end_time)/1000,
          remark:this.formValidate.remark
        })
      } else {
        // 新增卡券
        res = await coupon_add({
          name: this.formValidate.name,
          money: this.formValidate.money,
          category:this.formValidate.category,
          min_price: this.formValidate.min_price || 0,
          thumbnail_url: this.formValidate.thumbnail_url,
          is_share: this.formValidate.is_share ? 1 : 0,
          use_times:this.formValidate.use_times,
          limit_num:this.formValidate.limit_num,
          use_begin_time:+new Date(this.formValidate.use_begin_time)/1000,
          use_end_time:+new Date(this.formValidate.use_end_time)/1000,
          remark:this.formValidate.remark
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/coupon/coupon_list")
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
      this.uploadListthumbnail_url = []
      this.uploadListBig = []
      if (this.$route.query && this.$route.query.id) {
        this.formValidate.id = this.$route.query.id
      } else {
        this.formValidate = {
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>