<template>
  <div
    class="header-wrapper row m-0"
    style="padding-top: 5px; padding-bottom:5px;"
  >
    <form
      class="form-inline search-full"
      action="#"
      method="get"
      :class="{ open: searchOpen }"
    >
      <div class="form-group w-100">
        <div class="Typeahead Typeahead--twitterUsers">
          <div class="u-posRelative">
            <input
              class="demo-input Typeahead-input form-control-plaintext w-100"
              type="text"
              v-on:keyup="searchterm"
              v-model="terms"
              placeholder="Cari Halaman .."
              name="q"
              title=""
              autofocus
            />
            <div class="spinner-border Typeahead-spinner" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <feather
              class="close-search"
              type="x"
              @click="search_close()"
            ></feather>
          </div>
          <div
            :class="searchResult ? 'Typeahead-menu is-open' : 'Typeahead-menu'"
            v-if="menuItems.length"
          >
            <div
              class="ProfileCard u-cf"
              v-for="(menuItem, index) in menuItems.slice(0, 8)"
              :key="index"
            >
              <div class="ProfileCard-avatar header-search">
                <!-- <feather :type="menuItem.icon"></feather> -->
              </div>
              <div class="ProfileCard-details">
                <div class="ProfileCard-realName">
                  <span @click="removeFix()"
                    ><router-link
                      :to="{ path: menuItem.path }"
                      class="realname"
                      >{{ menuItem.title }}</router-link
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            :class="
              searchResultEmpty ? 'Typeahead-menu is-open' : 'Typeahead-menu'
            "
          >
            <div class="tt-dataset tt-dataset-0">
              <div class="EmptyMessage">
                Your search turned up 0 results. Opps There are no result found.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="header-logo-wrapper">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="img-fluid" src="../assets/images/logo/logo.png" alt />
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
          <a class="nav-link" href="javascript:void(0);">
            <feather type="layers"></feather><span>Bonus Ui</span>
          </a>
        </li>
        <li class="level-menu outside">
          <a class="nav-link" href="#">
            <feather type="inbox"></feather>
            <span>Level Menu</span></a
          >
        </li>
      </ul>
    </div>
    <!-- search -->
    <div class="nav-right col-8 pull-right right-header p-0">
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
              <i class="flag-icon" :class="l.icon"></i>
              {{ l.name }}</b-dropdown-item
            >
          </b-dropdown>
        </li>
        <li>
          <span class="header-search"
            ><feather type="search" @click="search_open()"></feather
          ></span>
        </li>

        <li>
          <div class="mode">
            <i
              class="fa fa-moon-o"
              v-show="mixLayout == 'light-only'"
              @click="customizeMixLayout('dark-only')"
            ></i>
            <i
              class="fa fa-lightbulb-o"
              v-show="mixLayout == 'dark-only'"
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
        <li class="profile-nav onhover-dropdown p-0 mr-0">
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
            <!-- <li>
              <a href="#"><feather type="mail"></feather><span>Inbox</span></a>
            </li>
            <li>
              <a href="#"
                ><feather type="file-text"></feather><span>Taskboard</span></a
              > 
            </li> 
           <li>
              <a href="#"
                ><feather type="settings"></feather><span>Settings</span></a
              >
            </li> -->
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
var body = document.getElementsByTagName("body")[0];
import { mapActions, mapState } from "vuex";
import { getUser } from "../services/jwt.service";
import { LOGOUT } from "../store/modules/auth";
import { localeOptions } from "../constants/config";
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
      role: "",
      group: "",
    };
  },
  // components: {
  //   Bookmark,
  // },
  created() {
    const user = getUser();
    this.username = user.username;
    if (user.role[0]) {
      this.role = user.role[0].name;
    }else {
      this.role = "undefined";
    }
    //this.group = user.group[0].name;
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.searchData,
      megamenuItems: (state) => state.menu.megamenu,
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
        (document.fullScreenElement && document.fullScreenElement !== null) ||
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
