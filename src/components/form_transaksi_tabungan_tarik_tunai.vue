<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >

      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn dark icon @click="hidden">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="onSubmit">
              Save
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
                  dense
                  small-chips
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="4">
              <v-text-field
                  v-model="form.nomor_rekening"
                  label="Nomor Rekening"
                  placeholder="01100XXXX"
                  outlined
                  dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="4">
              <v-text-field
                  v-model="form.value"
                  label="Jumlah"
                  placeholder="0"
                  prefix="Rp"
                  outlined
                  dense
              ></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import {ACTION_GET_NASABAH, ACTION_TRANSACTION, TABUNGAN_TARIK_TUNAI} from "@/store"
import {getCurrendUserId, getTodayDate} from "@/services/jwt.service"
import {mapState} from "vuex"
export default {
  props: ["show"],
  data: () => {
    return {
      dialog: false,
      form:{}
    };
  },
  watch: {
    show: function (newVal) {
      this.dialog = newVal;
    },
  },
  computed:{
    ...mapState({
      nasabah: (state)=> state.nasabah.datanasabah
    })
  },

  methods: {
    hidden() {
      this.$store.commit("hideForm", {});
    },
    onSubmit(){
      this.form.tgl_transaksi = getTodayDate()
      this.form.petugas_id = getCurrendUserId()
      this.$store.dispatch(ACTION_TRANSACTION,{payload:this.form,type:TABUNGAN_TARIK_TUNAI})
          .then(({success,message})=>{
            this.$toasted.show(
                success
                    ? this.$t("Success Message", { context: `${message}` })
                    : this.$t("Failed Message", { context: `${message}` }),
                {
                  theme: "bubble",
                  position: "top-right",
                  type: success ? "success" : "error",
                  duration: 4000,
                }
            );
          })
    },

  }
};
</script>
