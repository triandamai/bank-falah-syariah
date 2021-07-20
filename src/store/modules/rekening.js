/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";
import {formatCurrency} from "@/services/jwt.service";

/***
 * dspatch type
 */
const GET_DATA_REKENING = "GETDATAREKENING";
const POST_DATA_REKENING = "POSTREKENINGDATA";
const PUT_DATA_REKENING = "PUTDATAREKENING";
const DELETE_DATA_REKENING = "DELETEDATAREKENING";
const MUTASI = "MUTASI"
export const MUTASI_PEMBIAYAAN = 'rekening_pembiayaan/'
export const MUTASI_SIMPANAN = 'rekening_simpanan/'

export const ACTION_GET_DATA_REKENING = `rekening/${GET_DATA_REKENING}`;
export const ACTION_POST_DATA_REKENING = `rekening/${POST_DATA_REKENING}`;
export const ACTION_PUT_DATA_REKENING = `rekening/${PUT_DATA_REKENING}`;
export const ACTION_DELETE_DATA_REKENING = `rekening/${DELETE_DATA_REKENING}`;
export const ACTION_MUTASI = `rekening/${MUTASI}`;

const ADD_DATA_REKENING = "MADDDATAREKENING";
const EDIT_DATA_REKENING = "MUPDATEREKENING";
const REMOVE_DATA_REKENING = "MDELETEDATAREKENING";
const INCREMENT_PAGE = `INCREMENT`;
const MUTASI_REKENING = "MUTASI_REKENING"
const DESTROY_MUTASI ="DESTROY MUTASI"

export const MUTATION_ADD_DATA_REKENING = `rekening/${ADD_DATA_REKENING}`;
export const MUTATION_UPDATE_DATA_REKENING = `rekening/${EDIT_DATA_REKENING}`;
export const MUTATION_DELETE_DATA_REKENING = `rekekning/${REMOVE_DATA_REKENING}`;
export const MUTATION_DESTROY_MUTASI = `rekekning/${DESTROY_MUTASI}`;
/***
 *
 * type Action
 *
 */
export const RTABUNGAN = "rekening_simpanan";
export const RDEPOSITO = "rekening_deposito";
export const RPEMBIAYAAN = "rekening_pembiayaan";

