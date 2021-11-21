/**
 * Author Trian Damai
 * Bakaran Project
 */
import Vue from "vue";
import Router from "vue-router";
import ApiService from "@/services/api.service";
import { getUser } from "@/services/jwt.service";
import {checkPrivileges} from "@/utils/utils";
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
   * in this route all children requireAuth for access
   */
  {
    path: "/main",
    component: () => import("@/components/body"),
    meta: {
      requireAuth: true,
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
          requireAuth: true,
          roles: ["public"]
        },
      },
      //
      {
        path: "preferences",
        name: "preferences",
        component: () => import("@/pages/preferences/preferences.vue"),
        meta: {
          title: "Personalisasi | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root"]
        },
      },
      //
      {
        path: "nasabah",
        name: "nasabah",
        component: () => import("@/pages/nasabah/nasabah.vue"),
        meta: {
          title: "Nasabah | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","cs","siswa"]
        },
      },
      {
        path: "nasabah/add",
        name: "addnasabah",
        component: () => import("@/pages/nasabah/addnasabah.vue"),
        meta: {
          title: "Nasabah | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","cs"]
        },
      },
      {
        path: "nasabah/edit/:id",
        name: "editnasabah",
        component: () => import("@/pages/nasabah/editnasabah.vue"),
        meta: {
          title: "Nasabah | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","cs"]
        },
      },
      /**
       * laporan/Report
       *
       */
      {
        path: "laporan-simpanan",
        name: "laporan-simpanan",
        component: () => import("@/pages/laporan/laporan-simpanan.vue"),
        meta: {
          title: "Laporan | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","teller"]
        },
      },
      {
        path: "laporan-pembiayaan",
        name: "laporan-pembiayaan",
        component: () => import("@/pages/laporan/laporan-pembiayaan.vue"),
        meta: {
          title: "Laporan | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","teller"]
        },
      },
      {
        path: "laporan-kas",
        name: "laporan-kas",
        component: () => import("@/pages/laporan/laporan-kas.vue"),
        meta: {
          title: "Laporan | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","teller"]
        },
      },
      {
        path: "jenistransaksi",
        name: "jenistransaksi",
        component: () => import("@/pages/jenistransaksi/jenistransaksi.vue"),
        meta: {
          title: "Jenis Transaksi | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa"]
        },
      },
      {
        path: "jabatan",
        name: "jabatan",
        component: () => import("@/pages/jabatan/jabatan.vue"),
        meta: {
          title: "Jabatan | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa"]
        },
      },
      //
      {
        path: "pegawai",
        name: "pegawai",
        component: () => import("@/pages/pegawai/pegawai.vue"),
        meta: {
          title: "Pegawai | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa"]
        },
      },
      {
        path: "pembiayaan",
        name: "pembiayaan",
        component: () => import("@/pages/pembiayaan/pembiayaan.vue"),
        meta: {
          title: "Pembiayaan | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","cs","teller"]
        },
      },
      //
      {
        path: "simpanan",
        name: "simpanan",
        component: () => import("@/pages/simpanan/simpanan.vue"),
        meta: {
          title: "Simpanan | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","cs","teller"]
        },
      },
      {
        path:"detailrekening/pembiayaan",
        name:"detail-rekening-simpanan",
        component:()=>import("@/pages/detail-rekening/detail-rekening-pembiayaan.vue"),
        meta: {
          title: "Mutasi | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","cs","teller"]
        }
      },
      {
        path:"detailrekening/simpanan",
        name:"detail-rekening-pembiayaan",
        component:()=>import("@/pages/detail-rekening/detail-rekening-simpanan.vue"),
        meta: {
          title: "Mutasi | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root","siswa","cs","teller"]
        }
      },
      //
      {
        path: "user",
        name: "user",
        component: () => import("@/pages/user/user.vue"),
        meta: {
          title: "User | Bank Falah Syariah",
          requireAuth: true,
          roles: ["admin","bp_root"]
        },
      },
      {
        path: "not-authorized",
        name: "not-authorized",
        component:()=> import("@/pages/error/not-authorized.vue"),
        meta: {
          title: "Unlock | Bank Falah Syariah",
          requireAuth: false,
          roles: ["public"]
        },
      }

    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/auth/login.vue"),
    meta: {
      title: "Login | Bank Falah Syariah",
      requireAuth: false,
      roles: ["admin","bp_root","siswa","public"]
    },
  },
  {
    path:'/unlock',
    name:'unlock',
    component:()=> import("@/pages/auth/unlock_user"),
    meta: {
      title: "Unlock | Bank Falah Syariah",
      requireAuth: true,
      roles: ["admin","bp_root","siswa","public"]
    },
  },

];

/**
 * instance router
 * mode use instead using history must use hash for desktop
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
  
  if (to.meta.requireAuth) {
    if (user) {
      if(checkPrivileges({roles:to.meta.roles})){
        next();
      }else {
        next({path:"/main/not-authorized"})
      }

    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
router.afterEach((to)=>{

  if(to.path === "/login" || to.path === "/unlock"){
    //
  }else {
    ApiService.get("/statistics?days=10").then(()=>{}).catch((e)=>{
      if(e.response){
        if(e.response.status === 401) {
          setTimeout(()=>{
              router.push({path:'/unlock'})
          },3400)
          Vue.swal({
            title: 'Sesi Berakhir atau Akun terhubung di perangkat lain!',
            html: 'Anda akan diarahkan ke halaman masuk.',
            timer:3000
          })
        }
      }

    })
  }

})

export default router;
