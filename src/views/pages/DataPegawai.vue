<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <strong>Data Pegawai</strong>
        </v-col>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md12 col-lg-12">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                  <v-btn color="primary" dark small @click="tambahpegawai">
                    Tambah Pegawai
                  </v-btn>
                </v-col>
                <v-spacer> </v-spacer>
                <v-text-field
                  class="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2"
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  small
                  hide-details
                ></v-text-field>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              item-key="name"
              class="elevation-1"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              show-select
              loading
              loading-text="Loading... Please wait"
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
    <tambah-pegawai></tambah-pegawai>
  </div>
</template>

<script>
import TambahPegawai from "../../components/TambahPegawai.vue";
export default {
  name: "DataPegawai",
  components: {
    TambahPegawai
  },
  data: function() {
    return {
      search: "",
      calories: "",
      loading: true,
      desserts: [
        {
          id: "000002",
          nip: "000003",
          nama: "Trian damai",
          jk: "LAKI-LAKI",
          jabatan: "Officer",
          status: "AKTIF"
        }
      ]
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "ID PEGAWAI",
          align: "start",
          sortable: false,
          value: "id"
        },
        {
          text: "NIP",
          value: "nip"
          //   filter: (value) => {
          //     if (!this.calories) return true;

          //     return value < parseInt(this.calories);
          //   },
        },
        { text: "NAMA LENGKAP", value: "nama" },
        { text: "JENIS KELAMIN", value: "jk" },
        { text: "JABATAN", value: "jabatan" },
        { text: "STATUS", value: "status" },
        { text: "AKSI", value: "actions", sortable: false }
      ];
    }
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
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
    tambahpegawai() {
      this.$store.dispatch("actiontambahpegawai", true);
    }
  }
};
</script>

<style></style>
