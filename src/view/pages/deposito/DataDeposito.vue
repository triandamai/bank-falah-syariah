<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
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
        <router-link to="/deposito/tambah">
          <b-button class="mr-3" variant="success"
            >Tambahkan Rekening Deposito</b-button
          >
        </router-link>

        <b>Rekening Deposito</b>

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
            Deposito
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
                  <b-button @click="editDeposito(item)">Ubah</b-button>
                  <b-button>Detail</b-button>
                  <b-button @click="deleteDeposito(item)">Hapus</b-button>
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
import { ACTION_DELETE_DATA_REKENING, RDEPOSITO } from "../../../store";
export default {
  name: "DataAkad",
  computed: {
    ...mapState({
      header: (state) => state.rekening.deposito.header,
      items: (state) => state.rekening.datadeposito,
    }),
    search: {
      get() {
        return this.$store.state.rekening.deposito.search;
      },
      set(val) {
        this.$store.commit("master/setDepositoSearch", val);
      },
    },
  },

  methods: {
    editDeposito(deposito) {
      Swal.fire({
        title: "Rubah data " + deposito.nasabah + " ?",
        text: "Anda akan di arahkan ke halaman edit data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, lanjut!",
        cancelButtonText: "Ga jadi",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ path: "/deposito/ubah/" + deposito.id });
        }
      });
    },
    deleteDeposito(deposito) {
      Swal.fire({
        title: "Yakin menghapus " + deposito.id + " ?",
        text: "User yang dihapus akan hilang permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("rekening/" + ACTION_DELETE_DATA_REKENING, {
              systemtype: RDEPOSITO,
              path: "deposito",
              body: {},
            })
            .then(({ success, message }) => {
              if (success) {
                Swal.fire("Dihapus!", message, "success");
              }
            });
        }
      });
    },
  },
};
</script>
