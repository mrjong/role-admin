import SYSTEM_TASK from './components/system-task/index.vue';
import HANDLE_TASK from './components/handle-task/index.vue'
export default {
  name: 'task-mng',
  components: {
    SYSTEM_TASK,
    HANDLE_TASK
  },
  data() {
    return {
      name: 'SYSTEM_TASK'
    }
  },
}
