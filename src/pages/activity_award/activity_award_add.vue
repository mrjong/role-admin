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
          :label-width="120"
        >
          <FormItem
            label="活动:"
            prop="activity_id"
          >
            <Select
              placeholder="请选择活动"
              v-model="formValidate.activity_id"
            >
              <Option
                v-for="item in tableData2"
                :key="item.id"
                :value="item.id+''"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            label="奖品类型:"
            prop="category"
          >
            <Select
              placeholder="请选择奖品类型"
              v-model="formValidate.category"
            >
              <Option value='1'>红包</Option>
              <Option value='2'>卡券</Option>
              <Option value="3">积分</Option>
              <Option value="4">其他</Option>
            </Select>
          </FormItem>
          <FormItem
            v-if="Number(formValidate.category)===1"
            label="红包:"
            prop="union_id"
          >
            <Select
              placeholder="请选择红包"
              v-model="formValidate.union_id"
            >
              <Option
                v-for="item in tableData"
                :key="item.bonus_id"
                :value="item.bonus_id+''"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            label="卡券:"
            prop="union_id"
            v-if="Number(formValidate.category)===2"
          >
            <Select
              placeholder="请选择卡券"
              v-model="formValidate.union_id"
            >
              <Option
                v-for="item in tableData3"
                :key="item.id"
                :value="item.id+''"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            v-if="Number(formValidate.category)===3"
            label="积分数量:"
            prop="num"
          >
            <Input
              clearable
              v-model="formValidate.num"
              placeholder="请输入数量"
            ></Input>
          </FormItem>
          <FormItem
            label="奖品名称:"
            prop="name"
          >
            <Input
              clearable
              v-model="formValidate.name"
              placeholder="请输入奖品名称"
            ></Input>
          </FormItem>
          <FormItem
            label="奖品获取百分比:"
            prop="percent"
          >
            <Select
              placeholder="请选择奖品获取百分比"
              v-model="formValidate.percent"
            >
              <Option
                v-for="item in percentData"
                :key="item.percent"
                :value="item.percent+''"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem
            label="微缩图片:"
            prop="thumbnail_url"
          >
            <div
              class="demo-upload-list"
              v-for="item in uploadListthumbnail_url"
            >
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon
                    type="ios-eye-outline"
                    @click.native="handleView(item.name)"
                  ></Icon>
                  <Icon
                    type="ios-trash-outline"
                    @click.native="handleRemove(item,'uploadthumbnail_url')"
                  ></Icon>
                </div>
              </template>
              <template v-else>
                <Progress
                  v-if="item.showProgress"
                  :percent="item.percentage"
                  hide-info
                ></Progress>
              </template>
            </div>
            <Upload
              v-show="uploadListthumbnail_url.length===0"
              ref="uploadthumbnail_url"
              :show-upload-list="false"
              name="upfile"
              :default-file-list="defaultList"
              :data="{isCompress:1}"
              :on-success="handleSuccess1"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              :headers="headers"
              action="/admin/upload/img"
              style="display: inline-block;width:58px;"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon
                  type="camera"
                  size="20"
                ></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
            >保存</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空</Button> -->
          </FormItem>
        </Form>
        </Col>
      </Row>
    </div>
    <Modal
      title="预览图片"
      v-model="visible"
    >
      <img
        :src="`${imgName}`"
        v-if="visible"
        style="width: 100%"
      >
    </Modal>
  </Card>
</template>

