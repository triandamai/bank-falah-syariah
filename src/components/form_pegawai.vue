<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form User</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nip"
                  label="Nip*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.fullname"
                  label="Nama Lengkap*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.tempat_lahir"
                    label="Tempat Lahir*"
                    required
                />
              </v-col>
              <v-col cols="12">
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

                    />
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
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.jabatan_id"
                  :items="itemsjabatan"
                  item-value="id"
                  item-text="nama_jabatan"
                  label="Jabatan*"
                  required
                />
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
import { ACTION_GET_DATA_MASTER, MJABATAN } from "@/store";
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      datepicker: false,
      form: {},
    };
  },
  mounted() {
    this.getJabatan();
  },
  methods: {
    getJabatan() {
      this.$store
        .dispatch(ACTION_GET_DATA_MASTER, { type: MJABATAN })
        .then((isNext) => {
          if (isNext) return this.getJabatan();
        });
    },
    save(date) {
      this.$refs.datepicker.save(date);
    }
  },


};
</script>