<template>
  <div>
    <Breadcrumbs title="Personalisasi" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Aplikasi</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>
            <div class="card-body">
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label"
                          >Nama Aplikasi</label
                        >
                        <div class="col-sm-9">
                          <b-form-input
                            type="text"
                            placeholder="Masukkan Nama Aplikasi"
                          ></b-form-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="col-sm-9 offset-sm-3">
                    <b-button type="submit" variant="primary" class="mr-1"
                      >Simpan</b-button
                    >
                    <b-button type="reset" variant="light">Batal</b-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
};
</script>
