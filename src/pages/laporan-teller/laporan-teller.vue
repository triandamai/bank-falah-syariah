<template>
  <div>
    <Breadcrumbs title="Akad" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 project-list">
          <div class="card">
            <div class="row">
              <div class="col-sm-12 p-0">
                <pdf
                  src="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
                />
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
