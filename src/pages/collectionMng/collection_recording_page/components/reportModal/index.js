import {

} from "@/service/getData";
export default {
  data() {
    return {
      tableData: [
        {
          time: 111,
          key: 'eee',
          rule: '444'
        }
      ],
      tableColumns: [
        {
          title: '时间',
          key: 'time',
          align: 'center',
        },
        {
          title: '识别关键词',
          key: 'key',
          align: 'center',
        },
        {
          title: '命中规则',
          key: 'rule',
          align: 'center',
        },
        {
          title: '扣分情况',
          key: 'rule',
          align: 'center',
        },
      ]
    };
  },
  props: {
    dataReport: {},
    getDirObj: {},
  },
  watch: {
    dataReport: function (value) {
      console.log(value)
    }
  },
  created() {

  },
  methods: {
    del() {
      this.$emit('passBask');
    }
  }
};
