const user = {
  namespace: true,
  // eslint-disable-next-line
  state: {
    dialogtambahpegawai: false,
    datapegawai: [
      {
        id: "000002",
        nip: "000003",
        nama: "Trian damai",
        jk: "LAKI-LAKI",
        jabatan: "Officer",
        status: "AKTIF",
      },
      {
        id: "000002",
        nip: "000003",
        nama: "Trian damai",
        jk: "LAKI-LAKI",
        jabatan: "Officer",
        status: "AKTIF",
      },
    ],
  },
  getters: {
    // eslint-disable-next-line
    getdialogtambahpegawai: (state) => {
      return state.dialogtambahpegawai;
    },
    getdatapegawai: (state) => {
      return state.datapegawai;
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
