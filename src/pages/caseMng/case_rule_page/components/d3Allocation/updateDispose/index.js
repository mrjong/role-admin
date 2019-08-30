import { rout_seatPool_add, rout_seatPool_list, rout_explicit_add, rout_explicit_list, rout_seatPool_delete,rout_explicit_delete, rout_seatPool_updateStatus } from '@/service/getData';
import formValidateFun from "@/mixin/formValidateFun";
import sysDictionary from "@/mixin/sysDictionary";
export default {
  name: 'UpdateDispose',
  props: ["showUpdateDispose"],
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
      tableDataSeats: [],
      tableColumnsSeats: [

      ],
    };

  },
  watch: {
    seatsData: function (value) {
      if(Object.keys(value).length !== 0){
        this.getListSeats();
        this.getListExplicit();
      }
    }
  },
  created() {
    console.log(this.seatsData)
  },
  methods: {
    allotTypeChange() {},
    dateChange() {},
    closeDrawer() {

    },
    getChangeTime() {

    },
    handleCancel() {
      this.$emit("passBack");
    },
    exportScoreValue() {

    }
  }
};
