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
        <b-button
          @click="
            {
              dialog = true;
              isEdit = false;
            }
          "
          class="mr-3"
          variant="success"
          >Tambahkan Akad Baru</b-button
        >

        <b>Data Akad</b>

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
                  <b-button
                    @click="
                      {
                        isEdit = true;
                        dialog = true;
                      }
                    "
                    >Ubah</b-button
                  >
                  <b-button>Detail</b-button>
                  <b-button @click="deleteAkad(item)">Hapus</b-button>
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
          <form @submit.prevent="saveAkad">
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Tipe*"
                      v-model="tipe_akad"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      label="Nama*"
                      v-model="nama_akad"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Deskripsi*"
                      v-model="kode_akad"
                      type="text"
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
                    name = null;
                    description = null;
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
  ACTION_GET_DATA_MASTER,
  MAKAD,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
} from "../../../store";
export default {
  name: "DataAkad",
  data: () => {
    return {
      tipe_akad: "",
      nama_akad: "",
      kode_akad: "",
      active: "",
      id: "",
      dialog: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      header: (state) => state.master.akad.header,
      items: (state) => state.master.dataakad,
    }),
    search: {
      get() {
        return this.$store.state.master.akad.search;
      },
      set(val) {
        this.$store.commit("master/setAkadSearch", val);
      },
    },
  },
  created() {
    this.getAkad();
  },
  methods: {
    getAkad() {
      this.$store
        .dispatch("master/" + ACTION_GET_DATA_MASTER, {
          mastertype: MAKAD,
          path: "akad",
        })
        .then((res) => {
          if (res) {
            this.getAkad();
          }
        });
    },
    saveAkad() {
      if (this.isEdit) {
        this.$store
          .dispatch("master/" + ACTION_PUT_DATA_MASTER, {
            mastertype: MAKAD,
            path: "akad",
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
      } else {
        this.$store
          .dispatch("master/" + ACTION_POST_DATA_MASTER, {
            mastertype: MAKAD,
            path: "akad",
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
    deleteAkad(akad) {
      Swal.fire({
        title: "Yakin menghapus " + akad.name + " ?",
        text: "User yang dihapus akan hilang permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("master/" + ACTION_DELETE_DATA_MASTER, {})
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
