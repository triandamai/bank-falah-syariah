<template>
  <div
    class="header-wrapper row m-0"
    style="padding-top: 5px; padding-bottom:5px;"
  >

    <div class="header-logo-wrapper">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="img-fluid" src="../assets/images/logo/logo.webp" alt />
        </router-link>
      </div>
      <div class="toggle-sidebar" @click="toggle_sidebar">
        <feather
          class="status_toggle middle sidebar-toggle"
          type="sliders"
          id="sidebar-toggle"
        ></feather>
      </div>
    </div>
    <div class="left-header col horizontal-wrapper pl-0">
      <ul class="horizontal-menu">
        <li class="mega-menu outside">

        </li>

      </ul>
    </div>
    <!-- search -->
    <div class="nav-right col-8 pull-right right-header p-0 pb-3 pt-3">
      <ul class="nav-menus">
        <li class="language-nav">
          <b-dropdown
            id="langddm"
            class="translate_wrapper ml-2"
            variant="light"
            size="sm"
            toggle-class="language-button"
          >
            <template slot="button-content">
              <!-- <i class="flag-icon" :class="langIcon"></i> -->
              <span class="name">{{ $i18n.locale }}</span>
            </template>
            <b-dropdown-item
              v-for="(l, index) in localeOptions"
              :key="index"
              @click="changeLocale(l)"
            >
<!--              <i class="flag-icon" :class="l.icon"></i>-->
              {{ l.name }}</b-dropdown-item
            >
          </b-dropdown>
        </li>


        <li>
          <div class="mode">
            <i
              class="fa fa-moon-o"
              v-show="mixLayout === 'light-only'"
              @click="customizeMixLayout('dark-only')"
            ></i>
            <i
              class="fa fa-lightbulb-o"
              v-show="mixLayout === 'dark-only'"
              @click="customizeMixLayout('light-only')"
            ></i>
          </div>
        </li>

        <li class="maximize">
          <a
            class="text-dark"
            href="javascript:void(0)"
            @click="toggle_fullscreen()"
          >
            <feather type="maximize"></feather
          ></a>
        </li>
        <li class="onhover-dropdown p-0 mr-0">
          <div class="media profile-media">
            <img
              class="b-r-10"
              src="../assets/images/dashboard/profile.jpg"
              alt=""
            />
            <div class="media-body">
              <span>{{ username }}</span>
              <p class="mb-0 font-roboto">
                {{ role }} <i class="middle fa fa-angle-down"></i>
              </p>
            </div>
          </div>
          <ul class="profile-dropdown onhover-show-div">
            <li>
              <a href="#"
                ><feather type="user"></feather
                ><span>{{ $t("Profil") }}</span></a
              >
            </li>
            <li>
              <a @click="logOut"
                ><feather type="log-in"></feather
                ><span>{{ $t("Logout") }}</span></a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <script class="result-template" type="text/x-handlebars-template">
      <div class="ProfileCard u-cf">
        <div class="ProfileCard-avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-airplay m-0"
          >
            <path
              d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
            ></path>
            <polygon points="12 15 17 21 7 21 12 15"></polygon>
          </svg>
        </div>
        <div class="ProfileCard-details">
          <div class="ProfileCard-realName">
            name
          </div>
        </div>
      </div>
    </script>
    <script class="empty-template" type="text/x-handlebars-template">
      <div class="EmptyMessage">
        Your search turned up 0 results. This most likely means the backend is down, yikes!
      </div>
    </script>
  </div>
</template>
<script>
const body = document.getElementsByTagName("body")[0];
import { mapActions, mapState } from "vuex";
import { getUser } from "@/services/jwt.service";
import { LOGOUT } from "@/store/modules/auth";
import { localeOptions } from "@/utils/utils";
// import Bookmark from "./bookmark";
export default {
  name: "Search",
  data() {
    return {
      terms: "",
      searchOpen: false,
      searchResult: false,
      searchResultEmpty: false,
      close_sidebar_var: false,
      clicked: false,
      mobile_toggle: false,
      mobile_search: false,
      openbonusUI: false,
      openLevelmenu: false,
      openlanguage: false,
      mobile_accordian: false,
      mixLayout: "light-only",
      localeOptions,
      langIcon: localStorage.getItem("currentLanguageIcon") || "flag-icon-us",
      username: "",
      role: "tidak memiliki akses",
      group: "",
    };
  },
  // components: {
  //   Bookmark,
  // },
  created() {
    const user = getUser();


    if(user){
      this.username = user ? user.username:"";
      if (user.role[0]) {
        this.role = user.role[0].name;
      }else {
        this.role = "tidak memiliki akses";
      }
    }

    //this.group = user.group[0].name;
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.searchData,
     // megamenuItems: (state) => state.menu.megamenu,
    }),
  },
  methods: {
    ...mapActions(["setLang"]),
    toggle_sidebar() {
      this.$store.dispatch("menu/opensidebar");
    },
    setNavActive(item) {
      this.$store.dispatch("menu/setBonusNavActive", item);
    },
    openlangpicker() {
      this.openlanguage = !this.openlanguage;
    },
    openlevelmenu() {
      this.openLevelmenu = !this.openLevelmenu;
    },
    openmegamenu() {
      this.openbonusUI = !this.openbonusUI;
    },
    closeBonusUI() {
      this.openbonusUI = false;
    },
    search_open() {
      this.searchOpen = true;
    },
    search_close() {
      this.searchOpen = false;
    },
    searchterm: function() {
      this.$store.dispatch("menu/searchTerm", this.terms);
    },
    changeLocale(locale) {
      this.setLang(locale);
    },
    mobileaccordian() {
      this.mobile_accordian = !this.mobile_accordian;
    },

    addFix() {
      body.classList.add("offcanvas");
      this.searchResult = true;
    },
    removeFix() {
      body.classList.remove("offcanvas");
      this.searchResult = false;
      this.terms = "";
    },
    toggle_fullscreen() {
      if (
        document.fullScreenElement ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    customizeMixLayout(val) {
      this.mixLayout = val;
      this.$store.dispatch("layout/setLayout", val);
    },
    logOut() {
      this.$store.dispatch(`auth/${LOGOUT}`).then(() => {
        this.$router.replace({ name: "login" });
      });
    },
  },
  watch: {
    "$i18n.locale"(to, from) {
      console.log(to);
      this.$i18n.locale = to;
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
    menuItems: function() {
      this.terms ? this.addFix() : this.removeFix();
      if (!this.menuItems.length) this.searchResultEmpty = true;
      else this.searchResultEmpty = false;
    },
  },
};
</script>
