import Vue from "vue";
Vue.component("data-table", () => import("@/components/datatable.vue"));
Vue.component("form-akad", () => import("@/components/form_akad.vue"));
Vue.component("form-deposito", () => import("@/components/form_deposito.vue"));
Vue.component(
  "form-jenistransaksi",
  import("@/components/form_jenistransaksi.vue")
);
Vue.component("form-nasabah", () => import("@/components/form_nasabah.vue"));
Vue.component("form-pembiayaan", () =>
  import("@/components/form_pembiayaan.vue")
);
Vue.compile("form-import-nasabah", () =>
  import("@/components/form_upload_xlsx.vue")
);
Vue.component("form-simpanan", () => import("@/components/form_simpanan.vue"));
Vue.component("form-user", () => import("@/components/form_user.vue"));
Vue.component("form-group", () => import("@/components/form_group.vue"));
Vue.component("form-menu", () => import("@/components/form_menu.vue"));
Vue.component("form-role", () => import("@/components/form_role.vue"));
Vue.component("form-jabatan", () => import("@/components/form_jabatan.vue"));
Vue.component("form-pegawai", () => import("@/components/form_pegawai.vue"));
Vue.component("form-transaksi-tabungan-tunai", () =>
  import("@/components/form_transaksi_tabungan_tunai.vue")
);
Vue.component("form-transaksi-tabungan-nontunai", () =>
  import("@/components/form_transaksi_tabungan_nontunai.vue")
);
Vue.component("form-transaksi-pembiayaan-tunai", () =>
  import("@/components/form_transaksi_pembiayaan_tunai.vue")
);
Vue.component("form-transaksi-pembiayaan-nontunai", () =>
  import("@/components/form_transaksi_pembiayaan_nontunai.vue")
);

Vue.component("Breadcrumbs", () => import("@/components/bread_crumbs.vue"));

Vue.component("apexchart", () => import("vue-apexcharts"));

Vue.component("PxCard", () => import("@/components/Pxcard.vue"));
