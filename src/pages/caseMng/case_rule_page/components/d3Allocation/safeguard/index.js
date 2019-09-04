import { divide_star_list, divide_star_update } from '@/service/getData';
import formValidateFun from "@/mixin/formValidateFun";
import sysDictionary from "@/mixin/sysDictionary";

// const divideStarVoList = [
//   {
//     starCode: '2',
//     starName: '王者',
//     normAllotCounts: '8',
//     normCountsSta: '4',
//     normCountsEnd: '20',
//     peakAllotCounts: '15',
//     peakCountsSta: '10',
//     peakCountsEnd: '40',
//     collectRateSta: '3',
//     collectRateEnd: '3',
//     matchType: '3',
//     status: '3'
//   },
//   {
//     starCode: '1',
//     starName: '钻石',
//     normAllotCounts: '4',
//     normCountsSta: '2',
//     normCountsEnd: '15',
//     peakAllotCounts: '8',
//     peakCountsSta: '4',
//     peakCountsEnd: '20',
//     collectRateSta: '3',
//     collectRateEnd: '3',
//     matchType: '3',
//     status: '3'
//   },{
//     starCode: '0',
//     starName: '青铜',
//     normAllotCounts: '1',
//     normCountsSta: '3',
//     normCountsEnd: '10',
//     peakAllotCounts: '3',
//     peakCountsSta: '2',
//     peakCountsEnd: '15',
//     collectRateSta: '3',
//     collectRateEnd: '3',
//     matchType: '3',
//     status: '3'
//   }
// ]
export default {
  name: 'Safeguard',
  props: ["showSafeguard"],
  mixins: [formValidateFun, sysDictionary],
  data() {
    var alignCenter = 'center';
    var widthVal = 130;
    var widthMidVal = 130;
    return {
      divideRuleUserVos: [], //汇款率接口参数list
      allotRoleIdList: [], //人员角色idlist
      allotNameList: [], //人员名字list
      showDispose: true,
      formItem: {},
      ruleValidate: {},
      divideStarVoList: [],
      getDirList: [
        "DIVIDE_PROD_TYPE",
        "DIVIDE_PROD_CNT",
        "DIVIDE_CREDIT_LEVEL",
        "CASE_HANDLE_STATUS",
        "ALLOT_TYPE",
        "DIVIDE_PROD_NUM"
      ], //s数据字典传的字段
      getDirObj: {},

      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        paddingTop: '23px',
        position: 'static',
      },

      formData: {},
      allot_loading: false,
      add_handle:true,
      tableData: [],
      tableColumns: [
      ],
      showEdit: false,
      peakDayVo: {
        start: '10',
        end: '15'
      }
    };

  },
  watch: {

  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let res = await divide_star_list({
        pageNum: this.pageNo,
        pageSize: this.pageSize
      });
      if (res && res.code === 1) {
        let data = res.data;
        this.divideStarVoList = data.divideStarVoList
        this.peakDayVo = data.peakDayVo
        console.log(data)
        this.initData()
      } else {
        this.$Message.error(res.message);
      }
    },
    initData() {
      this.tableData= [
        { rule: '日常期'},
        { rule: '高峰期' }
      ],
      this.tableColumns= [
        {
          title: "星级",
          width: 100,
          align: "center",
          children: [{
            title: "规则",
            width: 100,
            key: "rule",
            align: "center",
          }]
        },
      ],
      this.divideStarVoList.forEach(item=>{
        this.tableColumns.push({
          title: item.starName,
          width: 100,
          align: "center",
          children: [{
            title: "默认值",
            width: 100,
            key: "AllotCounts"+item.starCode,
            align: "center",
            render: (h, params) => {
              return h('div', [
                h(
                  'div', {
                    style: {display: this.showEdit ? 'none' : 'block'},
                    props: {},
                  },
                  params.row["AllotCounts"+item.starCode]
                ),
                h(
                  'Input', {
                    style: {display: !this.showEdit ? 'none' : 'block', textAlign: 'center'},
                    props: {
                      size: 'small',
                      type: 'number',
                      value: params.row["AllotCounts"+item.starCode],
                    },
                    on: {
                      'on-change': ( e ) => {
                        this.getChange(e.target.value, item, params.row._index, 'AllotCounts')
                      },
                      'on-keyup': ( e ) => {
                        e.target.value=e.target.value.replace(/^(0+)|[^\d]+/g,'')
                      }
                    }
                  },
                ),
              ]);
            }
          },{
            title: "最小值",
            width: 100,
            key: "CountsSta"+item.starCode,
            align: "center",
            render: (h, params) => {
              return h('div', [
                h(
                  'div', {
                    style: {display: this.showEdit ? 'none' : 'block'},
                    props: {},
                  },
                  params.row["CountsSta"+item.starCode]
                ),
                h(
                  'Input', {
                    style: {display: !this.showEdit ? 'none' : 'block', textAlign: 'center'},
                    props: {
                      size: 'small',
                      type: 'number',
                      value: params.row["CountsSta"+item.starCode],
                    },
                    on: {
                      'on-change': ( e ) => {
                        this.getChange(e.target.value, item, params.row._index, 'CountsSta')
                      },
                      'on-keyup': ( e ) => {
                        e.target.value=e.target.value.replace(/^(0+)|[^\d]+/g,'')
                      }
                    }
                  },
                ),
              ]);
            }
          },{
            title: "最大值",
            width: 100,
            key: "CountsEnd"+item.starCode,
            align: "center",
            render: (h, params) => {
              return h('div', [
                h(
                  'div', {
                    style: {display: this.showEdit ? 'none' : 'block'},
                    props: {},
                  },
                  params.row["CountsEnd"+item.starCode]
                ),
                h(
                  'Input', {
                    style: {display: !this.showEdit ? 'none' : 'block', textAlign: 'center'},
                    props: {
                      size: 'small',
                      type: 'number',
                      value: params.row["CountsEnd"+item.starCode],
                    },
                    on: {
                      'on-change': ( e ) => {
                        this.getChange(e.target.value, item, params.row._index, 'CountsEnd')
                      },
                      'on-keyup': ( e ) => {
                        e.target.value=e.target.value.replace(/^(0+)|[^\d]+/g,'')
                      }
                    }
                  },
                ),
              ]);
            }
          }]
        })
        this.tableData[0]['AllotCounts'+item.starCode] = item.normAllotCounts
        this.tableData[0].starCode = item.starCode
        this.tableData[0]['CountsSta'+item.starCode] = item.normCountsSta
        this.tableData[0]['CountsEnd'+item.starCode] = item.normCountsEnd
        this.tableData[1]['AllotCounts' +item.starCode] = item.peakAllotCounts
        this.tableData[1].starCode = item.starCode
        this.tableData[1]['CountsSta' +item.starCode] = item.peakCountsSta
        this.tableData[1]['CountsEnd'+item.starCode] = item.peakCountsEnd
      })
    },
    allotTypeChange() {},
    dateChange() {},
    closeDrawer() {

    },
    getChangeTime() {

    },
    async handleSubmit () {
      console.log(this.divideStarVoList)
      let res = await divide_star_update({
        divideStarVoList: this.divideStarVoList,
        peakDayVo: this.peakDayVo
      },{transformRequest: [
        function(data) {
          return qs.stringify(data); //利用对应方法转换格式
        }
      ]});
      if (res && res.code === 1) {
        this.showEdit = false
        this.getList()
      } else {
        this.$Message.error(res.message);
      }
    },
    getChange(value, data, flag, changeValue) {
      this.divideStarVoList.forEach(item=>{
        if(item.starCode === data.starCode){
          if(flag === 0){
            item['norm'+changeValue] = value
          } else {
            item['peak'+ changeValue] = value
          }
        }
      })
    },
    changePeakStart(e) {
      this.peakMonth.start = e.target.value
    },
    changePeakEnd(e) {
      this.peakMonth.end = e.target.value
    },
    handleCancel() {
      this.showEdit = false
      this.$emit("passBack");
    }
  }
};
