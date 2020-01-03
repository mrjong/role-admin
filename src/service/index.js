import * as businessMng from './business-mng-api';
import * as caseDetail from './case-detail-api';
import * as dataStatistics from './dataStatistics';
import * as getData from './getData';

export default {
  ...businessMng,
  ...caseDetail,
  ...dataStatistics,
  ...getData
}
