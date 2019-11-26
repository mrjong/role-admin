import fetch from '@/libs/fetch';
import qs from 'qs';

/**
 *
 * @param {*} 客户档案相关接口
 * 1、收入情况
 * 2、外呼情况查询接口
 * 3、债务情况查询接口
 * 4、历史沟通查询接口
 * 5、交互信息查询接口
 */
export const archives_queryIncome = (obj) => fetch({
  url: '/archives/queryIncome', method: 'POST', data: qs.stringify(obj)
});

export const archives_queryOutbound = (obj) =>
  fetch({
    url: '/archives/queryOutbound',
    method: 'POST',
    data: qs.stringify(obj)
  });

export const archives_queryDebt = (obj) =>
  fetch({
    url: '/archives/queryDebt',
    method: 'POST',
    data: qs.stringify(obj)
  });

export const archives_queryLinkHistory = (obj) =>
  fetch({
    url: '/archives/queryLinkHistory',
    method: 'POST',
    data: qs.stringify(obj)
  });

export const archives_queryInteractive = (obj) =>
  fetch({
    url: '/archives/queryInteractive',
    method: 'POST',
    data: qs.stringify(obj)
  });
