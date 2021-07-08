<template>
  <div>
    <Breadcrumbs main="Widgets" title="Projects" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 project-list">
          <div class="card">
            <div class="row">
              <div class="col-sm-12 p-0">
                <b-tabs content-class="mt-3">
                  <b-tab active>
                    <template v-slot:title>
                      <feather type="target"></feather> Tunai
                    </template>
                    <b-card-text>
                      <div class="col-sm-12 p-0">
                        <div class="card">
                          <div class="card-body">
                            <div class="row">
                              <form-transaksi-simpanan-tunai />
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                  <b-tab>
                    <template v-slot:title>
                      <feather type="info"></feather> NonTunai
                    </template>
                    <b-card-text>
                      <div class="col-sm-12 p-0">
                        <div class="card">
                          <div class="card-body">
                            <div class="row">
                              <form-transaksi-simpanan-nontunai />
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import header from "../../data/headerakad.json";

import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      formakad: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.dataakad,
    }),
  },

  methods: {
    onSubmit(data) {},

    onAdd() {
      this.body = { active: 1 };
      this.formakad = true;
      this.isEdit = false;
    },
    onEdit(data) {
      this.body = data;
      this.formakad = true;
      this.isEdit = true;
    },
  },
};
</script>