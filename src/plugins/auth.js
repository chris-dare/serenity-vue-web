import Vue from 'vue'
import auth from '@/services/auth'
import router from '@/router'
import store from '@/store'

Vue.use(auth, {router, store})