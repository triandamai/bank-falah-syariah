<template>
  <div id="sidebar">
    <div class="logo-wrapper">
      <router-link to="/">
        <img
          class="img-fluid for-light"
          width="30px"
          src="../assets/images/logo/logo.webp"
          alt=""
        /><img
          width="30px"
          class="img-fluid for-dark"
          src="../assets/images/logo/logo_dark.webp"
          alt=""
        />
      </router-link>
      <span class="font-roboto" style="margin-left: 5px; font-style: normal;">{{app_name}}</span>

      <div class="back-btn" @click="toggle_sidebar">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="toggle-sidebar" @click="toggle_sidebar">
        <feather
          class="status_toggle middle"
          type="grid"
          id="sidebar-toggle"
        ></feather>
      </div>
    </div>
    <div class="logo-icon-wrapper">
      <router-link to="/">
        <img
          class="img-fluid"
          width="30px"
          src="../assets/images/logo/logo-icon.webp"
          alt=""
      /></router-link>
    </div>
    <nav class="sidebar-main">
      <li
        class="left-arrow"
        :class="{
          'd-none':
            layout.settings.layout_type === 'rtl'
              ? hideLeftArrowRTL
              : hideLeftArrow,
        }"
        @click="
          layout.settings.sidebar.type === 'horizontal_sidebar' &&
          layout.settings.layout_type === 'rtl'
            ? scrollToLeftRTL()
            : scrollToLeft()
        "
      >
        <feather type="arrow-left"></feather>
      </li>
      <div id="sidebar-menu">
        <ul
          class="sidebar-links custom-scrollbar"
          id="myDIV"
          :style="[
            layout.settings.sidebar.type === 'horizontal_sidebar'
              ? layout.settings.layout_type === 'rtl'
                ? { 'margin-right': margin + 'px' }
                : { 'margin-left': margin + 'px' }
              : { margin: '0px' },
          ]"
        >
          <li class="back-btn">
            <router-link to="/">
              <img
                class="img-fluid"
                src="../assets/images/logo/logo-icon.webp"
                alt=""
            /></router-link>
            <div class="mobile-back text-right">
              <span>Back</span
              ><i class="fa fa-angle-right pl-2" aria-hidden="true"></i>
            </div>
          </li>
          <li
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :class="{
              active: menuItem.active,
              'sidebar-main-title': menuItem.type === 'headtitle',
            }"
            class="sidebar-list"
          >
            <!-- link title -->
            <div v-if="menuItem.type === 'headtitle'">
              <h6 class="lan-1">{{ $t(menuItem.headTitle1) }}</h6>
              <p class="lan-2">{{ $t(menuItem.headTitle2) }}</p>
            </div>
            <!-- Sub -->
            <label
              :class="'badge badge-' + menuItem.badgeType"
              v-if="menuItem.badgeType"
              v-show="checkPrivileges(menuItem.privileges)"
              >{{ menuItem.children.length }}</label
            >
            <a
              href="javascript:void(0)"
              class="sidebar-link sidebar-title"
              v-if="menuItem.type === 'sub'"
              v-show="checkPrivileges(menuItem.privileges)"
              @click="setNavActive(menuItem, index)"
            >
              <feather :type="menuItem.icon" class="top"></feather>
              <span>
                {{ $t(menuItem.title) }}
              </span>
              <div class="according-menu" v-if="menuItem.children">
                <i class="fa fa-angle-right pull-right"></i>
              </div>
            </a>
            <!-- Link -->
            <router-link
              :to="menuItem.path"
              class="sidebar-link sidebar-title"
              v-if="menuItem.type === 'link'"
              v-show="checkPrivileges(menuItem.privileges)"
              router-link-exact-active
            >
              <feather :type="menuItem.icon" class="top"></feather>
              <span>
                {{ $t(menuItem.title) }}
              </span>
              <i
                class="fa fa-angle-right pull-right"
                v-if="menuItem.children"
              ></i>
            </router-link>
            <!-- Button
              @click="showFormTransaction(childrenSubItem.path)"
                      v-if="childrenSubItem.type === 'button'"
            -->
            <a
                class="sidebar-link sidebar-title"
                v-if="menuItem.type === 'button'"
                v-show="checkPrivileges(menuItem.privileges)"
                @click="showFormTransaction(menuItem.path)"

            >
              <feather :type="menuItem.icon" class="top"></feather>
              <span>
                {{ $t(menuItem.title) }}
              </span>
              <i
                  class="fa fa-angle-right pull-right"
                  v-if="menuItem.children"
              ></i>
            </a>

            <!-- External Link
             @click="showFormTransaction(childrenSubItem.path)"
                     v-if="childrenSubItem.type === 'button'"
           -->
            <a
              :href="menuItem.path"
              class="sidebar-link sidebar-title"
              v-if="menuItem.type === 'extLink'"
              v-show="checkPrivileges(menuItem.privileges)"
              @click="setNavActive(menuItem, index)"
            >
              <feather :type="menuItem.icon" class="top"></feather>
              <span>
                {{ $t(menuItem.title) }}
              </span>
              <i
                class="fa fa-angle-right pull-right"
                v-if="menuItem.children"
              ></i>
            </a>
            <!-- External Tab Link -->
            <a
              :href="menuItem.path"
              target="_blank"
              class="sidebar-link sidebar-title"
              v-if="menuItem.type === 'extTabLink'"
              v-show="checkPrivileges(menuItem.privileges)"
              @click="setNavActive(menuItem, index)"
            >
              <feather :type="menuItem.icon" class="top"></feather>
              <span>
                {{ $t(menuItem.title) }}
              </span>
              <i
                class="fa fa-angle-right pull-right"
                v-if="menuItem.children"
              ></i>
            </a>
            <!-- 2nd Level Menu -->
            <ul
              class="sidebar-submenu"
              v-if="menuItem.children"
              :class="{ 'menu-open': menuItem.active }"
            >
              <li
                v-for="(childrenItem, index) in menuItem.children"
                :key="index"
                :class="{ active: childrenItem.active }"
              >
                <!-- Sub -->
                <a
                  class="submenu-title"
                  href="javascript:void(0)"
                  v-if="childrenItem.type === 'sub'"
                  v-show="checkPrivileges(childrenItem.privileges)"
                  @click="setNavActive(childrenItem, index)"
                >
                  {{ $t(childrenItem.title) }}
                  <label
                    :class="
                      'badge badge-' + childrenItem.badgeType + ' pull-right'
                    "
                    v-if="childrenItem.badgeType"
                    >{{ childrenItem.children.length }}</label
                  >
                  <i
                    class="fa fa-angle-right pull-right mt-1"
                    v-if="childrenItem.children"
                  ></i>
                </a>

                <!-- Link -->
                <router-link
                  class="submenu-title"
                  :to="childrenItem.path"
                  v-if="childrenItem.type === 'link'"
                  v-show="checkPrivileges(childrenItem.privileges)"
                  router-link-exact-active
                >
                  {{ $t(childrenItem.title) }}
                  <label
                    :class="
                      'badge badge-' + childrenItem.badgeType + ' pull-right'
                    "
                    v-if="childrenItem.badgeType"
                    >{{ childrenItem.children.length }}</label
                  >
                  <i
                    class="fa fa-angle-right pull-right mt-1"
                    v-if="childrenItem.children"
                  ></i>
                </router-link>
                <!-- External Link -->
                <a
                  :href="childrenItem.path"
                  v-if="childrenItem.type === 'extLink'"
                  v-show="checkPrivileges(childrenItem.privileges)"
                  class="submenu-title"
                >
                  {{ $t(childrenItem.title) }}
                  <label
                    :class="
                      'badge badge-' + childrenItem.badgeType + ' pull-right'
                    "
                    v-if="childrenItem.badgeType"
                    >{{ childrenItem.children.length }}</label>
                  <i
                    class="fa fa-angle-right pull-right mt-1"
                    v-if="childrenItem.children"
                  ></i>
                </a>

                <!-- External Tab Link -->
                <a
                  class="submenu-title"
                  :href="childrenItem.path"
                  target="_blank"
                  v-if="childrenItem.type === 'extTabLink'"
                  v-show="checkPrivileges(childrenItem.privileges)"
                >
                  {{ $t(childrenItem.title) }}
                  <label
                    :class="
                      'badge badge-' + childrenItem.badgeType + ' pull-right'
                    "
                    v-if="childrenItem.badgeType"
                    >{{ childrenItem.children.length }}</label
                  >
                  <i
                    class="fa fa-angle-right pull-right mt-1"
                    v-if="childrenItem.children"
                  ></i>
                </a>

                <!-- Button -->
                <a
                    class="submenu-title"
                    v-if="childrenItem.type === 'button'"
                    v-show="checkPrivileges(childrenItem.privileges)"
                    @click="showFormTransaction(childrenItem.path)"
                >
                  {{ $t(childrenItem.title) }}
                  <label
                      :class="
                      'badge badge-' + childrenItem.badgeType + ' pull-right'
                    "
                      v-if="childrenItem.badgeType"
                  >{{ childrenItem.children.length }}</label
                  >
                  <i
                      class="fa fa-angle-right pull-right mt-1"
                      v-if="childrenItem.children"
                  ></i>
                </a>
                <!-- 3rd Level Menu -->
                <ul
                  class="nav-sub-childmenu submenu-content"
                  v-if="childrenItem.children"
                  :class="{ opensubchild: childrenItem.active }"
                >
                  <li
                    v-for="(childrenSubItem, index) in childrenItem.children"
                    :key="index"
                  >
                    <!-- Link -->
                    <router-link
                      :to="childrenSubItem.path"
                      v-if="childrenSubItem.type === 'link'"
                      v-show="checkPrivileges(childrenSubItem.privileges)"
                      router-link-exact-active
                    >
                      {{ $t(childrenSubItem.title) }}
                      <label
                        :class="
                          'badge badge-' +
                            childrenSubItem.badgeType +
                            ' pull-right'
                        "
                        v-if="childrenSubItem.badgeType"
                        >{{ childrenSubItem.children.length }}</label
                      >
                      <i
                        class="fa fa-angle-right pull-right"
                        v-if="childrenSubItem.children"
                      ></i>
                    </router-link>
                    <!-- Link -->
                    <a
                      @click="showFormTransaction(childrenSubItem.path)"
                      v-if="childrenSubItem.type === 'button'"
                      v-show="checkPrivileges(childrenSubItem.privileges)"

                    >
                      {{ $t(childrenSubItem.title) }}
                      <label
                        :class="
                          'badge badge-' +
                            childrenSubItem.badgeType +
                            ' pull-right'
                        "
                        v-if="childrenSubItem.badgeType"
                        >{{ childrenSubItem.children.length }}</label
                      >
                      <i
                        class="fa fa-angle-right pull-right"
                        v-if="childrenSubItem.children"
                      ></i>
                    </a>

                    <!-- External Link -->
                    <router-link
                      :to="childrenSubItem.path"
                      v-if="childrenSubItem.type === 'extLink'"
                      v-show="checkPrivileges(childrenSubItem.privileges)"
                      router-link-exact-active
                    >
                      {{ $t(childrenSubItem.title) }}
                      <label
                        :class="
                          'badge badge-' +
                            childrenSubItem.badgeType +
                            ' pull-right'
                        "
                        v-if="childrenSubItem.badgeType"
                        >{{ childrenSubItem.children.length }}</label
                      >
                      <i
                        class="fa fa-angle-right pull-right"
                        v-if="childrenSubItem.children"
                      ></i>
                    </router-link>
                    <!-- External Tab Link -->
                    <router-link
                      :to="childrenSubItem.path"
                      v-if="childrenSubItem.type === 'extLink'"
                      v-show="checkPrivileges(childrenSubItem.privileges)"
                      router-link-exact-active
                    >
                      {{ $t(childrenSubItem.title) }}
                      <label
                        :class="
                          'badge badge-' +
                            childrenSubItem.badgeType +
                            ' pull-right'
                        "
                        v-if="childrenSubItem.badgeType"
                        >{{ childrenSubItem.children.length }}</label
                      >
                      <i
                        class="fa fa-angle-right pull-right"
                        v-if="childrenSubItem.children"
                      ></i>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <li
        class="right-arrow"
        :class="{
          'd-none':
            layout.settings.layout_type === 'rtl'
              ? hideRightArrowRTL
              : hideRightArrow,
        }"
        @click="
          layout.settings.sidebar.type === 'horizontal_sidebar' &&
          layout.settings.layout_type === 'rtl'
            ? scrollToRightRTL()
            : scrollToRight()
        "
      >
        <feather type="arrow-right"></feather>
      </li>
    </nav>
  </div>
