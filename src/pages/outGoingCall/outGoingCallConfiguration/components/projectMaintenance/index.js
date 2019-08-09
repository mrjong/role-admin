import AddModel from './components/addModel'
export default {
  components: {
    AddModel
  },
  data() {
    return {
      project: ['苹果'],
      isAction: 1,
      isAction1: 1,
      cc: true,
      showAddModel: '',
      projectFlag: 'primary',
      lineFlag: 'default',
      Option: {
        autoplay: 3000,
        speed: 100,
      },
      formData: {}
    };

  },

  created() {

  },
  methods: {
    callback() {

    },
    aa(){
      this.cc = false
    },
    handle_checkout(falg) {
      if(falg === 'project'){
        this.projectFlag =  'primary'
        this.lineFlag =  'default'
      } else {
        this.lineFlag =  'primary'
        this.projectFlag =  'default'

      }
    },
    passBack() {
      this.showAddModel = ''
    },
    addModel() {
      if(this.projectFlag==='primary'){
        this.showAddModel = 'project'
      }else {
        this.showAddModel = 'line'
      }
    },
    dd(a) {
      this.isAction = a
    },
    dd2(a) {
      this.isAction1 = a
    },
  }
};
