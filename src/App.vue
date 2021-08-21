
<template>
  <div id="app" @contextmenu.prevent="openMenu">
    <!-- Loader starts-->
    <div class="loader-wrapper" :class="{ loderhide: !show }">
      <div class="loader-index">
        <span></span>
      </div>
    </div>
    <!-- Loader ends-->
    <notifications group="bp" />
    <!--<Main/>-->
    <v-app>
      <router-view></router-view>
    </v-app>
    <ul id="right-click-menu" tabindex="-1" ref="right" v-if="viewMenu" @blur.prevent="closeMenu"  :style="{top:top, left:left}">
     <v-card elevation="1">
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
               :id="'context_menu_'+item.val"
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
     </v-card>
    </ul>
    <!--    overlay-->
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <!--    -->

  </div>
</template>

<script>
import Vue from "vue"
import {LOGOUT} from "@/store"
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
        { text: 'Personalisasi',val:1, icon: 'mdi-android-studio' },
        { text: 'Cetak Mutasi', val:2,icon: 'mdi-printer' },
        { text: 'Keluar',val:3, icon: 'mdi-logout-variant' },
      ],
      overlay:false,
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
        this.$toasted.show("Masuk dahulu sebelum menggunakan option menu !",
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
        if(relatedTarget.id === "context_menu_1"){
          console.log(relatedTarget.id)
        }else if(relatedTarget.id === "context_menu_2"){
          console.log(relatedTarget.id)
        }
        else if(relatedTarget.id === "context_menu_3"){
          this.overlay = true
          setTimeout(()=>{
            this.overlay = false
            this.$store.dispatch(`auth/${LOGOUT}`).then(() => {
              this.$router.replace({ name: "login" });
            });
          },1000)

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
  display: block;
  position: absolute;
  width: 250px;
  border-radius: 8px;
  z-index: 999999;
}

</style>
