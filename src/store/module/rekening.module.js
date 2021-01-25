/*eslint-disable*/
import {
  headerdatadeposito,
  headerdatasimpanan,
  headerdatapembiayaan,
} from "../utils/headers";
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
const actions = {};
const mutations = {
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
