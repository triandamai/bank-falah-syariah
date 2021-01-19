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
            :src="require('../../../assets/images/svg/icons/Tools/Compass.svg')"
          />
        </span>
      </div>
      <div class="alert-text">
        <router-link to="/nasabah/tambah">
          <b-button class="mr-3" variant="success"
            >Tambahkan Jenis Transaksi Baru</b-button
          >
        </router-link>

        <b>Data Transaksi</b>

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
            Nutrition
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
            class="elevation-0"
            :headers="datatable.headers"
            :items="data"
            :search="datatable.search"
          ></v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { headerdatanasabah } from "..";
export default {
  name: "JenisTransaksi",
  data: () => {
    return {
      datatable: {
        headers: headerdatanasabah,
        search: "",
      },
      data: [],
    };
  },
};
</script>
