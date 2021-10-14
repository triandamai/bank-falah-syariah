/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import Vue from "vue";

Vue.component("Header",()=>import("@/components/header"))
Vue.component("Sidebar",()=>import("@/components/sidebar"))
Vue.component("Footer",()=>import("@/components/footer"))
Vue.component("Customizer",()=>import("@/components/customizer"))
Vue.component("data-table", () => import("@/components/datatable.vue"));
Vue.component("form-akad", () => import("@/components/form_akad.vue"));
Vue.component("dialog-cetak", () => import("@/components/sampul-mutasi.vue"));
Vue.component("form-deposito", () => import("@/components/form_deposito.vue"));
Vue.component("form-jenistransaksi", () =>
  import("@/components/form_jenistransaksi.vue")
);
Vue.component("form-nasabah", () => import("@/components/form_nasabah.vue"));
Vue.component("form-pembiayaan", () =>
  import("@/components/form_pembiayaan.vue")
);
Vue.component("form-import-nasabah", () =>
  import("@/components/form_upload_nasabah_xlsx.vue")
);

Vue.component("form-import-siswa",()=> import("@/components/form_upload_siswa_xlsx.vue"))
Vue.component("form-simpanan", () => import("@/components/form_simpanan.vue"));
Vue.component("form-user", () => import("@/components/form_user.vue"));
Vue.component("form-jabatan", () => import("@/components/form_jabatan.vue"));
Vue.component("form-pegawai", () => import("@/components/form_pegawai.vue"));
Vue.component("Breadcrumbs", () => import("@/components/bread_crumbs.vue"));
Vue.component("apexchart", () => import("vue-apexcharts"));
Vue.component("PxCard", () => import("@/components/Pxcard.vue"));

//tabungan
Vue.component("form-transaksi-tabungan-setor-tunai", () =>
  import("@/components/form_transaksi_tabungan_setor_tunai.vue")
);
Vue.component("form-transaksi-tabungan-setor-nontunai", () =>
  import("@/components/form_transaksi_tabungan_setor_nontunai.vue")
);
Vue.component("form-transaksi-tabungan-tarik-nontunai", () =>
  import("@/components/form_transaksi_tabungan_tarik_nontunai.vue")
);
Vue.component("form-transaksi-tabungan-tarik-tunai", () =>
  import("@/components/form_transaksi_tabungan_tarik_tunai.vue")
);
//pembiayaan
Vue.component("form-transaksi-pembiayaan-setor-tunai", () =>
  import("@/components/form_transaksi_pembiayaan_setor_tunai.vue")
);
Vue.component("form-transaksi-pembiayaan-tarik-tunai", () =>
  import("@/components/form_transaksi_pembiayaan_tarik_tunai.vue")
);
Vue.component("form-transaksi-pembiayaan-setor-nontunai", () =>
  import("@/components/form_transaksi_pembiayaan_setor_nontunai.vue")
);
Vue.component("form-transaksi-pembiayaan-tarik-nontunai", () =>
  import("@/components/form_transaksi_pembiayaan_tarik_nontunai.vue")
);

export default {};
