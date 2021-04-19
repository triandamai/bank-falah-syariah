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
              <div class="col-sm-12">
                <form-wizard
                  shape="square"
                  color="#4466f2"
                  title=""
                  subtitle=""
                >
                  <tab-content title="Personal details" icon="fa fa-user">
                    <div class="setup-content" id="step-1">
                      <div class="col-xs-12">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">First Name</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Johan"
                              required="required"
                            />
                          </div>
                          <div class="form-group">
                            <label class="control-label">Last Name</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Deo"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </tab-content>
                  <tab-content title="Additional Info" icon="fa fa-cog">
                    <div class="setup-content" id="step-2">
                      <div class="col-xs-12">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">Email</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="name@example.com"
                              required="required"
                            />
                          </div>
                          <div class="form-group">
                            <label class="control-label">Password</label>
                            <input
                              class="form-control"
                              type="password"
                              placeholder="Password"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </tab-content>
                  <tab-content title="Last step" icon="fa fa-check">
                    <div class="setup-content" id="step-3">
                      <div class="col-xs-12">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">Birth date</label>
                            <input
                              class="form-control"
                              type="date"
                              required="required"
                            />
                          </div>
                          <div class="form-group">
                            <label class="control-label">Have Passport</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="yes / no"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </tab-content>
                </form-wizard>
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
import DataTable from "../../components/datatable.vue";
export default {
  components: {
    DataTable,
  },
  data: () => {
    return {
      items: [],
      headers: [],
    };
  },
  methods: {
    add() {},
  },
};
</script>