</template>
<script>
import {checkPrivileges} from "@/utils/utils"
import {getAppname} from "@/services/jwt.service";
import componentMixin from "@/mixin/component.mixin"
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  mixins:[componentMixin],
  data() {
    return {
      width: 0,
      height: 0,
      margin: 0,
      hideRightArrowRTL: true,
      hideLeftArrowRTL: true,
      hideRightArrow: true,
      hideLeftArrow: true,
      menuWidth: 0,
      toggle_sidebar_var: false,
      clicked: false,
      app_name:getAppname()
    };
  },
  beforeMount() {
    this.startLoading()
    this.$store.dispatch('menu/getMenu').then(({ success })=>{
     if(success){
       if(this.isLoading){
         this.stopLoading()
       }
     }
   })
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.menu,
      layout: (state) => state.layout.layout,
      sidebar: (state) => state.layout.sidebarType,
      isLoading:(state)=>state.lazyLoad
    }),
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (this.width < 991) {
      this.layout.settings.sidebar.type = "default";
    }
    const val = this.sidebar;
    if (val == "default") {
      this.layout.settings.sidebar.type = "default";
      this.layout.settings.sidebar.body_type = "default";
    } else if (val == "compact") {
      this.layout.settings.sidebar.type = "compact-wrapper";
      this.layout.settings.sidebar.body_type = "sidebar-icon";
    } else if (val == "compact-icon") {
      this.layout.settings.sidebar.type = "compact-page";
      this.layout.settings.sidebar.body_type = "sidebar-hover";
    } else if (val == "horizontal") {
      this.layout.settings.sidebar.type = "horizontal_sidebar";
      this.layout.settings.sidebar.body_type = "";
    }
    setTimeout(() => {
      const elmnt = document.getElementById("myDIV");
      this.menuWidth = elmnt.offsetWidth;
      this.menuWidth > window.innerWidth
        ? ((this.hideRightArrow = false), (this.hideLeftArrowRTL = false))
        : ((this.hideRightArrow = true), (this.hideLeftArrowRTL = true));
    }, 500);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.itemsMenus.filter((items) => {
      if (items.path === this.$route.path)
        this.$store.dispatch("menu/setActiveRoute", items);
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.path === this.$route.path)
          this.$store.dispatch("menu/setActiveRoute", subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === this.$route.path)
            this.$store.dispatch("menu/setActiveRoute", subSubItems);
        });
      });
    });
  },
  methods: {
    //check if user already logged in is have privilage for acces those menu
    checkPrivileges:(privilage)=>checkPrivileges(privilage),
    showFormTransaction(form) {
      console.log(form)
      this.$store.commit("showForm", form);
    },
    toggle_sidebar() {
      this.$store.dispatch("menu/opensidebar");
    },
    setNavActive(item) {
      this.$store.dispatch("menu/setNavActive", item);
    },
    handleResize() {
      this.width = window.innerWidth - 310;
    },
    scrollToRightRTL() {
      this.temp = this.width + this.margin;
      // Checking condition for remaing margin
      if (this.temp === 0) {
        this.margin = this.temp;
        this.hideRightArrowRTL = true;
      }
      // else
      else {
        this.margin += this.width;
        this.hideRightArrowRTL = false;
        this.hideLeftArrowRTL = false;
      }
    },
    scrollToLeftRTL() {
      // If Margin is reach between screen resolution
      console.log("this.margin", this.margin);
      if (this.margin <= -this.width) {
        this.margin += -this.width;
        this.hideLeftArrowRTL = true;
      }
      //Else
      else {
        this.margin += -this.width;
        this.hideRightArrowRTL = false;
      }
    },
    scrollToLeft() {

      // If Margin is reach between screen resolution
      if (this.margin >= -this.width) {
        this.margin = 0;
        this.hideLeftArrow = true;
      }
      //Else
      else {
        this.margin += this.width;
        this.hideRightArrow = false;
      }
    },
    scrollToRight() {
      this.temp = this.menuWidth + this.margin;
      // Checking condition for remaing margin
      if (this.temp < this.menuWidth) {
        this.margin = -this.temp;
        this.hideRightArrow = true;
      }
      // else
      else {
        this.margin += -this.width;
        this.hideLeftArrow = false;
      }
    },
  },
};
</script>
