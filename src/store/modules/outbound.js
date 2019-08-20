import { Stream } from "stream";

const obj = {
	state: {
    KTcallData: '',
    XZ_HUNG_UP_FLAG: String
	},
	getters: {
    changeCallData: (state) => state.KTcallData,
    changeXZHungUpFlag: (state) => state.XZ_HUNG_UP_FLAG,
	},
	mutations: {
		changeCallData(state, res) {
			state.KTcallData = res;
    },
    changeXZHungUpFlag(state, res) {
      state.XZ_HUNG_UP_FLAG = res;
    }
	}
};

export default obj;
