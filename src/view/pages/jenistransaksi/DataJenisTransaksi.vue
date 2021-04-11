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
        <b-button
          @click="
            {
              dialog = true;
              isEdit = false;
            }
          "
          class="mr-3"
          variant="success"
          >Tambahkan Jenis Transaksi</b-button
        >

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
            Jenis Transaksi
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
                  <b-button @click="toggleEdit(item)">Ubah</b-button>

                  <b-button @click="toggleDelete(item)">Hapus</b-button>
                </b-button-group>
              </b-button-toolbar>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
    <!-- DIALOG -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <form @submit.prevent="saveTransaksi">
            <v-card-title>
              <span class="headline">Tambahkan Jenis Transaksi</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Nama Transaksi*"
                      v-model="nama_transaksi"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Kode Transaksi*"
                      v-model="kode_transaksi"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*wajib diisi</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                type="button"
                text
                @click="
                  {
                    nama_transaksi = '';
                    kode_transaksi = '';
                    id_transaksi = '';
                    dialog = false;
                    isEdit = false;
                  }
                "
                >Close</v-btn
              >
              <v-btn color="blue darken-1" type="submit" text>Save</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import Swal from "sweetalert2";
/*eslint-disable*/
import { mapState } from "vuex";
import {
  MJENISTRANSAKSI,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_GET_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
} from "../../../store/index";
export default {
  name: "DataAkad",
  data: () => {
    return {
      nama_transaksi: "",
      kode_transaksi: "",
      id_transaksi: "",
      dialog: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      header: (state) => state.master.jenistransaksi.header,
      items: (state) => state.master.datajenistransaksi,
    }),
    search: {
      get() {
        return this.$store.state.master.jenistransaksi.search;
      },
      set(val) {
        this.$store.commit("master/setjenisTransaksiSearch", val);
      },
    },
  },
  created() {
    this.getTransaksi();
  },
  methods: {
    getTransaksi() {
      this.$store
        .dispatch("master/" + ACTION_GET_DATA_MASTER, {
          mastertype: MJENISTRANSAKSI,
          path: "jenis-transaksi",
        })
        .then((res) => {
          if (res) return this.getTransaksi();
        });
    },
    toggleEdit(jenistransaksi) {
      this.dialog = !this.dialog;
      this.nama_transaksi = jenistransaksi.nama_transaksi;
      this.kode_transaksi = jenistransaksi.kode_transaksi;
      this.id_transaksi = jenistransaksi.id;
      this.isEdit = true;
    },
    toggleDelete(jenistransaksi) {
      Swal.fire({
        title: "Yakin menghapus " + jenistransaksi.nama_transaksi + " ?",
        text: "Data akann dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("master/" + ACTION_DELETE_DATA_MASTER, {
              mastertype: MJENISTRANSAKSI,
              path: "jenis-transaksi",
              body: jenistransaksi,
            })
            .then(({ success, message }) => {
              if (success) {
                Swal.fire("Dihapus!", message, "success");
              }
            });
        }
      });
    },
    saveTransaksi() {
      if (this.isEdit) {
        //edit
        this.$store
          .dispatch("master/" + ACTION_PUT_DATA_MASTER, {
            mastertype: MJENISTRANSAKSI,
            path: `jenis-transaksi`,
            body: {
              id: this.id_transaksi,
              nama_transaksi: this.nama_transaksi,
              kode_transaksi: this.kode_transaksi,
            },
          })
          .then(({ success, message }) => {
            Swal.fire({
              title: "",
              text: message,
              icon: "success",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialog = !this.dialog;
              }
            });
          });
      } else {
        //upload
        this.$store
          .dispatch("master/" + ACTION_POST_DATA_MASTER, {
            mastertype: MJENISTRANSAKSI,
            path: "jenis-transaksi",
            body: {
              nama_transaksi: this.nama_transaksi,
              kode_transaksi: this.kode_transaksi,
            },
          })
          .then(({ success, message }) => {
            Swal.fire({
              title: "",
              text: message,
              icon: "success",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialog = !this.dialog;
              }
            });
          });
      }
    },
  },
};
</script>
