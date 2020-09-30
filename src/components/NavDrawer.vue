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
        <v-list-item v-if="!item.haschild" :to="baseUrl + item.link" link>
          <v-list-item-icon small>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-else>
          <template v-slot:activator>
            <v-list-item-icon>
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
        link: "/dashboard",
        sub: [
          {
            title: "Data Pegawai",
            icon: "mdi-card-account-details-star-outline ",
            link: "/datapegawai",
          },
          { title: "Data User", icon: "mdi-group", link: "/datauser" },
          {
            title: "Akses Teller",
            icon: "mdi-card-account-details-outline",
            link: "/datapegawai",
          },
          {
            title: "Data Jabatan",
            icon: "mdi-account-network-outline",
            link: "/datapegawai",
          },
          {
            title: "Role Akses",
            icon: "mdi-account-arrow-right-outline",
            link: "/datapegawai",
          },
          { title: "Menu", icon: "mdi-menu", link: "/datapegawai" },
        ],
      },
      {
        title: "Data Master",
        icon: "mdi-file-document-multiple-outline",
        link: "/datapegawai",
        haschild: true,
        sub: [
          { title: "COA", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Produk", icon: "mdi-home-city", link: "/datapegawai" },
          {
            title: "Kolektibilitas",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          { title: "pengaturan", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Program", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Jaminan", icon: "mdi-home-city", link: "/datapegawai" },
          {
            title: "Distribusi Basil COA",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          {
            title: "Jenis Transaksi",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
        ],
      },
      {
        title: "Data Anggota",
        icon: "mdi-account-group-outline",
        link: "/datapegawai",
        haschild: true,
        sub: [
          { title: "Anggota", icon: "mdi-home-city", link: "/datapegawai" },
          {
            title: "Aktivasi Nasabah",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          { title: "Rekening", icon: "mdi-home-city", link: "/datapegawai" },
        ],
      },
      {
        title: "Transaksi Teller",
        icon: "mdi-contactless-payment-circle-outline",
        link: "/datapegawai",
        haschild: true,
        sub: [
          { title: "Simpanan", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Pembiayaan", icon: "mdi-home-city", link: "/datapegawai" },
          {
            title: "Simpana Berjangka",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
        ],
      },
      {
        title: "Transaksi Umum",
        icon: "mdi-contactless-payment-circle-outline",
        link: "/datapegawai",
        haschild: true,
        sub: [
          {
            title: "Kas Keluar/Masuk",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          {
            title: "Transaksi Lainnya",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          { title: "Selisih Kas", icon: "mdi-home-city" },
          {
            title: "Transaksi Antar Kas",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
        ],
      },
      {
        title: "Accounting",
        icon: "mdi-calculator-variant-outline",
        link: "/datapegawai",
        haschild: true,
        sub: [
          {
            title: "Masukan Jurnal",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          { title: "Jurnal Umum", icon: "mdi-home-city", link: "/datapegawai" },
        ],
      },
      {
        title: "Otomasi",
        icon: "mdi-sync",
        link: "/datapegawai",
        haschild: true,
        sub: [
          {
            title: "Distribusi Profit",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          { title: "End of Year", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Backup Data", icon: "mdi-home-city", link: "/datapegawai" },
        ],
      },
      {
        title: "Laporan",
        icon: "mdi-file-document-outline",
        link: "/datapegawai",
        haschild: true,
        sub: [
          { title: "Keuangan", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Anggota", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "NPF", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Simpanan", icon: "mdi-home-city", link: "/datapegawai" },
          {
            title: "Simpanan Berjangka",
            icon: "mdi-home-city",
            link: "/datapegawai",
          },
          { title: "Pembiayaan", icon: "mdi-home-city", link: "/datapegawai" },
          { title: "Teller", icon: "mdi-home-city", link: "/datapegawai" },
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
