import {
  vqc_result_detail,
  vqc_result_hitRule
} from "@/service/getData";
export default {
  data() {
    return {
      dataReport: {},
      tableData: [

      ],
      tableColumns: [
        {
          title: '时间',
          key: 'fragmentStartTime',
          align: 'center',
          render: (h, params) => {
            let fragmentStartTime = params.row.fragmentStartTime? this.$options.filters['hhMmSsTime'](params.row.fragmentStartTime, 2): params.row.fragmentStartTime
            return h('span', fragmentStartTime)
          }
        },
        {
          title: '识别关键词',
          key: 'keywordsMatched',
          align: 'center',
        },
        {
          title: '识别对象',
          key: 'roleName',
          align: 'center',
        },
        {
          title: '命中规则',
          key: 'ruleName',
          align: 'center',
        },
        {
          title: '扣分情况',
          key: 'hitScore',
          align: 'center',
        },
      ]
    };
  },
  props: {
    dataId: {},
    getDirObj: {},
  },
  watch: {
    dataId: function (value) {
      console.log(value)
      if (value) {
        // this.dataReport = {}
        this.getData(value)
      }

    }
  },
  created() {
  },
  methods: {
    async getData(id) {
      const res = await vqc_result_hitRule({
        vqcResultId: id
      });
      const res2 = await vqc_result_detail({
        vqcResultId: id
      });
      console.log(res)
      this.tableData = res.data ? res.data : []
      this.dataReport = res2.data
      console.log(res2)
    },
    del() {
      // debugger
      this.dataReport = {}
      this.$emit('passBask');
    }
  }
};
