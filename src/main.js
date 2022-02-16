import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import DatePlugin from '@/services/date'
import UtilsPlugin from '@/services/utils'
import APIPlugin from '@/services/api'
import CurrencyPlugin from '@/services/currency'
import PermissionsPlugin from '@/services/roles'
import ScrollPlugin from '@/services/scroll'
import PrintPlugin from '@/services/print'
import ConstantsPlugin from '@/services/constants'
import Vuelidate from 'vuelidate'
import VuePageTransition from 'vue-page-transition'
import HasPermissionDirective from '@/plugins/has-permission'
import { registerBaseComponents } from '@/services/globals'
import VueMask from 'v-mask'

// all vue plugins
import '@/plugins'

// global mixins
import '@/mixins'

// global directives
import '@/directives'

import '@/filters'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@/assets/styles/tailwind.scss'
import '@/assets/styles/app.scss'


Vue.directive('has-permission', HasPermissionDirective)

Vue.use(DatePlugin)
Vue.use(UtilsPlugin)
Vue.use(CurrencyPlugin)
Vue.use(PermissionsPlugin)
Vue.use(ScrollPlugin)
Vue.use(PrintPlugin)
Vue.use(ConstantsPlugin)
Vue.use(APIPlugin)
Vue.use(Vuelidate)
Vue.use(VueMask)

Vue.use(VuePageTransition)

registerBaseComponents(Vue)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
