/*eslint-disable*/
<template>
  <div class="d-flex flex-column flex-root" v-if="isAuthenticated">
    <!-- begin:: Header Mobile -->
    <header-mobile />
    <!-- end:: Header Mobile -->

    <Loader v-if="loaderEnabled" v-bind:logo="loaderLogo" />

    <div class="d-flex flex-row flex-column-fluid page">
      <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Header -->
        <Header />
        <!-- end:: Header -->

        <!-- begin:: Content -->
        <div
          id="kt_content"
          class="content d-flex flex-column flex-column-fluid"
        >
          <!-- begin:: Content Body -->
          <div class="d-flex flex-column-fluid">
            <div
              :class="{
                'container-fluid': contentFluid,
                container: !contentFluid,
              }"
            >
              <div class="d-lg-flex flex-row-fluid">
                <!-- begin:: Aside Left -->
                <Aside v-if="asideEnabled" />
                <!-- end:: Aside Left -->
                <div class="content-wrapper flex-row-fluid">
                  <transition name="fade-in-up">
                    <router-view />
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>

    <sticky-toolbar v-if="toolbarDisplay" />
    <scroll-top />
  </div>
</template>

<script>
/*disable-eslint*/
import { mapGetters } from "vuex";
import Aside from "../components/aside/Aside.vue";
import Header from "../components/header/Header.vue";
import HeaderMobile from "../components/header/HeaderMobile.vue";
import Footer from "../components/footer/Footer.vue";
import HtmlClass from "@/core/services/htmlclass.service";
import StickyToolbar from "../components/offcanvas/StickyToolbar.vue";
import ScrollTop from "../components/offcanvas/ScrollTop.vue";
import Loader from "../components/content/Loader.vue";
import { ADD_BODY_CLASSNAME, REMOVE_BODY_CLASSNAME } from "../../store";

export default {
  name: "Layout",
  components: {
    Aside,
    Header,
    HeaderMobile,
    Footer,
    StickyToolbar,
    ScrollTop,
    Loader,
  },
  beforeMount() {
    // show page loading
    this.$store.dispatch(ADD_BODY_CLASSNAME, "page-loading");

    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  },
  mounted() {
    // check if current user is authenticated
    if (!this.isAuthenticated) {
      this.$router.push({ name: "login" });
    }

    // Simulate the delay page loading
    setTimeout(() => {
      // Remove page loader after some time
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, "page-loading");
    }, 2000);
  },
  methods: {
    footerLayout(type) {
      return this.layoutConfig("footer.layout") === type;
    },
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "breadcrumbs",
      "pageTitle",
      "layoutConfig",
    ]),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig("loader.type"));
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig("content.width") === "fluid";
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return process.env.BASE_URL + this.layoutConfig("loader.logo");
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig("aside.self.display");
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      return !!this.layoutConfig("toolbar.display");
      //return true;
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig("subheader.display");
    },
  },
};
</script>
