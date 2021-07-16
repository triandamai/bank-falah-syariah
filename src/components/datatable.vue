<template>
  <v-card flat :dark="theme">
    <v-card-title>
      <v-btn
        data-testid="button"
        v-show="!hideadd"
        @click="$emit('add', true)"
        outlined
        small
        >{{ $t("Add") }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        :label="$t('Search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table flat :headers="headers" :items="items" :search="search">
      <template v-slot:item.jenis_kelamin="{ item }">
        {{item.jenis_kelamin == "L" ?'Laki-Laki':'Perempuan'}}
      </template>
      <template v-slot:item.active="{ item }">
        <v-chip
            :color="getColor(item.active)"
            dark
        >
          {{ item.active > 0 ? 'Aktif':'Non-Aktif' }}
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="$emit('edit', item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="$emit('delete', item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="initialize"
        >
          Reset
        </v-btn>
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
  methods:{
    getColor (active) {
      if (active > 0) return 'green'
      return 'orange'

    },
  }
};
</script>