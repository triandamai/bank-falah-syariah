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

    <v-data-table
        :loading="loading"
        loading-text="Loading... Please wait"
        flat :headers="headers" :items="items" :search="search">
      <template v-slot:item.jenis_kelamin="{ item }">
        {{item.jenis_kelamin == "L" ?'Laki-Laki':'Perempuan'}}
      </template>
      <template v-slot:item.pegawai="{ item }">
        {{item.pegawai.fullname}}
      </template>
      <template v-slot:item.jabatan="{ item }">
        {{item.jabatan.nama_jabatan}}
      </template>
      <template v-slot:item.tipe_produk="{ item }">
        {{getTipeProduk(item.tipe_produk)}}
      </template>
      <template v-slot:item.lama_angsuran="{ item }">
        {{item.tipe_angsuran == 1 ? `${item.lama_angsuran} Minggu`:`${item.lama_angsuran} Hari`}}
      </template>
      <template v-slot:item.nasabah="{ item }">
        {{item.nasabah.nama_lengkap}}
      </template>
      <template v-slot:item.produk="{ item }">
        {{item.produk.nama_produk}}
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
      loading:true
    };
  },
  watch:{
    items:function(){
      this.loading= false
    }
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
    getTipeProduk(tipe){
      if(tipe === 1) return "Simpanan"
      if (tipe === 2) return "Pembiayaan"
      if(tipe === 3) return "Deposito"

      return "Tidak diketahui"
    }
  }
};
</script>