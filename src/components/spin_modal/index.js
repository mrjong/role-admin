export default {
  props: {
    spin_data: {},
  },
  model: {
    prop: "spin_data",
    event: "passBack"
  },
  data() {
    return {
      text: '',
      spin_flag: false,
    }
  },
  watch: {
    spin_data(res) {
      this.spin_flag = !this.spin_flag;
      this.text = res;
      // let timer;
      // timer = setTimeout(() => {
      //   this.spin_flag = false;
      // }, 3000);
      // clearTimeout(timer)
    }
  },
}
