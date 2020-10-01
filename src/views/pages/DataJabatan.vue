<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <strong>Data Jabatan</strong>
        </v-col>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                  <v-btn color="primary" dark small @click="tambahJabatan">
                    Tambah Jabatan
                  </v-btn>
                </v-col>
                <v-spacer> </v-spacer>
                <v-text-field
                  class="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2"
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Cari User"
                  single-line
                  small
                  hide-details
                ></v-text-field>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="data"
              item-key="name"
              class="elevation-1"
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
import TambahJabatan from "../../components/TambahJabatan.vue";
export default {
  name: "DataUser",
  components: {
    TambahJabatan
  },
  data: function() {
    return {
      search: "",
      loading: true
    };
  },
  computed: {
    data() {
      return this.$store.getters.getdatajabatan;
    },
    dialog() {
      return this.$store.getters.getdialogtambahjabatan;
    },
    headers() {
      return this.$store.getters.getheaderdatajabatan;
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
    },
    tambahJabatan() {
      this.$store.dispatch("showdialogtambahjabatan", !this.dialog);
    }
  }
};
</script>

<style></style>
