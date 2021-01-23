/*eslint-disable*/
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [
  {
    path: "/",
    component: () => import("@/view/pages/Layout"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "home",
      },
      {
        path: "home",
        name: "Dashboard",
        component: () => import("@/view/pages/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "akun",
        component: () => import("@/view/pages/akun/AkunMain.vue"),
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
            name: "DataAkun",
            component: () => import("@/view/pages/akun/Akun.vue"),
          },
          {
            path: "tambah",
            name: "TambahAkun",
            component: () => import("@/view/pages/Tambah.vue"),
          },
          {
            path: "ubah",
            name: "UbahAkun",
            component: () => import("@/view/pages/Tambah.vue"),
          },
          {
            path: "*",
            name: "AkunNotFound",
            component: () => import("@/view/pages/error/NotFound.vue"),
          },
        ],
      },
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

      {
        path: "system",
        component: () => import("@/view/pages/system/System.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "page",
          },
          {
            path: "page",
            name: "PageSystem",
            component: () => import("@/view/pages/system/PageSystem.vue"),
          },
          {
            path: "menu",
            name: "MenuSystem",
            component: () => import("@/view/pages/system/MenuSystem.vue"),
          },
          {
            path: "user",
            name: "userSystem",
            component: () => import("@/view/pages/system/UserSystem.vue"),
          },
          {
            path: "group",
            name: "GroupSystem",
            component: () => import("@/view/pages/system/GroupSystem.vue"),
          },
          {
            path: "user",
            component: () => import("@/view/pages/system/UserSystem.vue"),
            children: [
              {
                path: "",
                redirect: "data",
              },
              {
                path: "data",
                name: "DataUser",
                component: () =>
                  import("@/view/pages/system/user/DataUser.vue"),
              },
              {
                path: "tambah",
                name: "Adduser",
                component: () =>
                  import("@/view/pages/system/user/TambahUser.vue"),
              },
              {
                path: "ubah",
                name: "UbahUser",
                component: () =>
                  import("@/view/pages/system/user/UbahUser.vue"),
              },
            ],
          },
          {
            path: "role",
            name: "RoleSystem",
            component: () => import("@/view/pages/system/RoleSystem.vue"),
          },

          {
            // the 404 route, when none of the above matches
            path: "*",
            name: "SystemNotFound",
            component: () => import("@/view/pages/error/NotFound.vue"),
          },
        ],
      },
      {
        path: "master",
        component: () => import("@/view/pages/master/MasterData.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "akad",
          },
          {
            path: "akad",
            name: "MasterData",
            component: () => import("@/view/pages/master/Akad.vue"),
            children: [],
          },
          {
            path: "jenistransaksi",
            name: "JenisTransaksi",
            component: () => import("@/view/pages/master/JenisTransaksi.vue"),
            children: [],
          },
          {
            path: "produk",
            name: "Produk",
            component: () => import("@/view/pages/master/Produk.vue"),
            children: [],
          },
          {
            path: "jabatan",
            name: "Jabatan",
            component: () => import("@/view/pages/master/Jabatan.vue"),
            children: [],
          },
          {
            path: "pegawai",
            name: "Pegawai",
            component: () => import("@/view/pages/master/Pegawai.vue"),
            children: [],
          },
          {
            // the 404 route, when none of the above matches
            path: "*",
            name: "AkadNotFound",
            component: () => import("@/view/pages/error/NotFound.vue"),
          },
        ],
      },
      {
        path: "rekening",
        component: () => import("@/view/pages/rekening/Rekening.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            redirect: "deposito",
          },
          {
            path: "deposito",
            name: "RekeningDeposito",
            component: () => import("@/view/pages/rekening/Deposito.vue"),
          },
          {
            path: "pembiayaan",
            name: "RekeningPembiayaan",
            component: () => import("@/view/pages/rekening/Pembiayaan.vue"),
          },
          {
            path: "simpanan",
            name: "RekeningSimpanan",
            component: () => import("@/view/pages/rekening/Simpanan.vue"),
          },
          {
            // the 404 route, when none of the above matches
            path: "*",
            name: "RekeningNotFound",
            component: () => import("@/view/pages/error/NotFound.vue"),
          },
        ],
      },
      {
        path: "tabungan",
        component: () => import("@/view/pages/tabungan/TabunganMain.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "data",
            name: "DataTabungan",
            component: () => import("@/view/pages/tabungan/Tabungan.vue"),
          },
          {
            path: "ubah",
            name: "UbahTabungan",
            component: () => import("@/view/pages/Tambah.vue"),
          },
          {
            path: "tambah",
            name: "TambahTabungan",
            component: () => import("@/view/pages/Tambah.vue"),
          },

          {
            // the 404 route, when none of the above matches
            path: "*",
            name: "TabunganNotFound",
            component: () => import("@/view/pages/error/NotFound.vue"),
          },
        ],
      },
    ],
  },

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

const availableRoute = () => {
  let routeAvail = [];
  routes.map((route) => {
    if (!route.redirect) {
      if (route.children) {
        route.children.map((child) => {
          if (!child.redirect) {
            if (child.children) {
              child.children.map((subchild) => {
                if (!child.redirect) {
                  let sub = {
                    path:
                      route.path == "/"
                        ? "/" + child.path + "/" + subchild.path
                        : route.path + "/" + child.path + "/" + subchild.path,
                    name: subchild.name,
                    status: true,
                    isParent: false,
                  };
                  routeAvail.push(sub);
                }
              });
            } else {
              let childroute = {
                path:
                  route.path == "/"
                    ? route.path + child.path
                    : route.path + "/" + child.path,
                name: child.name,
                status: true,
                isParent: false,
              };
              routeAvail.push(childroute);
            }
          }
        });
      } else {
        let childroute = {
          path: route.path,
          name: route.name,
          status: true,
          isParent: false,
        };
        routeAvail.push(childroute);
      }
    }
  });

  return routeAvail;
};

export default new Router({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: routes,
});
// console.log(availableRoute());
export { routes, availableRoute };
