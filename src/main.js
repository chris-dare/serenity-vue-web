import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue/src/index'
import CarbonCharts from '@carbon/charts-vue'
import DatePlugin from '@/services/date'

import '@/filters/index'
import '@/globalComponents'
import '@/assets/styles/tailwind.scss'
import '@/assets/styles/app.scss'
import '@carbon/charts/styles.css'

Vue.use(CarbonComponentsVue)
Vue.use(require('vue-faker'))
Vue.use(CarbonCharts)
Vue.use(DatePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
