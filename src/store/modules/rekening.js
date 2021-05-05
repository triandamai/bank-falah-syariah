/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "../../services/api.service";

/***
 * dspatch type
 */
export const ACTION_GET_DATA_REKENING = "GETDATAREKENING";

export const ACTION_POST_DATA_REKENING = "POSTREKENINGDATA";

export const ACTION_PUT_DATA_REKENING = "PUTDATAREKENING";

export const ACTION_DELETE_DATA_REKENING = "DELETEDATAREKENING";

export const MUTATION_ADD_DATA_REKENING = "MADDDATAREKENING";

export const MUTATION_DELETE_DATA_REKENING = "MDELETEDATAREKENING";

export const MUTATION_UPDATE_DATA_REKENING = "MUPDATEREKENING";
/***
 *
 * type Action
 *
 */
export const RSIMPANAN = "rekening_simpanan";
export const RDEPOSITO = "rekening_deposito";
export const RPEMBIAYAAN = "rekening_pembiayaan";

const state = {
  datadeposito: [],
  deposito: {
    dialog: false,
    current_page: 0,
    last_page: 0
  },
  datapembiayaan: [],
  pembiayaan: {
    dialog: false,
    current_page: 0,
    last_page: 0
  },
  datasimpanan: [],
  simpanan: {
    dialog: false,
    current_page: 0,
    last_page: 0
  }
};
const getters = {};
const actions = {
  /***
   * get all data rekekning deposito/pembiayaansimpanan
   * @param {type,path}
   *  @returns data array and after success adding to @global data array
   *
   */
  [ACTION_GET_DATA_REKENING]({ commit, state }, { type }) {
    return new Promise(resolve => {
      //cek pagination (get current page)
      let page = `?page=`;
      //for mutation the pagination going forward or stop
      let stillPaging = false;

      switch (type) {
        case RSIMPANAN:
          page += state.simpanan.current_page;
          break;
        case RDEPOSITO:
          page += state.deposito.current_page;
          break;
        case RPEMBIAYAAN:
          page += state.pembiayaan.current_page;
          break;
      }

      //get
      ApiService.get(`${type}${page}`)
        .then(({ status, data }) => {
          //success
          if (status == 200 || status == 201) {
            if (data.current_page >= data.last_page) {
              resolve(false);
              stillPaging = false;
            } else {
              resolve(true);
              stillPaging = true;
            }
            data.data.map(item => {
              commit(MUTATION_ADD_DATA_REKENING, {
                type: type,
                item: item,
                page: stillPaging
              });
            });
          } else {
            //failed
            resolve(false);
          }
        })
        .catch(e => {
          //failes
          resolve(false);
        });
    });
  },

  /***
   * save data
   *  @param {type,body}
   *
   */
  [ACTION_POST_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.post(`${type}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(MUTATION_ADD_DATA_REKENING, {
              type: type,
              item: data.data[0],
              page: false
            });
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(e => {
          resolve(false);
        });
    });
  },
  /***
   * update/edit data
   * @param {type,body}
   */
  [ACTION_PUT_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.put(`${type}/${body.id}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(MUTATION_UPDATE_DATA_REKENING, {
              type: type,
              data: data.data[0],
              olddata: body
            });
          } else {
            resolve(false);
          }
        })
        .catch(e => {
          resolve(false);
        });
    });
  },
  /***
   * delete pembiayaan
   * @param {type,body}
   */
  [ACTION_DELETE_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.delete(`${type}/${body.id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(MUTATION_DELETE_DATA_REKENING, {
              type: type,
              data: body
            });
          } else {
            resolve(false);
          }
        })
        .catch(e => {
          resolve(false);
        });
    });
  }
  /***
   * delete pembiayaan
   *
   */
};
const mutations = {
  /***
   * Rekening add data dynamicly
   * {@param type
   * @param item}
   * @returns each data array will increment smoothly
   */
  [MUTATION_ADD_DATA_REKENING](state, { type, item, page }) {
    //push data with type rekening assosiated
    switch (type) {
      case RPEMBIAYAAN:
        var exist = state.datapembiayaan.some(pembiayaan => {
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
        var exist = state.datasimpanan.some(simpanan => {
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
        var exist = state.datadeposito.some(deposito => {
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
   * {@param type,
   * @param data
   * @param olddata}
   * @returns update data
   */
  [MUTATION_UPDATE_DATA_REKENING](state, { type, data, olddata }) {
    //get type rekening
    switch (type) {
      case RSIMPANAN:
        //update to data
        var index = state.datasimpanan
          .map(simpanan => simpanan.id)
          .indexOf(olddata.id);
        Object.assign(state.datasimpanan[index], data);
        break;
      case RDEPOSITO:
        var index = state.datadeposito
          .map(deposito => deposito.id)
          .indexOf(olddata.id);
        Object.assign(state.datadeposito[index], data);
        break;
      case RPEMBIAYAAN:
        var index = state.datapembiayaan
          .map(pembiayaan => pembiayaan.id)
          .indexOf(olddata.id);
        Object.assign(state.datapembiayaan[index], data);

        break;
    }
  },
  /***
   * delete data
   * @param {rekenigntype,data}
   */
  [MUTATION_DELETE_DATA_REKENING](state, { type, data }) {
    switch (type) {
      case RDEPOSITO:
        var index = state.datadeposito
          .map(deposito => deposito.id)
          .indexOf(data.id);
        state.datadeposito.splice(index);
        break;
      case RPEMBIAYAAN:
        var index = state.datapembiayaan
          .map(deposito => deposito.id)
          .indexOf(data.id);
        state.datapembiayaan.splice(index);
        break;
      case RSIMPANAN:
        var index = state.datasimpanan
          .map(deposito => deposito.id)
          .indexOf(data.id);
        state.datasimpanan.splice(index);
        break;
    }
  }
};
export default { namespaced: true, state, getters, actions, mutations };
