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
  errors: null,
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
  [LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("login", credentials)
        .then((res) => {
          if (res.status == 200 || 201) {
            commit(SET_AUTH, res.data);
            resolve(true);
          } else {
            commit(SET_ERROR, res);
            resolve(false);
          }
        })
        .catch((e) => {
          commit(SET_ERROR, e.response.message);
          resolve(false);
        });
    });
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
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
  state,
  actions,
  mutations,
  getters,
};
