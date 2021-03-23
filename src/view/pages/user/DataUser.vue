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
          <b-button class="mr-3" variant="success"
            >Tambahkan User Baru</b-button
          >
        </router-link>

        <b>Data User</b>

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
        <v-card dark>
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
  </div>
</template>
<script>
/*eslint-disable*/
import Swal from "sweetalert2";
import {
  ACTION_GET_DATA_SYSTEM,
  ACTION_DELETE_DATA_SYSTEM,
  SUSER,
} from "@/store";
import { mapState } from "vuex";
export default {
  name: "User",
  computed: {
    ...mapState({
      items: (state) => state.system.datausers,
      header: (state) => state.system.user.header,
    }),
    search: {
      get() {
        return this.$store.state.system.user.search;
      },
      set(val) {
        this.$store.commit("system/setUserSearch", val);
      },
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$store
        .dispatch("system/" + ACTION_GET_DATA_SYSTEM, {
          systemtype: SUSER,
          path: "users",
        })
        .then((res) => {
          if (res) {
            this.getUsers();
          }
        });
    },
    getColor(isActive) {
      if (!isActive) return "red";
      else return "green";
    },
    deleteUser(user) {
      Swal.fire({
        title: "Yakin menghapus " + user.username + " ?",
        text: "User yang dihapus akan hilang permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("system/" + ACTION_DELETE_DATA_SYSTEM, {
              systemtype: SUSER,
              path: "user",
              body: user,
            })
            .then(({ success, message }) => {
              if (success) {
                Swal.fire("Dihapus!", message, "success");
              }
            });
        }
      });
    },
    editUser(user) {
      Swal.fire({
        title: "Rubah data " + user.username + " ?",
        text: "Anda akan di arahkan ke halaman edit data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke, lanjut!",
        cancelButtonText: "Ga jadi",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ path: "/user/ubah/" + user.id });
        }
      });
    },
  },
};
</script>
<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
</style>
