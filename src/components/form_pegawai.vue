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
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.fullname"
                  label="Nama Lengkap*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  v-model="form.jabatan_id"
                  :items="itemsjabatan"
                  item-value="id"
                  item-text="nama_jabatan"
                  label="Jabatan*"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.tempat_lahir"
                  label="Tempat Lahir*"
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
            @click="$emit('close', dialog.value)"
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
import { ACTION_GET_DATA_MASTER, MJABATAN } from "@/store";
import { mapState } from "vuex";
export default {
  props: ["show", "body"],
  data: () => {
    return {
      form: {},
    };
  },
  computed: {
    ...mapState({
      itemsjabatan: (state) => state.master.datajabatan,
    }),
  },
  watch: {
    body: function (newVal) {
      this.form = newVal;
    },
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
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>