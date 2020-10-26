import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue"),
        },

        {
          path: "/akun",
          name: "vuetify",
          component: () => import("@/view/pages/akun/AkunMain.vue"),
          children: [
            {
              path: "data",
              name: "vuetify-alerts",
              component: () => import("@/view/pages/akun/Akun.vue"),
            },
            {
              path: "tambah",
              name: "vuetify-avatars",
              component: () => import("@/view/pages/Tambah.vue"),
            },
            {
              path: "ubah",
              name: "vuetify-badges",
              component: () => import("@/view/pages/Tambah.vue"),
            },
            {
              path: "*",
              redirect: "/404",
            },
            {
              // the 404 route, when none of the above matches
              path: "/404",
              name: "error1",
              component: () => import("@/view/pages/error/Error-1.vue"),
            },
          ],
        },
        {
          path: "/nasabah",
          name: "wizard",
          component: () => import("@/view/pages/nasabah/NasabahMain.vue"),
          children: [
            {
              path: "data",
              name: "wizard-1",
              component: () => import("@/view/pages/nasabah/Nasabah.vue"),
            },
            {
              path: "ubah",
              name: "wizard-2",
              component: () => import("@/view/pages/Tambah.vue"),
            },
            {
              path: "tambah",
              name: "wizard-3",
              component: () => import("@/view/pages/Tambah.vue"),
            },
            {
              path: "*",
              redirect: "/404",
            },
            {
              // the 404 route, when none of the above matches
              path: "/404",
              name: "error2",
              component: () => import("@/view/pages/error/Error-1.vue"),
            },
          ],
        },
        {
          path: "/tabungan",
          name: "tabungan",
          component: () => import("@/view/pages/tabungan/TabunganMain.vue"),
          children: [
            {
              path: "data",
              name: "data-tabungan",
              component: () => import("@/view/pages/tabungan/Tabungan.vue"),
            },
            {
              path: "ubah",
              name: "ubah",
              component: () => import("@/view/pages/Tambah.vue"),
            },
            {
              path: "tambah",
              name: "tambah-3",
              component: () => import("@/view/pages/Tambah.vue"),
            },
            {
              path: "*",
              redirect: "/404",
            },
            {
              // the 404 route, when none of the above matches
              path: "/404",
              name: "error4",
              component: () => import("@/view/pages/error/Error-1.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login"),
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Register"),
        },
        {
          path: "*",
          redirect: "/404",
        },
        {
          // the 404 route, when none of the above matches
          path: "/404",
          name: "error5",
          component: () => import("@/view/pages/error/Error-1.vue"),
        },
      ],
    },

    {
      path: "*",
      redirect: "/404",
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue"),
    },
  ],
});
