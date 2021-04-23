<template>
  <v-card flat :dark="theme">
    <v-card-title>
      <v-btn v-show="!hideadd" @click="$emit('add', true)" outlined small
        >Tambah</v-btn
      >
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table flat :headers="headers" :items="items" :search="search">
      <template v-slot:[`item.action`]="{ item }">
        <b-button-toolbar
          aria-label="Toolbar with button groups and dropdown menu"
        >
          <b-button-group class="mx-1">
            <v-btn
              v-show="!hideupdate"
              @click="$emit('edit', item)"
              outlined
              small
              >Ubah</v-btn
            >
            <v-btn
              v-show="!hidedelete"
              @click="$emit('delete', item)"
              outlined
              small
              >Hapus</v-btn
            >
          </b-button-group>
        </b-button-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["items", "headers", "hideadd", "hidedelete", "hideupdate"],
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.layout.isDark,
    }),
  },
};
</script>