/* eslint-disable */

import ApiService from "../../core/services/api.service";
// action types

export const ACTION_TAMBAH_NASABAH = "updateUser";
export const ACTION_UPDATE_NASABAH = "createNasabah";
export const ACTION_GET_NASABAH = "getNasabah";

// mutation types
export const MUTATION_SET_ERROR = "setError";
export const MUTATION_TAMBAH_DATA_NASABAH = "tambahnasabah";
export const MUTATION_UBAH_DATA_NASABAH = "tambah nasabah";

const state = {
  errors: null,
  currentpage: 0,
  lastpage: "",
  datanasabah: [],
};

const getters = {};

const actions = {
  [ACTION_GET_NASABAH]({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      let page = state.currentpage >= 1 ? "" : `?page=${state.currentpage}`;
      ApiService.get(`nasabah${page}`)
        .then((res) => {
          //    console.log(res.data.data);
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              //jangan ambil data lagi
              resolve(false);
            } else {
              resolve(true);
            }
            res.data.data.map((item) => {
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
                status: item.active,
              };

              commit(MUTATION_TAMBAH_DATA_NASABAH, data);
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
  [ACTION_TAMBAH_NASABAH](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: data })
        .then(({ data }) => {
          context.commit(MUTATION_TAMBAH_DATA_NASABAH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [ACTION_UPDATE_NASABAH](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post("", { payload })
        .then(({ data }) => {
          context.commit(MUTATION_UBAH_DATA_NASABAH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
};

const mutations = {
  [MUTATION_SET_ERROR](state, data) {
    state.errors = data;
  },
  [MUTATION_TAMBAH_DATA_NASABAH](state, data) {
    var exsts = state.datanasabah.some((nasabah) => {
      return nasabah.id == data.id;
    });
    if (!exsts) {
      state.datanasabah.push(data);
    }
  },
  [MUTATION_UBAH_DATA_NASABAH](state, error) {},
};

export default {
  state,
  actions,
  mutations,
  getters,
};
