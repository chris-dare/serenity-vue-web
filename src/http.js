import axios from 'axios'
import store from '@/store'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})

// Add the authorization header on requests
http.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

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
  console.log('error response', errorResponse)
  if (errorResponse.status === 401 &&
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
})

authHttp.interceptors.response.use(undefined, (error) => {
  const errorResponse = error.response
  return Promise.reject(errorResponse)
})

export default http

export { authHttp }
