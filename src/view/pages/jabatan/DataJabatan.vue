<template>
  <div>
    <b-alert
      show
      variant="light"
      class="alert alert-custom alert-white alert-shadow fade show gutter-b"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-lg">
          <inline-svg
            :src="require('@/assets/images/svg/icons/Tools/Compass.svg')"
          />
        </span>
      </div>
      <div class="alert-text">
        <router-link to="/user/tambah">
          <b-button class="mr-3" variant="success">Tambahkan jabatan</b-button>
        </router-link>

        <b>Data Jabatan</b>

        <!-- <a
          class="font-weight-bold"
          href="https://vuetifyjs.com/en/components/data-tables"
          target="_blank"
        >
          See documentation.
        </a> -->
      </div>
    </b-alert>

    <div class="row">
      <div class="col-md-12">
        <v-card>
          <v-card-title>
            Jabatan
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            flat
            class="elevation-0"
            :headers="header"
            :items="items"
            :search="search"
            data-app
          >
            <template v-slot:[`item.active`]="{ item }">
              <v-chip :color="getColor(item.active == 1)">
                {{ item.active == 1 ? "aktif" : "nonaktif" }}
              </v-chip>
            </template>
            <template v-slot:[`item.last_login`]="{ item }">
              {{
                item.last_login != "" ? item.last_login : "belum ada aktivitas"
              }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <b-button-toolbar
                aria-label="Toolbar with button groups and dropdown menu"
              >
                <b-button-group class="mx-1">
                  <b-button @click="editUser(item)">Ubah</b-button>
                  <b-button>Detail</b-button>
                  <b-button @click="deleteUser(item)">Hapus</b-button>
                </b-button-group>
              </b-button-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
export default {
  name: "DataAkad",
  computed: {
    ...mapState({
      header: (state) => state.master.jabatan.header,
      items: (state) => state.master.datajabatan,
    }),
    search: {
      get() {
        return this.$store.state.master.jabatan.search;
      },
      set(val) {
        this.$store.commit("master/setJabatanSearch", val);
      },
    },
  },
};
</script>