const state = {
  datadeposito: [],
  deposito: {
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  datapembiayaan: [],
  pembiayaan: {
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  datasimpanan: [],
  tabungan: {
    dialog: false,
    current_page: 0,
    last_page: 0,
  },
  mutasi:{
    pembiayaan:[],
    simpanan:[]
  }
};
const getters = {
  saldoPembiayaan:state=>{
    const total = state.mutasi.pembiayaan.map(mutasi=>mutasi.value).reduce((prev,next)=>prev+next,0)
    return formatCurrency(total)
  },
  saldoSimpanan:state=>{
    const total = state.mutasi.simpanan.map(mutasi=>mutasi.value).reduce((prev,next)=>prev+next,0)
    return formatCurrency(total)
  }
};
const actions = {
  /***
   * get all data rekekning deposito/pembiayaansimpanan
   * @param {type,path}
   *  @returns data array and after success adding to @global data array
   *
   */
  [GET_DATA_REKENING]({ commit, state }, { type }) {
    return new Promise((resolve) => {
      //cek pagination (get current page)
      let page = `?page=`;
      //for mutation the pagination going forward or stop
      let stillPaging = false;

      switch (type) {
        case RTABUNGAN:
          page += state.tabungan.current_page;
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
          if (status === 200 || status === 201) {
            if (data.current_page >= data.last_page) {
              resolve(false);
              stillPaging = false;
            } else {
              commit(INCREMENT_PAGE);
              resolve(true);
              stillPaging = true;
            }
            data.data.map((item) => {
              commit(ADD_DATA_REKENING, {
                type: type,
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

  [MUTASI]({commit},{type,no_rekening}){
    return new Promise((resolve)=>{
      ApiService.get(`${type}${no_rekening}/mutasi?t=${new Date().getMilliseconds()}`)
          .then(({status,data})=>{
            if(status === 200 || status === 201){
              resolve(true)

              data.data.map(mutasi=>{

                commit(MUTASI_REKENING,{type:type,mutasi:mutasi})
              })
            }else {
              resolve(false)
            }
          })
          .catch(()=>{
            resolve(false)
          })
    })
  },
  /***
   * save data
   * @param commit
   * @param type
   * @param body
   */
  [POST_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise((resolve) => {
      ApiService.post(`${type}`, body)
        .then(({ status, data }) => {
          if (status === 200 || status === 201) {
            commit(ADD_DATA_REKENING, {
              type: type,
              item: data.data[0],
              page: false,
            });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Gagal" });
          }
        })
        .catch((e) => {
          resolve({ success: true, message: e });
        });
    });
  },
  /***
   * update/edit data
   */
  [PUT_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise((resolve) => {
      ApiService.put(`${type}/${body.id}`, body)
        .then(({ status, data }) => {
          if (status === 200 || status === 201) {
            commit(EDIT_DATA_REKENING, {
              type: type,
              data: data.data[0],
              olddata: body,
            });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Berhasil" });
          }
        })
        .catch((e) => {
          resolve({ success: true, message: "Berhasil" });
        });
    });
  },
  /***
   * delete pembiayaan
   * @param commit
   * @param type
   * @param body
   */
  [DELETE_DATA_REKENING]({ commit }, { type, body }) {
    return new Promise((resolve) => {
      ApiService.delete(`${type}/${body.id}`)
        .then(({ status, data }) => {
          if (status === 200 || status === 201) {
            commit(REMOVE_DATA_REKENING, {
              type: type,
              data: body,
            });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Berhasil" });
          }
        })
        .catch((e) => {
          resolve({ success: true, message: "Berhasil" });
        });
    });
  },
  /***
   * delete pembiayaan
   *
   */
};
const mutations = {
  [MUTASI_REKENING](state,{type,mutasi}){

      if(type === MUTASI_PEMBIAYAAN){
        var exist = state.mutasi.pembiayaan.some((pembiayaan) => {
          return pembiayaan.id === mutasi.id;
        });
        if(exist){
          var index = state.mutasi.pembiayaan
              .map((pembiayaan) => pembiayaan.id)
              .indexOf(mutasi.id);
          Object.assign(state.mutasi.pembiayaan[index], mutasi);
        }else {
          state.mutasi.pembiayaan.push(mutasi)
        }
      }else{
        var exist = state.mutasi.simpanan.some((simpanan) => {
          return simpanan.id === mutasi.id;
        });
        if(exist){
          var index = state.mutasi.simpanan
              .map((simpanan) => simpanan.id)
              .indexOf(mutasi.id);
          Object.assign(state.mutasi.simpanan[index], mutasi);
        }else {
          state.mutasi.simpanan.push(mutasi)
        }

      }
  },
  [DESTROY_MUTASI](state,{type}){
    if(type === MUTASI_PEMBIAYAAN){
      state.mutasi.pembiayaan = []
    }else {
      state.mutasi.simpanan = []
    }
  },
  [INCREMENT_PAGE](state, { type }) {
    switch (type) {
      case RPEMBIAYAAN:
        state.pembiayaan.current_page++;
        break;
      case RTABUNGAN:
        state.tabungan.current_page++;
        break;
      case RDEPOSITO:
        state.deposito.current_page++;
        break;
    }
  },
  /***
   * Rekening add data dynamicly
   * {@param state
   * @param type
   * @param item}
   * @param page
   * @returns each data array will increment smoothly
   */
  [ADD_DATA_REKENING](state, { type, item, page }) {
    //push data with type rekening assosiated
    switch (type) {
      case RPEMBIAYAAN:
        var exist = state.datapembiayaan.some((pembiayaan) => {
          return pembiayaan.id === item.id;
        });
        if (!exist) {
          state.datapembiayaan.push(item);
        }
        break;
      case RTABUNGAN:
        var exist = state.datasimpanan.some((tabungan) => {
          return tabungan.id == item.id;
        });
        if (!exist) {
          state.datasimpanan.push(item);
        }
        break;
      case RDEPOSITO:
        var exist = state.datadeposito.some((deposito) => {
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
      case RTABUNGAN:
        //update to data
        var index = state.datasimpanan
          .map((tabungan) => tabungan.id)
          .indexOf(olddata.id);
        Object.assign(state.datasimpanan[index], data);
        break;
      case RDEPOSITO:
        var index = state.datadeposito
          .map((deposito) => deposito.id)
          .indexOf(olddata.id);
        Object.assign(state.datadeposito[index], data);
        break;
      case RPEMBIAYAAN:
        var index = state.datapembiayaan
          .map((pembiayaan) => pembiayaan.id)
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
      case RTABUNGAN:
        var index = state.datasimpanan
          .map((deposito) => deposito.id)
          .indexOf(data.id);
        state.datasimpanan.splice(index);
        break;
    }
  },
};
export default { namespaced: true, state, getters, actions, mutations };
