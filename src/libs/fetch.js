import axios from 'axios';
import iView from 'iview';
import Cookie from 'js-cookie';
import util from './util';
import store from '@/store';
import storage from '@/libs/storage';
axios.defaults.baseURL = '/admin';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let reqList = [];
axios.interceptors.request.use(
	(config, options) => {
		const TOKEN = Cookie.get('SXF-TOKEN');
		if (TOKEN) {
			config.headers['SXF-TOKEN'] = TOKEN;
		} else {
			config.headers['SXF-TOKEN'] = '';
		}

		reqList.push(config.baseURL + config.url);
		if (reqList.length === 1) {
			setTimeout(() => {
				iView.Message.loading({
					content: '数据加载中...',
					duration: 10
				});
			}, 600);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log(response);
		reqList.forEach((element, index) => {
			console.log(element, response.config.url);
			if (element === response.config.url) {
				reqList.splice(index, 1);
			}
		});
		if (reqList.length === 0) {
			iView.Message.destroy();
		}
		return response.data;
	},
	(error) => {
		reqList = [];
		iView.Message.destroy();
		switch (error && error.response.status) {
			case 401:
				iView.Message.error((error && error.response && error.response.data) || '服务器繁忙,稍后重试');
				// util.clearAllCookie();
				// store.commit('logout', this);
				// store.commit('clearOpenedSubmenu');
				// setTimeout(() => {
				// 	location.replace('/');
				// }, 3000);
				break;

			case 400:
			case 404:
			case 501:
			case 500:
			case 503:
				iView.Message.error('服务器繁忙,稍后重试');
				break;

			default:
				break;
		}
		return Promise.resolve(error.response);
	}
);
export default function fetch({ url = '', method = 'GET', data = {}, options = {}, responseType }) {
	return axios({
		method: method.toLocaleLowerCase(),
		url,
		data,
		timeout: 10000,
		options,
		responseType
	})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
			iView.Message.error('服务器繁忙,稍后重试');
		});
}
