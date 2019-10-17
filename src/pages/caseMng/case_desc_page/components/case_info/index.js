import { case_detail_case_base_info } from '@/service/getData';
export default {
  name: 'case_indo',
  props: ['queryData', 'caseNo'],
  data() {
    return {
      showPanel: false,
      formItem: {},
      mingwenData: '',
      tableColumns: [
        {
          title: '期数',
          width: 60,
          align: 'center',
          key: 'perdNum',
        },
        {
          title: '逾期天数',
          width: 80,
          align: 'center',
          key: 'overdueDays'
        },
        {
          title: '还款日',
          width: 120,
          align: 'center',
          key: 'perdDueDt',
          render: (h, params) => {
            let perdDueDt = params.row.perdDueDt;
            perdDueDt = perdDueDt ? this.$options.filters['tableDate'](perdDueDt) : perdDueDt;
            return h('span', perdDueDt);
          }
        },
        {
          title: '逾期状态',
          width: 100,
          align: 'center',
          key: 'overdueFlgName'
        },
        {
          title: '应还利息',
          width: 100,
          align: 'center',
          key: 'perdItrtAmt',
          render: (h, params) => {
            let perdItrtAmt = params.row.perdItrtAmt;
            perdItrtAmt = perdItrtAmt ? this.$options.filters['money'](perdItrtAmt) : perdItrtAmt;
            return h('span', perdItrtAmt);
          }
        },
        {
          title: '应还服务费',
          width: 100,
          align: 'center',
          key: 'perdMngAmt',
          render: (h, params) => {
            let perdMngAmt =
              parseFloat(params.row.perdMngAmt) +
              parseFloat(params.row.perdAprAmt) +
              parseFloat(params.row.perdWtdwAmt);
            perdMngAmt = perdMngAmt ? this.$options.filters['money'](perdMngAmt) : perdMngAmt;
            return h('span', perdMngAmt);
          }
        },
        {
          title: '应还罚息',
          width: 100,
          align: 'center',
          key: 'perdFineAmt',
          render: (h, params) => {
            let perdFineAmt = params.row.perdFineAmt;
            perdFineAmt = perdFineAmt ? this.$options.filters['money'](perdFineAmt) : perdFineAmt;
            return h('span', perdFineAmt);
          }
        },
        {
          title: '应还滞纳金',
          width: 100,
          align: 'center',
          key: 'perdOvduAmt',
          render: (h, params) => {
            let perdOvduAmt = params.row.perdOvduAmt;
            perdOvduAmt = perdOvduAmt ? this.$options.filters['money'](perdOvduAmt) : perdOvduAmt;
            return h('span', perdOvduAmt);
          }
        },
        {
          title: '应还总金额',
          width: 100,
          align: 'center',
          key: 'perdTotAmt',
          render: (h, params) => {
            let perdTotAmt = params.row.perdTotAmt;
            perdTotAmt = perdTotAmt ? this.$options.filters['money'](perdTotAmt) : perdTotAmt;
            return h('span', perdTotAmt);
          }
        },
        {
          title: '已还总金额',
          width: 100,
          align: 'center',
          key: 'perdTotRep',
          render: (h, params) => {
            let perdTotRep = params.row.perdTotRep;
            perdTotRep = perdTotRep ? this.$options.filters['money'](perdTotRep) : perdTotRep;
            return h('span', perdTotRep);
          }
        },
        {
          title: '未还总金额',
          width: 100,
          align: 'center',
          key: 'perdTotSur',
          render: (h, params) => {
            let perdTotSur = params.row.perdTotSur;
            perdTotSur = perdTotSur ? this.$options.filters['money'](perdTotSur) : perdTotSur;
            return h('span', perdTotSur);
          }
        },
        {
          title: '已还本金',
          width: 100,
          align: 'center',
          key: 'perdPrcpRep',
          render: (h, params) => {
            let perdPrcpRep = params.row.perdPrcpRep;
            perdPrcpRep = perdPrcpRep ? this.$options.filters['money'](perdPrcpRep) : perdPrcpRep;
            return h('span', perdPrcpRep);
          }
        },
        {
          title: '已还利息',
          width: 100,
          align: 'center',
          key: 'perdItrtRep',
          render: (h, params) => {
            let perdItrtRep = params.row.perdItrtRep;
            perdItrtRep = perdItrtRep ? this.$options.filters['money'](perdItrtRep) : perdItrtRep;
            return h('span', perdItrtRep);
          }
        },
        {
          title: '已还服务费',
          width: 100,
          align: 'center',
          key: 'perdMngRep',
          render: (h, params) => {
            let perdMngRep =
              parseFloat(params.row.perdMngRep) +
              parseFloat(params.row.perdWtdwRep) +
              parseFloat(params.row.perdAprRep);
            perdMngRep = perdMngRep ? this.$options.filters['money'](perdMngRep) : perdMngRep;
            return h('span', perdMngRep);
          }
        },
        {
          title: '已还罚息',
          width: 100,
          align: 'center',
          key: 'perdFineRep',
          render: (h, params) => {
            let perdFineRep = params.row.perdFineRep;
            perdFineRep = perdFineRep ? this.$options.filters['money'](perdFineRep) : perdFineRep;
            return h('span', perdFineRep);
          }
        },
        {
          title: '已还滞纳金',
          width: 100,
          align: 'center',
          key: 'perdOvduRep',
          render: (h, params) => {
            let perdOvduRep = params.row.perdOvduRep;
            perdOvduRep = perdOvduRep ? this.$options.filters['money'](perdOvduRep) : perdOvduRep;
            return h('span', perdOvduRep);
          }
        },

      ],
      // 催收信息
      tableData: [],
      case_detail_case_base_info_Data: {},
    }
  },
  created() {
    this.case_detail_case_base_info(); // 基本信息
  },
  methods: {
    // 查询案件详情基础信息
    async case_detail_case_base_info() {
      const res = await case_detail_case_base_info({
        ...this.queryData,
        id: this.caseNo
      });
      if (res.code === 1) {
        this.case_detail_case_base_info_Data = res.data && res.data;
        (res.data && res.data.caseBasePerdVoList) && this.$set(this, 'tableData', res.data.caseBasePerdVoList);
        this.$emit('deliveryData', {data: res.data.caseBasePerdVoList, type: 'CASE_INFO'});
        this.tableData[0].perdNum === 0 && this.$set(this, 'tableData', this.tableData.slice(1));
      } else {
        this.$Message.error(res.message);
      }
    },
    // 解密
    async syscommon_decrypt(obj) {
      this.mingwenData = '';
      const res = await syscommon_decrypt(obj);
      if (res.code === 1) {
        this.mingwenData = res.data;
      } else {
        this.$Message.error(res.message);
      }
    },
    rowClassName(row, index) {
      if (row.overdueFlgName === '已逾期' || row.overdueFlgName === '处理中') {
        return 'table-info-row-red';
      } else {
        return 'table-info-row-black';
      }
    },
  },
}
