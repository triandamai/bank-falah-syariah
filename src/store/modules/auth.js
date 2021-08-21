/* eslint-disable */
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import ApiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";

// action types
export const LOGIN = "login";
export const LOGOUT = "logout";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const state = {
  error: false,
  message: "",
  user: JwtService.getUser(),
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  /***
   * Login
   * @param credentials{username,password}
   * @return action login
   *
   */
  [LOGIN]({ commit }, credentials) {
    return new Promise((resolve,) => {
      ApiService.post("login", {
        username: credentials.username,
        password: credentials.password,
      })
        .then(({ success,message,data }) => {

          resolve({ success: success, message: message });
          if (success) {
            commit(SET_AUTH, data);
          }
        })
    });
  },
  /***
   * Logout
   * @params {}
   * @return action logout
   *
   */
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  },
};

const mutations = {
  [SET_ERROR](state, { error, message }) {
    state.error = error;
    state.message = message;
  },
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.user = data;
    state.errors = {};
    JwtService.setUser(data);
    JwtService.saveToken(data.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.dropUser();
    JwtService.destroyToken();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
