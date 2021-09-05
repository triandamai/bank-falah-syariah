<template>
  <div class="card-body">
    <div class="col-sm-12">
      <v-stepper v-model="step" non-linear class="elevation-0">
        <v-stepper-header class="elevation-0">
          <v-stepper-step editable :complete="step > 1" :step="1">
            {{$t('Data Umum')}}
          </v-stepper-step>
          <v-divider/>

          <v-stepper-step editable :complete="step > 2" :step="2">
            {{$t('Data Alamat')}}
          </v-stepper-step>
          <v-divider/>

          <v-stepper-step editable :complete="step > 3" :step="3">
            {{ $t('Data Pekerjaan') }}
          </v-stepper-step>
          <v-divider/>

          <v-stepper-step editable :complete="step > 4" :step="4">
            {{ $t('Simpanan') }}
          </v-stepper-step>
          <v-divider/>
          <v-stepper-step editable :complete="step > 5" :step="5">
            {{ $t('Pembiayaan') }}
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-container class="pt-md-2 pt-lg-2 pt-sm-2">
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.kode_nasabah"
                    label="Kode Nasabah"
                    placeholder="kode Nasabah"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.nama_lengkap"
                    label="Nama Lengkap"
                    placeholder="Nama Lengkap"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.nama_panggilan"
                    label="Nama panggilan"
                    placeholder="Nama Panggilan"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-select
                    :items="jenis_kelamin"
                    v-model="form.jenis_kelamin"
                    item-text="label"
                    item-value="value"
                    label="Jenis Kelamin"
                    auto-select-first
                    dense
                    outlined
                    small-chips
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-select
                    :items="jenis_identitas"
                    v-model="form.jenis_identitas_id"
                    item-text="label"
                    item-value="value"
                    label="Jenis Identitas"
                    auto-select-first
                    dense
                    outlined
                    small-chips
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.no_identitas"
                    label="Nomor Identitas"
                    placeholder="Nomor Identitas"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-select
                    :items="agama"
                    v-model="form.agama_id"
                    item-text="label"
                    item-value="value"
                    label="Agama"
                    auto-select-first
                    dense
                    outlined
                    small-chips
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-select
                    :items="pendidikan"
                    v-model="form.pendidikan_id"
                    item-text="label"
                    item-value="value"
                    label="Pendidikan"
                    auto-select-first
                    small-chips
                    dense
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-select
                    :items="status_martial"
                    v-model="form.status_martial_id"
                    item-text="label"
                    item-value="value"
                    label="Status Martial"
                    auto-select-first
                    small-chips
                    dense
                    outlined
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.nama_ibu_kandung"
                    label="Nama Ibu Kandung"
                    placeholder="Nama Ibu Kandung"
                    outlined
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
                        v-model="form.tanggal_lahir"
                        label="Tanggal Lahir"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="form.tanggal_lahir"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-btn @click="goForward" outlined small>{{$t('Selanjutnya')}}</v-btn>
              <v-btn @click="removeBackStack" text>{{$t('Kembali')}} </v-btn>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-container class="pt-md-2 pt-lg-2 pt-sm-2">
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-autocomplete
                    v-model="form.provinsi"
                    label="Provinsi *"
                    :items="provinsi"
                    item-text="provNama"
                    @change="provinsiChange"
                    auto-select-first
                    return-object
                    outlined
                    required
                    dense
                    small-chips
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-autocomplete
                    label="Kabupaten *"
                    v-model="form.kabupaten"
                    :items="kabupaten"
                    item-text="kabNama"
                    @change="kabupatenChange"
                    auto-select-first
                    return-object
                    outlined
                    required
                    dense
                    small-chips
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-autocomplete
                    label="Kecamatan *"
                    v-model="form.kecamatan"
                    :items="kecamatan"
                    item-text="kecNama"
                    @change="kecamatanChange"
                    auto-select-first
                    return-object
                    outlined
                    dense
                    required
                    small-chips
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-autocomplete
                    label="Desa *"
                    v-model="form.desa"
                    :items="desa"
                    item-text="desNama"
                    auto-select-first
                    return-object
                    outlined
                    required
                    dense
                    small-chips
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.alamat"
                    label="Alamat"
                    placeholder="Alamat Lengkap"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.tlpkantor"
                    label="Telp Kantor"
                    placeholder="No Telpon Kantor"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.no_hp"
                    label="Hp"
                    placeholder="No Handphone"
                    type="phonenumber"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    outlined
                    dense
                  /> </v-col
              >
              </v-row>
              <v-btn @click="goForward" outlined small> {{$t('Selanjutnya')}} </v-btn>

              <v-btn @click="goBack" text> {{$t('Sebelumnya')}} </v-btn>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-container class="pt-md-4 pt-lg-4 pt-sm-4">
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-select
                    :items="jenis_pekerjaan"
                    v-model="form.jenis_pekerjaan_id"
                    item-text="label"
                    item-value="value"
                    label="Pekerjaan"
                    auto-select-first
                    dense
                    outlined
                    small-chips
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.nama_perusahaan"
                    label="Nama Perusahaan"
                    placeholder="Nama Perusahaan"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    v-model="form.nama_atasan"
                    label="Nama Atasan"
                    placeholder="Nama Atasan"
                    outlined
                    dense
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <vuetify-money
                      v-model="form.penghasilan_perbulan"
                      :label="$t('Penghasilan Perbulan')"
                      v-bind:options="options"
                      v-bind:outlined="'outlined'"
                      dense
                      required
                  ></vuetify-money>

                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <vuetify-money
                      v-model="form.penghasilan_pertahun"
                      :label="$t('Penghasilan Pertahun')"
                      v-bind:options="options"
                      v-bind:outlined="'outlined'"
                      dense
                      required
                  ></vuetify-money>

                </v-col>
              </v-row>
              <v-btn @click="goForward" outlined small> {{$t('Selanjutnya')}} </v-btn>

              <v-btn @click="goBack" text> {{$t('Sebelumnya')}} </v-btn>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-container class="pt-md-4 pt-lg-4 pt-sm-4">
              <v-row>

                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-autocomplete
                      v-model="form.produk"
                      label="Produk *"
                      :items="itemsproduct"
                      item-text="nama_produk"
                      return-object
                      dense
                      required
                      outlined
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                      v-model="rasio_nasabah"
                      label="Rasio Nasabah*"
                      suffix="%"
                      dense
                      required
                      outlined
                      type="number"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                      v-model="rasio_bank"
                      label="Rasio Bank*"
                      suffix="%"
                      dense
                      required
                      outlined
                      type="number"
                  />

                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <vuetify-money
                      v-model="form.nominal"
                      :label="$t('Nominal')"
                      v-bind:options="options"
                      v-bind:outlined="'outlined'"
                      dense
                      required
                  ></vuetify-money>

                </v-col>
              </v-row>
              <v-btn @click="goForward" outlined small> {{$t('Selanjutnya')}} </v-btn>

              <v-btn @click="goBack" text> {{$t('Sebelumnya')}} </v-btn>
            </v-container>
          </v-stepper-content>
          <v-stepper-content step="5">
            <v-container class="pt-md-4 pt-lg-4 pt-sm-4">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-autocomplete
                      v-model="form.produk"
                      label="Produk *"
                      :items="itemsproduct"
                      item-text="nama_produk"
                      return-object
                      dense
                      required
                      outlined
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                      v-model="rasio_nasabah"
                      label="Rasio Nasabah*"
                      suffix="%"
                      dense
                      required
                      outlined
                      type="number"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                      v-model="rasio_bank"
                      label="Rasio Bank*"
                      suffix="%"
                      dense
                      required
                      outlined
                      type="number"
                  />

                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <vuetify-money
                      v-model="form.nominal"
                      :label="$t('Nominal')"
                      v-bind:options="options"
                      v-bind:outlined="'outlined'"
                      dense
                      required
                  ></vuetify-money>

                </v-col>
              </v-row>
              <v-btn @click="onSubmit" outlined small> {{$t('Save')}} </v-btn>

              <v-btn @click="goBack" text> {{$t('Sebelumnya')}} </v-btn>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import {
  ACTION_GET_WILAYAH,
  WPROVINSI,
  WKABUPATEN,
  WKECAMATAN,
  WDESA,
} from "@/store/modules/wilayah";
import componentmixin from "@/mixin/component.mixin"

