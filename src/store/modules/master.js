/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "../../services/api.service";

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
    dialog: false,
    current_page: 0,
    last_page: 0
  },
  formakad: {
    tipe_akad: "",
    nama_akad: "",
    kode_akad: "",
    active: ""
  },
  datajenistransaksi: [],
  jenistransaksi: {
    current_page: 0,
    last_page: 0
  },
  formjenistransaksi: {},
  dataproduk: [],
  produk: {
    current_page: 0,
    last_page: 0
  },
  formproduk: {},
  datajabatan: [],
  jabatan: {
    dialog: false,
    current_page: 0,
    last_page: 0
  },
  formjabatan: {},
  datapegawai: [],
  pegawai: {
    dialog: false,
    current_page: 0,
    last_page: 0
  },
  formpegawai: {}
};
const getters = {};
const actions = {
  /***
   * get data
   * @param {mastertype,path,id}
   * @returns prmise true/false
   * and add data to array smoothly
   */
  [ACTION_GET_DATA_MASTER]({ commit, state }, { mastertype, path, id }) {
    return new Promise(resolve => {
      //get current page
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
          page += state.jenistransaksi.current_page;
          break;
      }
      ApiService.get(`${path}${page}`)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              resolve(false);
              stillPaging = false;
            } else {
              resolve(true);
              stillPaging = true;
            }
            console.log("ex");
            res.data.data.map(item => {
              commit(MUTATION_ADD_DATA_MASTER, {
                mastertype: mastertype,
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
   * @param {mastertype,path,body}
   * @returns save data to server the add to array store
   * @returns {success,message}
   *
   */
  [ACTION_POST_DATA_MASTER]({ commit }, { mastertype, path, body }) {
    return new Promise(resolve => {
      ApiService.post(`${path}`, body)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_ADD_DATA_MASTER, {
              mastertype: mastertype,
              data: res.data.data[0]
            });
            resolve({ success: true, message: "Berhasil menambah data" });
          } else {
            resolve({
              success: false,
              message: res.data.message || "Gagal coba lagi nanti"
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
   * @param {mastertype,path,body}
   * update data to server the notify the data was changed
   * @returns
   *
   */
  [ACTION_PUT_DATA_MASTER]({ commit }, { mastertype, path, body }) {
    return new Promise(resolve => {
      ApiService.put(`${path}/${body.id}`, body)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_PUT_DATA_MASTER, {
              mastertype: mastertype,
              data: res.data.data[0],
              olddata: body
            });
            resolve({ success: true, message: "Berhasil mengubah!" });
          } else {
            resolve({
              success: false,
              message: res.data.message || "Gagal coba lagi nanti"
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
   * @param {mastertype,path,body}
   * @returns delete data by id
   * @returns if success it will update data no need reload data from service
   */
  [ACTION_DELETE_DATA_MASTER]({ commit }, { mastertype, path, body }) {
    return new Promise(resolve => {
      ApiService.delete(`${path}/${body.id}`)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_DELETE_DATA_MASTER, {
              mastertype: mastertype,
              data: body
            });
            resolve({ success: true, message: "Berhasil menghapus!" });
          } else {
            resolve({
              success: false,
              message: res.data.message || "Gagal coba lagi nanti"
            });
          }
        })
        .catch(e => {
          resolve({
            success: true,
            message: e.response.data.message || "Berhasil mengubah!"
          });
        });
    });
  }
};
const mutations = {
  /***
   * adding data to each state
   * @param {mastertype,data,page}
   * @returns data will be add one -by one
   */
  [MUTATION_ADD_DATA_MASTER](state, { mastertype, data, page }) {
    switch (mastertype) {
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
   * @param {mastertype,data,olddata}
   * update item inside array state data
   * @returns change reactivly
   *
   */
  [MUTATION_PUT_DATA_MASTER](state, { mastertype, data, olddata }) {
    switch (mastertype) {
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
        console.log(mastertype);
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
  [MUTATION_DELETE_DATA_MASTER](state, { mastertype, data }) {
    switch (mastertype) {
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
        state.dataproduk.splice(index);
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
