import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";

/**
 * Service to call HTTP request via Axios
 */
// const BASE_URL = "http://localhost:8000";
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);

    this.setHeader();
  },

  /**
   * Set the default HTTP request headers
   *
   */
  setHeader() {
    Vue.axios.defaults.baseURL = "http://localhost:8000";
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },
  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  // get(path, slug = "") {
  //   return fetch(`${BASE_URL}/${path}/${slug}`, {
  //     method: "GET",
  //   }).then((res) => res.json());
  // },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    // return fetch(`http://localhost:8000/${resource}`, {
    //   method: "POST",
    //   body: JSON.stringify(params),
    //   headers: { "Content-Type": "application/json" },
    //   mode: "no-cors",
    // }).then((res) => {
    //   res.json();
    // });
    return Vue.axios.post(`${resource}`, params, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;
