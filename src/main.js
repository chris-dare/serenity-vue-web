import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue/src/index'
import '@/assets/styles/tailwind.scss'
import '@/assets/styles/app.scss'

Vue.use(CarbonComponentsVue)
Vue.use(require('vue-faker'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
