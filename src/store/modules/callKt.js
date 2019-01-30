
const KT = {
	state: {
		KTcallData: ''
	},
	getters: {
		changeCallData: (state) => state.KTcallData
	},
	mutations: {
		changeCallData(state, res) {
			state.KTcallData = res;
		}
	}
};

export default KT;
