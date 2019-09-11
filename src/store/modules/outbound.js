import { Stream } from "stream";

const obj = {
	state: {
    KTcallData: '',
    XZ_HUNG_UP_FLAG: String,
    CALL_RECORD: '',
	},
	getters: {
    changeCallData: (state) => state.KTcallData,
    changeXZHungUpFlag: (state) => state.XZ_HUNG_UP_FLAG,
    changeCallRecord: (state) => state.CALL_RECORD,
	},
	mutations: {
		changeCallData(state, res) {
			state.KTcallData = res;
    },
    changeXZHungUpFlag(state, res) {
      state.XZ_HUNG_UP_FLAG = res;
    },
    changeCallRecord(state, res) {
      state.CALL_RECORD = res;
    },

	}
};

export default obj;
