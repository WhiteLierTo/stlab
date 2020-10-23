// 首页相关路由

const homeRouter = {
    path: "home",
    name: "Home",
    component: () => import("../views/home/index.vue"),
};

export default homeRouter;