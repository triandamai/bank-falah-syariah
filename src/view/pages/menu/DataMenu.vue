<template>
  <div>
    <v-card flat dark>
      <v-toolbar color="primary" flat>
        <v-toolbar-title>Menu Administrator</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-col>
          <v-data-table
            flat
            class="elevation-0"
            :headers="header"
            :items="items"
            :search="search"
            data-app
          >
            <template v-slot:[`item.privilages`]="{ item }">
              <v-chip
                v-for="(priv, index) in item.privilages"
                :key="index"
                class="ma-2"
                color="pink"
                label
                small
                text-color="white"
              >
                {{ priv }}
              </v-chip>
            </template>
            <template v-slot:[`item.action`]>
              <v-btn
                small
                @click="dialog = true"
                class="ma-2"
                outlined
                color="indigo"
                >Ubah Grup</v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text @click="tree = []">
          Reset
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn class="white--text" color="green darken-1" depressed>
          Save
          <v-icon right>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- DIALOG -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <form @submit.prevent="">
            <v-card-title>
              <span class="headline">Yang dapat mengakses menu</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <p>{{ selected }}</p>
                <v-checkbox
                  v-model="selected"
                  label="John"
                  value="John"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Jacob"
                  value="Jacob"
                ></v-checkbox>
              </v-container>

              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                type="button"
                text
                @click="
                  {
                    dialog = false;
                  }
                "
                >Close</v-btn
              >
              <v-btn color="blue darken-1" type="submit" text>Save</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
/*eslint-disable*/
import { defaultMenu } from "@/store";
export default {
  name: "MenuSystem",
  data: () => ({
    header: [
      { text: "URL", value: "path" },
      { text: "Name", value: "name" },
      { text: "Deskripsi", value: "description" },
      { text: "Grup", value: "privilages" },
      { text: "Aksi", value: "action" },
    ],
    items: defaultMenu(),
    selected: "",
    search: "",
    dialog: false,
  }),

  mounted() {
    console.log(defaultMenu());
  },
  methods: {},
};
</script>
