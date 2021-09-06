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
        <v-toolbar elevation="0" color="primary" dark>Form Simpanan</v-toolbar>
        <v-card-text>
          <v-tabs>
            <v-tab>{{$t('Nasabah')}}</v-tab>
            <v-tab>{{$t('Rekening')}}</v-tab>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.nama_lengkap"
                        label="Nama Lengkap"
                        placeholder="Nama Lengkap"
                        dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.nama_panggilan"
                        label="Nama panggilan"
                        placeholder="Nama Panggilan"
                        dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-select
                        :items="jenis_kelamin"
                        v-model="formnasabah.jenis_kelamin"
                        item-text="label"
                        item-value="value"
                        label="Jenis Kelamin"
                        auto-select-first
                        dense
                        small-chips
                    ></v-select>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <v-select
                        :items="jenis_identitas"
                        v-model="formnasabah.jenis_identitas_id"
                        item-text="label"
                        item-value="value"
                        label="Jenis Identitas"
                        auto-select-first
                        dense
                        small-chips
                    />
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <v-text-field
                        v-model="formnasabah.no_identitas"
                        label="Nomor Identitas"
                        placeholder="Nomor Identitas"
                        dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-select
                        :items="agama"
                        v-model="formnasabah.agama_id"
                        item-text="label"
                        item-value="value"
                        label="Agama"
                        auto-select-first
                        dense
                        small-chips
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-select
                        :items="pendidikan"
                        v-model="formnasabah.pendidikan_id"
                        item-text="label"
                        item-value="value"
                        label="Pendidikan"
                        auto-select-first
                        small-chips
                        dense
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-select
                        :items="status_martial"
                        v-model="formnasabah.status_martial_id"
                        item-text="label"
                        item-value="value"
                        label="Status Martial"
                        auto-select-first
                        small-chips
                        dense

                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.nama_ibu_kandung"
                        label="Nama Ibu Kandung"
                        placeholder="Nama Ibu Kandung"
                        dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-menu
                        ref="datepicker"
                        v-model="datepicker"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formnasabah.tanggal_lahir"
                            label="Tanggal Lahir"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            dense

                        ></v-text-field>
                      </template>
                      <v-date-picker
                          ref="picker"
                          v-model="formnasabah.tanggal_lahir"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <v-autocomplete
                        v-model="formnasabah.provinsi"
                        label="Provinsi *"
                        :items="provinsi"
                        item-text="provNama"
                        @change="provinsiChange"
                        auto-select-first
                        return-object
                        required
                        dense
                        small-chips
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <v-autocomplete
                        label="Kabupaten *"
                        v-model="formnasabah.kabupaten"
                        :items="kabupaten"
                        item-text="kabNama"
                        @change="kabupatenChange"
                        auto-select-first
                        return-object
                        required
                        dense
                        small-chips
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <v-autocomplete
                        label="Kecamatan *"
                        v-model="formnasabah.kecamatan"
                        :items="kecamatan"
                        item-text="kecNama"
                        @change="kecamatanChange"
                        auto-select-first
                        return-object
                        dense
                        required
                        small-chips
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" lg="6">
                    <v-autocomplete
                        label="Desa *"
                        v-model="formnasabah.desa"
                        :items="desa"
                        item-text="desNama"
                        auto-select-first
                        return-object
                        required
                        dense
                        small-chips
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.alamat"
                        label="Alamat"
                        placeholder="Alamat Lengkap"

                        dense
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.tlpkantor"
                        label="Telp Kantor"
                        placeholder="No Telpon Kantor"
                        dense
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.no_hp"
                        label="Hp"
                        placeholder="No Handphone"
                        type="phonenumber"

                        dense
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.email"
                        label="Email"
                        placeholder="Email"
                        type="email"

                        dense
                    /> </v-col
                  >
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-select
                        :items="jenis_pekerjaan"
                        v-model="formnasabah.jenis_pekerjaan_id"
                        item-text="label"
                        item-value="value"
                        label="Pekerjaan"
                        auto-select-first
                        dense

                        small-chips
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.nama_perusahaan"
                        label="Nama Perusahaan"
                        placeholder="Nama Perusahaan"
                        dense
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field
                        v-model="formnasabah.nama_atasan"
                        label="Nama Atasan"
                        placeholder="Nama Atasan"
                        dense
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <vuetify-money
                        v-model="formnasabah.penghasilan_perbulan"
                        :label="$t('Penghasilan Perbulan')"
                        v-bind:options="options"
                        dense
                        required
                    ></vuetify-money>

                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <vuetify-money
                        v-model="form.penghasilan_pertahun"
                        :label="$t('Penghasilan Pertahun')"
                        v-bind:options="options"
                        dense
                        required
                    ></vuetify-money>

                  </v-col>
                </v-row>

              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-autocomplete
                        v-model="form.produk_id"
                        label="Produk *"
                        :items="itemsproduk"
                        item-text="nama_produk"
                        item-value="id"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                        v-model="rasio_nasabah"
                        label="Rasio Nasabah*"
                        suffix="%"
                        required
                        type="number"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6">
                    <v-text-field
                        v-model="rasio_bank"
                        label="Rasio Bank*"
                        suffix="%"
                        required
                        type="number"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <vuetify-money
                        v-model="form.setoran_awal"
                        :label="$t('Nominal')"
                        v-bind:options="options"
                        dense
                        required
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>

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
  ACTION_GET_WILAYAH,
  MPEGAWAI,
  MPRODUK, WDESA, WKABUPATEN, WKECAMATAN, WPROVINSI,
  ACTION_PUT_NASABAH,
  RTABUNGAN, ACTION_PUT_DATA_REKENING
} from "@/store/index";
import componentMixin from "@/mixin/component.mixin"
import ApiService from "@/services/api.service";
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      form:{},
      formnasabah:{},
      datepicker:null,
    };
  },
  watch:{
    show:function(newVal){
      if(newVal){
        this.getNasabah()
        this.getProvinsi()
      }
    }
  },
  mounted() {
    this.getProduk();
    this.getPegawai();
  },
  methods: {
    getNasabah() {
      ApiService.get(`/nasabah/${this.form.nasabah_id}`).then(({success,data})=>{
        if(success){
          this.formnasabah = data[0]
        }
      })
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
    getProvinsi() {
      this.$store
          .dispatch(ACTION_GET_WILAYAH, { type: WPROVINSI })
          .then((res) => {
            if (res) {
              this.getProvinsi();
            }
          });
    },
    provinsiChange(data) {
      this.getKabupaten(data.provIdProvinsi);
    },
    getKabupaten(query) {
      this.$store
          .dispatch(ACTION_GET_WILAYAH, {
            type: WKABUPATEN,
            query: query,
          })
          .then((res) => {
            if (res) {
              this.getKabupaten(query);
            }
          });
    },
    kabupatenChange(data) {
      this.getKecamatan(data.kabIdKabupaten);
    },
    getKecamatan(query) {
      this.$store
          .dispatch(ACTION_GET_WILAYAH, { type: WKECAMATAN, query: query })
          .then((res) => {
            if (res) {
              this.getKecamatan(query);
            }
          });
    },
    kecamatanChange(data) {
      this.getDesa(data.kecIdKecamatan);
    },
    getDesa(query) {
      this.$store
          .dispatch(ACTION_GET_WILAYAH, { type: WDESA, query: query })
          .then((res) => {
            if (res) {
              this.getDesa(query);
            }
          });
    },
    save(date) {
      this.$refs.datepicker.save(date);
    },
    submit(){
      this.formnasabah.active = 1
      this.$store.dispatch(ACTION_PUT_NASABAH,this.formnasabah).then(({success})=>{
        if(success){
          this.saveRekening()
        }
      })
    },
    saveRekening(){
      this.$store.dispatch(ACTION_PUT_DATA_REKENING,{
        type:RTABUNGAN,
        body:this.form
      })
      .then(({success})=>{
        if(success){
          this.$emit("close",true)
        }
      })
    }
  },
};
</script>