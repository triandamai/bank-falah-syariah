import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://localhost:4000/",

  //     headers:{
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': '*',
  //         'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',

  //     }
});
