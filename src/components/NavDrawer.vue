<template>
  <v-navigation-drawer dense :mini-variant="mini" bottom permanent app>
    <v-list-item class="px-2">
      <v-list-item-avatar tile>
        <v-img :src="require('../assets/logo-aksioma.png')"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Aksioma V.3</v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-btn icon @click.stop="changemini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <div v-for="(item, index) in items" :key="index">
        <v-list-item v-if="!item.haschild" :to="baseUrl + item.link" link small>
          <v-list-item-icon small>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title small>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-else>
          <template v-slot:activator>
            <v-list-item-icon small>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(sub, i) in item.sub"
            :key="i"
            :to="baseUrl + sub.link"
            small
            link
          >
            <v-list-item-icon>
              <v-icon>{{ sub.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="sub.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import store from "../store/index";
export default {
  name: "NavDrawer",
  data: () => ({
    baseUrl: "/dashboard",
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard-outline",
        link: "/home",
      },
      {
        title: "User",
        icon: "mdi-account-check-outline",
        haschild: true,
        sub: [
          {
            title: "Data Pegawai",
            icon: "mdi-card-account-details-star-outline ",
            link: "/data-pegawai",
          },
          { title: "Data User", icon: "mdi-group", link: "/data-user" },
          {
            title: "Akses Teller",
            icon: "mdi-card-account-details-outline",
            link: "/akses-teller",
          },
          {
            title: "Data Jabatan",
            icon: "mdi-account-network-outline",
            link: "/data-jabatan",
          },
          {
            title: "Role Akses",
            icon: "mdi-account-arrow-right-outline",
            link: "/role-akses",
          },
          { title: "Menu", icon: "mdi-menu", link: "/menu" },
        ],
      },
      {
        title: "Data Master",
        icon: "mdi-file-document-multiple-outline",
        haschild: true,
        sub: [
          { title: "COA", icon: "mdi-coat-rack", link: "/coa" },
          { title: "Produk", icon: "mdi-cube-outline", link: "/produk" },
          {
            title: "Kolektibilitas",
            icon: "mdi-clipboard-file-outline",
            link: "/kolektibilitas",
          },
          {
            title: "pengaturan",
            icon: "mdi-cog-sync-outline",
            link: "/pengaturan",
          },
          { title: "Program", icon: "mdi-code-braces", link: "/program" },
          { title: "Jaminan", icon: "mdi-form-select", link: "/jaminan" },
          {
            title: "Distribusi Basil COA",
            icon: "mdi-tournament",
            link: "/distribusi-basil-coa",
          },
          {
            title: "Jenis Transaksi",
            icon: "mdi-newspaper-variant-multiple-outline",
            link: "/jenis-transaksi",
          },
        ],
      },
      {
        title: "Data Anggota",
        icon: "mdi-account-group-outline",
        haschild: true,
        sub: [
          {
            title: "Anggota",
            icon: "mdi-account-group-outline",
            link: "/anggota",
          },
          {
            title: "Aktivasi Nasabah",
            icon: "mdi-account-reactivate-outline",
            link: "/aktivasi-nasabah",
          },
          {
            title: "Rekening",
            icon: "mdi-ballot-recount-outline",
            link: "/rekening",
          },
        ],
      },
      {
        title: "Transaksi Teller",
        icon: "mdi-contactless-payment-circle-outline",
        haschild: true,
        sub: [
          {
            title: "Simpanan",
            icon: "mdi-content-save-all-outline",
            link: "/teller-simpnanan",
          },
          {
            title: "Pembiayaan",
            icon: "mdi-contactless-payment-circle-outline",
            link: "/teller-pembiayaan",
          },
          {
            title: "Simpana Berjangka",
            icon: "mdi-currency-usd-circle-outline",
            link: "/simpanan-berjangka",
          },
        ],
      },
      {
        title: "Transaksi Umum",
        icon: "mdi-contactless-payment-circle-outline",
        haschild: true,
        sub: [
          {
            title: "Kas Keluar/Masuk",
            icon: "mdi-account-box-multiple-outline",
            link: "/kas-keluar-masuk",
          },
          {
            title: "Transaksi Lainnya",
            icon: "mdi-transition",
            link: "/transaksi-lain",
          },
          { title: "Selisih Kas", icon: "mdi-home-city", link: "/selisih-kas" },
          {
            title: "Transaksi Antar Kas",
            icon: "mdi-card-plus-outline",
            link: "/transaksi-antar-kas",
          },
        ],
      },
      {
        title: "Accounting",
        icon: "mdi-calculator-variant-outline",
        haschild: true,
        sub: [
          {
            title: "Masukan Jurnal",
            icon: "mdi-file-replace-outline",
            link: "/masukkan-jurnal",
          },
          {
            title: "Jurnal Umum",
            icon: "mdi-file-refresh-outline",
            link: "/jurnal-umum",
          },
        ],
      },
      {
        title: "Otomasi",
        icon: "mdi-sync",
        haschild: true,
        sub: [
          {
            title: "Distribusi Profit",
            icon: "mdi-progress-upload",
            link: "/distribusi-profit",
          },
          {
            title: "End of Year",
            icon: "mdi-layers-triple-outline",
            link: "/end-of-year",
          },
          {
            title: "Backup Data",
            icon: "mdi-arrange-send-to-back",
            link: "/backup-data",
          },
        ],
      },
      {
        title: "Laporan",
        icon: "mdi-file-document-outline",
        haschild: true,
        sub: [
          {
            title: "Keuangan",
            icon: "mdi-account-details-outline",
            link: "/keuangan",
          },
          {
            title: "Anggota",
            icon: "mdi-account-supervisor-outline",
            link: "/laporan-anggota",
          },
          { title: "NPF", icon: "mdi-home-city", link: "/npf" },
          { title: "Simpanan", icon: "mdi-home-city", link: "/simpanan" },
          {
            title: "Simpanan Berjangka",
            icon: "mdi-home-city",
            link: "/laporan-simpanan-berjangka",
          },
          { title: "Pembiayaan", icon: "mdi-home-city", link: "/pembiayaan" },
          { title: "Teller", icon: "mdi-home-city", link: "/teller" },
        ],
      },
    ],
  }),
  computed: {
    mini() {
      return this.$store.getters.getminimenu;
    },
  },
  methods: {
    changemini: function() {
      this.$store.dispatch("actionminimenu", !this.mini);
    },
  },
};
</script>

<style></style>
