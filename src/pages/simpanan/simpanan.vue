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
import header from "../../data/headersimpanan.json";
import {
  ACTION_GET_DATA_REKENING,
  RSIMPANAN,
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
      items: (state) => state.rekening.datasimpanan,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`rekening/${ACTION_GET_DATA_REKENING}`, {
          mastertype: RSIMPANAN,
          path: "rekening_simpanan",
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