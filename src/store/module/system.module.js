/*eslint-disable*/

import ApiService from "../../core/services/api.service";

export const ACTION_GET_USER = "GETUSER";
export const ACTION_GET_ROLE = "GETROLE";
export const ACTION_GET_GROUP = "GETGROUP";
export const ACTION_POST_USER = "POSTUSER";

export const MUTATION_POST_DATA = "POSTDATA";
export const MUTATION_ADD_USER = "ADDUSER";
export const MUTATION_ADD_ROLE = "ADDROLE";
export const MUTATION_ADD_GROUP = "ADDGROUP";

const state = {
  datausers: [],
  datagroups: [],
  dataroles: [],
  userform: {
    username: "",
    password: "",
    email: "",
    role: "",
    group: "",
    error: false,
    message: "",
  },
  groupsfrom: {},
  error: "",
  currentpage: 0,
  lastpage: "",
};
const getters = {};
const actions = {
  [ACTION_GET_USER]({ commit, state }, param) {
    return new Promise((resolve) => {
      let page = state.currentpage >= 1 ? "" : `?page=${state.currentpage}`;
      ApiService.get(`users${page}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              //jangan ambil data lagi
              resolve(false);
            } else {
              resolve(true);
            }
            res.data.data.map((item) => {
              commit(MUTATION_ADD_USER, item);
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
  [ACTION_GET_GROUP]({ commit, state }) {
    return new Promise((resolve) => {
      let page = state.currentpage >= 1 ? "" : `?page=${state.currentpage}`;
      ApiService.get(`groups${page}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              //jangan ambil data lagi
              resolve(false);
            } else {
              resolve(true);
            }
            res.data.data.map((item) => {
              commit(MUTATION_ADD_GROUP, item);
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
  [ACTION_GET_ROLE]({ commit, state }) {
    return new Promise((resolve) => {
      let page = state.currentpage >= 1 ? "" : `?page=${state.currentpage}`;
      ApiService.get(`roles${page}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data.current_page >= res.data.last_page) {
              //jangan ambil data lagi
              resolve(false);
            } else {
              resolve(true);
            }
            res.data.data.map((item) => {
              commit(MUTATION_ADD_ROLE, item);
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
  [ACTION_POST_USER]({ commit, state }) {
    return new Promise((resolve) =>
      ApiService.post("user", {
        username: state.userform.username,
        email: state.userform.email,
        active: 1,
        password: state.userform.password,
        role_id: state.userform.role,
        group_id: state.userform.group,
      })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            resolve(true);
            commit(MUTATION_POST_DATA, {
              success: true,
              message: "Berhasil menambah user",
              form: "user",
            });
          } else {
            commit(MUTATION_POST_DATA, {
              success: false,
              message: "Gagal menambah user",
              form: "user",
            });
            resolve(false);
          }
        })
        .catch((e) => {
          commit(MUTATION_POST_DATA, {
            success: true,
            message: e.data.message,
            form: "user",
          });
          resolve(false);
        })
    );
  },
};
const mutations = {
  [MUTATION_ADD_USER](state, data) {
    var exist = state.datausers.some((field) => {
      return field.id == data.id;
    });
    if (!exist) {
      state.datausers.push(data);
    }
  },
  [MUTATION_ADD_GROUP](state, data) {
    var exist = state.datagroups.some((group) => {
      return group.id == data.id;
    });
    if (!exist) {
      state.datagroups.push(data);
    }
  },
  [MUTATION_ADD_ROLE](state, data) {
    var exist = state.dataroles.some((role) => {
      return role.id == data.id;
    });
    if (!exist) {
      state.dataroles.push(data);
    }
  },
  [MUTATION_POST_DATA](state, { message, success, form }) {
    switch (form) {
      case "group":
        break;
      case "user":
        state.userform.message = message;
        state.userform.error = !success;
        break;
    }
  },
  //non type mutation all must be cameCase
  setFormUsername(state, val) {
    state.userform.username = val;
  },
  setFormPassword(state, val) {
    state.userform.password = val;
  },
  setFormEmail(state, val) {
    state.userform.email = val;
  },
  setFormRole(state, val) {
    state.userform.role = val;
  },
  setFormGroup(state, val) {
    state.userform.group = val;
  },
};

export default { state, getters, actions, mutations };