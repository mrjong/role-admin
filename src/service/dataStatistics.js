import fetch from "@/libs/fetch";
import qs from "qs";

/**
 * 查询渠道
 */
export const query_platform_channels = obj => {
  const { pid, level } = obj;

  return fetch({
    url: `/dataStatistics/platform/queryChannels?pid=${pid}&level=${level}`,
    method: "POST"
  });
};

/**
 * 查询列表
 */
export const query_platform_list = obj => {
  const { pageSize, pageNum, ...other } = obj;
  return fetch({
    url: `/dataStatistics/platform/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "POST",
    data: other
  });
};
