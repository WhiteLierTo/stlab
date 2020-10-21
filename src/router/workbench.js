// 个人工作台相关路由

const workbenchRouter = {
  path: "/workbench",
  component: () => import("../views/empty"),
  meta: { label: "个人工作台" },
  children: [
    {
      path: "announcement",
      name: "announcement",
      component: () => import("../views/workbench/announcement/index.vue"),
      meta: { label: "通知公告" },
    },
    {
      path: "registration",
      name: "registration",
      component: () => import("../views/workbench/registration/index.vue"),
      meta: { label: "委托登记" },
    },
    {
      path: "entrust",
      name: "entrust",
      component: () => import("../views/workbench/entrust/index.vue"),
      meta: { label: "我的委托" },
    },
  ],
};

export default workbenchRouter;
