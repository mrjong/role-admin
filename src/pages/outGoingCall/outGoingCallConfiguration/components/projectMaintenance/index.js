import AddModel from './components/addModel'
import { rout_plan_project_list } from '@/service/getData';
import sysDictionary from '@/mixin/sysDictionary';
export default {
  components: {
    AddModel
  },
  mixins: [sysDictionary],
  data() {
    return {
      getDirList: ['SEAT_TYPE'],
      getDirObj: {},
      project: [],
      projectList: [{},{}],
      isAction: 0,
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

    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    handle_checkout(falg) {
      this.isAction = 1
      this.setActiveItem(this.isAction)
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
      this.getList()
    },
    addModel() {
      if(this.projectFlag==='primary'){
        this.showAddModel = 'project'
      }else {
        this.showAddModel = 'line'
      }
    },
    changeItemCarousel(value) {
      this.isAction = value
    },
  }
};
