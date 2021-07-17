<template>
  <div>
    <Breadcrumbs title="Akad" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Menu</h5>
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
                @edit="form = true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-menu
      :show="form"
      :roles="roles"
      :groups="groups"
      @close="form = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "@/data/headermenu.json";

import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      form: false,
      body: {},
      roles: [],
      groups: [],
      index: null,
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.menu.data,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch(`menu/getMenu`).then(({ success }) => {
        if(success){
          this.$store.commit('setLoading',false)
        }
      });
    },
    onEdit(menu) {
      this.form = true;
      this.index = menu.idx;
      this.roles = menu.privilage.roles;
      this.groups = menu.privilage.groups;
    },
    onSubmit(data) {
      this.$store
        .dispatch(`menu/updateMenu`, data)
        .then(({ success, message }) => {
          if (success) {
            this.getData();
          }
        });
    },
  },
};
</script>