<script>
import Cookie from "js-cookie"
import { answer_addAward, activity_list, coupon_list, activity_addAward, activity_editAward, bonus_list, answer_editAward } from "@/service/getData"
export default {
  name: "award_add",
  data() {
    return {
      breadcrumbTitle: "编辑活动奖励",
      formValidate: {
        use_date_length: ""
      },
      headers: {
        token: Cookie.get("token")
      },
      visible: false,
      startTimeOption: {},
      uploadListthumbnail_url: [],
      endTimeOption2: {},
      endTimeOption: {},
      defaultList: [],
      tableData: [],
      tableData3: [],
      percentData: [],
      tableData2: [],
      ruleValidate: {
        union_id: [
          {
            required: true,
            message: `请选择奖品`,
            trigger: "change"
          }
        ],
        activity_id: [
          {
            required: true,
            message: "请选择活动",
            trigger: "change"
          }
        ],
        category: [
          {
            required: true,
            message: "请选择奖品类型",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入奖品名称",
            trigger: "blur"
          }
        ],
        percent: [
          {
            required: true,
            message: "请选择答对百分比",
            trigger: "change"
          }
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
    this.getactivity_list()
    this.getcouponList()
    this.getList()
    this.getPercentData()
    this.loadPage()

  },
  methods: {
    // 获取表格数据
    async getcouponList() {
      const res = await coupon_list({
        page: 1,
        perPage: 9999
      })
      if (res && res.data && res.data.list && res.data.list.data) {
        this.tableData3 = res.data.list.data
      }
    },
    loadPage() {
      if (sessionStorage.getItem('activity_award_refresh')) {
        sessionStorage.removeItem('activity_award_refresh')
        location.reload()
      }
      if (this.$route.query && this.$route.query.id) {
        this.formValidate = {
          id: this.$route.query.id,
          activity_id: this.$route.query.activity_id,
          category: this.$route.query.category,
          union_id: this.$route.query.union_id,
          name: this.$route.query.name,
          percent: this.$route.query.percent,
          num: this.$route.query.num,
          thumbnail_url: this.$route.query.thumbnail_url,

        }
        this.uploadListthumbnail_url.push({
          name: this.$route.query.thumbnail_url,
          url: this.$route.query.thumbnail_url,
          status: "finished"
        })
        this.breadcrumbTitle = "编辑活动奖励"
      } else {
        // 新增活动奖励时提示一下
        this.breadcrumbTitle = "添加活动奖励"
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
    getPercentData() {
      this.percentData = []
      for (let index = 1; index <= 10; index++) {
        this.percentData.push({
          percent: index * 10,
          name: index * 10 + "%"
        })
      }
    },
    // 获取表格数据
    async getactivity_list() {
      const res = await activity_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res.data && res.data.list && res.data.list.data) {
        this.tableData2 = res.data.list.data
      } else {
        this.tableData2 = []
      }
    },
    // 获取表格数据
    async getList() {
      const res = await bonus_list({
        page: 1,
        perPage: 9999,
        config: {
          hideMessage: true
        }
      })
      if (res && res.data && res.data.list && res.data.list.data) {
        this.tableData = res.data.list.data
      }
      console.log(res, "---------")
    },
    async register() {
      let res
      if (this.$route.query && this.$route.query.id) {
        // 更新用户信息
        res = await activity_editAward({
          id: Number(this.$route.query.id),
          activity_id: this.formValidate.activity_id,
          category: this.formValidate.category,
          union_id: this.formValidate.union_id,
          name: this.formValidate.name,
          percent: this.formValidate.percent,
          thumbnail_url: this.formValidate.thumbnail_url,
          num: this.formValidate.num
        })
      } else {
        // 新增用户
        res = await activity_addAward({
          activity_id: this.formValidate.activity_id,
          category: this.formValidate.category,
          union_id: this.formValidate.union_id,
          name: this.formValidate.name,
          percent: this.formValidate.percent,
          thumbnail_url: this.formValidate.thumbnail_url,
          num: this.formValidate.num
        })
      }
      if (res) {
        setTimeout(() => {
          this.$router.push("/activity_award/activity_award_list")
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
      if (this.$route.query && this.$route.query.points_id) {
        this.formValidate.points_id = this.$route.query.points_id
      } else {
        this.formValidate = {
          points_img: []
        }
      }
      this.$refs[name].resetFields()
    }
  }
}
</script>