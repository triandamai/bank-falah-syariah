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
                :items="nasabah"
                :headers="headers"
                @onAdd="$router.push({ name: 'addnasabah' })"
                @edit="onChange"
                @delete="onDelete"
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
import header from "../../data/headernasabah.json";
import { ACTION_GET_NASABAH } from "../../store/modules/nasabah";
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
      nasabah: (state) => state.nasabah.datanasabah,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch(`nasabah/${ACTION_GET_NASABAH}`).then((res) => {
        if (res) {
          this.getData();
        }
      });
    },
    onChange(nasabah) {
      this.$router.push({ path: `nasabah/edit/${nasabah.id}` });
    },
    onDelete(nasabah) {
      this.$swal({
        text: "Are you sure you want to do this?",
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      });
    },
  },
};
</script>