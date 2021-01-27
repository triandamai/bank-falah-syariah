/*eslint-disable*/

import ApiService from "../../core/services/api.service";
import {
  headerdataakad,
  headerdatajenistransaksi,
  headerdataproduk,
  headerdatapegawai,
  headerdatajabatan,
} from "../utils/headers";

export const ACTION_GET_DATA_MASTER = "GETMASTERDATA";

export const ACTION_POST_DATA_MASTER = "POSTMASTERDATA";

export const ACTION_PUT_DATA_MASTER = "PUTMASTERDATA";

export const ACTION_DELETE_DATA_MASTER = "DELETEMASTERDATA";

export const MUTATION_ADD_DATA_MASTER = "MADDDATAMASTER";
export const MUTATION_PUT_DATA_MASTER = "MPUTDATAMASTER";
export const MUTATION_DELETE_DATA_MASTER = "DELETEMASTERDATA";

export const MAKAD = "MAKAD";
export const MPRODUK = "MPRODUK";
export const MJABATAN = "MJABATAN";
export const MPEGAWAI = "MPEGAWAI";
export const MJENISTRANSAKSI = "MJEBISTRANSAKSI";

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
  /***
   * get data
   * @param {mastertype,path,id}
   *
   */
  [ACTION_GET_DATA_MASTER]({ commit, state }, { mastertype, path, id }) {
    return new Promise((resolve) => {
      let page = `?page=`;
      let stillPaging = false;
      switch (mastertype) {
        case MAKAD:
          page += state.akad.current_page;
          break;
        case MJABATAN:
          page += state.jabatan.current_page;
          break;
        case MPEGAWAI:
          page += state.pegawai.current_page;
          break;
        case MPRODUK:
          page += state.produk.current_page;
          break;
        case MJENISTRANSAKSI:
          page += state.current_page;
          break;
      }
      ApiService.get(`${path}${page}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              resolve(false);
              stillPaging = fasle;
            } else {
              resolve(true);
              stillPaging = true;
            }
            res.data.data.map((item) => {
              commit(MUTATION_ADD_DATA_MASTER, {
                mastertype: mastertype,
                data: item,
                page: stillPaging,
              });
            });
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve(false);
        });
    });
  },
};
const mutations = {
  /***
   * adding data to each state
   *
   */
  [MUTATION_ADD_DATA_MASTER](state, { mastertype, data, page }) {
    switch (mastertype) {
      case MAKAD:
        var exist = state.dataakad.some((akad) => {
          return akad.id == data.id;
        });
        if (!exist) {
          state.dataakad.push(data);
        }
        page ? state.akad.current_page++ : null;
        break;
      case MJABATAN:
        var exist = state.datajabatan.some((jabatan) => {
          return jabatan.id == data.id;
        });
        if (!exist) {
          state.datajabatan.push(data);
        }
        page ? state.jabatan.current_page++ : null;
        break;
      case MJENISTRANSAKSI:
        var exist = state.datajenistransaksi.some((jenis) => {
          return jenistransaksi.id == data.id;
        });
        if (!exist) {
          state.datajenistransaksi.push(data);
        }
        page ? state.jenistransaksi.current_page++ : null;
        break;
      case MPEGAWAI:
        var exist = state.datapegawai.some((pegawai) => {
          return pegawai.id == data.id;
        });
        if (!exist) {
          state.datapegawai.push(data);
        }
        page ? state.pegawai.current_page++ : null;
        break;
      case MPRODUK:
        var exist = state.dataproduk.some((produk) => {
          return produk.id == data.id;
        });
        page ? state.produk.current_page++ : null;
        break;
    }
  },
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
