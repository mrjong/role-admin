<template>
  <div class="panel_list">
    <!-- 检索条件 -->
    <Card class="vue-panel">
      <p
        slot="title"
        @click="showPanel=!showPanel"
      >
        <Icon :type="!showPanel?'chevron-down':'chevron-up'"></Icon>
        检索条件
      </p>
      <Form
        v-if="!showPanel"
        ref="formItem"
        :model="formItem"
        :label-width="90"
        :rules="ruleValidate"
      >
        <Row>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
            <FormItem
              label="处理日期:"
            >
              <DatePicker
                size="small"
                style="width:100%"
                v-model="dealTime"
                format="yyyy-MM-dd"
                type="datetimerange"
                placement="bottom-start"
                placeholder="请选择处理时间"
                @on-change="changeDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col
            :xs="24"
            :sm="24"
            :md="6"
            :lg="6"
            span="6"
          >
            <FormItem>
              <Button
                type="primary"
                @click="handleSubmit('formItem')"
                style="width:80px"
                long
                size="small"
              >检索</Button>
              <Button
                size="small"
                type="ghost"
                style="width:80px;margin-left: 8px"
                @click="clearForm('formItem')"
              >重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="vue-panel-table">
      <p
        slot="title"
        @click="showPanel2=!showPanel2"
      >
        <Icon :type="!showPanel2?'chevron-down':'chevron-up'"></Icon>
        检索结果
          <Button
            class="fr vue-back-btn header-btn"
            type="primary"
            size="small"
            @click.stop="exportData"
          >导出数据</Button>
      </p>
      <!-- 表格 -->

      <div v-if="!showPanel2">
        <Table
          border
          :data="tableData"
          :columns="tableColumns"
          stripe
          class="tableBox"
        ></Table>
        <!-- 分页 -->
        <div class="vue-panel-page">

          <div style="float: right;">
            <Page
              :total="total"
              show-total
              size="small"
              :page-size-opts="[10, 20, 50, 100]"
              show-elevator
              show-sizer
              :page-size="pageSize"
              :current="pageNo"
              @on-page-size-change="changeSize"
              @on-change="changePage"
            ></Page>
          </div>

        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import { monitor_callDetail_list, monitor_callDetail_exportDown } from '@/service/getData';
  import util from '@/libs/util';
  export default {
    name: 'overduePayment',
    //mixins: [sysDictionary, formValidateFun],
    data() {
      var alignCenter = 'center';
      var widthVal = 180;
      var widthMidVal = 130;
      return {
        showPanel: false,
        showPanel2: false,
        dealTime:'',
        formItem: {
         startDate: '',
          endDate: ''
        },
        ruleValidate:{
          overdueDaysLt: [
            {
              pattern: this.GLOBAL.num,
              message: '逾期天数为正整数',
              trigger: 'blur'
            },
            {
              validator: this.validate_yqts_start,
              trigger: 'blur'
            }
          ],
          overdueDaysBt: [
            {
              pattern: this.GLOBAL.num,
              message: '逾期天数为正整数',
              trigger: 'blur'
            },
            {
              validator: this.validate_yqts_end,
              trigger: 'blur'
            }
          ],
        },
        pageNo: 1,
        pageSize: 10,
        total: 10,
        tableData: [
          {
            handleDate:'',//处理日期
            calledNo: '', //外呼手机号
            calledUserId:'', // 用户ID
            callState:'', //通话结果
            talkTime:'',// 通话时长
            agentName:'', //坐席姓名
            agent:'',//坐席工号
          },
        ],
        tableColumns: [
          {
            title: '序号',
            type: 'index',
            width: 60,
            searchOperator: '=',
            align: alignCenter,
            key: 'listIndex'
          },
          {
            title: '处理日期',
            searchOperator: '=',
            key: 'handleDate',
            className: 'tableMainW',
            align: alignCenter,
            width: widthVal
          },
          {
            title: '外呼手机号',
            searchOperator: '=',
            key: 'calledNo',
            className: 'tableMainW',
            align: alignCenter,
            width: widthVal
          },
          {
            title: '用户ID',
            searchOperator: 'like',
            key: 'calledUserId',
            className: 'tableMainW',
            align: alignCenter,
            width: widthVal
          },
          {
            title: '通话结果',
            key: 'callState',
            className: 'tableMainW',
            align: alignCenter,
            width: widthMidVal,
          },
          {
            title: '通话时长',
            searchOperator: 'like',
            key: 'talkTime',
            className: 'tableMainW',
            align: alignCenter,
            width: widthVal
          },
          {
            title: '坐席姓名',
            searchOperator: 'like',
            key: 'agentName',
            className: 'tableMainW',
            align: alignCenter,
            width: widthMidVal
          },
          {
            title: '坐席工号',
            searchOperator: 'like',
            key: 'agent',
            className: 'tableMainW',
            align: alignCenter,
            width: widthMidVal,
          },
        ]
      };
    },
    created() {
      this.getList();
    },
    methods: {
      // 改变日期区间的格式之后进行处理
      changeDate(val1, val2) {
        console.log(val1, typeof val1)
        console.log(val2, typeof val2)
        this.formItem.startDate = val1[0];
        this.formItem.endDate = val1[1];
        // 日期格式单天和时间区间之间的差别在于range这里拿到的是一个长度唯二的数组，而单日侧直接是一个结果值
      },
      // 页码改变的回调
      changePage(pageNo) { //默认带入一个参数是当前的页码数
        console.log(pageNo,'当前的页码数量值');
        this.pageNo = pageNo;
        this.getList();
      },
      // 切换每页条数时的回调
      changeSize(pageSize) {
        this.pageSize = pageSize;
        this.pageNo = 1;
        this.getList();
      },
      handleSubmit(name) {
        this.getList();
      },
      async exportData(){
        let res = await monitor_callDetail_exportDown({
          ...this.formItem
        });
        util.dowloadfile('呼叫明细',res);
      },
      // 获取表格数据
      async getList() {
        let res= await monitor_callDetail_list({
          pageNum: this.pageNo,
          pageSize: this.pageSize,
          ...this.formItem
        })
        console.log(res)
        if(res && res.code === 1){
          this.$Message.success('请求成功!');
          let data = res.data;
          this.tableData = data.content;
          this.total = data.totalElements //接口中在该条件下取得的数据量
          //data.page.numberOfElements  当前页面实际返回的数量
        } else{
          this.$Message.error(res.message);
        }
      },
      // 重置
      clearForm(name) {
        this.pageNo = 1;
        this.formItem = {};
        this.dealTime='',
        this.$refs[name].resetFields();
      }
    }
  };

</script>
<style lang="less">
  .tableBox {
    overflow-x: scroll ;
    overflow-y: hidden;
    .tableMainW {
      min-width: 400px;
    }
  }
  /*.ivu-form-item-content{*/
    /*margin-left: 0 !important;*/
  /*}*/
</style>
