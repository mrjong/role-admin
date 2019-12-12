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
  methods: {
    // 表单校验
    validateFormData() {
      return this.$refs.formItem.validate();
    },
  },
}
