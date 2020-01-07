import api from '@/service';

const dictionary = {
	state: {},
	getters: {
		dictionaryObj: (state) => state.dictionaryObj
	},
	mutations: {
		dictionaryObj(state, { data, arg }) {
			state[arg] = data;
		}
	},
	actions: {
		async getDictionary({ commit }, arg) {
			const { data } = await api.sysDictionary_getListByParentId(
				{
					itemCode: arg
				},
				{
					hideLoading: true
				}
			);
			commit('dictionaryObj', {
				data,
				arg
			});
			return new Promise((resolve, reject) => {
				resolve(data);
			});
		},
	}
};

export default dictionary;
