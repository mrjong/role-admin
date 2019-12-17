import * as businessMng from './business-mng-api';
import * as caseDetail from './case-detail-api';
import * as messageMng from './message-mng-api';
import * as getData from './getData';

export default {
  ...businessMng,
  ...caseDetail,
  ...messageMng,
  ...getData,
}
