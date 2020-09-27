import Vue from "vue";
import VueRouter from "vue-router";
//view
import Dashboard from "../views/Dashboard.vue";
import About from "../views/About.vue";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
//page
import Home from "../views/pages/Home.vue";
import NotFound from "../views/pages/NotFound.vue";
import View404 from "../views/View404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "home",
      },
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "*",
        name: "NotFound",
        component: NotFound,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "*",
    name: "404",
    component: View404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from, next) => {
  let user = JSON.parse(sessionStorage.getItem("zzaAAb"));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (user != null) {
      
      next();
    } else {
      console.log("user null");
      next({
        name:"Login",
        redirect: "/login",
      });
    }
  } else {
    console.log("ga butuh");
    next();
  }
});

export default router;
