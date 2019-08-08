

export default {
  props: ["showPhone"],
  data() {

    return {
      telNoHid: '',
      usrNameHid: '',
      success: false,
    }

  },
  created() {
    // this.getList();
  },
  methods: {
    answer() {
    },
    hangup() {
    },
    handle_cancel(){
      this.$emit("passBack");
    }
  }
};
