/* eslint-disable */
import ApiService from "../../core/services/api.service";
import JwtService from "../../core/services/jwt.service";

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
    return new Promise((resolve, reject) => {
      ApiService.post("login", credentials)
        .then((res) => {
          if (res.status == 200 || 201) {
            commit(SET_AUTH, res.data);
            commit(SET_ERROR, {
              message: res.data.message || "Berhasil !",
              error: false,
            });
            resolve(true);
          } else {
            commit(SET_ERROR, {
              message: res.data.message || "Gagal coba lagi nanti!",
              error: true,
            });
            resolve(false);
          }
        })
        .catch((e) => {
          commit(SET_ERROR, {
            error: true,
            message: e.response.message || "Gagal coba lagi nanti!",
          });
          resolve(false);
        });
    });
  },
  /***
   * Logout
   * @param
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
    state.user = data.data;
    state.errors = {};
    JwtService.setUser(data.data);
    JwtService.saveToken(data.token_type + " " + data.token);
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
