/*eslint-disable*/
import ApiService from "../../core/services/api.service";
import {
  headerdatauser,
  headerdatagroup,
  headerdatarole,
} from "../utils/headers";

export const ACTION_GET_USER = "GETUSER";
export const ACTION_GET_ROLE = "GETROLE";
export const ACTION_GET_GROUP = "GETGROUP";
export const ACTION_POST_USER = "POSTUSER";
export const ACTION_PUT_USER = "PUTUSER";
export const ACTION_DELETE_USER = "DELETEUSER";

export const MUTATION_POST_DATA = "POSTDATA";
export const MUTATION_DELETE_USER = "DELETEUSER";
export const MUTATION_ADD_USER = "ADDUSER";
export const MUTATION_ADD_ROLE = "ADDROLE";
export const MUTATION_ADD_GROUP = "ADDGROUP";
export const MUTATION_SET_FORM_USER = "SETFORM";
export const MUTATION_CLEAR_FORM_USER = "CLEARFORMUSER";

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
  userform: {
    id: "",
    username: "",
    password: "",
    email: "",
    role: "",
    group: "",
    error: false,
    message: "",
  },
  groupsfrom: {},
};
const getters = {
  userformvalidation: (state, getters) => {
    return (
      state.userform.username != "" &&
      state.userform.email != "" &&
      state.userform.role != "" &&
      state.userform.group != ""
    );
  },
};
const actions = {
  [ACTION_GET_USER]({ commit, state }, param) {
    return new Promise((resolve) => {
      let page =
        state.user.currentpage >= 1 ? "" : `?page=${state.user.currentpage}`;
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
            message: e.response.data.message,
            form: "user",
          });
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
  [ACTION_PUT_USER]({ commit, state }) {
    return new Promise((resolve) =>
      ApiService.put("user/" + state.userform.id, {
        username: state.userform.username,
        email: state.userform.email,
        active: 1,
        //perlu di lihat dari sisi service
        password: "defaultpassword", //state.userform.password,
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
          console.log(e);
          commit(MUTATION_POST_DATA, {
            success: true,
            message: e.response.data.message,
            form: "user",
          });
          resolve(false);
        })
    );
  },
  [ACTION_DELETE_USER]({ commit }, user) {
    return new Promise((resolve) => {
      ApiService.delete(`user/${user.id}`)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            resolve(true);
            commit(MUTATION_DELETE_USER, user);
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
  [MUTATION_DELETE_USER](state, user) {
    var index = state.datausers.map((user) => user.id).indexOf(user.id);
    state.datausers.splice(index);
  },
  [MUTATION_SET_FORM_USER](state, user) {
    // console.log(user);
    state.userform.id = user.id;
    state.userform.username = user.username;
    state.userform.password = user.password;
    state.userform.email = user.email;
    state.userform.role = user.role[0].id;
    state.userform.group = user.group[0].id;
  },
  [MUTATION_CLEAR_FORM_USER](state) {
    state.userform.id = "";
    state.userform.username = "";
    state.userform.password = "";
    state.userform.email = "";
    state.userform.role = "";
    state.userform.group = "";
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

export default { namespaced: true, state, getters, actions, mutations };
