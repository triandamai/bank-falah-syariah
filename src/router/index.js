import Vue from "vue";
import VueRouter from "vue-router";
//view
import Dashboard from "../views/Dashboard.vue";
import About from "../views/About.vue";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
//page
import Home from "../views/pages/Home.vue";
import NotFound from "../views/pages/NotFound.vue";
import View404 from "../views/View404.vue";
import Index from "../views/pages/Index.vue";
import DataPegawai from "../views/pages/DataPegawai.vue";
import DataUser from "../views/pages/DataUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "",
        redirect: "home",
      },
      {
        path: "home",
        name: "Home",
        component: Index,
      },
      //user
      {
        path: "data-pegawai",
        name: "DataPegawai",
        component: DataPegawai,
      },
      {
        path: "data-user",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "akses-teller",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "data-jabatan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "role-akses",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "menu",
        name: "DataUser",
        component: DataUser,
      },
      //data master
      {
        path: "coa",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "produk",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "kolektibilitas",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "pengaturan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "program",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "jaminan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "ditribusi-basil-coa",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "jenis-transaksi",
        name: "DataUser",
        component: DataUser,
      },
      //anggota
      {
        path: "anggota",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "aktivasi-nasabah",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "rekening",
        name: "DataUser",
        component: DataUser,
      },
      //transaksi teller
      {
        path: "simpanan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "pembiayaan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "simpanan-berjangka",
        name: "DataUser",
        component: DataUser,
      },
      //transaksi umum
      {
        path: "kas-keluar-masuk",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "transaksi-lain",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "selisih-kas",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "transaksi-antar-kas",
        name: "DataUser",
        component: DataUser,
      },
      //accounting
      {
        path: "masukkan-jurnal",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "jurnal-umum",
        name: "DataUser",
        component: DataUser,
      },
      //otomasi
      {
        path: "distribusi-profit",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "end-of-year",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "backup-data",
        name: "DataUser",
        component: DataUser,
      },
      //laporan
      {
        path: "keuangan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "anggota",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "npf",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "simpanan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "simapanan-brjangka",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "pembiayaan",
        name: "DataUser",
        component: DataUser,
      },
      {
        path: "teller",
        name: "DataUser",
        component: DataUser,
      },
      //no akses
      {
        path: "*",
        name: "NotFound",
        component: NotFound,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "*",
    name: "404",
    component: View404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = JSON.parse(sessionStorage.getItem("zzaAAb"));

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user != null) {
      next();
    } else {
      console.log("user null");
      next({
        name: "Login",
        redirect: "/login",
      });
    }
  } else {
    console.log("ga butuh");
    next();
  }
});

export default router;
