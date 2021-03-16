import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import DatePlugin from '@/services/date'
import UtilsPlugin from '@/services/utils'
import Vuelidate from 'vuelidate'
import VuePageTransition from 'vue-page-transition'
import HasPermissionDirective from '@/plugins/has-permission'

// all vue plugins
import '@/plugins'

// global mixins
import '@/mixins'

import '@/filters'
import '@/globalComponents'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@/assets/styles/tailwind.scss'
import '@carbon/charts/styles.css'
import '@/assets/styles/app.scss'


Vue.directive('has-permission', HasPermissionDirective)

Vue.use(require('vue-faker'))

Vue.use(DatePlugin)
Vue.use(UtilsPlugin)
Vue.use(Vuelidate)
Vue.use(VuePageTransition)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
