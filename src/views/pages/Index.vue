<template>
  <div>
    <v-container dense>
      <v-row>
        <v-col cols="12">
          <strong>Dashboard</strong>
        </v-col>
        <v-col class="col col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <v-card>
            <v-card-title class="primary white--text mt-8">
              <v-avatar size="56">
                <img
                  alt="user"
                  mb="10"
                  src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                />
              </v-avatar>
              <p class="ml-3">
                Bakaran Project
              </p>
            </v-card-title>

            <v-card-title>Jabatan</v-card-title>

            <v-card-text>
              <div class="my-4 subtitle-1">
                Cabang
              </div>

              <div>
                1.01.02.01 - KAS TELLER
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <div class="my-4 subtitle-1">
                Kas
              </div>

              <div>
                0
              </div>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col class="col-sm-4 col-xs-12 col-md-4 col-lg-4 ml-2 mr-2">
                  <v-btn color="primary" small text>
                    Ubah Profil
                  </v-btn>
                </v-col>
                <v-col class="col-sm-4 col-xs-12 col-md-4 col-lg-4 mr-2 ml-2">
                  <v-btn color="primary" small text>
                    Ubah Password
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>

          <v-card class="mt-5">
            <v-card-title>Pertumbuhan Anggota</v-card-title>
            <vue-funnel-graph
              :width="width"
              :height="height"
              :labels="labels"
              :values="values"
              :colors="colors"
              :sub-labels="subLabels"
              :direction="direction"
              :gradient-direction="gradientDirection"
              :animated="true"
              :display-percentage="true"
            ></vue-funnel-graph>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VueFunnelGraph } from "vue-funnel-graph-js";
export default {
  name: "Index",
  data: () => ({
    labels: ["Calon Anggota", "Anggota", "Anggota Luar Biasa"],
    subLabels: ["50", "60", "70", "80", "90"],
    values: [
      // with the given Labels and SubLabels here's what the values represent:
      //
      // Direct, Social, Ads
      //    |      |     |
      //    v      v     v
      [3000, 2500, 6500, 5678, 567, 56], // Segments of "Impressions" from top to bottom
      [3000, 1700, 1000, 954, 678, 567], // Segments of "Add To Cart"
      [600, 200, 130, 100, 90, 80] // Segments of "Buy"
    ],
    colors: [
      ["#FFB178", "#FF3C8E"], // color set for "Impressions" segment
      ["#A0BBFF", "#EC77FF"], // color set for "Add To Cart" segment
      ["#A0F9FF", "#7795FF"] // color set for "Buy" segment
    ],
    direction: "horizontal",
    gradientDirection: "horizontal",
    height: 200,
    width: 400
  }),
  components: { VueFunnelGraph }
};
</script>

<style></style>
