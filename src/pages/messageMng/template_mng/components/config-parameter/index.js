import sysDictionary from '@/mixin/sysDictionary';

export default {
  name: 'config-parameter',
  mixins: [sysDictionary],
  props: {
    dataSource: Object
  },
  data() {
    return {
      getDirList: ['DIVIDE_PROD_TYPE'],
      getDirObj: {},
      formItem: {},
      formRules: {},
      parameterList: [],
    }
  },
}
