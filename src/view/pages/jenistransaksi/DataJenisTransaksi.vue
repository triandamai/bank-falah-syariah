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
    <!-- DIALOG -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <form @submit.prevent="saveTransaksi">
            <v-card-title>
              <span class="headline">User Profile</span>
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
  MJENISTRANSAKSI,
  ACTION_POST_DATA_MASTER,
  ACTION_GET_DATA_MASTER,
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
    saveTransaksi() {
      if (this.isEdit) {
        //edit
      } else {
        //upload
        this.$store
          .dispatch("master/" + ACTION_POST_DATA_MASTER, {
            mastertype: MJENISTRANSAKSI,
            path: "/jenis-transaksi",
            body: {
              nama_transaksi: this.nama_transaksi,
              kode_transaksi: this.kode_transaksi,
            },
          })
          .then(({ success, message }) => {
            console.log(success);
            console.log(message);
          });
      }
    },
  },
};
</script>
