/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */

import ApiService from "@/services/api.service";

const GET_DATA_SYSTEM = "GETDATASYSTEM";
const POST_DATA_SYSTEM = "POGETDATASYSTEM";
const PUT_DATA_SYSTEM = "PUGETDATASYSTEM";
const DELETE_DATA_SYSTEM = "DELETEDATASYSTEM";
export const ACTION_GET_DATA_SYSTEM = `system/${GET_DATA_SYSTEM}`;
export const ACTION_POST_DATA_SYSTEM = `system/${POST_DATA_SYSTEM}`;
export const ACTION_PUT_DATA_SYSTEM = `system/${PUT_DATA_SYSTEM}`;
export const ACTION_DELETE_DATA_SYSTEM = `system/${DELETE_DATA_SYSTEM}`;

const ADD_DATA_SYSTEM = "MADDDATASYSTEM";
const EDIT_DATA_SYSTEM = "MPUTDATASYSTEM";
const REMOVE_DATA_SYSTEM = "MDDATASYSTEM";
const INCREMENT_PAGE = `INCREMENT`;
export const MUTATION_ADD_DATA_SYSTEM = `system/${ADD_DATA_SYSTEM}`;
export const MUTATION_PUT_DATA_SYSTEM = `system/${EDIT_DATA_SYSTEM}`;
export const MUTATION_DELETE_DATA_SYSTEM = `system/${REMOVE_DATA_SYSTEM}`;

export const SUSER = "users";
export const SROLE = "roles";
export const SGROUP = "groups";

const state = {
  datausers: [],
  user: {
    current_page: 0,
    last_page: 0,
  },
  datagroups: [],
  group: {
    current_page: 0,
    last_page: 0,
    dialog: false,
  },
  dataroles: [],
  role: {
    current_page: 0,
    last_page: 0,
    dialog: false,
  },
};

const actions = {
  /***
   * get data
   * @param {type,path,id}
   * @todo
   * @returns promise true/false if true get data always repeat until last_page
   *
   */
  [GET_DATA_SYSTEM]({ commit, state }, { type, id }) {
    return new Promise((resolve,reject) => {
      //get pagination
      let page = `?page=`;
      let stillPaging = false;
      //proper way to get pagination t service maybe :-)
      switch (type) {
        case SGROUP:
          page += state.group.current_page;
          break;
        case SUSER:
          page += state.user.current_page;
          break;
        case SROLE:
          page += state.role.current_page;
          break;
      }

      ApiService.get(`${type}${page}`)
        .then(({ status, data }) => {
          if (status === 200 || status === 201) {
            if (data.current_page >= data.last_page) {
              //jangan ambil data lagi
              resolve(false);
              stillPaging = false;
            } else {
              resolve(true);
              stillPaging = true;
            }
            data.data.map((item) => {
              commit(ADD_DATA_SYSTEM, {
                type: type,
                data: item,
                page: stillPaging,
              });
            });
          } else {
            resolve(false);
          }
        })
        .catch((e) => {
          resolve({
            success: false,
            message: "Terjadi kesalahan coba lagi nanti!",
          });
        });
    });
  },

  /***
   * Send User and save
   * @param {type,path,body}
   * @return boolean is saved? then commit to datauser
   * @returns {success,message}
   */
  [POST_DATA_SYSTEM]({ commit }, { type, body }) {
    return new Promise((resolve,reject) => {
      ApiService.post(`${type === SUSER ? 'user':type === SROLE ? 'role' :'group'}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(ADD_DATA_SYSTEM, {
              type: type,
              data: data.data[0],
            });
            resolve({ success: true, message: "Berhasil menyimpan" });
          } else {
            resolve({
              success: false,
              message: "Gagal menyimpan,pastikan data sudah benar!",
            });
          }
        })
        .catch((e) => {
          resolve({
            success: false,
            message: "Terjadi kesalahan coba lagi nanti!",
          });

        });
    });
  },
  /***
   * Edit User
   * !password cannot be null(but in this case update only few form)
   * !not finish yet
   * @param user{}
   * @return  promise update data user then commit to mutation
   * @returns {success,message}
   *
   */
  [PUT_DATA_SYSTEM]({ commit }, { type, body }) {
    return new Promise((resolve,reject) => {
      ApiService.put(`${type}/${body.id}`, body)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(EDIT_DATA_SYSTEM, {
              type: type,
              data: data.data[0],
              olddata: body,
            });
            resolve({ success: true, message: "Berhasil mengubah!" });
          } else {
            resolve({
              success: false,
              message: "Gagal mengubah,pastikan data sudah benar!",
            });
          }
        })
        .catch((e) => {
          resolve({
            success: false,
            message: "Terjadi kesalahan coba lagi nanti!",
          });
        });
    });
  },
  /***
   * delete data
   * @param {type,path,body}
   * @return boolean is saved? then commit remove user from data user by index
   */
  [DELETE_DATA_SYSTEM]({ commit }, { type, body }) {
    return new Promise((resolve) => {
      ApiService.delete(`${type}/${body.id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            commit(REMOVE_DATA_SYSTEM, {
              type: type,
              data: body,
            });
            resolve({ success: true, message: "Berhasil menghapus!" });
          } else {
            resolve({
              success: false,
              message: "Gagal menghapus,pastikan data sudah benar!",
            });
          }
        })
        .catch((e) => {
          resolve({
            success: false,
            message: "Terjadi kesalahan coba lagi nanti!",
          });
        });
    });
  },
};
const mutations = {
  [INCREMENT_PAGE](state, { type }) {
    switch (type) {
      case SUSER:
        state.user.current_page++;
        break;
      case SROLE:
        state.role.current_page++;
        break;
      case SGROUP:
        state.group.current_page++;
        break;
    }
  },
  /***
   * Add data
   * @param {type,data}
   * @return data user add one by one
   * @todo if exist and data change sholud update
   */
  [ADD_DATA_SYSTEM](state, { type, data, page }) {
    switch (type) {
      case SUSER:
        var exist = state.datausers.some((user) => {
          return user.id == data.id;
        });
        if (!exist) {
          state.datausers.push(data);
        }
        break;
      case SROLE:
        var exist = state.dataroles.some((role) => {
          return role.id == data.id;
        });
        if (!exist) {
          state.dataroles.push(data);
        }
        break;
      case SGROUP:
        var exist = state.datagroups.some((group) => {
          return group.id == data.id;
        });
        if (!exist) {
          state.datagroups.push(data);
        }
        break;
    }
  },
  /***
   * add updated data to existing data
   *@param {type,data,olddata}
   */
  [EDIT_DATA_SYSTEM](state, { type, data, olddata }) {
    switch (type) {
      case SUSER:
        var index = state.datausers.map((user) => user.id).indexOf(olddata.id);
        Object.assign(state.datausers[index], data);
        break;
      case SGROUP:
        var index = state.datagroups
          .map((group) => group.id)
          .indexOf(olddata.id);
        Object.assign(state.datagroups[index], data);
        break;
      case SROLE:
        var index = state.dataroles.map((role) => role.id).indexOf(olddata.id);
        Object.assign(state.dataroles[index], data);
        break;
    }
  },

  /***
   * delete data y index
   * @param {type,data}
   * @return remove user by index
   */
  [REMOVE_DATA_SYSTEM](state, { type, data }) {
    switch (type) {
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
};

export default { namespaced: true, state, actions, mutations };
