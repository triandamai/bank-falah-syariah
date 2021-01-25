<template>
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Menu Administrator</v-toolbar-title>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-card-text>
          <v-expansion-panels
            v-for="(route, index) in routes"
            :key="index"
            flat
          >
            <v-expansion-panel>
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4" class="text-left">
                    {{ route.menu_name }}
                  </v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0">
                        Pilih role untuk {{ route.menu_name }}
                      </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <b-form-group :label="'path: ' + route.menu_url">
                  <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="selected"
                    name="flavour-2"
                  >
                    <b-form-checkbox value="orange">Orange</b-form-checkbox>
                    <b-form-checkbox value="apple">Apple</b-form-checkbox>
                    <b-form-checkbox value="pineapple"
                      >Pineapple</b-form-checkbox
                    >
                    <b-form-checkbox value="grape">Grape</b-form-checkbox>
                  </b-form-checkbox-group>
                </b-form-group>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="12" md="6">
        <v-card-text>
          <div
            v-if="tree.length === 0"
            key="title"
            class="title font-weight-light grey--text pa-4 text-center"
          >
            Pilih role yang boleh mengakses
          </div>

          <v-scroll-x-transition group hide-on-leave>
            <v-card-text v-for="(selection, i) in tree" :key="i">
              <div class="title font-weight-light grey--text pa-4 text-center">
                Select your favorite breweries
              </div>
            </v-card-text>
          </v-scroll-x-transition>
        </v-card-text>
      </v-col>
    </v-row>

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
</template>
<script>
/*eslint-disable*/
import { menu } from "@/store";
export default {
  name: "MenuSystem",
  data: () => ({
    routes: menu,
    breweries: [],
    isLoading: false,
    tree: [],
    types: [],
    open: false,
    selected: [],
    options: ["Admin", "Super"],
  }),

  mounted() {
    // console.log(menu);
  },
  methods: {},
};
</script>
