<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Ubah Akses Menu</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.roles"
                  label="Role*"
                  :items="itemsrole"
                  item-text="name"
                  item-value="id"
                  auto-select-first
                  chips
                  multiple
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  label="Group*"
                  v-model="form.groups"
                  :items="itemsgroup"
                  item-text="name"
                  item-value="id"
                  auto-select-first
                  chips
                  multiple
                  required
                ></v-autocomplete>
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
import { mapState } from "vuex";
export default {
  props: ["show", "roles", "groups"],
  data: () => {
    return {
      form: {
        roles: [],
        groups: [],
      },
    };
  },
  computed: {
    ...mapState({
      itemsrole: (state) => state.system.dataroles,
      itemsgroup: (state) => state.system.datagroups,
    }),
  },
  watch: {
    roles: function (newVal) {
      this.form.roles = newVal;
    },
    groups: function (newVal) {
      this.form.groups = newVal;
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>