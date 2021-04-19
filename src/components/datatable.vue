<template>
  <v-card flat>
    <v-card-title>
      <v-btn @click="$emit('onAdd', true)" outlined small>Tambah</v-btn>
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
            <v-btn @click="$emit('edit', item)" outlined small>Ubah</v-btn>
            <v-btn @click="$emit('delete', item)" outlined small>Hapus</v-btn>
          </b-button-group>
        </b-button-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["items", "headers"],
  data() {
    return {
      search: "",
    };
  },
};
</script>