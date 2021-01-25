<template>
  <div data-app>
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
        <b-button @click="dialog = !dialog" class="mr-3" variant="success"
          >Tambahkan Role Baru</b-button
        >

        <b>Data Role</b>

        <!-- <a
          class="font-weight-bold"
          href="https://vuetifyjs.com/en/components/data-tables"
          target="_blank"
        >
          See documentation.
        </a> -->
      </div>
    </b-alert>
    <!-- TABLE -->
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
            ><template v-slot:[`item.active`]="{ item }">
              {{ item.active == 1 ? "aktif" : "nonaktif" }}
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
                  <b-button @click="dialog = !dialog">Ubah</b-button>
                  <b-button>Detail</b-button>
                  <b-button @click="deleteRole(item)">Hapus</b-button>
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
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    label="Nama*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Deskripsi*"
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
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="dialog = false"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
/*eslint-disable*/
import { ACTION_GET_ROLE } from "@/store";
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "RoleSystem",
  computed: {
    ...mapState({
      items: (state) => state.system.dataroles,
      header: (state) => state.system.role.header,
    }),
    search: {
      get() {
        return this.$store.state.system.role.search;
      },
      set(val) {
        this.$store.commit("system/setRoleSearch", val);
      },
    },
    dialog: {
      get() {
        return this.$store.state.system.role.dialog;
      },
      set(val) {
        this.$store.commit("system/showRoleDialog", val);
      },
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$store.dispatch("system/" + ACTION_GET_ROLE).then((res) => {
        if (res) {
          this.getUsers();
        }
      });
    },
    deleteRole(role) {
      Swal.fire({
        title: "Yakin menghapus " + role.name + " ?",
        text: "User yang dihapus akan hilang permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    },
  },
};
</script>
