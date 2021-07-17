<template>

    <footer class="footer ">
      <div class="container-fluid ">
        <div class="row">
          <div class="col-md-12 col-lg-12 col-sm-12 col-12 col-xs-12 footer-copyright text-center">
            <p class="mb-5">
              Copyright 2020 © Bank Falah Syariah by BakaranProject
            </p>
          </div>
        </div>
      </div>
    </footer>

</template>

<script>
import json from "../data/menu";
export default {
  name: "footerpage",
  data() {
    return {
      customizer: false,
      data:
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(json)),
    };
  },
};
</script>
