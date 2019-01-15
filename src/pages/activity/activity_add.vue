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
          <FormItem label="活动名称:" prop="name">
            <Input clearable v-model="formValidate.name" placeholder="请输入活动名称"></Input>
          </FormItem>
           <FormItem label="活动链接:" prop="linked_url">
            <Input clearable v-model="formValidate.linked_url" placeholder="请输入活动链接"></Input>
          </FormItem>
           <Row>
            <FormItem label="每天用户可参与的次数:"  prop="times">
              <Input clearable v-model="formValidate.times" placeholder="请输入每天用户可参与的次数"></Input>
            </FormItem>
          </Row>
        
           <Row>
                <FormItem label="活动状态:" prop="status">
            <Select  placeholder="请选择活动状态" v-model="formValidate.status">
              <Option value="1">开启</Option>
              <Option value="0">关闭</Option>
            </Select>
          </FormItem>
          </Row>
           <FormItem  label="开始使用时间:" prop="begin_time">
            <DatePicker style="width:100%" v-model="formValidate.begin_time" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择开始使用时间"></DatePicker>
          </FormItem>
          <FormItem  label="使用截止时间:" prop="end_time">
            <DatePicker style="width:100%" v-model="formValidate.end_time" format="yyyy-MM-dd hh:mm:ss" type="datetime" placement="bottom-start" placeholder="请选择使用截止时间"></DatePicker>
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
import { activity_add, activity_edit } from "@/service/getData"
import Cookie from "js-cookie"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  name: "activity_add",
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
      breadcrumbTitle: "编辑活动",
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
            message: "请输入活动名称",
            trigger: "blur"
          }
        ],
            linked_url: [
          {
            required: true,
            message: "请输入活动链接",
            trigger: "blur"
          }
        ],
          status: [
                    {
                        required: true,
                        message: "请选择活动状态",
                        trigger: "change"
                    }
                ],
         begin_time: [
          {
            required: true,
            type: "date",
            message: "请选择开始使用时间",
            trigger: "change"
          },
          { validator: use_begin_date_validator, trigger: "change" }
        ],
        end_time: [
          {
            required: true,
            type: "date",
            message: "请选择使用截止时间",
            trigger: "change"
          },
          { validator: use_end_date_validator, trigger: "change" }
        ],
          num: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          },
          {
            pattern: /^\d*$/,
            message: "格式不正确",
            trigger: "blur"
          }
        ],
          times: [
          {
            required: true,
            message: "请输入每天用户可参与的次数",
            trigger: "blur"
          },
          {
            pattern: /^\d*$/,
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
          remark: this.$route.query.remark,
          linked_url:this.$route.query.linked_url,
          thumbnail_url: this.$route.query.thumbnail_url,
          begin_time:new Date(Number(this.$route.query.begin_time)*1000),
          end_time:new Date(Number(this.$route.query.end_time)*1000),
          status:this.$route.query.status+'',
          times:this.$route.query.times+'',
          num:this.$route.query.num+''

        }
        this.uploadListthumbnail_url.push({
          name: this.$route.query.thumbnail_url,
          url: this.$route.query.thumbnail_url,
          status: "finished"
        })
        this.breadcrumbTitle = "编辑活动"
      } else {
        // 新增活动时提示一下
        this.breadcrumbTitle = "添加活动"
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
        // 更新活动信息
        res = await activity_edit({
          id: this.$route.query.id,
          name: this.formValidate.name,
          status:this.formValidate.status,
          thumbnail_url: this.formValidate.thumbnail_url,
          times:this.formValidate.times,
          linked_url:this.formValidate.linked_url+'',
          begin_time:+new Date(this.formValidate.begin_time)/1000,
          end_time:+new Date(this.formValidate.end_time)/1000,
        })
      } else {
        // 新增活动
        res = await activity_add({
          name: this.formValidate.name,
          status:this.formValidate.status,
          thumbnail_url: this.formValidate.thumbnail_url,
          times:this.formValidate.times,
          linked_url:this.formValidate.linked_url+'',
          begin_time:+new Date(this.formValidate.begin_time)/1000,
          end_time:+new Date(this.formValidate.end_time)/1000,
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/activity/activity_list")
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