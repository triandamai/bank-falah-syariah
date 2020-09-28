import { HTTP } from "./services";
import router from "../router/index";
const auth = {
  namespace: true,
  // eslint-disable-next-line
  state: {
    loading: false,
    snackbar: false,
    message: "",
    user: null,
    mode: "",
  },
  getters: {
    getloading: (state) => {
      return state.loading;
    },
    getmessage: (state) => {
      return state.message;
    },
    getsnackbar: (state) => {
      return state.snackbar;
    },
    // eslint-disable-next-line
    getcurrentuser: (state) => {
      return JSON.parse(localStorage.getItem("zzab") != null);
    },
  },
  mutations: {
    proseslogin(state, data) {
      state.loading = true;
      HTTP.post("/users/login", data)
        .then((result) => {
          console.log(result.data.data);
          state.snackbar = true;
          if (result?.data?.status == 200) {
            localStorage.setItem("zzab", result.data.data[0]);
            state.message = "Berhasil Masuk";
            state.user = result.data.data[0];
            setTimeout(() => {
              if (result.data.data[0].user_level == "DEV") {
                //admin super
                router.push({ path: "/admin" });
              } else if (result.data.data[0].user_level == "USER") {
                //user developer
                router.push({ path: "/user" });
              } else {
                //user pengguna
              }
            }, 2000);
          } else {
            state.user = null;
            state.message = "Gagal Masuk";
          }
        })
        // eslint-disable-next-line
        .catch((err) => {
          console.log(err);
          state.snackbar = true;
          state.message = "Gagal Masuk";
        })
        .finally(() => {
          setTimeout(() => {
            state.snackbar = false;
            state.loading = false;
            router.push({ path: "/dashboard" });
          }, 2000);
        });
    },
  },
  // eslint-disable-next-line
  //dari component ke action terus ke mutation
  actions: {
    proseslogin(context, data) {
      context.commit("proseslogin", data);
    },
  },
};

export default auth;
