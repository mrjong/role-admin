import DemoRouter from '@/pages/demo/router';
import collectionMngRouter from '@/pages/collectionMng/router';
import workflowRouter from '@/pages/workflow/router';
import arbitramentMngRouter from '@/pages/arbitramentMng/router';
import systemRouter from '@/pages/system/router';
import caseMngRouter from '@/pages/caseMng/router';
export default {
	...DemoRouter,
	...collectionMngRouter,
	...workflowRouter,
  ...arbitramentMngRouter,
  ...systemRouter,
  ...caseMngRouter,
};
