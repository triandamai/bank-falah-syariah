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
        <router-link to="/system/adduser">
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
        <v-card>
          <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
              v-model="user.search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            flat
            class="elevation-0"
            :headers="user.headers"
            :items="users"
            :search="user.search"
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
                  <b-button>Ubah</b-button>
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
import { headerdatausers, ACTION_GET_USER } from "..";
import { mapState } from "vuex";
export default {
  name: "User",
  data: () => {
    return {
      user: {
        headers: headerdatausers,
        search: "",
      },
    };
  },
  computed: {
    ...mapState({
      users: (state) => {
        //  console.log(state);
        return state.system.datausers;
      },
    }),
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$store.dispatch(ACTION_GET_USER).then((res) => {
        if (res) {
          this.getUsers();
        }
      });
    },
    getColor(isActive) {
      if (!isActive) return "red";
      else return "green";
    },
    deleteUser(user) {},
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
