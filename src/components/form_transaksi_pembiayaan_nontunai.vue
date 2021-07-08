<template>
  <v-card flat>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12"
            ><v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.jenistransaksi"
                  label="Jenis Transaksi *"
                  :items="jenistransaksi"
                  item-text="nama_transaksi"
                  item-value="kode_transaksi"
                  auto-select-first
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
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
                      v-model="form.tanggal_transaksi"
                      label="Tanggal Transaksi"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                    />
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="form.tanggal_transaksi"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.nomor_rekening"
                  label="Nomor Rekening *"
                  :items="rekening"
                  item-text="nama_lengkap"
                  item-value="id"
                  auto-select-first
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.referensi" label="Nama" dense />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.referensi" label="Alamat" dense />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="12"
            ><v-row
              ><v-col cols="12">
                <v-text-field
                  v-model="form.no_jurnal"
                  label="No. Jurnal"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.referensi"
                  label="No. referensi"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.referensi"
                  label="Nama Produk"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.referensi" label="Saldo" dense />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.referensi"
                  label="Terbilang"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.referensi"
                  label="Nilai Transaksi"
                  dense
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.referensi"
                  label="Keterangan"
                  dense
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close', dialog.value)">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      datepicker: null,
      form: {},
      itemnasabah: [],
    };
  },

  computed: {
    ...mapState({
      jenistransaksi: (state) => state.master.datajenistransaksi,
    }),
  },
  methods: {
    save(date) {
      this.$refs.datepicker.save(date);
    },
  },
};
</script>
