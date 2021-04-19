<template>
  <div>
    <Breadcrumbs title="Sample Page" />
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
                @onAdd="formakad = true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-akad :show="formakad" @close="formakad = false" @submit="onSubmit" />
  </div>
</template>

<script>
import DataTable from "../../components/datatable.vue";
import FormAkad from "../../components/form_akad.vue";
import header from "../../data/headerakad.json";
import { ACTION_GET_DATA_MASTER, MAKAD } from "../../store/modules/master";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
    FormAkad,
  },
  data: () => {
    return {
      headers: header,
      formakad: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.dataakad,
    }),
  },
  created() {
    this.getAkad();
  },
  methods: {
    getAkad() {
      this.$store
        .dispatch(`master/${ACTION_GET_DATA_MASTER}`, {
          mastertype: MAKAD,
          path: "akad",
        })
        .then((res) => {
          if (res) {
            this.getAkad();
          }
        });
    },
    onSubmit(data) {
      console.log(data);
    },
  },
};
</script>