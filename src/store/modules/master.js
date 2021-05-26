/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";

const GETDATAMASTER = `GETDATAMASTER`;
const POSTDATAMASTER = `POSTMASTERDATA`;
const PUTDATAMASTER = `PUTMASTERDATA`;
const DELETEDATAMASTER = `DELETEMASTERDATA`;

export const ACTION_GET_DATA_MASTER = `master/${GETDATAMASTER}`;
export const ACTION_POST_DATA_MASTER = `master/${POSTDATAMASTER}`;
export const ACTION_PUT_DATA_MASTER = `master/${PUTDATAMASTER}`;
export const ACTION_DELETE_DATA_MASTER = `master/${DELETEDATAMASTER}`;

const ADDDATAMASTER = `ADDDATAMASTER`;
const EDITDATAMASTER = `EDITDATAMASTER`;
const REMOVEDATAMASTER = `REMOVEDATAMASTER`;

export const MUTATION_ADD_DATA_MASTER = `master/${ADDDATAMASTER}`;
export const MUTATION_PUT_DATA_MASTER = `master/${EDITDATAMASTER}`;
export const MUTATION_DELETE_DATA_MASTER = `master/${REMOVEDATAMASTER}`;

export const MAKAD = "akad";
export const MPRODUK = "produk";
export const MJABATAN = "jabatan";
export const MPEGAWAI = "pegawai";
export const MJENISTRANSAKSI = "jenis-transaksi";

