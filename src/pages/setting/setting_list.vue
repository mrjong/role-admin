<template>
    <Card class="vue-panel">
        <p slot="title">
            {{breadcrumbTitle}}
            <Button class="fr vue-back-btn header-btn" type="default" size="small" @click="$router.go(-1)">返回</Button>
        </p>
        <div class="vue-panel-desc">
            <Row type="flex" justify="center">
                <Col :xs="24" :sm="24" :md="24" :lg="18" span="14">

                <Form ref="formValidate" :model="settingData" :label-width="180">
                    <!-- <h2 class="title">微信通知设置<Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button></h2>
        <Alert>案例：{{wxDemo}}</Alert>
         <div class="border-line">
              <FormItem :rules="{required: true, message: '微信通知模板' + (index+1) +'内容不能为空', trigger: 'blur'}"  :label="index===0?'下单成功微信通知模板':'补餐后微信通知模板'"  :key="item.id" :prop="'wechat.'+index+'.val'" v-for="(item,index) in settingData.wechat">
            <Input :autosize="{minRows: 2,maxRows: 3}" type="textarea" clearable v-model="item.val" placeholder="请输入模板内容"></Input>
          </FormItem>
         </div> -->
                    <h2 class="title">手机通知设置
                        <Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button>
                    </h2>
                    <Alert>案例：{{telDemo}}</Alert>
                    <div class="border-line">
                        <FormItem :rules="{required: true, message: '手机通知模板' + (index+1) +'内容不能为空，格式见下方案例', trigger: 'blur'}" :label="index===0?'下单成功手机通知模板':'补餐后手机通知模板'" :key="item.id" :prop="'phoneMsg.'+index+'.val'" v-for="(item,index) in settingData.phoneMsg">
                            <Input :autosize="{minRows: 2,maxRows: 3}" type="textarea" clearable v-model="item.val" placeholder="请输入模板内容"></Input>
                        </FormItem>
                    </div>
                    <h2 class="title">管理员接受通知模板
                        <Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button>
                    </h2>
                    <Alert>案例：{{adminDemo}}</Alert>
                    <div class="border-line">
                        <!-- <FormItem :rules="{required: true, message: '请输入管理员openid', trigger: 'blur'}" label="管理员openid:" prop="price">
              <Input  clearable v-model="formValidate.price" placeholder="请输入原价">
               <Button slot="append" @click="showModal">获取openid</Button></Input>
            </FormItem> -->
                        <Modal title="请用微信扫以下二维码" style="min-height:800px;text-align: center;" v-model="visible">
                            <qriously :value="initQCode" :size="300" />
                        </Modal>
                        <FormItem :rules="{required: true, message: '管理员通知模板' + (index+1) +'内容不能为空', trigger: 'blur'}" :label="index===0?'管理员openid' + (index+1):''" :key="item.id" :prop="'adminWechatMsg.'+index+'.val'" v-for="(item,index) in settingData.adminWechatMsg">
                            <Input :autosize="{minRows: 2,maxRows: 3}" :type="index===0?'text':'textarea'" v-if="index===0" :readonly="index===0?true:false" v-model="item.val" placeholder="请输入模板内容">
                            <Button slot="append" type="primary" size="small" @click="showModal">获取openid</Button>
                            </Input>
                        </FormItem>
                    </div>
                    <h2 class="title">用户搜索餐柜半径
                        <Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button>
                    </h2>
                    <div class="border-line">
                        <FormItem :key="item.id" :rules="[{required: true, message: '用户搜索餐柜半径' +'' +'不能为空', trigger: 'blur'}, {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: '格式不正确',
            trigger: 'blur'
          }]" :label="'用户搜索餐柜半径(千米)'" :prop="'distance.'+index+'.val'" v-for="(item,index) in settingData.distance">
                            <Input clearable placeholder="请输入用户搜索餐柜半径" v-model="item.val"></Input>
                        </FormItem>
                    </div>
                     <h2 class="title">设置菜品过期时间
                        <Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button>
                    </h2>
                    <div class="border-line">
                        <FormItem :key="item.id" :rules="[{required: true, message: '设置菜品过期时间' +''+'不能为空', trigger: 'blur'}, {
            pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
            message: '格式不正确',
            trigger: 'blur'
          }]" :label="'设置菜品过期时间(分钟)'" :prop="'food_expiry_time.'+index+'.val'" v-for="(item,index) in settingData.food_expiry_time">
                            <Input clearable placeholder="请输入菜品过期时间" v-model="item.val"></Input>
                        </FormItem>
                    </div>
                    <h2 class="title">取餐通知
                        <Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button>
                    </h2>
                    <div class="border-line">
                        <FormItem 
                        v-if="index===0" 
                        :key="item.id" 
                        :rules="[
                        {required: true, message: '请输入通知次数', trigger: 'blur'},{pattern: /^[0-9]*$/, message: '通知次数格式应为数字', trigger: 'blur'}]" 
                        label="通知次数" :prop="'notice.'+index+'.val'" 
                        v-for="(item,index) in settingData.notice">
                            <Input clearable placeholder="请输入通知次数" v-model="item.val"></Input>
                        </FormItem>
                        <FormItem v-if="index===1" :key="item.id" :rules="[{required: true, message: '请输入通知频次', trigger: 'blur'},{pattern: /^[0-9]*$/, message: '通知频次格式应为数字', trigger: 'blur'}]" label="通知频次" :prop="'notice.'+index+'.val'" v-for="(item,index) in settingData.notice">
                            <Input clearable placeholder="请输入通知频次" v-model="item.val"></Input>
                        </FormItem>
                    </div>
                       <h2 class="title">团购设置
                        <Button class="fr" type="primary" size="small" @click="handleSubmit('formValidate')">保存</Button>
                    </h2>
                    <div class="border-line">
                        <FormItem 
                        v-if="index===0" 
                        :key="item.id" 
                        :rules="[
                        {required: true, message: '请输入组团人数', trigger: 'blur'},{pattern: /^[0-9]*$/, message: '组团人数格式应为数字', trigger: 'blur'}]" 
                        label="组团人数" :prop="'group_buy.'+index+'.val'" 
                        v-for="(item,index) in settingData.group_buy">
                            <Input clearable placeholder="请输入组团人数" v-model="item.val"></Input>
                        </FormItem>
                        <FormItem v-if="index===1" :key="item.id" :rules="[{required: true, message: '请输入有效期', trigger: 'blur'},{pattern: /^[0-9]*$/, message: '有效期格式应为数字', trigger: 'blur'}]" label="有效期(秒)" :prop="'group_buy.'+index+'.val'" v-for="(item,index) in settingData.group_buy">
                            <Input clearable placeholder="请输入有效期" v-model="item.val"></Input>
                        </FormItem>
                    </div>
                    <h2 class="title">设备状态通知用户
                        <Button class="fr" type="primary" size="small" @click="handleSubmitTwo('formValidate')">添加</Button>
                    </h2>
                    <div class="border-line">
                        <Table border :columns="tableColumns" :data="noticeUser"></Table>
                    </div>
                </Form>
                </Col>
            </Row>
        </div>
    </Card>
