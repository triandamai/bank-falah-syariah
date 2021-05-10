import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/services/jwt.service";

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
    return Vue.axios.get(resource, params);
  },
  /**
   * Send the GET HTTP request
   * return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`);
  },

  /**
   * Set the POST HTTP request
   *  return fetch(`http://localhost:8000/${resource}`, {
   *    method: "POST",
   *   body: JSON.stringify(params),
   *   headers: { "Content-Type": "application/json" },
   *   mode: "no-cors",
   * }).then((res) => {
   *  res.json();
   *});
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
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
    return Vue.axios.delete(resource);
  },
  /**
   * get wilayah service
   */
  getWilayah(resource) {
    return axios.get(`https://wilayah.smartsociety.id/public/${resource}`, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWJkZDI3ODY5ZDQxMjVkOTVmYTg5MTM5OWEyNGE5MDdmNTg5MDZmOGU3YzUwMjcwYzM3ZmUyNjc5Nzc5ZmUyMTQ5OTU5YTE2ZmVkZTIzZjAiLCJpYXQiOjE2MjA2MTU3MTMsIm5iZiI6MTYyMDYxNTcxMywiZXhwIjoxNjUyMTUxNzEzLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.dCYMo_7C6x4LqTp0EkMbc3F-SRtPdX2WO0tUoCe3K8Xv9du2xbZGNIgO-xwNfvGB8YftKU6LNTtz1rZFbA-Y04InWngqZzbpPhTElVCO85yIO08mLjs4OBlRy1KUrAu5F_YdUnMrdFBzPW3mwcZjD9g8sQ4kLCsZ6535hbr3RErBa_Eup2-qzVVu__4Tb2MNRpTgjdUNVFNcNoesZlmOAOGIZ0PEuFhg3eHH0Zb7HJbgr232RL3U6eD4qeOcypqxs-45x83b2TkrEQ_XzsZOANmb_pzqjMk4zMEMu6UPQsQ2uLDpiTq5A4FNKv9nPBdK5C-jsCxmM3IfGl5dvQFx6NieOu5V7tXaizrrFn3FRX2h4q2EhDYnyxcWjhZKW_Cm9LzUqQ3WyIieH1Y3G_WEXVlIRWmU1KMhYNRhduf5iNelVHxoGfuDpwUcqGBsmm9U2IMM3uxUKZ06hShsZcULuvJg4mZeljZ5diWl0quGaC56s2lAbWDRuXyJXnhxygl-UBnprcXJglQk8HZiqB4z-5opwRQsh1bUSlS7xx9NZmr_ZiCnaJAYUVeAiWgM74l4BSyQnFosxkWiIAcZk3Mr9YiB1PhC9HvkABpe38d7Ft_Nq9qJxNCEyj50TVZaZ3t2Q2yH6enhaRP8yHYCTHynl8LIUC0OCJfvz0IokmUCr4Y`
      }
    });
  }
};

export default ApiService;
