import axios from 'axios';
import iView from 'iview';
import qs from 'qs';
import Cookie from 'js-cookie';
import util from './util';
axios.defaults.baseURL = '/admin';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let timer;
let timerList = [];
let num = 0;
let reqConfig = {};
axios.interceptors.request.use(
	(config) => {
		console.log(config);
		if (config.url.indexOf('/geocoder/v2') > -1) {
			console.log('config.url', config.url);
			config.baseURL = '';
			config.url.substring(5, config.url.length);
			console.log('config.url', config);
		}
		if (config.data.config) {
			reqConfig = config.data.config;
			delete config.data.config;
		}
		console.log(reqConfig);
		const TOKEN = Cookie.get('token');
		if (TOKEN) {
			config.headers['token'] = TOKEN;
		} else {
			config.headers['token'] = '';
		}
		num++;
		if (!reqConfig.hideLoading) {
			// 防止时间短，出现loading 导致闪烁
			timer = setTimeout(() => {
				console.log(timerList);
				// 处理多个请求，只要一个loading
				if (timerList.length > 1) {
					return;
				}
				iView.Message.loading({
					content: '数据加载中...',
					duration: 10000
				});
			}, 500);
			timerList.push(timer);
		}
		console.log('---', config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		num--;
		console.log('tag', num, timer);
		if (num <= 0) {
			if (timer) {
				for (let i = 0; i < timerList.length; i++) {
					clearTimeout(timerList[i]);
				}
				timer = '';
				timerList = [];
				iView.Message.destroy();
			}
		} else {
			iView.Message.loading({
				content: '数据加载中...',
				duration: 10000
			});
		}
		if (response.data.code === 500) {
			iView.Message.error(response.data.msg);
			if (response.data.msg === '请登录') {
				util.clearAllCookie();
				localStorage.clear();
				sessionStorage.clear();
				setTimeout(() => {
					console.log('999999999');
					window.VueRouter.push({
						name: 'login'
					});
				}, 3000);
			}
			return;
		}
		console.log(reqConfig.hideMessage);
		if (response.data.code === 200 && response.data.msg.indexOf('ok') < 0 && !reqConfig.hideMessage) {
			iView.Message.success(response.data.msg);
		}
		reqConfig = {};
		return response.data;
	},
	(error) => {
		num--;
		for (let i = 0; i < timerList.length; i++) {
			clearTimeout(timerList[i]);
		}
		timer = '';
		timerList = [];
		iView.Message.destroy();
		console.log(error);
		iView.Message.error('服务器繁忙,稍后重试');
		return Promise.resolve(error.response);
	}
);
function getUrl(url, method, data) {
	let params = url + '?';
	if (Object.prototype.toString.call(data.searchParam) === '[object Array]') {
		for (let i = 0; i < data.searchParam.length; i++) {
			for (const key in data.searchParam[i]) {
				console.log(data.searchParam);
				if (Object.prototype.toString.call(data.searchParam[key]) === '[object Array]') {
					for (let j = 0; j < data.searchParam[key].length; j++) {
						params = params + `searchParam[${i}][${key}]=${encodeURIComponent(data.searchParam[key][j])}&`;
					}
				} else {
					params = params + `searchParam[${i}][${key}]=${encodeURIComponent(data.searchParam[i][key])}&`;
				}
			}
		}
	}
	if (data.datetime) {
		params = params + 'datatime=' + data.datetime + '&';
	}
	if (data.name_demo) {
		params = params + 'goods_name=' + data.name_demo + '&';
	}
	if (data.buffet_id) {
		params = params + 'buffet_id=' + data.buffet_id + '&';
	}
	if (data.activity_id) {
		params = params + 'activity_id=' + data.activity_id + '&';
	}
	if (data.page) {
		params = params + `page=${data.page}&perPage=${data.perPage}&`;
    }
	if (data.type222) {
		params = params + `type=${data.type222}&`;
	}
	params = params.slice(0, params.length - 1);
	return params;
}
export default function fetch({ url = '', method = 'GET', data = {} }) {
	if (method.toLocaleLowerCase() === 'get' && data && JSON.stringify(data) !== '{}' && !data.newGetType) {
		url = getUrl(url, method, data);
	} else if (data && data.newGetType) {
		delete data.newGetType;
		const paramsUrl = qs.stringify(data);
		url = url + '?' + paramsUrl;
		console.log(url);
	} else if (data && data.newGetType2) {
		delete data.newGetType2;
		const paramsUrl = qs.stringify(data);
		data = paramsUrl;
	}
	return axios({
		method,
		url,
		data,
		timeout: 10000
	})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
			iView.Message.error('服务器繁忙,稍后重试');
		});
}
