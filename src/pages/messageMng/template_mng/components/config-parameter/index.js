import sysDictionary from '@/mixin/sysDictionary';
import api from '@/service/'

export default {
  name: 'config-parameter',
  mixins: [sysDictionary],
  props: {
    dataSource: Object
  },
  data() {
    return {
      getDirList: ['MSG_PARAM_SOURCE'],
      getDirObj: {},
      formItem: {},
      formRules: {},
      parameterList: [],
      childrenList: {},
    }
  },
  created() {
    if (this.dataSource) {
      this.formItem.parameterList = this.dataSource.paramConfig;
      this.formItem.parameterList.map((item,index) => {
        this.$set(this.childrenList, `list${index}`, [])
        item.source && this.sysDictionary_getListByParentId(item.source, index);
      })
    }
  },
  methods: {
    // 表单校验
    validateFormData() {
      return this.$refs.formItem.validate();
    },

    // selectChange
    selectChange(val, index) {
      val && this.sysDictionary_getListByParentId(val, index);
    },

    // 数据字典动态联动
    sysDictionary_getListByParentId(itemCode, index) {
      api.sysDictionary_getListByParentId({
        itemCode: itemCode,
      }).then(res => {
        if (res.code === 1) {
          this.childrenList[`list${index}`] = res.data;
        } else {

        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
