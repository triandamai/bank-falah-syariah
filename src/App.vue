<template>
  <div id="app" @contextmenu.prevent="openMenu">
    <!-- Loader starts-->
    <div class="loader-wrapper" :class="{ loderhide: !show }">
      <div class="loader-index">
        <span></span>
      </div>
    </div>
    <!-- Loader ends-->

    <!--<Main/>-->
    <v-app>
      <router-view></router-view>
    </v-app>
    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" @blur.prevent="closeMenu"  :style="{top:top, left:left}">
      <v-list
          nav
          dense
      >
        <v-list-item-group
            color="primary"
        >
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :id="'context_menu_'+i"
          >
            <v-list-item-icon class="pr-3">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </ul>
  </div>
</template>

<script>
import Vue from "vue"
export default {
  name: "app",
  data() {
    return {
      show: true,
      viewMenu:false,
      top:'0px',
      left:'0px',
      selectedItem: 0,
      items: [
        { text: 'Personalisasi', icon: 'mdi-android-studio' },
        { text: 'Cetak Mutasi', icon: 'mdi-printer' },
        { text: 'Keluar', icon: 'mdi-logout-variant' },
      ],
    };
  },
  mounted() {
    this.timeOut();

  },
  methods: {
    timeOut() {
      var self = this;
      setTimeout(function () {
        self.show = false;
      }, 1000);
    },
    setMenu: function(top, left) {

    let largestHeight = window.innerHeight - this.$refs.right.offsetHeight - 25;
     let  largestWidth = window.innerWidth - this.$refs.right.offsetWidth - 25;

      if (top > largestHeight) top = largestHeight;

      if (left > largestWidth) left = largestWidth;

      this.top = top + 'px';
      this.left = left + 'px';
    },
    openMenu(e){
      if(this.$route.path === "/login"){
        this.$toasted.show("Masuk dahulu sebelum menggunakan option menu!",
            {
              theme: "bubble",
              position: "top-right",
              type: "warning",
              duration: 4000,
            }
        );
      }else {
        this.viewMenu = true;
        Vue.nextTick(function () {
          this.$refs.right.focus()
          this.setMenu(e.y, e.x)
        }.bind(this));
      }
    },
    closeMenu({relatedTarget}){

      if(relatedTarget){
        if(relatedTarget.id === "context_menu_0"){
          console.log(relatedTarget.id)
        }else if(relatedTarget.id === "context_menu_1"){
          console.log(relatedTarget.id)
        }
        else if(relatedTarget.id === "context_menu_2"){
          console.log(relatedTarget.id)
        }
      }
      this.viewMenu = false;
    },

    onMenuSelected(menu){
      console.log("hihi")
      if(menu === 1){
        this.$router.push({path:'/main/preferences'})
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.loader-wrapper.loderhide {
  display: none;
}

.center {
  text-align: center;
}

#demo {
  width: 100%;
  height: 100%;
}

#right-click-menu{
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.20),0 1px 5px 0 rgba(0,0,0,.50);
  display: block;
  position: absolute;
  width: 250px;
  border-radius: 8px;
  z-index: 999999;
}

</style>
