<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <ul class="menu-nav bg-gray-200">
    <!-- ====HOME==== -->
    <router-link
      to="/home"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-architecture-and-city"></i>
          <span class="menu-text">Dashboard</span>
        </a>
      </li>
    </router-link>
    <!-- ====DIVIDER==== -->
    <li class="menu-section">
      <h4 class="menu-text">Fitur</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>
    <!-- ====ITEM MENU==== -->
    <slot v-for="(menu, index) in menus">
      <router-link
        :to="menu.menu_url"
        v-slot="{ href, navigate, isActive, isExactActive }"
        v-if="menu.children.length < 1"
        :key="index"
      >
        <li
          aria-haspopup="true"
          data-menu-toggle="hover"
          class="menu-item"
          :class="[
            isActive && 'menu-item-active',
            isExactActive && 'menu-item-active',
          ]"
        >
          <a :href="href" class="menu-link" @click="navigate">
            <i class="menu-icon flaticon2-expand"></i>
            <span class="menu-text">{{ menu.menu_name }}</span>
          </a>
        </li>
      </router-link>
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item menu-item-submenu"
        v-bind:class="{ 'menu-item-open': hasActiveChildren('/vue-bootstrap') }"
        v-else
        :key="index"
      >
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon flaticon2-digital-marketing"></i>
          <span class="menu-text">{{ menu.menu_name }}</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="menu-submenu">
          <span class="menu-arrow"></span>
          <ul class="menu-subnav">
            <li aria-haspopup="true" class="menu-item menu-item-parent">
              <span class="menu-link">
                <span class="menu-text">{{ menu.menu_name }}</span>
              </span>
            </li>

            <router-link
              v-for="(child, idx) in menu.children"
              :to="child.menu_url"
              :key="idx"
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <li
                aria-haspopup="true"
                data-menu-toggle="hover"
                class="menu-item"
                :class="[
                  isActive && 'menu-item-active',
                  isExactActive && 'menu-item-active',
                ]"
              >
                <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-bullet menu-bullet-dot">
                    <span></span>
                  </i>
                  <span class="menu-text">{{ child.menu_name }}</span>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
      </li>
    </slot>
    <!-- ====END==== -->
  </ul>
</template>

<script>
import { menu } from "@/store";
export default {
  name: "Menu",
  data: () => {
    return {
      menus: menu,
    };
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
  },
};
</script>
