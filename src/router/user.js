// 用户信息相关路由

const userRouter = {
    path: "/user",
    component: () => import("../views/empty"),
    meta: {
        label: "个人中心"
    },
    children: [{
        path: "personal",
        name: "personalInfo",
        component: () => import("../views/user/personal-info/index.vue"),
        meta: {
            label: ""
        },
    }, ],
};

export default userRouter;