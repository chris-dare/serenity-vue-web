import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import DatePlugin from '@/services/date'
import UtilsPlugin from '@/services/utils'
import CurrencyPlugin from '@/services/currency'
import PermissionsPlugin from '@/services/roles'
import Vuelidate from 'vuelidate'
import VuePageTransition from 'vue-page-transition'
import HasPermissionDirective from '@/plugins/has-permission'
import { registerBaseComponents } from '@/services/globals'

// all vue plugins
import '@/plugins'

// global mixins
import '@/mixins'

// global directives
import '@/directives'

import '@/filters'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@/assets/styles/tailwind.scss'
import '@carbon/charts/styles.css'
import '@/assets/styles/app.scss'


Vue.directive('has-permission', HasPermissionDirective)

Vue.use(require('vue-faker'))

Vue.use(DatePlugin)
Vue.use(UtilsPlugin)
Vue.use(CurrencyPlugin)
Vue.use(PermissionsPlugin)
Vue.use(Vuelidate)
Vue.use(VuePageTransition)
registerBaseComponents(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
