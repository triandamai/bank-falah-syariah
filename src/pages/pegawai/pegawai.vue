<template>
  <div>
    <Breadcrumbs title="Simpanan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Master Data Pegawai</h5>
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
import header from "../../data/headerpegawai.json";
import { ACTION_GET_DATA_MASTER, MPEGAWAI } from "../../store/modules/master";
import { mapState } from "vuex";
export default {
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
        .dispatch(ACTION_GET_DATA_MASTER, {
          type: MPEGAWAI,
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
        });
    },
  },
};
</script>