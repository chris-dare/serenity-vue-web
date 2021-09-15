import Vue from 'vue'
import Vuex from 'vuex'
import { generateVuexStoreModuleConfiguration } from 'vuex-module-configuration-composer'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const context = require.context('./modules', true, /index\.js$/)

const storeConfiguration = Object.assign(
  {
    plugins: [
      createPersistedState({
        paths: ['auth', 'checkout'],
      }),
    ],
  },
  generateVuexStoreModuleConfiguration(context),
)

export default new Vuex.Store(storeConfiguration)
