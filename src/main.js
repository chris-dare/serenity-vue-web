import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/styles/app.scss'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue/src/index'
import CarbonCharts from '@carbon/charts-vue'
import DatePlugin from '@/services/date'
import UtilsPlugin from '@/services/utils'
import Vuelidate from 'vuelidate'

import '@/filters'
import '@/globalComponents'
import '@/assets/styles/tailwind.scss'
import '@carbon/charts/styles.css'

Vue.use(CarbonComponentsVue)
Vue.use(require('vue-faker'))
Vue.use(CarbonCharts)
Vue.use(DatePlugin)
Vue.use(UtilsPlugin)
Vue.use(Vuelidate)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