export default {
mixins:[componentmixin],
  data() {
    return {
      step: 1,
      datepicker: false,
      itemsproduct:[],
      form: {
        nama_lengkap: "",
        nama_panggilan: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        active: 1,
        rasio_nasabah: null,
        rasio_bank: null,
        nominal:null,
      },
    };
  },
  mounted() {
    if (this.isEdit) {
      this.getDataById();
    }
    this.getProvinsi();
    this.getDataProductByTypeRekening("simpanan")
    this.getDataProductByTypeRekening("pembiayaan")
  },
  created() {
    window.addEventListener("keydown", (e) => {
      //if Enter go to next
      if (e.key === "Enter") {
        if (this.step === 5) return this.onSubmit();
        this.goForward();
      }
    });
  },
  methods: {
    getDataProductByTypeRekening(type){
      ApiService.get(`/produk?type=${type}`).then(({success,data})=>{
        if(success){
          this.itemsproduct = data
          console.log(this.itemsproduct)
          // {
          //   "id": 3,
          //     "tipe_produk": 1,
          //     "kode_produk": "0101",
          //     "nama_produk": "Simpanan Wadi'ah",
          //     "tipe_akad": "",
          //     "kode_akad": "",
          //     "nama_akad": "",
          //     "administrasi": 1000,
          //     "saldo_minimum": 10000,
          //     "setoran": 0,
          //     "nisbah": "",
          //     "zakat": 0,
          //     "pajak": 0,
          //     "bonus": 2,
          //     "jangka_waktu": "",
          //     "created_at": "2021-05-20 21:44:00",
          //     "updated_at": "2021-05-20 21:44:49"
          // }
        }
      })
    },
    goBack() {
      if (this.step > 1) this.step = parseInt( this.step- 1)

    },
    goForward() {
      if(this.step < 4) this.step = parseInt( this.step + 1)
    },
    removeBackStack(){
      this.$router.go(-1)
    },
    getDataById() {
      if (!this.$route.params.id) return this.$router.go(-1);
      this.form.id = this.$route.params.id;
      ApiService.get(`nasabah/${this.$route.params.id}`)
        .then(({ status, data }) => {
          if (status === 200 || status === 201) {
            if (data.data.length > 0) {
              this.form = data.data[0];
            }
          }
        })

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
    onSubmit() {
      this.form.active = 1
      this.$emit("submit", this.form);
    },
  },
};
</script>
