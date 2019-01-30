import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import sysDictionary from './modules/sysDictionary';
import callKt from './modules/callKt';
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		//
	},
	mutations: {
		//
	},
	actions: {},
	modules: {
		app,
		user,
		sysDictionary,
		callKt
	}
});

export default store;
