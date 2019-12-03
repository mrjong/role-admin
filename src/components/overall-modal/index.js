export default {
  name: 'overall-modal',
  props: ['modal_flag', 'title'],
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    passBack(flag) {
      !flag && this.$emit('closeModal')
    }
  },
}
