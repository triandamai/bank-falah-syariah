/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
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
  dusun: { current_page: 0, data: [] },
};
const actions = {
  /**
   * GET Data
   * @param {*} param0
   * @param {*} param1
   * @returns
   */
  [GET_WILAYAH]({ commit, state }, { type, query }) {
    return new Promise((resolve) => {
      let resource = ``;
      switch (type) {
        case WPROVINSI:
          resource = `/provinsi?page=${state.provinsi.current_page}&mode=kabupaten`;
          break;
        case WKABUPATEN:
          resource = `/kabupaten?page=${state.kabupaten.current_page}&provinsi_id=${query}`;
          break;
        case WKECAMATAN:
          resource = `/kecamatan?page=${state.kecamatan.current_page}&kabupaten_id=${query}`;
          break;
        case WDESA:
          resource = `/desa?page=${state.desa.current_page}&kecamatan_id=${query}`;
          break;
        case WDUSUN:
          break;
      }
      ApiService.getWilayah(resource)
        .then(({  data,shouldNext }) => {
            resolve(shouldNext);
            if (shouldNext) {
              commit(INCREMENT_PAGE, { type: type });
            }
            data.map((wilayah) => {
              commit(ADD_DATA_WILAYAH, {
                type: type,
                data: wilayah,
              });
            });
        })
    });
  },
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
  [ADD_DATA_WILAYAH](state, { type, data }) {
    if(type === WPROVINSI) {        // eslint-disable-next-line no-redeclare
      const exist = state.provinsi.data.some((provinsi) =>provinsi.provIdProvinsi === data.provIdProvinsi);
      if (!exist) {
        state.provinsi.data.push(data);
      }
    }
    if(type === WKABUPATEN) {
      // eslint-disable-next-line no-redeclare
      const exist = state.kabupaten.data.some((kabupaten) =>kabupaten.kabIdKabupaten === data.kabIdKabupaten);
      if (!exist) {
        state.kabupaten.data.push(data);
      }
    }
    if(type === WKECAMATAN) {
      // eslint-disable-next-line no-redeclare
      const exist = state.kecamatan.data.some((kecamatan) =>kecamatan.kecIdKecamatan === data.kecIdKecamatan);
      if (!exist) {
        state.kecamatan.data.push(data);
      }
    }
    if(type === WDESA) {
      // eslint-disable-next-line no-redeclare
      const exist = state.desa.data.some((desa) =>desa.desIdDesa === data.desIdDesa);
      if (!exist) {
        state.desa.data.push(data);
      }
    }

  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
