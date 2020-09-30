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
        name: "AkssTeller",
        component: DataUser,
      },
      {
        path: "data-jabatan",
        name: "DataJabatan",
        component: DataUser,
      },
      {
        path: "role-akses",
        name: "RoleAkses",
        component: DataUser,
      },
      {
        path: "menu",
        name: "Menu",
        component: DataUser,
      },
      //data master
      {
        path: "coa",
        name: "COA",
        component: DataUser,
      },
      {
        path: "produk",
        name: "Produk",
        component: DataUser,
      },
      {
        path: "kolektibilitas",
        name: "Kolektibilitas",
        component: DataUser,
      },
      {
        path: "pengaturan",
        name: "Pengaturan",
        component: DataUser,
      },
      {
        path: "program",
        name: "Program",
        component: DataUser,
      },
      {
        path: "jaminan",
        name: "Jaminan",
        component: DataUser,
      },
      {
        path: "ditribusi-basil-coa",
        name: "DistribusiBasilCOA",
        component: DataUser,
      },
      {
        path: "jenis-transaksi",
        name: "JenisTransaksi",
        component: DataUser,
      },
      //anggota
      {
        path: "anggota",
        name: "Anggota",
        component: DataUser,
      },
      {
        path: "aktivasi-nasabah",
        name: "AKtivasiNasabah",
        component: DataUser,
      },
      {
        path: "rekening",
        name: "Rekening",
        component: DataUser,
      },
      //transaksi teller
      {
        path: "teller-simpanan",
        name: "TellerSimpanan",
        component: DataUser,
      },
      {
        path: "teller-pembiayaan",
        name: "TellerPembiayaan",
        component: DataUser,
      },
      {
        path: "simpanan-berjangka",
        name: "SimpananBerjangka",
        component: DataUser,
      },
      //transaksi umum
      {
        path: "kas-keluar-masuk",
        name: "KasKeluarMasuk",
        component: DataUser,
      },
      {
        path: "transaksi-lain",
        name: "TransaksiLain",
        component: DataUser,
      },
      {
        path: "selisih-kas",
        name: "SelisihKas",
        component: DataUser,
      },
      {
        path: "transaksi-antar-kas",
        name: "TransaksiAntarKas",
        component: DataUser,
      },
      //accounting
      {
        path: "masukkan-jurnal",
        name: "MasukkanJurnal",
        component: DataUser,
      },
      {
        path: "jurnal-umum",
        name: "JurnalUmum",
        component: DataUser,
      },
      //otomasi
      {
        path: "distribusi-profit",
        name: "DistribusiProfit",
        component: DataUser,
      },
      {
        path: "end-of-year",
        name: "EOY",
        component: DataUser,
      },
      {
        path: "backup-data",
        name: "BackupData",
        component: DataUser,
      },
      //laporan
      {
        path: "keuangan",
        name: "Keuangan",
        component: DataUser,
      },
      {
        path: "laporan-anggota",
        name: "LaporanAnggota",
        component: DataUser,
      },
      {
        path: "npf",
        name: "NPF",
        component: DataUser,
      },
      {
        path: "simpanan",
        name: "Simpanan",
        component: DataUser,
      },
      {
        path: "laporan-simpanan-berjangka",
        name: "LaporanSimpananBerjangka",
        component: DataUser,
      },
      {
        path: "pembiayaan",
        name: "Pembiayaan",
        component: DataUser,
      },
      {
        path: "teller",
        name: "Tellar",
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
