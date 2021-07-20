<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Produk</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_produk"
                  label="Nama *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                    v-model="form.tipe_produk"
                    label="Tipe *"
                    required
                    :items="tipe_produk"
                    item-text="text"
                    item-value="val"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.kode_produk"
                  label="Kode *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.minimum_saldo"
                    label="Minimum Saldo *"
                    type="number"
                    prefix="Rp "
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close(dialog.value)"
          >
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
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
      form: {
        nama_akad: "",
        akad_id: "",
      },
    };
  },
  computed: {
    ...mapState({
      itemsakad: (state) => state.master.dataakad,
    }),
  },
};
</script>
