import AddModel from './components/addModel'
import { rout_plan_project_list,  } from '@/service/getData';
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
      projectList: [],
      lineList: [],
      isAction: 0,
      showAddModel: {},
      query: false,
      add: false,
      update: false,
      projectFlag: 'primary',
      lineFlag: 'default',
      rowData: {},
      Option: {
        autoplay: 3000,
        speed: 100,
      },
      formData: {}
    };

  },

  created() {
    let buttonPermissionList = this.$route.meta.btnPermissionsList || [];
    buttonPermissionList.forEach(item => {
      if (item.type !== "03") {
        return;
      }
      switch (item.url) {
        case "query":
          this.query = true;
          break;
        case "update":
          this.update = true;
          break;
        case "add":
          this.add = true;
          break;
      }
    });
    this.getList()
  },
  methods: {
    // 获取表格数据
    async getList() {
      if (!this.query) {
        this.$Message.error("很抱歉，暂无权限查询");
        return;
      }
      let planType = this.lineFlag === 'primary' ? '2' : '1'
      const res = await rout_plan_project_list({ planType: planType});
      if (res.code === 1) {
        console.log(res.data)
        if(this.lineFlag === 'primary'){
          this.lineList = res.data
        } else {
          this.projectList = res.data
        }

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
      this.getList()
    },
    passBack(flag) {
      this.showAddModel = {}
      if(flag){
        this.getList()
      }
    },
    addModel() {
      if (!this.add) {
        this.$Message.error("很抱歉，暂无权限添加");
        return;
      }
      if(this.projectFlag==='primary'){
        this.showAddModel = {name: 'project', type: 'add'}
      }else {
        this.showAddModel = {name: 'line', type: 'add'}
      }
    },
    changeItemCarousel(value) {
      this.isAction = value
    },
    goUpdate(data, flag) {
      if (!this.update) {
        this.$Message.error("很抱歉，暂无权限修改");
        return;
      }
      this.showAddModel = {name: flag, type: 'update'}
      this.rowData = JSON.parse(JSON.stringify(data))
    },
  }
};
