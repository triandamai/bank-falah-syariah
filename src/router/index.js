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
          title: "Dashboard | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "preferences",
        name: "preferences",
        component: () => import("@/pages/preferences/preferences.vue"),
        meta: {
          title: "Personalisasi | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "nasabah",
        name: "nasabah",
        component: () => import("@/pages/nasabah/nasabah.vue"),
        meta: {
          title: "Nasabah | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      {
        path: "nasabah/add",
        name: "addnasabah",
        component: () => import("@/pages/nasabah/addnasabah.vue"),
        meta: {
          title: "Nasabah | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      {
        path: "nasabah/edit/:id",
        name: "editnasabah",
        component: () => import("@/pages/nasabah/editnasabah.vue"),
        meta: {
          title: "Nasabah | Bank Falah Syariah",
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
          title: "Laporan | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "akad",
        name: "akad",
        component: () => import("@/pages/akad/akad.vue"),
        meta: {
          title: "Akad | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "jenistransaksi",
        name: "jenistransaksi",
        component: () => import("@/pages/jenistransaksi/jenistransaksi.vue"),
        meta: {
          title: "Jenis Transaksi | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      // {
      //   path: "produk",
      //   name: "produk",
      //   component: () => import("@/pages/produk/produk.vue"),
      //   meta: {
      //     title: "Produk | Bank Falah Syariah",
      //     reqiresAuth: true,
      //   },
      // },
      //
      {
        path: "jabatan",
        name: "jabatan",
        component: () => import("@/pages/jabatan/jabatan.vue"),
        meta: {
          title: "Jabatan | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "pegawai",
        name: "pegawai",
        component: () => import("@/pages/pegawai/pegawai.vue"),
        meta: {
          title: "Pegawai | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "deposito",
        name: "deposito",
        component: () => import("@/pages/deposito/deposito.vue"),
        meta: {
          title: "Deposito | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "pembiayaan",
        name: "pembiayaan",
        component: () => import("@/pages/pembiayaan/pembiayaan.vue"),
        meta: {
          title: "Pembiayaan | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "simpanan",
        name: "simpanan",
        component: () => import("@/pages/simpanan/simpanan.vue"),
        meta: {
          title: "Simpanan | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      {
        path:"mutasi/pembiayaan/:no_rekening",
        name:"detail-rekening-simpanan",
        component:()=>import("@/pages/detail-rekening/detail-rekening-pembiayaan.vue"),
        meta: {
          title: "Mutasi | Bank Falah Syariah",
          reqiresAuth: true
        }
      },
      {
        path:"mutasi/simpanan/:no_rekening",
        name:"detail-rekening-pembiayaan",
        component:()=>import("@/pages/detail-rekening/detail-rekening-simpanan.vue"),
        meta: {
          title: "Mutasi | Bank Falah Syariah",
          reqiresAuth: true
        }
      },
      //
      {
        path: "user",
        name: "user",
        component: () => import("@/pages/user/user.vue"),
        meta: {
          title: "User | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },

      //
      {
        path: "group",
        name: "group",
        component: () => import("@/pages/group/group.vue"),
        meta: {
          title: "Group | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "menu",
        name: "menu",
        component: () => import("@/pages/menu/menu.vue"),
        meta: {
          title: "Menu | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
      //
      {
        path: "role",
        name: "role",
        component: () => import("@/pages/role/role.vue"),
        meta: {
          title: "Role | Bank Falah Syariah",
          reqiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/auth/login.vue"),
    meta: {
      title: "Login | Bank Falah Syariah",
      reqiresAuth: false,
    },
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
