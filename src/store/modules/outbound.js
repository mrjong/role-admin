import { Stream } from "stream";

const obj = {
	state: {
    KTcallData: '',
    XZ_HUNG_UP_FLAG: String,
    CALL_RECORD: '',
    SPIN_DATA: '',
	},
	getters: {
    changeCallData: (state) => state.KTcallData,
    changeXZHungUpFlag: (state) => state.XZ_HUNG_UP_FLAG,
    changeCallRecord: (state) => state.CALL_RECORD,
    changeSpinData: (state) => state.SPIN_DATA,
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
    changeSpinData(state, res) {
      state.SPIN_DATA = res;
    },

	}
};

export default obj;
