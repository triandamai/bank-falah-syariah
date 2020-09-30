const app = {
  namespace: true,
  // eslint-disable-next-line
  state: {
    minimenu: true,
  },
  getters: {
    // eslint-disable-next-line
    getminimenu: (state) => {
      return state.minimenu;
    },
  },
  mutations: {
    // eslint-disable-next-line
    actionminimenu(state, data) {
      state.minimenu = data;
    },
  },
  // eslint-disable-next-line
  //dari component ke action terus ke mutation
  actions: {
    actionminimenu(context, data) {
      context.commit("actionminimenu", data);
    },
  },
};

export default app;
