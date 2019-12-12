import fetch from '@/libs/fetch';
import qs from 'qs';

/**
 * @param 模板管理
 */

//  模板查询
export const msgTempl_list = (obj) =>
  fetch({
    url: '/msgTempl/list',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 添加任务
export const msgJob_addMsgJob = (obj) =>
  fetch({
    url: '/msgJob/addMsgJob',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 启用任务
export const msgJob_enableJob = (obj) =>
  fetch({
    url: '/msgJob/enableJob',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 禁用任务
export const msgJob_disableJob = (obj) =>
  fetch({
    url: '/msgJob/disableJob',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查询任务详情
export const msgJob_queryJobById = (obj) =>
  fetch({
    url: '/msgJob/queryJobById',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 查询任务列表
export const msgJob_queryJob = (obj) =>
  fetch({
    url: '/msgJob/queryJob',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 添加短信模板
export const msgTempl_addTempl = (obj) =>
  fetch({
    url: '/msgTempl/addTempl',
    method: 'POST',
    data: qs.stringify(obj)
  });

// 添加参数配置
export const msgTempl_addParamConfig = (obj) =>
  fetch({
    url: '/msgTempl/addParamConfig',
    method: 'POST',
    data: qs.stringify(obj)
  });


