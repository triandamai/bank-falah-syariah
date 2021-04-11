<template>
  <div>
    <b-alert
      show
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
        <router-link to="/nasabah/tambah">
          <b-button class="mr-3" variant="success"
            >Tambahkan Nasabah Baru</b-button
          >
        </router-link>

        <b>Data Nasabah</b>

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
        <v-card class="" dark>
          <v-card-title>
            Nasabah
            <v-spacer></v-spacer>
            <v-text-field
              v-model="datatable.search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            flat
            :headers="datatable.headers"
            :items="nasabah"
            :search="datatable.search"
          >
            <template v-slot:[`item.action`]="{ item }">
              <b-button-toolbar
                aria-label="Toolbar with button groups and dropdown menu"
              >
                <b-button-group class="mx-1">
                  <b-button @click="editNasabah(item)">Ubah</b-button>
                  <b-button @click="editNasabah(item)">Detail</b-button>
                  <b-button>Hapus</b-button>
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
/* eslint-disable */
import { ACTION_GET_NASABAH, headerdatanasabah } from "@/store";

import { mapState } from "vuex";

export default {
  data() {
    return {
      datatable: {
        search: "",
        headers: headerdatanasabah,
      },
    };
  },
  computed: {
    ...mapState({
      nasabah: (state) => {
        return state.nasabah.datanasabah;
      },
    }),
  },
  components: {},
  created() {
    this.getNasabah();
  },
  methods: {
    getNasabah() {
      this.$store
        .dispatch("nasabah/" + ACTION_GET_NASABAH)
        .then((res) => {
          if (res) {
            this.getNasabah();
          }
        })
        .catch((e) => {});
    },

    editNasabah(val) {},
    deleteNasabah(val) {},
  },
};
</script>
