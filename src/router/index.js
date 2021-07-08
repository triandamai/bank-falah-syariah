/**
 * Author Trian Damai
 * Bakaran Project
 */
import Vue from "vue";
import Router from "vue-router";
import ApiService from "@/services/api.service";
import { getUser } from "@/services/jwt.service";

// component

Vue.use(Router);

/**
 * routes definition
 * there only 1 nested routes
 * @see Router
 * ex:
 *  route1
 *    subroute1
 *    subroute2
 *  route2
 */
const routes = [
  /**
   * base route in this route will redirect to main
   */
  { path: "", redirect: { name: "dashboard" } },
  /**
   * in this route all children reqiresAuth for access
   */
  {
    path: "/main",
    component: () => import("../components/body"),
    meta: {
      reqiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/pages/dashboard/dashboard.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "nasabah",
        name: "nasabah",
        component: () => import("@/pages/nasabah/nasabah.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      {
        path: "nasabah/add",
        name: "addnasabah",
        component: () => import("@/pages/nasabah/addnasabah.vue"),
        meta: {
          title: "Nasabah | Add",
          reqiresAuth: true,
        },
      },
      {
        path: "nasabah/edit/:id",
        name: "editnasabah",
        component: () => import("@/pages/nasabah/editnasabah.vue"),
        meta: {
          title: "Nasabah | Add",
          reqiresAuth: true,
        },
      },
      /**
       * laporan/Report
       *
       */
      {
        path: "laporan-teller",
        name: "laporan-teller",
        component: () => import("@/pages/laporan-teller/laporan-teller.vue"),
        meta: {
          title: "Laporan | Teller",
          reqiresAuth: true,
        },
      },
      /**
       * Transaction
       *
       */
      {
        path: "transaksi-tabungan",
        name: "transaksi-tabungan",
        component: () =>
          import("@/pages/transaksi-tabungan/transaksi-tabungan.vue"),
        meta: {
          title: "Laporan | Teller",
          reqiresAuth: true,
        },
      },
      {
        path: "transaksi-pembiayaan",
        name: "transaksi-pembiayaan",
        component: () =>
          import("@/pages/transaksi-pembiayaan/transaksi-pembiayaan.vue"),
        meta: {
          title: "Laporan | Teller",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "akad",
        name: "akad",
        component: () => import("@/pages/akad/akad.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "jenistransaksi",
        name: "jenistransaksi",
        component: () => import("@/pages/jenistransaksi/jenistransaksi.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "produk",
        name: "produk",
        component: () => import("@/pages/produk/produk.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "jabatan",
        name: "jabatan",
        component: () => import("@/pages/jabatan/jabatan.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "pegawai",
        name: "pegawai",
        component: () => import("@/pages/pegawai/pegawai.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "deposito",
        name: "deposito",
        component: () => import("@/pages/deposito/deposito.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "pembiayaan",
        name: "pembiayaan",
        component: () => import("@/pages/pembiayaan/pembiayaan.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "tabungan",
        name: "tabungan",
        component: () => import("@/pages/tabungan/tabungan.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "user",
        name: "user",
        component: () => import("@/pages/user/user.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },

      //
      {
        path: "group",
        name: "group",
        component: () => import("@/pages/group/group.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "menu",
        name: "menu",
        component: () => import("@/pages/menu/menu.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "role",
        name: "role",
        component: () => import("@/pages/role/role.vue"),
        meta: {
          title: "Default Dashboard | Endless - Premium Admin Template",
          reqiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/auth/login.vue"),
  },
];

/**
 * instance router
 * mode use instead useing history must use hash for desktop
 */
const router = new Router({
  routes,
  base: process.env.BASE_URL || "/",
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  linkActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

/**
 * check session of user
 * if the user not  logged in route with meta requiresAuth the route will denied and redirect to login
 */
router.beforeEach((to, from, next) => {
  ApiService.setHeader();
  const user = getUser();
  if (to.meta.title) document.title = to.meta.title;
  if (to.meta.reqiresAuth) {
    if (user) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
