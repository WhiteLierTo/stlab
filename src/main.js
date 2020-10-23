import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/**elementUI */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import tableWithFilter from "./components/tableWithFilter/tableWithFilter";
Vue.component("tableWithFilter", tableWithFilter);

Vue.use(ElementUI);

Vue.config.productionTip = false;

import $ajax from "./service";
import $utils from "./utils";

Vue.prototype.$utils = $utils;
Vue.prototype.$ajax = $ajax;


export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");