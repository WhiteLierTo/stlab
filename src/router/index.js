import Vue from "vue";
import VueRouter from "vue-router";
import cookieApi from "../utils/cookie"

import workbenchRouter from "./workbench";
import caseRouter from "./case";
import reportRouter from "./report";
import homeRouter from "./home";
import userRouter from './user';


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/index/home",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/user/login/index"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/index/index"),
    children: [workbenchRouter, caseRouter, reportRouter, homeRouter, userRouter],
  },
];



const router = new VueRouter({
  mode: "hash",
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return
  }
  let token = cookieApi.get();
  if (!token) next();
  else {
    next('/login')
  }
});

export default router;