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
          <FormItem label="作者:" prop="author">
            <Input clearable v-model="formValidate.author" placeholder="请输入作者"></Input>
          </FormItem>
          <FormItem label="微缩图片:" prop="thumbnail_url">
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
          <FormItem label="简介:" prop="introduction">
            <Input clearable v-model="formValidate.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入简介"></Input>
          </FormItem>
          <FormItem label="内容:" prop="contents">
            <vue-ueditor-wrap :destroy="true" :config="myConfig" v-model="formValidate.contents"></vue-ueditor-wrap>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button> -->
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
import { article_add, article_edit } from "@/service/getData"
import Cookie from "js-cookie"
// import tinymce from "tinymce"
import VueUeditorWrap from "vue-ueditor-wrap"
export default {
  name: "article_add",
  components: { VueUeditorWrap },
  data() {
    return {
      data1: {},
      headers: {
        token: Cookie.get("token")
        // "Content-Type": "multipart/form-data"
      },
      thumbImg: {},
      breadcrumbTitle: "编辑新闻",
      formValidate: {
        goods_img: [],
        contents: "",
        sort_order: 1
      },
      defaultList: [],
      imgName: "",
      visible: false,
      uploadListBig: [],
      uploadListthumb: [],
      // 编辑器配置
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: "http://shopadmin.e-blive.com/admin/upload/img?richTxt=1",
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: "/static/UEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        maximumWords: 65535,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: false
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            max: 50,
            message: "标题长度不能超过50",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "请输入作者姓名",
            trigger: "blur"
          },
          {
            max: 50,
            message: "作者姓名长度不能超过50",
            trigger: "blur"
          }
        ],
        introduction: [
          {
            required: true,
            message: "请输入简介",
            trigger: "blur"
          },
          {
            max: 120,
            message: "简介不能超过120个字",
            trigger: "blur"
          }
        ],

        thumbnail_url: [
          {
            required: true,
            message: "请上传缩略图",
            trigger: "blur"
          }
        ],
        contents: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          },
          {
            max: 65535,
            message: "内容不能太长",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {},
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.formValidate = {
        id: this.$route.query.id,
        title: this.$route.query.title,
        author: this.$route.query.author,
        thumbnail_url: this.$route.query.thumbnail_url,
        introduction: this.$route.query.introduction,
        contents: this.$route.query.contents
      }
      this.uploadListthumb.push({
        name: this.$route.query.thumbnail_url,
        url: this.$route.query.thumbnail_url,
        status: "finished"
      })
      this.breadcrumbTitle = "编辑新闻"
    } else {
      // 新增用户时提示一下
      this.formValidate = {
        contents: ""
      }
      this.uploadListthumb = []
      this.breadcrumbTitle = "添加新闻"
    }
  },
  methods: {
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file, upload) {
      const fileList = this.$refs[upload].fileList
      this.$refs[upload].fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess1(res, file, fileList) {
      if (res && res.code === 200) {
        this.formValidate.thumbnail_url = res.data.path
        this.uploadListthumb = [
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
        res = await article_edit({
          id: this.formValidate.id,
          title: this.formValidate.title,
          author: this.formValidate.author,
          thumbnail_url: this.formValidate.thumbnail_url,
          introduction: this.formValidate.introduction,
          contents: this.formValidate.contents
        })
      } else {
        // 新增用户
        res = await article_add({
          title: this.formValidate.title,
          author: this.formValidate.author,
          thumbnail_url: this.formValidate.thumbnail_url,
          introduction: this.formValidate.introduction,
          contents: this.formValidate.contents
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/article/article_list")
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