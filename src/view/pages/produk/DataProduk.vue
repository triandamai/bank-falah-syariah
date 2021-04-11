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
              nama_produk = null;
              tipe_produk = null;
              id = null;
              kode_produk = null;
              akad_id = null;
            }
          "
          class="mr-3"
          variant="success"
          >Tambahkan Produk Baru</b-button
        >

        <b>Data Produk</b>

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
            Produk
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
              <v-chip>
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
                  <b-button
                    @click="
                      {
                        dialog = true;
                        isEdit = true;
                        kode_produk = item.kode_produk;
                        nama_produk = item.nama_produk;
                        akad_id = item.akad_id;
                        tipe_produk = item.tipe_produk;
                        id = item.id;
                      }
                    "
                    >Ubah</b-button
                  >
                  <b-button>Detail</b-button>
                  <b-button @click="deleteProduk(item)">Hapus</b-button>
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
          <form @submit.prevent="saveProduk">
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Kode*"
                      v-model="kode_produk"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Nama*"
                      v-model="nama_produk"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="tipe*"
                      v-model="tipe_produk"
                      type="text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Akad*"
                      v-model="akad_id"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                type="button"
                text
                @click="
                  {
                    dialog = false;
                    isEdit = false;
                    tipe_produk = null;
                    kode_produk = null;
                    nama_produk = null;
                    akad_id = null;
                    id = null;
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
/*eslint-disable*/
import { mapState } from "vuex";
import {
  ACTION_DELETE_DATA_MASTER,
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  MPRODUK,
} from "../../../store";
export default {
  name: "DataAkad",
  data: () => {
    return {
      tipe_produk: "",
      kode_produk: "",
      nama_produk: "",
      akad_id: "",
      id: "",
      dialog: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      header: (state) => state.master.produk.header,
      items: (state) => state.master.dataproduk,
    }),
    search: {
      get() {
        return this.$store.state.master.produk.search;
      },
      set(val) {
        this.$store.commit("master/setProdukSearch", val);
      },
    },
  },
  created() {},
  methods: {
    /***
     * get produk and always get if res = true
     *
     */
    getProduk() {
      this.$store
        .dispatch("master/" + ACTION_GET_DATA_MASTER, {
          mastertype: MPRODUK,
          path: "produk",
        })
        .then((res) => {
          if (res) {
            this.getProduk();
          }
        });
    },
    /***
     *
     * save data to serice for update or post
     *
     * */
    saveProduk() {
      if (this.isEdit) {
        //edit
        this.$store
          .dispatch("master/" + ACTION_PUT_DATA_MASTER, {
            mastertype: MPRODUK,
            path: "produk",
            body: {},
          })
          .then(({ success, message }) => {
            if (success) {
              Swal.fire({
                title: "",
                text: message,
                icon: "success",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialog = "";
                  this.description = "";
                  this.isEdit = false;
                  this.id = "";
                }
              });
            } else {
              Swal.fire({
                title: "",
                text: message,
                icon: "error",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialog = "";
                  this.description = "";
                  this.isEdit = false;
                  this.id = "";
                }
              });
            }
          });
      } else {
        //post
        this.$store
          .dispatch("master/" + ACTION_POST_DATA_MASTER, {
            mastertype: MPRODUK,
            path: "produk",
            body: {},
          })
          .then(({ success, message }) => {
            if (success) {
              Swal.fire({
                title: "",
                text: message,
                icon: "success",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialog = "";
                  this.description = "";
                  this.isEdit = false;
                  this.id = "";
                }
              });
            } else {
              Swal.fire({
                title: "",
                text: message,
                icon: "error",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialog = "";
                  this.description = "";
                  this.isEdit = false;
                  this.id = "";
                }
              });
            }
          });
      }
    },
    deleteProduk(produk) {
      Swal.fire({
        title: "Yakin menghapus " + produk.nama_produk + " ?",
        text: "User yang dihapus akan hilang permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("system/" + ACTION_DELETE_DATA_MASTER, {
              mastertype: MPRODUK,
              path: "produk",
              body: {},
            })
            .then(({ success, message }) => {
              if (success) {
                Swal.fire({
                  title: "",
                  text: message,
                  icon: "success",
                  confirmButtonText: "Oke",
                }).then((result) => {
                  if (result.isConfirmed) {
                  }
                });
              } else {
                Swal.fire({
                  title: "",
                  text: message,
                  icon: "error",
                  confirmButtonText: "Oke",
                }).then((result) => {
                  if (result.isConfirmed) {
                  }
                });
              }
            });
        }
      });
    },
  },
};
</script>
