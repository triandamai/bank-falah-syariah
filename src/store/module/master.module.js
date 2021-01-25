/*eslint-disable*/
import {
  headerdataakad,
  headerdatajenistransaksi,
  headerdataproduk,
  headerdatapegawai,
  headerdatajabatan,
} from "../utils/headers";
const state = {
  dataakad: [],
  akad: {
    search: "",
    header: headerdataakad,
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
    header: headerdatajenistransaksi,
    current_page: 0,
    last_page: 0,
  },
  formjenistransaksi: {},
  dataproduk: [],
  produk: {
    search: "",
    header: headerdataproduk,
    current_page: 0,
    last_page: 0,
  },
  formproduk: {},
  datajabatan: [],
  jabatan: {
    search: "",
    header: headerdatajabatan,
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  formjabatan: {},
  datapegawai: [],
  pegawai: {
    search: "",
    header: headerdatapegawai,
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  formpegawai: {},
};
const getters = {};
const actions = {};
const mutations = {
  //not type
  setAkadSearch(state, val) {
    state.akad.search = val;
  },
  setjenisTransaksiSearch(state, val) {
    state.jenistransaksi.search = val;
  },
  setProdukSearch(state, val) {
    state.produk.search = val;
  },
  setPegawaiSearch(state, val) {
    state.pegawai.search = val;
  },
  setJabatanSearch(state, val) {
    state.jabatan.search = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
