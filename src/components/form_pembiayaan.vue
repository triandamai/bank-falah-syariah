<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
    scrollable
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Pembiayaan</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.nasabah_id"
                  label="Nasabah *"
                  :items="itemsnasabah"
                  item-text="nama_lengkap"
                  item-value="id"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-dialog
                  ref="dialog_pencairan"
                  v-model="modal_tgl_pencairan"
                  :return-value.sync="form.tgl_pencairan"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.tgl_pencairan"
                      label="Tanggal Pencairan*"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.tgl_pencairan" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog_pencairan.save(form.tgl_pencairan)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" md="6">
                <v-dialog
                  ref="dialog_jatuh_tempo"
                  v-model="modal_tgl_jatuh_tempo"
                  :return-value.sync="form.tgl_jatuh_tempo"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.tgl_jatuh_tempo"
                      label="Tanggal Jatuh Tempo*"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form.tgl_jatuh_tempo" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.dialog_jatuh_tempo.save(form.tgl_jatuh_tempo)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.produk_id"
                  label="Produk *"
                  :items="itemsproduk"
                  item-text="nama_produk"
                  item-value="id"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.pegawai_id"
                  label="Pegawai *"
                  :items="itemspegawai"
                  item-text="fullname"
                  item-value="id"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.tipe_angsuran"
                  label="Tipe Angsuran *"
                  :items="tipe_angsuran"
                  item-text="text"
                  item-value="val"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.lama_angsuran"
                  label="Lama Angsuran *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.modal"
                  label="Modal *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>{{$t('indicates required field')}}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="close( dialog.value)"
          >
            {{$t('Close')}}
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> {{$t('Save')}} </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>

import {
  ACTION_GET_DATA_MASTER,
  ACTION_GET_NASABAH,
  MPRODUK,
  MPEGAWAI,
} from "@/store/index";
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      modal_tgl_pencairan: false,
      modal_tgl_jatuh_tempo: false,
      form: {
        tgl_pencairan: "",
        tgl_jatuh_tempo: "",
        nasabah_id: "",
        produk_id: "",
        pegawai_id: "",
        lama_angsuran: "",
        tipe_angsuran: "",
        modal: "",
      },
    };
  },
  mounted() {
    this.getNasabah();
    this.getProduk();
    this.getPegawai();
  },
  methods: {
    getNasabah() {
      this.$store.dispatch(ACTION_GET_NASABAH).then((isNext) => {
        if (isNext) return this.getNasabah();
      });
    },
    getProduk() {
      this.$store
        .dispatch(ACTION_GET_DATA_MASTER, { type: MPRODUK })
        .then((isNext) => {
          if (isNext) return this.getProduk();
        });
    },
    getPegawai() {
      this.$store
        .dispatch(ACTION_GET_DATA_MASTER, { type: MPEGAWAI })
        .then((isNext) => {
          if (isNext) return this.getPegawai();
        });
    },
  },
};
</script>