<template>
  <v-app id="inspire">
    <v-system-bar app class="light-blue accent-3">
      <v-spacer></v-spacer>
      <div class="text-center white--text text-caption">
        Notifikasi disini
      </div>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-navigation-drawer dense :mini-variant.sync="mini" bottom permanent app>
      <v-list-item class="px-2">
        <v-list-item-avatar tile>
          <v-img :src="require('../assets/logo-aksioma.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Aksioma V.3</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <div v-for="item in items" :key="item.title">
          <v-list-item v-if="!item.haschild" link>
            <v-list-item-icon>
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
            <v-list-item v-for="(sub, i) in item.sub" :key="i" link>
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
    <v-app-bar class="green darken-1" dense :elevation="1" app>
      <v-app-bar-nav-icon
        class="white--text"
        v-show="mini"
        @click="mini = !mini"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Aksioma</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            small
            class="ma-2 white--text"
            color="green darken-1"
            depressed
          >
            <v-spacer></v-spacer>
            <v-avatar tile color="indigo " class="rounded-md mr-1" size="20">
              <v-img :src="require('../assets/logo-aksioma.png')"></v-img>
            </v-avatar>
            Akun
          </v-btn>
        </template>
        <v-card dense>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Bakaran Project</v-list-item-title>
                <v-list-item-subtitle>Creator Website</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch v-model="message" color="purple"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable messages</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="menu = false">
              Keluar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-home-city" },
        {
          title: "User",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Data Pegawai", icon: "mdi-home-city" },
            { title: "Data User", icon: "mdi-home-city" },
            { title: "Akses Teller", icon: "mdi-home-city" },
            { title: "Data Jabatan", icon: "mdi-home-city" },
            { title: "Role Akses", icon: "mdi-home-city" },
            { title: "Menu", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Data Master",
          icon: "mdi-account",
          haschild: true,
          sub: [
            { title: "COA", icon: "mdi-home-city" },
            { title: "Produk", icon: "mdi-home-city" },
            { title: "Kolektibilitas", icon: "mdi-home-city" },
            { title: "pengaturan", icon: "mdi-home-city" },
            { title: "Program", icon: "mdi-home-city" },
            { title: "Jaminan", icon: "mdi-home-city" },
            { title: "Distribusi Basil COA", icon: "mdi-home-city" },
            { title: "Jenis Transaksi", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Data Anggota",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Anggota", icon: "mdi-home-city" },
            { title: "Aktivasi Nasabah", icon: "mdi-home-city" },
            { title: "Rekening", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Transaksi Teller",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Simpanan", icon: "mdi-home-city" },
            { title: "Pembiayaan", icon: "mdi-home-city" },
            { title: "Simpana Berjangka", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Transaksi Umum",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Kas Keluar/Masuk", icon: "mdi-home-city" },
            { title: "Transaksi Lainnya", icon: "mdi-home-city" },
            { title: "Selisih Kas", icon: "mdi-home-city" },
            { title: "Transaksi Antar Kas", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Accounting",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Masukan Jurnal", icon: "mdi-home-city" },
            { title: "Jurnal Umum", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Otomasi",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Distribusi Profit", icon: "mdi-home-city" },
            { title: "End of Year", icon: "mdi-home-city" },
            { title: "Backup Data", icon: "mdi-home-city" }
          ]
        },
        {
          title: "Laporan",
          icon: "mdi-account-group-outline",
          haschild: true,
          sub: [
            { title: "Keuangan", icon: "mdi-home-city" },
            { title: "Anggota", icon: "mdi-home-city" },
            { title: "NPF", icon: "mdi-home-city" },
            { title: "Simpanan", icon: "mdi-home-city" },
            { title: "Simpanan Berjangka", icon: "mdi-home-city" },
            { title: "Pembiayaan", icon: "mdi-home-city" },
            { title: "Teller", icon: "mdi-home-city" }
          ]
        }
      ],
      mini: true,
      fav: true,
      menu: false,
      message: false,
      hints: true
    };
  },
  components: {}
};
</script>
