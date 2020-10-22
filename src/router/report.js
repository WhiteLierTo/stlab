// 智能报表相关路由

const reportRouter = {
    path: "/report",
    component: () => import("../views/empty"),
    meta: { label: "智能报表" },
    children: [
      {
        path: "record",
        name: "record",
        component: () => import("../views/report/record/index.vue"),
        meta: { label: "笔录生成" },
      },
      {
        path: "template",
        name: "template",
        component: () => import("../views/report/template/index.vue"),
        meta: { label: "模板配置" },
      },
    ],
  };
  
  export default reportRouter;