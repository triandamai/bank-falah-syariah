/*eslint-disable*/
/*
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [
  {
    path: "/",
    component: () => import("@/view/pages/Layout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "home",
      },
      /***
       *
       * home
       */
      {
        path: "home",
        name: "Dashboard",
        component: () => import("@/view/pages/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      /***
       *
       * Nasabah
       */
      {
        path: "nasabah",
        component: () => import("@/view/pages/nasabah/Nasabah.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataNasabah",
            component: () => import("@/view/pages/nasabah/DataNasabah.vue"),
          },
          {
            path: "ubah",
            name: "UbahNasabah",
            component: () => import("@/view/pages/nasabah/TambahNasabah.vue"),
          },
          {
            path: "tambah",
            name: "TambahNasabah",
            component: () => import("@/view/pages/nasabah/TambahNasabah.vue"),
          },

          {
            // the 404 route, when none of the above matches
            path: "*",
            name: "NasabahNotFound",
            component: () => import("@/view/pages/error/NotFound.vue"),
          },
        ],
      },
      /***
       * System
       *
       */
      {
        path: "page",
        component: () => import("@/view/pages/page/Page.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataPage",
            component: () => import("@/view/pages/page/DataPage.vue"),
          },
        ],
      },
      {
        path: "menu",
        component: () => import("@/view/pages/menu/Menu.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataMenu",
            component: () => import("@/view/pages/menu/DataMenu.vue"),
          },
        ],
      },
      {
        path: "group",
        component: () => import("@/view/pages/group/Group.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataGroup",
            component: () => import("@/view/pages/group/DataGroup.vue"),
          },
        ],
      },
      {
        path: "role",
        name: "RoleSystem",
        component: () => import("@/view/pages/role/DataRole.vue"),
      },
      {
        path: "user",
        component: () => import("@/view/pages/user/UserSystem.vue"),
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataUser",
            component: () => import("@/view/pages/user/DataUser.vue"),
          },
          {
            path: "tambah",
            name: "Adduser",
            component: () => import("@/view/pages/user/TambahUser.vue"),
          },
          {
            path: "ubah/:id",
            name: "UbahUser",
            component: () => import("@/view/pages/user/UbahUser.vue"),
          },
        ],
      },
      /***
       * Master
       *
       */
      {
        path: "akad",
        component: () => import("@/view/pages/akad/AkadMaster.vue"),
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataAkad",
            component: () => import("@/view/pages/akad/DataAkad.vue"),
            children: [],
          },
        ],
      },
      {
        path: "jenistransaksi",
        component: () =>
          import("@/view/pages/jenistransaksi/JenisTransaksi.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataJenisTransaksi",
            component: () =>
              import("@/view/pages/jenistransaksi/DataJenisTransaksi.vue"),
          },
        ],
      },
      {
        path: "produk",
        component: () => import("@/view/pages/produk/Produk.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataProduk",
            component: () => import("@/view/pages/produk/DataProduk.vue"),
          },
        ],
      },
      {
        path: "jabatan",
        component: () => import("@/view/pages/jabatan/Jabatan.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataJabatan",
            component: () => import("@/view/pages/jabatan/DataJabatan.vue"),
          },
        ],
      },
      {
        path: "pegawai",
        component: () => import("@/view/pages/pegawai/Pegawai.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          { path: "", redirect: "data" },
          {
            path: "data",
            name: "DataPegawai",
            component: () => import("@/view/pages/pegawai/DataPegawai.vue"),
            children: [],
          },
        ],
      },
      /***
       * Rekening
       *
       *
       */
      {
        path: "deposito",
        component: () => import("@/view/pages/deposito/Deposito.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataDeposito",
            component: () => import("@/view/pages/deposito/DataDeposito.vue"),
          },
          {
            path: "tambah",
            name: "TambahDeposito",
            component: () => import("@/view/pages/deposito/TambahDeposito.vue"),
          },
          {
            path: "ubah/:id",
            name: "UbahDeposito",
            component: () => import("@/view/pages/deposito/UbahDeposito.vue"),
          },
        ],
      },
      {
        path: "pembiayaan",
        component: () => import("@/view/pages/pembiayaan/Pembiayaan.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataPembiayaan",
            component: () =>
              import("@/view/pages/pembiayaan/DataPembiayaan.vue"),
          },
          {
            path: "tambah",
            name: "TambahPembiayaan",
            component: () =>
              import("@/view/pages/pembiayaan/TambahPembiayaan.vue"),
          },
          {
            path: "ubah",
            name: "UbahPembiayaan",
            component: () =>
              import("@/view/pages/pembiayaan/UbahPembiayaan.vue"),
          },
        ],
      },
      {
        path: "simpanan",
        component: () => import("@/view/pages/simpanan/Simpanan.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "data",
          },
          {
            path: "data",
            name: "DataSimpanan",
            component: () => import("@/view/pages/simpanan/DataSimpanan.vue"),
          },
        ],
      },
    ],
  },
  //auth
  {
    path: "/auth",
    component: () => import("@/view/pages/auth/Auth"),
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        name: "Login",
        path: "login",
        component: () => import("@/view/pages/auth/Login"),
      },

      {
        // the 404 route, when none of the above matches
        path: "*",
        name: "AuthError",
        component: () => import("@/view/pages/error/NotFound.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "*",
    name: "404",
    component: () => import("@/view/pages/error/NotFound.vue"),
  },
];

const availableRoute = [];

export default new Router({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: routes,
});
// console.log(availableRoute());
export { routes, availableRoute };
