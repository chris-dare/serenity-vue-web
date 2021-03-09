/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
// import './registerServiceWorker'
import router from "./router";
import store from "./store";
import "@/assets/styles/app.scss";

import DatePlugin from "@/services/date";
import UtilsPlugin from "@/services/utils";
import Vuelidate from "vuelidate";
import VuePageTransition from "vue-page-transition";
import HasPermissionDirective from "@/plugins/has-permission";

// all vue plugins
import "@/plugins";

import "@/filters";
import "@/globalComponents";
import "@/assets/styles/tailwind.scss";
import "@carbon/charts/styles.css";

Vue.directive("has-permission", HasPermissionDirective);

Vue.use(require("vue-faker"));

Vue.use(DatePlugin);
Vue.use(UtilsPlugin);
Vue.use(Vuelidate);
Vue.use(VuePageTransition);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
