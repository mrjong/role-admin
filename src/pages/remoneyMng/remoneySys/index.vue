<template>
  <Table border :columns="columns4" :data="data1" class="tableBox"></Table>
</template>
<script>
  export default {
    data () {
      var textAlign = 'center';
      var widthNum = 200;
      return {
        columns4: [
          {
            type: 'selection',   // 通过给columns 数据设置 type:'selection'即可自动开启多选功能
            width: 60,
            align: 'center',
          },
          {
            title: '姓名',
            key: 'name',
            align: textAlign,
            width: widthNum,
            className: 'tablecol',
          },
          {
            title: '年龄',
            key: 'age',// 通过key来获取数据里的对应值
            align: textAlign,
            width: widthNum,
          },
          {
            title: '地址',
            key: 'address',
            align: textAlign,
            width: widthNum,
          },
          {
            title: 'city',
            key: 'city',
            align: textAlign,
            width: widthNum,
          },
          {
            title: 'address',
            key: 'adddeatails',
            align: textAlign,
            width: widthNum,
          },
          {
            title: '电话',
            key: 'tel',
            align: textAlign,
            width: widthNum,
          }
        ],
        data1: [
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居',
            city: 'city',
            tel: '124****7787',
            adddetails: 'nbnb',
            _checked: true,  //通过给data设置特殊的key,_checked,disabled true||false 控制当前项的默认状态和可选性
          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗',
            city: 'city',
            tel: '124****7787',
            adddetails: 'nbnb',
            _disabled: true
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道',
            city: 'city',
            tel: '124****7787',
            adddetails: 'nbnb',
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道',
            city: 'city',
            tel: '124****7787',
            adddetails: 'nbnb',
          }
        ]
      }
    }
  }
</script>
<style lang = 'less'>
  .tableBox{
    overflow-x:scroll ;
    overflow-y: hidden;
    .tablecol{
      background: red;
    }
  }
</style>

<!--<template>-->
  <!--<Form-->
    <!--ref="formValidate"-->
    <!--:model="formValidate"-->
    <!--:rules="ruleValidate"-->
    <!--:label-width="80">-->
    <!--<Form-item label="姓名" prop="name">-->
      <!--<Input v-model="formValidate.name" placeholder="请输入姓名"></Input>-->
    <!--</Form-item>-->
    <!--<Form-item label="邮箱" prop="mail">-->
      <!--<Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>-->
    <!--</Form-item>-->
  <!--</Form>-->
<!--</template>-->
<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--formValidate: {-->
          <!--name: '',-->
          <!--mail: '',-->
        <!--},-->
        <!--ruleValidate: {-->
          <!--name: [-->
            <!--{ required: true, message: '姓名不能为空', trigger: 'blur' }-->
          <!--],-->
          <!--mail: [-->
            <!--{ required: true, message: '邮箱不能为空', trigger: 'blur' },-->
            <!--{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }-->
          <!--],-->
          <!--desc: [-->
            <!--{ required: true, message: '请输入个人介绍', trigger: 'blur' },-->
            <!--{ type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }-->
          <!--]-->
        <!--},-->
        <!--columns4: [-->
          <!--{-->
            <!--type: 'selection',-->
            <!--width: 60,-->
            <!--align: 'center'-->
          <!--},-->
          <!--{-->
            <!--title: '姓名',-->
            <!--key: 'name'-->
          <!--},-->
          <!--{-->
            <!--title: '年龄',-->
            <!--key: 'age'-->
          <!--},-->
          <!--{-->
            <!--title: '地址',-->
            <!--key: 'address'-->
          <!--}-->
        <!--],-->
        <!--data1: [-->
          <!--{-->
            <!--name: '王小明',-->
            <!--age: 18,-->
            <!--address: '北京市朝阳区芍药居'-->
          <!--},-->
          <!--{-->
            <!--name: '张小刚',-->
            <!--age: 25,-->
            <!--address: '北京市海淀区西二旗'-->
          <!--},-->
          <!--{-->
            <!--name: '李小红',-->
            <!--age: 30,-->
            <!--address: '上海市浦东新区世纪大道'-->
          <!--},-->
          <!--{-->
            <!--name: '周小伟',-->
            <!--age: 26,-->
            <!--address: '深圳市南山区深南大道'-->
          <!--}-->
        <!--]-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--handleSubmit (name) {-->
        <!--this.$refs[name].validate((valid) => {-->
          <!--if (valid) {-->
            <!--this.$Message.success('提交成功!');-->
          <!--} else {-->
            <!--this.$Message.error('表单验证失败!');-->
          <!--}-->
        <!--})-->
      <!--},-->
      <!--handleReset (name) {-->
        <!--this.$refs[name].resetFields();-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
