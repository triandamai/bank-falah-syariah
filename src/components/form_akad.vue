<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>{{$t('Form Akad')}}</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                    v-model="form.nama_produk"
                    :label="$t('Name of Akad')"
                    required
                    :items="nama_akad"
                    item-text="name"
                    item-value="value"
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                    v-model="form.tipe_produk"
                    :label="$t('Type of Akad')"
                    required
                    :items="tipe_produk"
                    item-text="text"
                    item-value="val"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                    v-model="form.kode_produk"
                    :label="$t('Kode Product')"
                    :rules="rules"
                    type="number"
                    required
                />
              </v-col>
              <v-col cols="12">
                <vuetify-money
                    v-model="form.saldo_minimum"
                    :label="$t('Minimum Saldo')"
                    v-bind:options="options"
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
            @click="close(dialog.value)"
          >
            {{ $t('Close') }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> {{ $t('Save') }} </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>

import { mapState } from "vuex";
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      max:2,
      form: {
        nama_akad: "",
        akad_id: "",
      },
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length <= 2) || 'Max 2 characters',
      ],
    };
  },
  computed: {

    ...mapState({
      itemsakad: (state) => state.master.dataakad,
    }),
  },
};
</script>
