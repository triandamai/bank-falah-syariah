/* eslint-disable */
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "../../services/api.service";
// action types

export const ACTION_POST_NASABAH = "createUser";
export const ACTION_PUT_NASABAH = "updateNasabah";
export const ACTION_GET_NASABAH = "getNasabah";

export const ACTION_DLEETE_NASABAH = "deleteNasabah";

// mutation types
export const MUTATION_SET_ERROR = "setError";
export const MUTATION_ADD_NASABAH = "tambahnasabah";
export const MUTATION_PUT_NASABAH = "editnasabah";
export const MUTATION_DELETE_NASABAH = "deletenasabah";
//
const state = {
  errors: null,
  currentpage: 0,
  lastpage: "",
  datanasabah: []
};

const getters = {};

const actions = {
  [ACTION_GET_NASABAH]({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      let page = state.currentpage >= 1 ? "" : `?page=${state.currentpage}`;
      ApiService.get(`nasabah${page}`)
        .then(res => {
          //    console.log(res.data.data);
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              //jangan ambil data lagi
              resolve(false);
            } else {
              resolve(true);
            }
            res.data.data.map(item => {
              let data = {
                id: item.id,
                kode_nasabah: item.kode_nasabah,
                nama_lengkap: item.nama_lengkap,
                jenis_kelamin: item.jenis_kelamin,
                ttl: item.tempat_lahir + item.tanggal_lahir,
                tempat_lahir: item.tempat_lahir,
                tanggal_lahir: item.tanggal_lahir,
                alamat: item.alamat,
                no_hp: item.no_hp,
                status: item.active
              };

              commit(MUTATION_ADD_NASABAH, data);
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
  [ACTION_POST_NASABAH]({ commit }, body) {
    return new Promise((resolve, reject) => {
      ApiService.post("nasabah", body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            let result = {
              id: data.data[0].id,
              kode_nasabah: data.data[0].kode_nasabah,
              nama_lengkap: data.data[0].nama_lengkap,
              jenis_kelamin: data.data[0].jenis_kelamin,
              ttl: data.data[0].tempat_lahir + data.data[0].tanggal_lahir,
              tempat_lahir: item.tempat_lahir,
              tanggal_lahir: item.tanggal_lahir,
              alamat: data.data[0].alamat,
              no_hp: data.data[0].no_hp,
              status: data.data[0].active
            };

            commit(MUTATION_ADD_NASABAH, result);
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Gagal coba lgi nanti" });
          }
        })
        .catch(({ response }) => {
          resolve({ success: false, message: response.data.message });
        });
    });
  },
  [ACTION_PUT_NASABAH]({ commit }, body) {
    return new Promise((resolve, reject) => {
      ApiService.put(`nasabah/${body.id}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(MUTATION_PUT_NASABAH, { data: data.data[0], olddata: body });
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Gagal Coba lagi nanti" });
          }
        })
        .catch(({ response }) => {
          resolve({ success: false, message: `${response.data.message}` });
        });
    });
  },
  [ACTION_DLEETE_NASABAH]({ commit }, body) {
    return new Promise((resolve, reject) => {
      ApiService.post(`nasbaah/${body.id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(MUTATION_DELETE_NASABAH, body);
            resolve({ success: true, message: "Berhasil" });
          } else {
            resolve({ success: false, message: "Gagal Coba lagi nanti" });
          }
        })
        .catch(e => {
          resolve({ success: false, message: e.response.data.message });
        });
    });
  }
};

const mutations = {
  [MUTATION_SET_ERROR](state, data) {
    state.errors = data;
  },
  [MUTATION_ADD_NASABAH](state, data) {
    var exsts = state.datanasabah.some(nasabah => {
      return nasabah.id == data.id;
    });
    if (!exsts) {
      state.datanasabah.push(data);
    }
  },
  [MUTATION_PUT_NASABAH](state, { data, olddata }) {
    var index = state.datanasabah
      .map(nasabah => nasabah.id)
      .indexOf(olddata.id);
    Object.assign(state.datanasabah[index], data);
  },
  [MUTATION_DELETE_NASABAH](state, data) {
    var index = state.datanasabah.map(nasabah => nasabah.id).indexOf(data.id);
    state.datanasabah.splice(index);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
