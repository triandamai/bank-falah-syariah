<template>
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Menu Administrator</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-col>
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
      </v-col>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text @click="tree = []">
        Reset
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn class="white--text" color="green darken-1" depressed>
        Save
        <v-icon right>mdi-content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
/*eslint-disable*/
import { defaultMenu } from "@/store";
export default {
  name: "MenuSystem",
  data: () => ({
    header: [
      { text: "URL", value: "path" },
      { text: "Name", value: "name" },
      { text: "Deskripsi", value: "description" },
      { text: "Grup", value: "privilages" },
      { text: "Aksi", value: "action" },
    ],
    items: defaultMenu(),
    search: "",
  }),

  mounted() {
    console.log(defaultMenu());
  },
  methods: {},
};
</script>
