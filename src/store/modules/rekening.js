/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";

/***
 * dspatch type
 */
const GET_DATA_REKENING = "GETDATAREKENING";
const POST_DATA_REKENING = "POSTREKENINGDATA";
const PUT_DATA_REKENING = "PUTDATAREKENING";
const DELETE_DATA_REKENING = "DELETEDATAREKENING";
export const ACTION_GET_DATA_REKENING = `rekening/${GET_DATA_REKENING}`;
export const ACTION_POST_DATA_REKENING = `rekening/${POST_DATA_REKENING}`;
export const ACTION_PUT_DATA_REKENING = `rekening/${PUT_DATA_REKENING}`;
export const ACTION_DELETE_DATA_REKENING = `rekening/${DELETE_DATA_REKENING}`;

const ADD_DATA_REKENING = "MADDDATAREKENING";
const EDIT_DATA_REKENING = "MUPDATEREKENING";
const REMOVE_DATA_REKENING = "MDELETEDATAREKENING";
const INCREMENt_PAGE = `INCREMENT`;
export const MUTATION_ADD_DATA_REKENING = `rekening/${ADD_DATA_REKENING}`;
export const MUTATION_UPDATE_DATA_REKENING = `rekening/${EDIT_DATA_REKENING}`;
export const MUTATION_DELETE_DATA_REKENING = `rekekning/${REMOVE_DATA_REKENING}`;
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
  [GET_DATA_REKENING]({ commit, state }, { type }) {
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
              commit(INCREMENt_PAGE);
              resolve(true);
              stillPaging = true;
            }
            data.data.map(item => {
              commit(ADD_DATA_REKENING, {
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
  [POST_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.post(`${type}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(ADD_DATA_REKENING, {
              type: type,
              item: data.data[0],
              page: false
            });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Gagal" });
          }
        })
        .catch(e => {
          resolve({ success: true, message: e });
        });
    });
  },
  /***
   * update/edit data
   * @param {type,body}
   */
  [PUT_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.put(`${type}/${body.id}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(EDIT_DATA_REKENING, {
              type: type,
              data: data.data[0],
              olddata: body
            });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Berhasil" });
          }
        })
        .catch(e => {
          resolve({ success: true, message: "Berhasil" });
        });
    });
  },
  /***
   * delete pembiayaan
   * @param {type,body}
   */
  [DELETE_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.delete(`${type}/${body.id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(REMOVE_DATA_REKENING, {
              type: type,
              data: body
            });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Berhasil" });
          }
        })
        .catch(e => {
          resolve({ success: true, message: "Berhasil" });
        });
    });
  }
  /***
   * delete pembiayaan
   *
   */
};
const mutations = {
  [INCREMENt_PAGE](state, { type }) {
    switch (type) {
      case RPEMBIAYAAN:
        state.pembiayaan.current_page++;
        break;
      case RSIMPANAN:
        state.simpanan.current_page++;
        break;
      case RDEPOSITO:
        state.deposito.current_page++;
        break;
    }
  },
  /***
   * Rekening add data dynamicly
   * {@param type
   * @param item}
   * @returns each data array will increment smoothly
   */
  [ADD_DATA_REKENING](state, { type, item, page }) {
    //push data with type rekening assosiated
    switch (type) {
      case RPEMBIAYAAN:
        var exist = state.datapembiayaan.some(pembiayaan => {
          return pembiayaan.id == item.id;
        });
        if (!exist) {
          state.datapembiayaan.push(item);
        }
        break;
      case RSIMPANAN:
        var exist = state.datasimpanan.some(simpanan => {
          return simpanan.id == item.id;
        });
        if (!exist) {
          state.datasimpanan.push(item);
        }
        break;
      case RDEPOSITO:
        var exist = state.datadeposito.some(deposito => {
          return deposito.id == item.id;
        });
        if (!exist) {
          state.datadeposito.push(item);
        }
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
  [EDIT_DATA_REKENING](state, { type, data, olddata }) {
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
  [REMOVE_DATA_REKENING](state, { type, data }) {
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
