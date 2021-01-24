/*eslint-disable*/

const state = {
  dataakad: [],
  akad: {
    search: "",
    header: "",
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  formakad: {
    tipe_akad: "",
    nama_akad: "",
    kode_akad: "",
    active: "",
  },
  datajenistransaksi: [],
  jenistransaksi: {
    search: "",
    header: "",
    current_page: 0,
    last_page: 0,
  },
  formjenistransaksi: {},
  dataproduk: [],
  produk: {
    search: "",
    header: "",
    current_page: 0,
    last_page: 0,
  },
  formproduk: {},
  datajabatan: [],
  jabatan: {
    search: "",
    header: "",
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  formjabatan: {},
  datapegawai: [],
  pegawai: {
    search: "",
    header: "",
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  formpegawai: {},
};
const getters = {};
const actions = {};
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
