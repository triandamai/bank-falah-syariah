import { HTTP } from "../services";
import { KEY_USER, KEY_LAST_PEGAWAI } from "../variable";
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

    headerdatajabatan: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "NAMA ", value: "namajabatan" },
      { text: "LIMIT TRANSAKSI", value: "limitTransaksi" },
      { text: "STATUS", value: "status" },
      { text: "AKSI", value: "actions", sortable: false },
    ],
    datajabatan: [
      {
        id: "001",
        namajabatan: "ghjk",
        limitTransaksi: "122",
        status: "2",
      },
    ],
    headeraksesteller: [
      {
        text: "ID",
        align: "start",
        value: "no",
      },
      {
        text: "LEVEL",
        align: "start",
        value: "level",
      },
      {
        text: "USERNAME",
        align: "start",
        value: "username",
      },
      {
        text: "NAMA PEGAWAI",
        align: "start",
        value: "namapegawai",
      },
      { text: "AKSI", value: "actions", sortable: false },
    ],
    dataaksesteller: [
      {
        no: "42354",
        level: "324",
        username: "34",
        namapegawai: "24",
      },
    ],
    headerroleakses: [
      {
        text: "Icon",
        align: "start",
        value: "icon",
      },
      {
        text: "TITLE",
        align: "start",
        value: "title",
      },
      {
        text: "DESKRIPSI",
        align: "start",
        value: "deskripsi",
      },
      {
        text: "URL",
        align: "start",
        value: "url",
      },
    ],
    dataroleakses: [
      {
        icon: "mdi-files",
        title: "Otomasi",
        deskripsi: "hai hai",
        url: "/backup-data",
      },
    ],
    dialogtambahpegawai: false,
    dialogtambahuser: false,
    dialogtambahjabatan: false,
    dialogtambahaksesteller: false,
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
    getdialogtambahaksesteller: (state) => {
      return state.dialogtambahaksesteller;
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
    getheaderdatajabatan: (state) => {
      return state.headerdatajabatan;
    },
    getheaderaksesteller: (state) => {
      return state.headeraksesteller;
    },
    getdataaksesteller: (state) => {
      return state.dataaksesteller;
    },
    getheaderroleakses: (state) => {
      return state.headerroleakses;
    },
    getdataroleakses: (state) => {
      return state.dataroleakses;
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
    dialogtambahaksesteller(state, data) {
      state.dialogtambahaksesteller = data;
    },
    simpanpegawai(state, data) {
      HTTP.post("", data)
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {});
    },
    simpanjabatan(state, data) {
      HTTP.post("", data)
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {});
    },
    simpanuser(state, data) {
      HTTP.post("", data)
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {});
    },
    simpanaksesteller(state, data) {
      HTTP.post("", data)
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {});
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
    showdialogtambahaksesteller(context, data) {
      context.commit("dialogtambahaksesteller", data);
    },
  },
};

export default user;
