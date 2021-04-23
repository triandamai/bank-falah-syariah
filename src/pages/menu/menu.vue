<template>
  <div>
    <Breadcrumbs title="Akad" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Sample Card</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>
            <div class="card-body">
              <data-table
                :items="items"
                :headers="headers"
                :hidedelete="true"
                :hideadd="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-menu
      :show="form"
      :body="body"
      @close="form = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "../../data/headermenu.json";

import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      form: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.menu.menu,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch(`menu/getMenu`).then(({ success }) => {});
    },
    onSubmit(data) {
      this.$store
        .dispatch(`menu/updateMenu`, this.items)
        .then(({ success, message }) => {
          if (success) {
            this.getData();
          }
        });
    },
  },
};
</script>