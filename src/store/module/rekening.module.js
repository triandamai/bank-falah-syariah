/*eslint-disable*/
import ApiService from "../../core/services/api.service";
import {
  headerdatadeposito,
  headerdatasimpanan,
  headerdatapembiayaan,
} from "../utils/headers";
export const ACTION_GET_DATA = "GETDATAREKENING";

export const ACTION_POST_DATA = "POSTREKENINGDATA";

export const ACTION_PUT_DATA = "PUTDATAREKENING";

export const ACTION_DELETE_DATA = "DELETEDATAREKENING";

export const MUTATION_ADD_DATA = "MADDDATAREKENING";

export const MUTATION_DELETE_DATA = "MDELETEDATAREKENING";

export const MUTATION_UPDATE_DATA = "MUPDATEREKENING";
/***
 *
 * type Action
 *
 */
export const RSIMPANAN = "SIMPANAN";
export const RDEPOSITO = "DEPOSITO";
export const RPEMBIAYAAN = "PEMBIAYAAN";

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
  /***
   * get all data rekekning deposito/pembiayaansimpanan
   * @param {rekeningtype,path}
   *
   */
  [ACTION_GET_DEPOSITO]({ commit, state }, { rekeningtype, path }) {
    return new Promise((resolve) => {
      //cek pagination (get current page)
      let page =
        rekeningtype === RSIMPANAN
          ? state.simpanan.current_page
          : rekeningtype === RDEPOSITO
          ? state.simpanan.current_page
          : rekeningtype === RPEMBIAYAAN
          ? state.current_page
          : 0;
      //for mutation the pagination going forward or stop
      let stillPaging = false;
      //get
      ApiService.get(`${path}?page=${page}`)
        .then((res) => {
          //success
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              resolve(false);
              stillPaging = false;
            } else {
              resolve(true);
              stillPaging = true;
            }
            res.data.data.map((item) => {
              commit(MUTATION_ADD_DATA, {
                rekeningtype: rekeningtype,
                item: item,
                page: stillPaging,
              });
            });
          } else {
            //failed
            resolve(false);
          }
        })
        .catch((e) => {
          //failes
          resolve(false);
        });
    });
  },

  /***
   * save data
   *  @param {rekeknigntype,path,body}
   *
   */
  [ACTION_POST_DATA]({ commit }, { rekeknigntype, path, body }) {
    return new Promise((resolve) => {
      ApiService.post(`${path}`, body)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_ADD_DATA, {
              rekeknigntype: rekeknigntype,
              item: res.data.data[0],
              page: false,
            });
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve(false);
        });
    });
  },
  /***
   * update/edit deposito
   *
   */
  [ACTION_PUT_DATA]() {
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
  /***
   * update/edit pembiayaan
   *
   */
  [ACTION_DELETE_DEPOSITO]() {
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
  /***
   * delete pembiayaan
   *
   */
};
const mutations = {
  /***
   * Rekening add data dynamicly
   * @param {rekeknigntype,item}
   * @returns each data array will increment smoothly
   */
  [MUTATION_ADD_DATA](state, { rekeningtype, item, page }) {
    //push data with type rekening assosiated
    switch (rekeningtype) {
      case RPEMBIAYAAN:
        var exist = state.datapembiayaan.some((pembiayaan) => {
          return pembiayaan.id == item.id;
        });
        //assume the data/item is doesnt exist
        if (!exist) {
          state.datapembiayaan.push(item);
        }
        //pagination if still other page
        page
          ? (state.pembiayaan.current_page = state.pembiayaan.current_page++)
          : null;
        break;
      case RSIMPANAN:
        var exist = state.datasimpanan.some((simpanan) => {
          return simpanan.id == item.id;
        });
        //assume the data/item is doesnt exist
        if (!exist) {
          state.datasimpanan.push(item);
        }
        //pagination
        page
          ? (state.simpanan.current_page = state.simpanan.current_page++)
          : null;
        break;
      case RDEPOSITO:
        var exist = state.datadeposito.some((deposito) => {
          return deposito.id == item.id;
        });
        //assume the data/item is doesnt exist
        if (!exist) {
          state.datadeposito.push(item);
        }
        page
          ? (state.deposito.current_page = state.deposito.current_page)
          : null;
        break;
    }
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
