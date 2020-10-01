const user = {
  namespace: true,
  // eslint-disable-next-line
  state: {
    headrsdatapegawai: [
      {
        text: "ID PEGAWAI",
        align: "start",
        sortable: true,
        value: "id",
      },
      {
        text: "NIP",
        value: "nip",
      },
      { text: "NAMA LENGKAP", value: "nama" },
      { text: "JENIS KELAMIN", value: "jk" },
      { text: "JABATAN", value: "jabatan" },
      { text: "STATUS", value: "status" },
      { text: "AKSI", value: "actions", sortable: false },
    ],
    headerdatauser: [
      {
        text: "ID PEGAWAI",
        align: "start",
        sortable: false,
        value: "id",
      },
      {
        text: "NIP",
        value: "nip",
      },
      { text: "NAMA LENGKAP", value: "nama" },
      { text: "USERNAME", value: "username" },
      { text: "KAS TELLER", value: "kas" },
      { text: "STATUS", value: "status" },
      { text: "AKSI", value: "actions", sortable: false },
    ],
    headerdatajabatan: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "NAMA ", value: "nama" },
      { text: "LIMIT TRANSAKSI", value: "limitTransaksi" },
      { text: "STATUS", value: "status" },
      { text: "AKSI", value: "actions", sortable: false },
    ],
    dialogtambahpegawai: false,
    dialogtambahuser: false,
    dialogtambahjabatan: false,
    datapegawai: [
      {
        id: "000002",
        nip: "000003",
        nama: "Trian damai",
        jk: "LAKI-LAKI",
        jabatan: "Officer",
        status: "AKTIF",
      },
    ],
    datauser: [
      {
        id: "000002",
        nip: "000003",
        nama: "Trian damai",
        jk: "LAKI-LAKI",
        jabatan: "Officer",
        username: "username",
        kas: "10000",
        status: "AKTIF",
      },
    ],
    datajabatan: [
      {
        id: "",
        namajabatan: "",
        limitTransaksi: "",
        status: "",
      },
    ],
  },
  getters: {
    // eslint-disable-next-line
    getdialogtambahpegawai: (state) => {
      return state.dialogtambahpegawai;
    },
    getdialogtambahuser: (state) => {
      return state.dialogtambahuser;
    },
    getdialogtambahjabatan: (state) => {
      return state.dialogtambahjabatan;
    },
    getdatapegawai: (state) => {
      return state.datapegawai;
    },
    getdatauser: (state) => {
      return state.datauser;
    },
    getdatajabatan: (state) => {
      return state.datajabatan;
    },
    getheaderdatapegawai: (state) => {
      return state.headrsdatapegawai;
    },
    getheaderdatauser: (state) => {
      return state.headerdatauser;
    },
  },
  mutations: {
    // eslint-disable-next-line
    dialogtambahpegawai(state, data) {
      state.dialogtambahpegawai = data;
    },
    dialogtambahuser(state, data) {
      state.dialogtambahuser = data;
    },
    dialogtambahjabatan(state, data) {
      state.dialogtambahjabatan = data;
    },
  },
  // eslint-disable-next-line
  actions: {
    showdialogtambahpegawai(context, data) {
      context.commit("dialogtambahpegawai", data);
    },
    showdialogtambahuser(context, data) {
      context.commit("dialogtambahuser", data);
    },
    showdialogtambahjabatan(context, data) {
      context.commit("dialogtambahjabatan", data);
    },
  },
};

export default user;
