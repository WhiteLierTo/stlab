import Vue from "vue";
import VueRouter from "vue-router";
import workbenchRouter from "./workbench";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/workbench/announcement",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/index/index"),
    children:[
      workbenchRouter
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
