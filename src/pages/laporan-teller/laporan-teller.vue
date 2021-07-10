<template>
  <div>
    <Breadcrumbs title="Nasabah" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Nasabah</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>

            <div class="card-body"></div>
          </div>
          <div class="card">
            <div class="card-header">
              <h5>Data Nasabah</h5>
            </div>

            <div class="card-body">
              <pdf
                src="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
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
import pdf from "vue-pdf-cdn";
export default {
  components: {
    pdf,
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>
