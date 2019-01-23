import DemoRouter from '@/pages/demo/router';
import collectionMngRouter from '@/pages/collectionMng/router';
import workflowRouter from '@/pages/workflow/router';
import arbitramentMngRouter from '@/pages/arbitramentMng/router';
export default {
	...DemoRouter,
	...collectionMngRouter,
	...workflowRouter,
	...arbitramentMngRouter
};
