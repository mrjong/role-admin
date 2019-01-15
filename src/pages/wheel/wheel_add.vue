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
          <FormItem label="标题:" prop="title">
            <Input clearable v-model="formValidate.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="链接地址:" prop="link_url">
            <Input clearable v-model="formValidate.link_url" placeholder="请输入链接地址"></Input>
          </FormItem>
          <FormItem label="排序号:" prop="rank">
            <Input clearable v-model="formValidate.rank" placeholder="请输入排序号：数字越小 越靠前"></Input>
          </FormItem>
          <FormItem label="轮播图片:" prop="img_url">
            <div class="demo-upload-list" v-for="item in uploadListthumb">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item,'uploadThumb')"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload v-show="uploadListthumb.length===0" ref="uploadThumb" :show-upload-list="false" name="upfile" :default-file-list="defaultList" :data="{isCompress:1}" :on-success="handleSuccess1" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :headers="headers" action="/admin/upload/img" style="display: inline-block;width:58px;">
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
import { wheel_add, wheel_edit } from "@/service/getData"
import Cookie from "js-cookie"
export default {
  name: "wheel_add",
  data() {
    return {
      cityList: [],
      data1: {},
      headers: {
        token: Cookie.get("token")
        // "Content-Type": "multipart/form-data"
      },
      thumbImg: {},
      breadcrumbTitle: "编辑轮播图",
      formValidate: {},
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListBig: [],
      uploadListthumb: [],
      ruleValidate: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            max: 150,
            message: "标题长度不能超过150",
            trigger: "blur"
          }
        ],
        link_url: [
          {
            required: true,
            message: "请输入链接地址",
            trigger: "blur"
          },
          {
            max: 250,
            message: "链接地址长度不能超过250",
            trigger: "blur"
          }
        ],
        img_url: [
          {
            required: true,
            message: "请上传轮播图",
            trigger: "blur"
          }
        ],
        rank: [
          {
            required: true,
            message: "请输入排序号",
            trigger: "blur"
          },
          {
            pattern: /^[0-9]{1,}$/,
            message: "请输入数字排序号",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {
    // this.uploadListthumb = this.$refs.uploadThumb.fileList
  },
  created() {
    this.loadPage()
  },
  methods: {
    loadPage() {
      if (this.$route.query && this.$route.query.id) {
        this.uploadListthumb = []
        this.formValidate = {
          id: this.$route.query.id,
          title: this.$route.query.title,
          link_url: this.$route.query.link_url,
          img_url: this.$route.query.img_url,
          rank: this.$route.query.rank + ""
        }
        this.uploadListthumb.push({
          name: this.$route.query.img_url,
          url: this.$route.query.img_url,
          status: "finished"
        })
        this.breadcrumbTitle = "编辑轮播图"
      } else {
        // 新增用户时提示一下
        this.formValidate = {
          contents: ""
        }
        this.uploadListthumb = []
        this.breadcrumbTitle = "添加轮播图"
      }
    },
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file, upload) {
      const fileList = this.$refs[upload].fileList
      this.uploadListthumb.splice(fileList.indexOf(file), 1)
      this.formValidate.img_url = ""
    },
    handleSuccess1(res, file, fileList) {
      if (res && res.code === 200) {
        this.formValidate.img_url = res.data.path
        this.uploadListthumb = [
          {
            name: this.formValidate.img_url,
            url: this.formValidate.img_url,
            status: "finished"
          }
        ]
        this.$refs.formValidate.validateField("img_url")
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
      const check = this.uploadListBig.length < 20
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传 20 张图片。"
        })
      }
      return check
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新用户信息
        res = await wheel_edit({
          id: this.formValidate.id,
          title: this.formValidate.title,
          link_url: this.formValidate.link_url,
          img_url: this.formValidate.img_url,
          rank: this.formValidate.rank
        })
      } else {
        // 新增用户
        res = await wheel_add({
          title: this.formValidate.title,
          link_url: this.formValidate.link_url,
          img_url: this.formValidate.img_url,
          rank: this.formValidate.rank
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/wheel/wheel_list")
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
      this.formValidate.contents = ""
      tinymce.activeEditor.setContent("")
      this.uploadListthumb = []
      this.uploadListBig = []
      if (this.$route.query && this.$route.query.goods_id) {
        this.formValidate.goods_id = this.$route.query.goods_id
      } else {
        this.formValidate = {
          goods_img: []
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>