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
                  v-model="form.username"
                  label="Username*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  type="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  v-model="form.role_id"
                  :items="itemsrole"
                  item-value="id"
                  item-text="name"
                  label="Role*"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.group_id"
                  :items="itemsgroup"
                  item-value="id"
                  item-text="name"
                  label="Group*"
                  required
                ></v-autocomplete>
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
import { mapState } from "vuex";
export default {
  props: ["show", "body"],
  data: () => {
    return {
      form: {
        username: "",
        email: "",
        role_id: "",
        group_id: "",
        active: 1,
      },
    };
  },
  computed: {
    ...mapState({
      itemsrole: (state) => state.system.datarole,
      itemsgroup: (state) => state.system.datagroup,
    }),
  },
  watch: {
    body: function (newVal) {
      this.form = newVal;
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>