import ApiService from "@/services/api.service";
const GET_WILAYAH = `WILAYAH`;
const ADD_DATA_WILAYAH = `ADDWILAYAH`;
const INCREMENT_PAGE = `INCREMENT`;
export const ACTION_GET_WILAYAH = `wilayah/${GET_WILAYAH}`;

export const MUTATION_ADD_DATA_WILAYAH = `wilayah/${ADD_DATA_WILAYAH}`;

export const WPROVINSI = `PROVINSI`;
export const WKABUPATEN = `KABUPATEN`;
export const WKECAMATAN = `KECAMATAN`;
export const WDESA = `DESA`;
export const WDUSUN = `DUSUN`;
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
          resource = `/kecamatan?page${state.kecamatan.current_page}&kabupaten_id=${query}`;
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
            console.log(type);
            if (data.data.current_page >= data.data.last_page) {
              stillPaging = false;
              resolve(false);
            } else {
              commit(INCREMENT_PAGE, { type: type });
              resolve(true);
              stillPaging = true;
            }
            data.data.data.map(wilayah => {
              commit(ADD_DATA_WILAYAH, {
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
  [INCREMENT_PAGE](state, { type }) {
    switch (type) {
      case WPROVINSI:
        state.provinsi.current_page++;
        break;
      case WKABUPATEN:
        state.kabupaten.current_page++;
        break;
      case WKECAMATAN:
        state.kecamatan.current_page++;
        break;
      case WDESA:
        state.desa.current_page++;
        break;
    }
  },
  [ADD_DATA_WILAYAH](state, { type, page, data }) {
    switch (type) {
      case WPROVINSI:
        var exist = state.provinsi.data.some(provinsi => {
          return provinsi.provIdProvinsi == data.provIdProvinsi;
        });
        if (!exist) {
          state.provinsi.data.push(data);
        }
        break;
      case WKABUPATEN:
        var exist = state.kabupaten.data.some(kabupaten => {
          return kabupaten.kabIdKabupaten == data.kabIdKabupaten;
        });
        if (!exist) {
          state.kabupaten.data.push(data);
        }
        break;
      case WKECAMATAN:
        var exist = state.kecamatan.data.some(kecamatan => {
          return kecamatan.kecIdKecamatan == data.kecIdKecamatan;
        });
        if (!exist) {
          state.kecamatan.data.push(data);
        }
        break;
      case WDESA:
        var exist = state.desa.data.some(desa => {
          return desa.desIdDesa == data.desIdDesa;
        });
        if (!exist) {
          state.desa.data.push(data);
        }
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
