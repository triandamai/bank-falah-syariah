/*eslint-disable*/
import { stat } from "original-fs";
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
   *  @param {rekeningtype,path,body}
   *
   */
  [ACTION_POST_DATA]({ commit }, { rekeningtype, path, body }) {
    return new Promise((resolve) => {
      ApiService.post(`${path}`, body)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_ADD_DATA, {
              rekeningtype: rekeningtype,
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
   * update/edit data
   * @param {rekeningtype,path,body}
   */
  [ACTION_PUT_DATA]({ commit }, { rekeningtype, path, body }) {
    return new Promise((resolve) => {
      ApiService.put(`${path}`, body)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_UPDATE_DATA, {
              rekeningtype: rekeningtype,
              data: res.data.data[0],
              olddata: body,
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
  /***
   * delete pembiayaan
   * @param {rekeningtype,body,path}
   */
  [ACTION_DELETE_DATA]({ commit }, { rekeningtype, path, body }) {
    return new Promise((resolve) => {
      ApiService.delete(`${path}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_DELETE_DATA, {
              rekeningtype: rekeningtype,
              data: body,
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
  /***
   * delete pembiayaan
   *
   */
};
const mutations = {
  /***
   * Rekening add data dynamicly
   * {@param rekeningtype
   * @param item}
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
  /***
   * update data
   * {@param rekeningtype,
   * @param data
   * @param olddata}
   * @returns update data
   */
  [MUTATION_UPDATE_DATA](state, { rekeningtype, data, olddata }) {
    //get type rekening
    switch (rekeningtype) {
      case RSIMPANAN:
        //update to data
        var index = state.datasimpanan
          .map((simpanan) => simpanan.id)
          .indexOf(olddata.id);
        state.datasimpanan[index] = data;
        break;
      case RDEPOSITO:
        var index = state.datadeposito
          .map((deposito) => deposito.id)
          .indexOf(olddata.id);
        state.datadeposito[index] = data;
        break;
      case RPEMBIAYAAN:
        var index = state.datapembiayaan
          .map((pembiayaan) => pembiayaan.id)
          .indexOf(olddata.id);
        state.datapembiayaan[index] = data;
        break;
    }
  },
  /***
   * delete data
   * @param {rekenigntype,data}
   */
  [MUTATION_DELETE_DATA](state, { rekeningtype, data }) {
    switch (rekeningtype) {
      case RDEPOSITO:
        var index = state.datadeposito
          .map((deposito) => deposito.id)
          .indexOf(data.id);
        state.datadeposito.splice(index);
        break;
      case RPEMBIAYAAN:
        var index = state.datapembiayaan
          .map((deposito) => deposito.id)
          .indexOf(data.id);
        state.datapembiayaan.splice(index);
        break;
      case RSIMPANAN:
        var index = state.datasimpanan
          .map((deposito) => deposito.id)
          .indexOf(data.id);
        state.datasimpanan.splice(index);
        break;
    }
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
