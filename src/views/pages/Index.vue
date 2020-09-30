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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  data: () => ({
    messages: [
      {
        from: "You",
        message: "Sure, I'll see you later.",
        time: "10:42am",
        color: "deep-purple lighten-1",
      },
      {
        from: "John Doe",
        message: "Yeah, sure. Does 1:00pm work?",
        time: "10:37am",
        color: "green",
      },
      {
        from: "You",
        message: "Did you still want to grab lunch today?",
        time: "9:47am",
        color: "deep-purple lighten-1",
      },
    ],
  }),
  components: {},
};
</script>

<style></style>
