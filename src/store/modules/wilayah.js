import ApiService from "@/services/api.service";
const GET_WILAYAH = `WILAYAH`;
const ADD_DATA_WILAYAH = `ADDWILAYAH`;
export const ACTION_GET_WILAYAH = `wilayah/${GET_WILAYAH}`;

export const MUTATION_ADD_DATA_WILAYAH = `wilayah/${ADD_DATA_WILAYAH}`;

export const WPROVINSI = ``;
export const WKABUPATEN = ``;
export const WKECAMATAN = ``;
export const WDESA = ``;
export const WDUSUN = ``;
const state = {
  kecamatan: { current_page: 0, data: [] },
  provinsi: { current_page: 0, data: [] },
  kabupaten: { current_page: 0, data: [] },
  desa: { current_page: 0, data: [] },
  dusun: { current_page: 0, data: [] }
};
const actions = {
  /**
   * GET Data
   * @param {*} param0
   * @param {*} param1
   * @returns
   */
  [GET_WILAYAH]({ commit, state }, { type, query }) {
    return new Promise(resolve => {
      let stillPaging = false;
      let resource = ``;
      switch (type) {
        case WPROVINSI:
          resource = `/provinsi?page=${state.provinsi.current_page}&mode=kabupaten`;
          break;
        case WKABUPATEN:
          resource = `/kabupaten?page=${state.kabupaten.current_page}&provinsi_id=${query}`;
          break;
        case WKECAMATAN:
          resource = `/kecamatan?page${state.kecamatan.current_page}&kecamatan?kabupaten_id=${query}`;
          break;
        case WDESA:
          resource = `/desa?page${state.desa.current_page}&kecamatan_id=${query}`;
          break;
        case WDUSUN:
          break;
      }
      ApiService.getWilayah(resource)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.current_page >= data.last_page) {
              stillPaging = false;
              resolve(false);
            } else {
              resolve(true);
              stillPaging = true;
            }
            data.data.data.map(wilayah => {
              commit("", {
                type: type,
                page: stillPaging,
                data: wilayah
              });
            });
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
};
const mutations = {
  /**
   * After fetch add data to state
   * @param {*} state
   * @param {*} param1
   */
  [ADD_DATA_WILAYAH](state, { type, page, data }) {
    switch (type) {
      case WPROVINSI:
        var exist = state.provinsi.data.some(provinsi => {
          return provinsi.provIdProvinsi == data.provIdProvinsi;
        });
        if (!exist) {
          state.provinsi.data.push(data);
        }
        page ? state.provinsi.current_page++ : null;
        break;
      case WKABUPATEN:
        var exist = state.kabupaten.data.some(kabupaten => {
          return kabupaten.kabIdKabupaten == data.kabIdKabupaten;
        });
        if (!exist) {
          state.kabupaten.data.push(data);
        }
        page ? state.kabupaten.current_page++ : null;
        break;
      case WKECAMATAN:
        var exist = state.kecamatan.data.some(kecamatan => {
          return kecamatan.kecIdKecamatan == data.kecIdKecamatan;
        });
        if (!exist) {
          state.kecamatan.data.push(data);
        }
        page ? state.kecamatan.current_page++ : null;
        break;
      case WDESA:
        var exist = state.desa.data.some(desa => {
          return desa.desIdDesa == data.desIdDesa;
        });
        if (!exist) {
          state.desa.data.push(data);
        }
        page ? state.desa.current_page++ : null;
        break;
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
