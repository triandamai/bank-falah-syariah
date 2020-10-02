<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <strong>Role Akses</strong>
        </v-col>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <v-card>
            <v-tabs
              dark
              background-color="primary"
              show-arrows
              small
              dense
              flat
            >
              <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

              <v-tab v-for="(item, i) in tab" :key="i" :href="'#tab-' + i">
                {{ item.name }}
              </v-tab>
            </v-tabs>
          </v-card>
          <v-card class="mt-5">
            <v-data-table
              :headers="headers"
              :items="data"
              item-key="name"
              class="elevation-1 py-2"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              show-select
              loading
              loading-text="Mengambil Data "
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <TambahJabatan></TambahJabatan>
  </div>
</template>

<script>
export default {
  name: "RoleAkses",

  data: function() {
    return {
      search: "",
      loading: true,
      tab: [
        {
          id: 1,
          name: "Admin User"
        },
        {
          id: 2,
          name: "Admin Master"
        },
        {
          id: 1,
          name: "Admin Register"
        },
        {
          id: 1,
          name: "Admin Teller"
        },
        {
          id: 1,
          name: "Admin Umum"
        },
        {
          id: 1,
          name: "Admin Accounting"
        },
        {
          id: 1,
          name: "Admin Otomasi"
        },
        {
          id: 1,
          name: "Admin Manajer"
        }
      ]
    };
  },
  computed: {
    data() {
      return this.$store.getters.getdataroleakses;
    },

    headers() {
      return this.$store.getters.getheaderroleakses;
    }
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().indexOf(search) !== -1
      );
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    }
  }
};
</script>

<style></style>
