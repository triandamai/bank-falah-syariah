const user = {
  namespace: true,
  // eslint-disable-next-line
  state: {
    dialogtambahpegawai: true,
  },
  getters: {
    // eslint-disable-next-line
    getdialogtambahpegawai: (state) => {
      return state.dialogtambahpegawai;
    },
  },
  mutations: {
    // eslint-disable-next-line
    dialogtambahpegawai(state, data) {
      state.dialogtambahpegawai = data;
    },
  },
  // eslint-disable-next-line
  actions: {
    actiontambahpegawai(context, data) {
      context.commit("dialogtambahpegawai", data);
    },
  },
};

export default user;
