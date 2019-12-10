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
