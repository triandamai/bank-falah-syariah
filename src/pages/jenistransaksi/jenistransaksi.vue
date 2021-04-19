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
import header from "../../data/headerjenistransaksi.json";
import {
  ACTION_GET_DATA_MASTER,
  MJENISTRANSAKSI,
} from "../../store/modules/master";
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
      items: (state) => state.master.dataproduk,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`master/${ACTION_GET_DATA_MASTER}`, {
          mastertype: MJENISTRANSAKSI,
          path: "jenis-transaksi",
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