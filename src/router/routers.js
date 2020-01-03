import systemRouter from "@/pages/system/router";
import commonRouter from "@/pages/common/router";
import dataStatisticsRouter from '@/pages/dataStatistics/router'
export default {
  ...systemRouter,
  ...commonRouter,
  ...dataStatisticsRouter
};
