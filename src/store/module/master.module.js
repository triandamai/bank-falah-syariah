/*eslint-disable*/
import {
  headerdataakad,
  headerdatajenistransaksi,
  headerdataproduk,
  headerdatapegawai,
  headerdatajabatan,
} from "../utils/headers";

export const ACTION_GET_AKAD = "GETAKAD";
export const ACTION_GET_JENIS_TRANSAKSI = "GETJENISTRANSAKSI";
export const ACTION_GET_PRODUK = "GETPRODUK";
export const ACTION_GET_JABATAN = "GETJABATAN";
export const ACTION_GET_PEGAWAI = "GETPEGAWAI";

export const MUTATION_ADD_AKAD = "MGETAKAD";
export const MUTATION_ADD_JENIS_TRANSAKSI = "MGETJENISTRANSAKSI";
export const MUTATION_ADD_PRODUK = "MGETPRODUK";
export const MUTATION_ADD_JABATAN = "MGETJABATAN";
export const MUTATION_ADD_PEGAWAI = "MGETPEGAWAI";

export const MUTATION_DELETE_AKAD = "DGETAKAD";
export const MUTATION_DELETE_JENIS_TRANSAKSI = "DGETJENISTRANSAKSI";
export const MUTATION_DELETE_PRODUK = "DGETPRODUK";
export const MUTATION_DELETE_JABATAN = "DGETJABATAN";
export const MUTATION_DELETE_PEGAWAI = "DGETPEGAWAI";

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
const actions = {
  [ACTION_GET_AKAD]() {},
  [ACTION_GET_JABATAN]() {},
  [ACTION_GET_JENIS_TRANSAKSI]() {},
  [ACTION_GET_PEGAWAI]() {},
  [ACTION_GET_PRODUK]() {},
};
const mutations = {
  [MUTATION_ADD_AKAD](state, data) {},
  [MUTATION_ADD_JABATAN](state, data) {},
  [MUTATION_ADD_JENIS_TRANSAKSI](state, data) {},
  [MUTATION_ADD_PEGAWAI](state, data) {},
  [MUTATION_ADD_PRODUK](state, data) {},
  [MUTATION_DELETE_AKAD](state, data) {},
  [MUTATION_DELETE_JABATAN](state, data) {},
  [MUTATION_DELETE_PEGAWAI](state, data) {},
  [MUTATION_DELETE_PRODUK](state, data) {},
  [MUTATION_DELETE_JENIS_TRANSAKSI](state, data) {},
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
