import AddModel from './components/addModel'
import { rout_plan_project_list } from '@/service/getData';

export default {
  components: {
    AddModel
  },
  data() {
    return {
      project: ['苹果'],
      projectList: [{},{}],
      isAction: 0,
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
    this.getList()
  },
  methods: {
    // 获取表格数据
    async getList() {
      const res = await rout_plan_project_list({ planType: '1'});
      if (res.code === 1) {
        console.log(res.data)
        this.projectList = res.data
      } else {
        this.$Message.error(res.message)
      }
    },
    callback() {

    },
    aa(){
      this.cc = false
    },
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    handle_checkout(falg) {
      this.isAction = 1
      this.setActiveItem(this.isAction)
      console.log(this.isAction )
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
      console.log(this.showAddModel)
    },
    dd(a) {
      this.isAction = a
    },
    dd2(a) {
      this.isAction1 = a
    },
  }
};
