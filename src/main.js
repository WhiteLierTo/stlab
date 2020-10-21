import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/**antd */
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(Antd);

Vue.config.productionTip = false;

import $ajax from "./service"
import $utils from "./utils"

Vue.prototype.$utils = $utils;
Vue.prototype.$ajax = $ajax;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