</template>

<script>
import {
    setting_list,
    get_code,
    setting_upset,
    adminuser_getSystemNoticeUser,
    QrCode_admin,
    setting_delAdminOpenId
} from "@/service/getData";
import Vue from "vue";
import VueQriously from "vue-qriously";
import fetch from "@/libs/fetch";

Vue.use(VueQriously);
export default {
    name: "setting_list",
    data() {
        return {
              tableColumns: [
        {
          title: "用户名",
          sortable: true,
          key: "username"
        },
        {
          title: "昵称",
          key: "nickname",
          sortable: true
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "操作",
          width: 140,
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.delAjax(params.row)
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      style: {
                        margin: "0 5px"
                      },
                      props: {
                        size: "small",
                        type: "error",
                        placement: "top"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ])
          }
        }
      ],
            initQCode: "",
            breadcrumbTitle: "编辑兑换红包",
            formValidate: {},
            telDemo: `【贷后管理系统】你已成功预订：{{name}}，预约时间{{time}}，取餐码{{code}},格子编号{{boxno}},取餐地址{{address}}`,
            wxDemo: `订单号：{{no.DATA}} 
预约菜品：{{name.DATA}} 
预约时间：{{presetData.DATA}} 
取餐码：{{code.DATA}} 
格子编号：{{boxno.DATA}} 
取餐地址：{{address.DATA}}
`,
            adminDemo: `订单号：{{no.DATA}} 
预约菜品：{{name.DATA}} 
预约时间：{{presetData.DATA}} 
补餐码：{{pushCode.DATA}} 
格子编号：{{boxno.DATA}} 
取餐地址：{{address.DATA}}`,
            settingData: {
                wechat: [],
                phoneMsg: [],
                distance: [],
                adminWechatMsg: [],
                notice: []
            },
            noticeUser: [],
            visible: false,
            startTimeOption: {},
            endTimeOption2: {},
            endTimeOption: {},
            tableData: [],
            ruleValidate: {
                bonus_id: [
                    {
                        required: true,
                        message: "请选择红包",
                        trigger: "change"
                    }
                ],
                points_num: [
                    {
                        required: true,
                        message: "请输入积分数量",
                        trigger: "blur"
                    },
                    {
                        pattern: /^\d*$/,
                        message: "格式不正确",
                        trigger: "blur"
                    }
                ]
            },
            initQCodeOne: ""
        };
    },
    created() {
        this.getList();
        this.qrcode();
        this.adminuserGetSystemNoticeUser();
        this.breadcrumbTitle = "系统设置";
    },
    mounted() {
        // this.qrcode()
    },
    methods: {
        async qrcode() {
            const res = await get_code();
            if (res) {
                this.initQCodeOne = res.data;
            }
        },
        showModal() {
            this.initQCode = this.initQCodeOne;
            this.visible = true;
        },
        // 获取表格数据
        async getList() {
            const res = await setting_list();
            if (res.data) {
                this.settingData = res.data;
            }
        },
        async adminuserGetSystemNoticeUser() {
            const res = await adminuser_getSystemNoticeUser();
            if (res.data) {
                this.noticeUser = res.data;
            }
        },
        async register() {
            let data = [];
            for (const key in this.settingData) {
                if (key != "noticeUser") {
                    this.settingData[key].forEach(element => {
                        if (element.id !== 5) {
                            data.push({
                                id: element.id,
                                val: element.val
                            });
                        }
                    });
                }
            }
            // 更新用户信息
            await setting_upset({
                data
            });
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.register();
                } else {
                    //   this.$Message.error("Fail!");
                }
            });
        },
        async delAjax(item) {
            const res = await setting_delAdminOpenId({
                id: item.id
            });
            if (res) {
                setTimeout(()=>{
                    this.adminuserGetSystemNoticeUser();
                },3000)
            }
        },
        async handleSubmitTwo(name) {
            const res = await QrCode_admin();
            if (res) {
                this.initQCode = res.data;
                this.visible = true;
            }
        },
        handleReset(name) {
            this.formValidate.desc = "";
            tinymce.activeEditor.setContent("");
            this.uploadListthumb = [];
            this.uploadListBig = [];
            if (this.$route.query && this.$route.query.points_id) {
                this.formValidate.points_id = this.$route.query.points_id;
            } else {
                this.formValidate = {
                    points_img: []
                };
            }
            this.$refs[name].resetFields();
        }
    }
};
</script>
<style>
.title {
    margin: 15px 0 10px;
}
.border-line {
    border: 1px dashed #e5e5e5;
    padding: 30px 15px 15px;
}
</style>
