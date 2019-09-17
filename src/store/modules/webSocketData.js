const obj = {
  state: {
    webSocketData: {}
  },
  getters: {
    changeWebSocketData: (state) => state.webSocketData
  },
  mutations: {
    changeWebSocketData(state, res) {
      state.webSocketData = res;
    }
  }
};

export default obj;
