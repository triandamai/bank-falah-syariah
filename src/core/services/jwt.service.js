/* eslint-disable */
const ID_TOKEN_KEY = "id_token";
const USER_KEY = "zxsas";

export const getToken = () => {
  return window.sessionStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = (token) => {
  window.sessionStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.sessionStorage.removeItem(ID_TOKEN_KEY);
};

export const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem(USER_KEY));
};

export const setUser = (user) => {
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const dropUser = () => {
  window.sessionStorage.removeItem(USER_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getUser,
  setUser,
  dropUser,
};