const state = {
  dataakad: [],
  akad: {
    current_page: 0,
    last_page: 0
  },
  datajenistransaksi: [],
  jenistransaksi: {
    current_page: 0,
    last_page: 0
  },
  dataproduk: [],
  produk: {
    current_page: 0,
    last_page: 0
  },
  datajabatan: [],
  jabatan: {
    current_page: 0,
    last_page: 0
  },
  datapegawai: [],
  pegawai: {
    current_page: 0,
    last_page: 0
  },
  formpegawai: {}
};
const getters = {};
const actions = {
  /***
   * get data
   * @param {type,path,id}
   * @returns prmise true/false
   * and add data to array smoothly
   */
  [GETDATAMASTER]({ commit, state }, { type }) {
    return new Promise(resolve => {
      //get current page
      let page = `?page=`;

      let stillPaging = false;
      switch (type) {
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
          page += state.jenistransaksi.current_page;
          break;
      }
      ApiService.get(`${type}${page}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.current_page >= data.last_page) {
              resolve(false);
              stillPaging = false;
            } else {
              resolve(true);
              stillPaging = true;
            }

            console.log(data);
            data.data.map(item => {
              commit(ADDDATAMASTER, {
                type: type,
                data: item,
                page: stillPaging
              });
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
   * send data to server
   * @param {type,path,body}
   * @returns save data to server the add to array store
   * @returns {success,message}
   *
   */
  [POSTDATAMASTER]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.post(`${type}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(ADDDATAMASTER, {
              type: type,
              data: data.data[0]
            });
            resolve({ success: true, message: "Berhasil menambah data" });
          } else {
            resolve({
              success: false,
              message: data.message || "Gagal coba lagi nanti"
            });
          }
        })
        .catch(e => {
          resolve({
            success: false,
            message: e.response.data.message || "Gagal coba lagi nanti"
          });
        });
    });
  },
  /****
   * Put data master
   * @param {type,path,body}
   * update data to server the notify the data was changed
   * @returns
   *
   */
  [PUTDATAMASTER]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.put(`${type}/${body.id}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(EDITDATAMASTER, {
              type: type,
              data: data.data[0],
              olddata: body
            });
            resolve({ success: true, message: "Berhasil mengubah!" });
          } else {
            resolve({
              success: false,
              message: data.message || "Gagal coba lagi nanti"
            });
          }
        })
        .catch(e => {
          resolve({
            success: false,
            message: e.response.data.message || "Gaga coba lagi nanti"
          });
        });
    });
  },
  /***
   * delete data
   * @param {type,path,body}
   * @returns delete data by id
   * @returns if success it will update data no need reload data from service
   */
  [DELETEDATAMASTER]({ commit }, { type, body }) {
    return new Promise(resolve => {
      ApiService.delete(`${type}/${body.id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(REMOVEDATAMASTER, {
              type: type,
              data: body
            });
            resolve({ success: true, message: "Berhasil menghapus!" });
          } else {
            resolve({
              success: false,
              message: data.message || "Gagal coba lagi nanti"
            });
          }
        })
        .catch(e => {
          resolve({
            success: false,
            message: e.response.data.message || "Berhasil mengubah!"
          });
        });
    });
  }
};
const mutations = {
  /***
   * adding data to each state
   * @param {type,data,page}
   * @returns data will be add one -by one
   */
  [ADDDATAMASTER](state, { type, data, page }) {
    switch (type) {
      case MAKAD:
        var exist = state.dataakad.some(akad => {
          return akad.id == data.id;
        });
        if (!exist) {
          state.dataakad.push(data);
        }
        page ? state.akad.current_page++ : null;
        break;
      case MJABATAN:
        var exist = state.datajabatan.some(jabatan => {
          return jabatan.id == data.id;
        });
        if (!exist) {
          state.datajabatan.push(data);
        }
        page ? state.jabatan.current_page++ : null;
        break;
      case MJENISTRANSAKSI:
        // console.log(data);
        var exist = state.datajenistransaksi.some(jenis => {
          return jenis.id == data.id;
        });
        if (!exist) {
          state.datajenistransaksi.push(data);
        }
        page ? state.jenistransaksi.current_page++ : null;
        break;
      case MPEGAWAI:
        var exist = state.datapegawai.some(pegawai => {
          return pegawai.id == data.id;
        });
        if (!exist) {
          state.datapegawai.push(data);
        }
        page ? state.pegawai.current_page++ : null;
        break;
      case MPRODUK:
        var exist = state.dataproduk.some(produk => {
          return produk.id == data.id;
        });
        if (!exist) {
          state.dataproduk.push(data);
        }
        page ? state.produk.current_page++ : null;
        break;
    }
  },
  /***
   * Update data
   * @param {type,data,olddata}
   * update item inside array state data
   * @returns change reactivly
   *
   */
  [EDITDATAMASTER](state, { type, data, olddata }) {
    switch (type) {
      case MAKAD:
        var index = state.dataakad.map(akad => akad.id).indexOf(olddata.id);
        Object.assign(state.dataakad[index], data);
        break;
      case MJABATAN:
        var index = state.datajabatan
          .map(jabatan => jabatan.id)
          .indexOf(olddata.id);
        Object.assign(state.datajabatan[index], data);
        break;
      case MJENISTRANSAKSI:
        console.log(type);
        var index = state.datajenistransaksi
          .map(jenis => jenis.id)
          .indexOf(olddata.id);
        Object.assign(state.datajenistransaksi[index], data);
        break;
      case MPEGAWAI:
        var index = state.datapegawai
          .map(pegawai => pegawai.id)
          .indexOf(olddata.id);
        Object.assign(state.datapegawai[index], data);
        break;
      case MPRODUK:
        var index = state.dataproduk
          .map(produk => produk.id)
          .indexOf(olddata.id);
        Object.assign(state.dataproduk[index], data);
        break;
    }
  },
  /***
   * delete data y index
   * @param {systemtype,data}
   * @return remove data by index
   */
  [REMOVEDATAMASTER](state, { type, data }) {
    switch (type) {
      case MAKAD:
        var index = state.dataakad.map(akad => akad.id).indexOf(data.id);
        state.dataakad.splice(index);
        break;
      case MJABATAN:
        var index = state.datajabatan
          .map(jabatan => jabatan.id)
          .indexOf(data.id);
        state.datajabatan.splice(index);
        break;
      case MJENISTRANSAKSI:
        var index = state.datajenistransaksi
          .map(jenis => jenis.id)
          .indexOf(data.id);
        state.datajenistransaksi.splice(index);
        break;
      case MPEGAWAI:
        var index = state.datapegawai
          .map(pegawai => pegawai.id)
          .indexOf(data.id);
        state.datapegawai.splice(index);
        break;
      case MPRODUK:
        var index = state.dataproduk.map(produk => produk.id).indexOf(data.id);
        state.dataproduk.splice(index);
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
