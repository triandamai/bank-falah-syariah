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
        :loading="loadingtable"
        :loading-text="$t('Wait Loading')"
        flat :headers="headers" :items="items" :search="search">
      <template v-slot:item.tempat_lahir="{item}">
        {{`${item.tempat_lahir},${item.tanggal_lahir}`}}
      </template>
      <template v-slot:item.saldo_minimum="{item}">
        Rp {{formatCurrency(item.saldo_minimum)}}
      </template>
      <template v-slot:item.no_rekening="{ item }">
        <router-link :to="getRouteMutasi(item)"> {{item.no_rekening }}</router-link>
      </template>
      <template v-slot:item.jenis_kelamin="{ item }">
        {{item.jenis_kelamin === "L" ? $t('Male'):$t('Female')}}
      </template>
      <template v-slot:item.pegawai="{ item }">
        {{item.pegawai.fullname}}
      </template>
      <template v-slot:item.modal="{ item }">
       Rp {{formatCurrency(item.modal)}}
      </template>
      <template v-slot:item.jabatan="{ item }">
        {{item.jabatan.nama_jabatan}}
      </template>
      <template v-slot:item.tipe_produk="{ item }">
        {{getTipeProduk(item.tipe_produk)}}
      </template>
      <template v-slot:item.lama_angsuran="{ item }">
        {{item.tipe_angsuran === 1 ? `${item.lama_angsuran} ${$t('Weeks')}`:`${item.lama_angsuran} ${$t('Days')}`}}
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
      <template v-slot:item.updated_at="{ item }">
        {{convertReadableDate(item.updated_at)}}
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
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  props: ["items", "headers", "hideadd", "hidedelete", "hideupdate"],
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.layout.isDark,
      loadingtable:(state)=>  state.loadingtable
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
    },
    getRouteMutasi(mutasi){
      if(mutasi.tipe_angsuran){

        const data ={
         path: `/main/mutasi/pembiayaan`,
          query:{
            r:this.encryptPlain(mutasi.no_rekening),
            q:Date.now(),
            s:'f6ce8d9efde6'
          }
        }
        return data
      }
      const data ={
        path: `/main/mutasi/simpanan`,
        query:{
          r:this.encryptPlain(mutasi.no_rekening),
          q:Date.now(),
          s:'f6ce8d9efde6'
        }
      }
      return data
    }
  }
};
</script>