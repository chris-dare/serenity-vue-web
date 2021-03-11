import axios from 'axios'
import store from '@/store'
import router from '@/router'

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
http.interceptors.response.use(undefined, (error) => {
  const errorResponse = error.response
  if (errorResponse.status === 401) {
    return new Promise((resolve, reject) => {
      store
        .dispatch('auth/refresh')
        .then((data) => {
          if (!data) {
            store.dispatch('auth/setLoggedIn', false)
            router.push({
              name: 'AuthLogin',
              params: {
                logout: true,
              },
            })
          }

          errorResponse.config.__isRetryRequest = true
          errorResponse.config.headers.Authorization =
            store.getters['auth/authorizationHeader']
          resolve(axios(errorResponse.config))
          return true
        })
        .catch((errored) => {
          store.dispatch('auth/setLoggedIn', false)
          router.push({
            name: 'AuthLogin',
            params: {
              logout: true,
            },
          })
          reject(errored)
        })
    })
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
