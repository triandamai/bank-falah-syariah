/* eslint-disable */
/**
 * Author Trian Damai
 * Bakaran Project
 */
import CryptoJS from "crypto-js";
const ID_TOKEN_KEY = "f6da7ebas9c00s";
const USER_KEY = "z0xk7sasd3";

/**
 * get stored token
 * @returns token:String or null
 */
export const getToken = () => {
  return window.sessionStorage.getItem(ID_TOKEN_KEY)
    ? aesDecrypt(window.sessionStorage.getItem(ID_TOKEN_KEY))
    : null;
};
/**
 * save token
 * @param {*} token
 *
 */
export const saveToken = token => {
  window.sessionStorage.setItem(ID_TOKEN_KEY, aesEncrypt(token));
};
/**
 *
 */
export const destroyToken = () => {
  window.sessionStorage.removeItem(ID_TOKEN_KEY);
};

export const getUser = () => {
  return window.sessionStorage.getItem(USER_KEY)
    ? JSON.parse(aesDecrypt(window.sessionStorage.getItem(USER_KEY)))
    : null;
};

export const setUser = user => {
  window.sessionStorage.setItem(USER_KEY, aesEncrypt(JSON.stringify(user)));
};
export const dropUser = () => {
  window.sessionStorage.removeItem(USER_KEY);
};

/***
 * Ecryption for local data(token and user data)
 *
 */
const key = "82f2ceed4c503896c8a291e560bd4325";
const iv = "bakaranprojectbismillah";
/***
 * Ecnrypt
 * @param text string to encrypt
 * @return string chiper
 *
 */
const aesEncrypt = text =>
  CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key).toString(), {
    iv: CryptoJS.enc.Utf8.parse(iv).toString()
  }).toString();
/***
 * Ecnrypt
 * @param text string to decrypt
 * @return string real text
 *
 */
const aesDecrypt = text =>
  CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key).toString(), {
    iv: CryptoJS.enc.Utf8.parse(iv).toString()
  }).toString(CryptoJS.enc.Utf8);

export default {
  getToken,
  saveToken,
  destroyToken,
  getUser,
  setUser,
  dropUser
};
