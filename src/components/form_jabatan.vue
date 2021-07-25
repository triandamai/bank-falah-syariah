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
                  v-model="form.nama_jabatan"
                  label="Nama Jabatan*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.deskripsi"
                  label="Deskripsi*"
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
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      form: {
        nama_jabatan: "",
        deskripsi: "",
      },
    };
  },
};
</script>