/*eslint-disable*/

import ApiService from "../../core/services/api.service";
import {
  headerdatauser,
  headerdatagroup,
  headerdatarole,
} from "../utils/headers";

export const ACTION_GET_DATA_SYSTEM = "GETDATASYSTEM";
export const ACTION_POST_DATA_SYSTEM = "POGETDATASYSTEM";
export const ACTION_PUT_DATA_SYSTEM = "PUGETDATASYSTEM";
export const ACTION_DELETE_DATA_SYSTEM = "DGETDATASYSTEM";

export const MUTATION_ADD_DATA_SYSTEM = "MADDDATASYSTEM";
export const MUTATION_PUT_DATA_SYSTEM = "MPUTDATASYSTEM";
export const MUTATION_DELETE_DATA_SYSTEM = "MDDATASYSTEM";

export const SUSER = "USER";
export const SROLE = "ROLE";
export const SGROUP = "SGROUP";

const state = {
  datausers: [],
  user: {
    header: headerdatauser,
    search: "",
    current_page: 0,
    last_page: 0,
  },
  datagroups: [],
  group: {
    header: headerdatagroup,
    search: "",
    current_page: 0,
    last_page: 0,
    dialog: false,
  },
  dataroles: [],
  role: {
    header: headerdatarole,
    search: "",
    current_page: 0,
    last_page: 0,
    dialog: false,
  },
};

const actions = {
  /***
   * get data
   * @param {systemtype,path}
   *
   *
   */
  [ACTION_GET_DATA_SYSTEM]({ commit, state }, { systemtype, path }) {
    return new Promise((resolve) => {
      //get pagination
      let page =
        systemtype == SGROUP
          ? state.group.current_page
          : systemtype == SUSER
          ? state.user.current_page
          : systemtype == SROLE
          ? state.role.current_page
          : 0;
      let stillPaging = false;
      //get
      ApiService.get(`${path}?page=${page}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              //jangan ambil data lagi
              resolve(false);
              stillPaging = false;
            } else {
              resolve(true);
              stillPaging = true;
            }
            res.data.data.map((item) => {
              commit(MUTATION_ADD_DATA_SYSTEM, {
                systemtype: systemtype,
                data: item,
                page: stillPaging,
              });
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

  /***
   * Send User and save
   * @param {}
   * @return boolean is saved? then commit to datauser
   */
  [ACTION_POST_DATA_SYSTEM]({ commit }, { systemtype, path, body }) {
    return new Promise((resolve) =>
      ApiService.post(`${path}`, body)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_ADD_DATA_SYSTEM, {
              systemtype: systemtype,
              data: res.data.data[0],
            });
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve(false);
        })
    );
  },
  /***
   * Edit User
   * !password cannot be null(but in this case update only few form)
   * !not finish yet
   * @param user{}
   * @return update data user then commit to mutation
   *
   */
  [ACTION_PUT_DATA_SYSTEM]({ commit, state }, { systemtype, path, body }) {
    return new Promise((resolve) => {
      ApiService.put(`${path}/${body.id}` + state.userform.id, dataforupload)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            commit(MUTATION_PUT_DATA_SYSTEM, {
              systemtype: systemtype,
              data: res.data.data[0],
              olddata: body,
            });
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve(false);
        });
    });
  },
  /***
   * delete data
   * @param {systemtype,path,body}
   * @return boolean is saved? then commit remove user from data user by index
   */
  [ACTION_DELETE_DATA_SYSTEM]({ commit }, { systemtype, path, body }) {
    return new Promise((resolve) => {
      ApiService.delete(`${path}/${body.id}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            resolve(true);
            commit(MUTATION_DELETE_DATA_SYSTEM, {
              systemtype: systemtype,
              data: body,
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
};
const mutations = {
  /***
   * Add data
   * @param {systemtype,data}
   * @return data user add one by one
   * @todo if exist and data change sholud update
   */
  [MUTATION_ADD_DATA_SYSTEM](state, { systemtype, data, page }) {
    switch (systemtype) {
      case SUSER:
        var exist = state.datausers.some((user) => {
          return user.id == data.id;
        });
        if (!exist) {
          state.datausers.push(data);
        }
        page ? state.user.current_page++ : null;
        break;
      case SROLE:
        var exist = state.dataroles.some((role) => {
          return role.id == data.id;
        });
        if (!exist) {
          state.dataroles.push(data);
        }
        page ? state.role.current_page++ : null;
        break;
      case SGROUP:
        var exist = state.datagroups.some((group) => {
          return group.id == data.id;
        });
        if (!exist) {
          state.datagroups.push(data);
        }
        page ? state.group.current_page++ : null;
        break;
    }
  },
  /***
   * add updated data to existing data
   *@param {systemtype,data,olddata}
   */
  [MUTATION_PUT_DATA_SYSTEM](state, { systemtype, data, olddata }) {
    switch (systemtype) {
      case SUSER:
        var index = state.datausers.map((user) => user.id).indexOf(olddata.id);
        state.datausers[index] = data;
        break;
      case SGROUP:
        var index = state.datagroups
          .map((group) => group.id)
          .indexOf(olddata.id);
        state.datagroups[index] = data;
        break;
      case SROLE:
        var index = state.dataroles.map((role) => role.id).indexOf(olddata.id);
        state.dataroles[index] = data;
        break;
    }
  },

  /***
   * delete data y index
   * @param {systemtype,data}
   * @return remove user by index
   */
  [MUTATION_DELETE_DATA_SYSTEM](state, { systemtype, data }) {
    switch (systemtype) {
      case SUSER:
        var index = state.datausers.map((user) => user.id).indexOf(data.id);
        state.datausers.splice(index);
        break;
      case SGROUP:
        var index = state.datagroups.map((group) => group.id).indexOf(data.id);
        state.datagroups.splice(index);
        break;
      case SROLE:
        var index = state.dataroles.map((role) => role.id).indexOf(data.id);
        state.dataroles.splice(index);
        break;
    }
  },

  //non type mutation all must be cameCase
  setUserSearch(state, val) {
    state.user.search = val;
  },
  setGroupSearch(state, val) {
    state.group.search = val;
  },
  setRoleSearch(state, val) {
    state.role.search = val;
  },
  showGroupDialog(state, val) {
    state.group.dialog = val;
  },
  showRoleDialog(state, val) {
    state.role.dialog = val;
  },
};

export default { namespaced: true, state, actions, mutations };
