import { Stream } from "stream";
// import { state } from "fs";

const obj = {
	state: {
    KTcallData: '',
    XZ_HUNG_UP_FLAG: String,
    CALL_RECORD: '',
    SPIN_DATA: '',
    DY_FLAG: false,
    SET_DY_SCRIPT: '',
	},
	getters: {
    changeCallData: (state) => state.KTcallData,
    changeXZHungUpFlag: (state) => state.XZ_HUNG_UP_FLAG,
    changeCallRecord: (state) => state.CALL_RECORD,
    changeSpinData: (state) => state.SPIN_DATA,
    changeInitDY: (state) => state.DY_FLAG,
    changeDYScript: (state) => state.SET_DY_SCRIPT,
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
    changeInitDY(state, res) {
      state.DY_FLAG = res;
    },
    changeDYScript(state, res) {
      state.SET_DY_SCRIPT = res;
    }
	}
};

export default obj;
