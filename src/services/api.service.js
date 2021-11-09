/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import  {getToken} from "@/services/jwt.service";
import {responseInterceptor,errorInterceptor} from "@/services/httpInterceptors"

/**
 * Service to call HTTP request via Axios
 */
// const BASE_URL = "http://localhost:8000";
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.interceptors.response.use(responseInterceptor,errorInterceptor)

    this.setHeader();
  },

  /**
   * Set the default HTTP request headers
   *
   */
  setHeader() {
    Vue.axios.defaults.baseURL = "https://bfsservice.bakaranproject.com";
    // "http://192.168.100.4:8000"; // "http://localhost:8000";
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${getToken()}`;
  },
  query(resource, params) {
    return Vue.axios.get(resource, params);
  },
  /**
   * @param resource
   */
  get(resource) {
    // if(slug){
    //   return Vue.axios.get(`${resource}/${slug}`);
    // }
    return  Vue.axios.get(`${resource}`);

  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params, {
      headers: {
        "Content-Type": "application/json",
      },
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
   * download
   * **/
  downloadFile(url="tes"){
    let request_url = `https://bfsservice.bakaranproject.com/rekening_simpanan/cetak/${url}/merge_buku_tabungan`

    let request = axios.create()
    return request({url:request_url,method:"GET",responseType:"blob"})
  },
  downloadFileMutasi(url="tes"){
    let request_url = `https://bfsservice.bakaranproject.com/${url}`

    let request = axios.create()
    return request({url:request_url,method:"GET",responseType:"blob"})
  },

  /**
   * get wilayah service
   */
  getWilayah(resource) {

    return axios.get(`https://wilayah.smartsociety.id/public/${resource}`, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWJkZDI3ODY5ZDQxMjVkOTVmYTg5MTM5OWEyNGE5MDdmNTg5MDZmOGU3YzUwMjcwYzM3ZmUyNjc5Nzc5ZmUyMTQ5OTU5YTE2ZmVkZTIzZjAiLCJpYXQiOjE2MjA2MTU3MTMsIm5iZiI6MTYyMDYxNTcxMywiZXhwIjoxNjUyMTUxNzEzLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.dCYMo_7C6x4LqTp0EkMbc3F-SRtPdX2WO0tUoCe3K8Xv9du2xbZGNIgO-xwNfvGB8YftKU6LNTtz1rZFbA-Y04InWngqZzbpPhTElVCO85yIO08mLjs4OBlRy1KUrAu5F_YdUnMrdFBzPW3mwcZjD9g8sQ4kLCsZ6535hbr3RErBa_Eup2-qzVVu__4Tb2MNRpTgjdUNVFNcNoesZlmOAOGIZ0PEuFhg3eHH0Zb7HJbgr232RL3U6eD4qeOcypqxs-45x83b2TkrEQ_XzsZOANmb_pzqjMk4zMEMu6UPQsQ2uLDpiTq5A4FNKv9nPBdK5C-jsCxmM3IfGl5dvQFx6NieOu5V7tXaizrrFn3FRX2h4q2EhDYnyxcWjhZKW_Cm9LzUqQ3WyIieH1Y3G_WEXVlIRWmU1KMhYNRhduf5iNelVHxoGfuDpwUcqGBsmm9U2IMM3uxUKZ06hShsZcULuvJg4mZeljZ5diWl0quGaC56s2lAbWDRuXyJXnhxygl-UBnprcXJglQk8HZiqB4z-5opwRQsh1bUSlS7xx9NZmr_ZiCnaJAYUVeAiWgM74l4BSyQnFosxkWiIAcZk3Mr9YiB1PhC9HvkABpe38d7Ft_Nq9qJxNCEyj50TVZaZ3t2Q2yH6enhaRP8yHYCTHynl8LIUC0OCJfvz0IokmUCr4Y`,
      },
    });
  },
  postPercobaan(data){

    return axios.post("http://192.227.75.88:3131/irbaya",data,{
      headers:{
        "Content-Type":"application/json"
      }
    })
  }
};

export default ApiService;
