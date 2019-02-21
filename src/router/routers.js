import collectionMngRouter from '@/pages/collectionMng/router';
import workflowRouter from '@/pages/workflow/router';
import arbitramentMngRouter from '@/pages/arbitramentMng/router';
import systemRouter from '@/pages/system/router';
import caseMngRouter from '@/pages/caseMng/router';
import remoneyMngRouter from '@/pages/remoneyMng/router';
import dailyMontiorRouter from '@/pages/dailyMonitoring/router';
import businessMngRouter from '@/pages/businessMng/router';
import logMngRouter from '@/pages/logMng/router';
import taskManagementRouter from '@/pages/taskManagement/router';
export default {
  ...collectionMngRouter,
  ...workflowRouter,
  ...arbitramentMngRouter,
  ...systemRouter,
  ...caseMngRouter,
  ...remoneyMngRouter,
  ...dailyMontiorRouter,
  ...businessMngRouter,
  ...logMngRouter,
  ...taskManagementRouter
};
