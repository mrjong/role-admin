export default {
  name: 'client-file',
  // props: {
  //   model: {
  //     type: Boolean,
  //     default: () => {
  //       return false
  //     }
  //   }
  // },
  props: ['ishow'],
  data() {
    return {
      showPanel: true
    }
  },
  created() {
    console.log(this.ishow)
  },
  methods: {
    del() {
      this.$emit('passBack', 'Client_File')
    }
  },
}
