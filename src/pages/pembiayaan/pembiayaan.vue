<template>
  <div>
    <Breadcrumbs title="Pembiayaan" />
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
                @onAdd="$router.push({ name: 'addnasabah' })"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import DataTable from "../../components/datatable.vue";
import header from "../../data/headerpembiayaan.json";
import {
  ACTION_GET_DATA_REKENING,
  RPEMBIAYAAN,
} from "../../store/modules/rekening";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
  },
  data: () => {
    return {
      headers: header,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.rekening.datapembiayaan,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`rekening/${ACTION_GET_DATA_REKENING}`, {
          mastertype: RPEMBIAYAAN,
          path: "rekening_pembiayaan",
        })
        .then((res) => {
          if (res) {
            this.getData();
          }
        });
    },
  },
};
</script>