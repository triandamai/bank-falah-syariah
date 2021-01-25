/*eslint-disable*/
import ApiService from "../../core/services/api.service";
import {
  headerdatadeposito,
  headerdatasimpanan,
  headerdatapembiayaan,
} from "../utils/headers";
export const ACTION_GET_DEPOSITO = "GETDEPOSITO";
export const ACTION_GET_PEMBIAYAAN = "GETPEMBIAYAAN";
export const ACTION_GET_SIMPANAN = "GETSIMPANAN";
export const MUTATION_ADD_DEPOSITO = "MGETDEPOSITO";
export const MUTATION_ADD_PEMBIAYAAN = "MGETPEMBIAYAAN";
export const MUTATION_ADD_SIMPANAN = "MGETSIMPANAN";
export const MUTATION_DELETE_SIMPANAN = "DSIMPANAN";
export const MUTATION_DELETE_PEMBIAYAAN = "DPEMBIAYAAN";
export const MUTATION_DELTE_DEPOSITO = "DDEPOSITO";
const state = {
  datadeposito: [],
  deposito: {
    search: "",
    header: headerdatadeposito,
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  datapembiayaan: [],
  pembiayaan: {
    search: "",
    header: headerdatapembiayaan,
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  datasimpanan: [],
  simpanan: {
    search: "",
    header: headerdatasimpanan,
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
};
const getters = {};
const actions = {
  [ACTION_GET_DEPOSITO]() {
    return new Promise((resolve) => {
      ApiService.get("")
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              resolve(false);
            } else {
              resolve(true);
            }
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve(false);
        });
    });
  },
  [ACTION_GET_PEMBIAYAAN]() {
    return new Promise((resolve) => {
      ApiService.get("")
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              resolve(false);
            } else {
              resolve(true);
            }
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve(false);
        });
    });
  },
  [ACTION_GET_SIMPANAN]() {
    return new Promise((resolve) => {
      ApiService.get("")
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              resolve(false);
            } else {
              resolve(true);
            }
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
  [MUTATION_ADD_DEPOSITO](state, data) {
    var exist = state.datadeposito.some((deposito) => {
      return deposito.id == data.id;
    });
    if (!exist) {
      state.datadeposito.push(data);
    }
  },
  [MUTATION_ADD_PEMBIAYAAN](state, data) {
    var exist = state.datapembiayaan.some((pembiayaan) => {
      return pembiayaan.id == data.id;
    });
    if (!exist) {
      state.datapembiayaan.push(data);
    }
  },
  [MUTATION_ADD_SIMPANAN](state, data) {
    var exist = state.datasimpanan.some((simpanan) => {
      return simpanan.id == data.id;
    });
    if (!exist) {
      state.datasimpanan.push(data);
    }
  },
  [MUTATION_DELETE_PEMBIAYAAN](state, data) {
    var index = state.datapembiayaan
      .map((pembiayaan) => pembiayaan.id)
      .indexOf(data.id);
    state.datapembiayaan.splice(index);
  },
  [MUTATION_DELETE_SIMPANAN](state, data) {
    var index = state.datasimpanan
      .map((simpanan) => simpanan.id)
      .indexOf(data.id);
    state.datasimpanan.splice(index);
  },
  [MUTATION_DELTE_DEPOSITO](state, data) {
    var index = state.datadeposito
      .map((deposito) => deposito.id)
      .indexOf(data.id);
    state.datadeposito.splice(index);
  },
  //not type
  setPembiayaanSearch(state, val) {
    state.pembiayaan.search = val;
  },
  setSimpananSearch(state, val) {
    state.simpanan.search = val;
  },
  setDepositoSearch(state, val) {
    state.deposito.search = val;
  },
};
export default { namespaed: true, state, getters, actions, mutations };
