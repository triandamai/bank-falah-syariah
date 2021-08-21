<template>
  <v-row justify="center">
    <v-dialog
        v-model="show"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >

      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn dark icon @click="hidden">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Transaksi Simpanan Setor NonTunai')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="onSubmit">
              {{$t('Save')}}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container class="pt-md-6 pt-lg-6 pt-sm-6">
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="4">
              <v-autocomplete
                  v-model="form.nasabah_id"
                  label="Nasabah *"
                  :items="nasabah"
                  item-text="nama_lengkap"
                  item-value="id"
                  auto-select-first
                  outlined
                  required

                  small-chips
              />
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="4">
              <v-text-field
                  v-model="form.nomor_rekening"
                  label="Nomor Rekening"
                  placeholder="01100XXXX"
                  outlined

              />
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4">
              <vuetify-money
                  v-model="form.value"
                  :label="$t('Jumlah')"
                  v-bind:options="options"
                  v-bind:outlined="'outlined'"
                  required
              />
            </v-col>

          </v-row>
        </v-container>
      </v-card>
      <v-overlay :value="overlay" :z-index="99">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-dialog>

  </v-row>
</template>
<script>
import { ACTION_TRANSACTION, TABUNGAN_SETOR_NONTUNAI} from "@/store"
import {getCurrendUserId} from "@/services/jwt.service"
import {getTodayDate} from "@/utils/utils"
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      overlay:false,
      form:{}
    };
  },

  methods: {

    onSubmit(){
      this.overlay = true
      this.form.tgl_transaksi = getTodayDate()
      this.form.petugas_id = getCurrendUserId()
      this.$store.dispatch(ACTION_TRANSACTION,{payload:this.form,type:TABUNGAN_SETOR_NONTUNAI})
          .then(()=>{
            this.overlay = false

          })
    },
  }
};
</script>
