import axios from 'axios'
import store from '@/store'
import { cacheAdapterEnhancer } from 'axios-extensions' 

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
})

// Add the authorization header on requests
http.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['PROVIDER-PORTAL-ID'] = process.env.VUE_APP_PROVIDER_PORTAL_ID

    if (store.getters['auth/authorizationHeader'] !== 'Bearer null') {
      config.headers.Authorization = store.getters['auth/authorizationHeader']
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Refresh JWT if 401 is returned
http.interceptors.response.use(undefined, async (error) => {
  const errorResponse = error.response
  if (errorResponse && errorResponse.status === 401 &&
    errorResponse.data.code === 'token_not_valid') {
    await store.dispatch('auth/refresh')

    errorResponse.config.__isRetryRequest = true
    errorResponse.config.headers.Authorization =
            store.getters['auth/authorizationHeader']
    return Promise.resolve(axios(errorResponse.config))

  }

  return Promise.reject(errorResponse)
})

const authHttp = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
})

// Add the authorization header on requests
authHttp.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['PROVIDER-PORTAL-ID'] = process.env.VUE_APP_PROVIDER_PORTAL_ID
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

authHttp.interceptors.response.use(undefined, (error) => {
  const errorResponse = error.response
  return Promise.reject(errorResponse)
})

export default http

export { authHttp }
