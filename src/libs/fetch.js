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
		const TOKEN = Cookie.get('SXF-TOKEN');
		if (TOKEN) {
			config.headers['SXF-TOKEN'] = TOKEN;
		} else {
			config.headers['SXF-TOKEN'] = '';
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
		switch (error && error.response.status) {
			case 401:
				iView.Message.error((error && error.response && error.response.data) || '服务器繁忙,稍后重试');
				setTimeout(() => {
					window.$router.push({
						name: 'login'
					});
				}, 3000);
				break;

			default:
				break;
		}

		return Promise.resolve(error.response);
	}
);
export default function fetch({ url = '', method = 'GET', data = {} }) {
	return axios({
		method: method.toLocaleLowerCase(),
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
