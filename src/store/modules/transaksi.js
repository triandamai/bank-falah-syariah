/**
 * Author Trian Damai
 * Bakaran Project
 *
 */
import ApiService from "@services/api.service.js";

const ACTION_POST_TRANSAKSI = "POSTTRANSAKSI";

const state = {};
const getters = {};
const actions = {
  [ACTION_POST_TRANSAKSI]() {
    return new Promise(resolve => {});
  }
};
const mutations = {};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
