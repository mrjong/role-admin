import fetch from '@/libs/fetch';
import qs from 'qs';

/**
 * @param 信用进度管理
 *
 */

// 下载模板
export const casesprocess_download_template = (obj, options) =>
  fetch({
    url: '/casesprocess/download/template',
    method: 'POST',
    data: qs.stringify(obj),
    responseType: 'blob',
    options
  });
// 列表
export const casesprocess_list = (obj, options) =>
  fetch({
    url: '/casesprocess/list',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });
// 信用进度撤销
export const casesprocess_delete = (obj, options) =>
  fetch({
    url: '/casesprocess/delete',
    method: 'POST',
    data: qs.stringify(obj),
    options
  });


/**
 *
 * @param 申请仲裁
 */

// 强执立案
export const credit_case_filing = (obj, options) =>
  fetch({
    url: '/credit/case/filing',
    method: 'POST',
    data: obj,
    options
  });


