// 案件检材相关路由

const caseRouter = {
    path: "/case",
    component: () => import("../views/empty"),
    meta: { label: "案件检材" },
    children: [
      {
        path: "case",
        name: "caseManagement",
        component: () => import("../views/case/case-management/index.vue"),
        meta: { label: "案件管理" },
      },
      {
        path: "check",
        name: "checkManagement",
        component: () => import("../views/case/check-management/index.vue"),
        meta: { label: "检材管理" },
      },
    ],
  };
  
  export default caseRouter;
  