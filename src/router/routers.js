import CommonRouter from '@/pages/common/router';
import DemoRouter from '@/pages/demo/router';
import collectionMngRouter from '@/pages/collectionMng/router';

export default {
	...CommonRouter,
	...DemoRouter,
	...collectionMngRouter
};
