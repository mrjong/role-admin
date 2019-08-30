
export default {
  components: {

  },
  name: 'caseLoading',
  data() {
    return {
      submit_loading: false,
      divideStarList: [
        {
          starName: '王者',
          starCode: '1',
          normAllotCounts: '12',
          normCountsSta: '2',
          normCountsEnd: '24',
          peakAllotCounts: '23',
          peakCountsSta: '4',
          peakCountsEnd: '30'
        },
        {
          starName: '钻石',
          starCode: '2',
          normAllotCounts: '12',
          normCountsSta: '2',
          normCountsEnd: '24',
          peakAllotCounts: '23',
          peakCountsSta: '4',
          peakCountsEnd: '30'
        },
        {
          starName: '青铜',
          starCode: '3',
          normAllotCounts: '12',
          normCountsSta: '2',
          normCountsEnd: '24',
          peakAllotCounts: '23',
          peakCountsSta: '4',
          peakCountsEnd: '30'
        },
      ],
      formItem: {
        divideStarList: [
          {
            starName: ''
          }
        ]
      },
      ruleValidate: {},

    };
  },
  created() {
    // var j = {};
    // j.name = "name";
    // j.cars = "22";
    // j.obj = "457";
    // console.log(JSON.stringify(j))
  },
  methods: {
    handleSubmit() {

    }
  }
};
