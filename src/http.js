import axios from 'axios'
import store from '@/store'
import CryptoJS from 'crypto-js'
import { cacheAdapterEnhancer } from 'axios-extensions' 

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
})

// eslint-disable-next-line no-unused-vars
let encryptRequest = function (privateKey, path, request_data, httpMethod) {
  let text_request_data = JSON.stringify(request_data)

  let data = `${privateKey}-${httpMethod}-${path}-${text_request_data ? JSON.stringify(request_data): ''}`

  privateKey = CryptoJS.enc.Utf8.parse(privateKey)
  data = CryptoJS.enc.Utf8.parse(data)

  let computed_sig = CryptoJS.HmacSHA256(data, privateKey)
  return CryptoJS.enc.Base64.stringify(computed_sig)
}

// Add the authorization header on requests
http.interceptors.request.use(
  (config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['PROVIDER-PORTAL-ID'] = process.env.VUE_APP_PROVIDER_PORTAL_ID

    if (store.getters['auth/authorizationHeader'] !== 'Bearer null') {
      config.headers.Authorization = store.getters['auth/authorizationHeader']
    }

    // let request_data = config.data
    // let http_method = config.method.toUpperCase()
    // // const PRIVATE_KEY = "django-insecure-_n%+dym6c6x7u63@3_i&2)q@ydp2bj*^+t)qhiqs5gb)uz491-"
    // const PRIVATE_KEY = process.env.VUE_APP_PROVIDER_PORTAL_ID

    // let parser = document.createElement('a')
    // parser.href = config.url

    // let urlPath = window.location.pathname

    // let signature = encryptRequest(PRIVATE_KEY, urlPath, request_data, http_method)
    // config.headers['Serenity-HTTP-SIGNATURE'] = signature
    
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

    // let request_data = config.data
    // let http_method = config.method.toUpperCase()
    // const PRIVATE_KEY = 'django-insecure-_n%+dym6c6x7u63@3_i&2)q@ydp2bj*^+t)qhiqs5gb)uz491-'
    // // const PRIVATE_KEY = process.env.VUE_APP_PROVIDER_PORTAL_ID

    // let parser = document.createElement('a')
    // parser.href = config.url

    // let urlPath = `/${config.url}`
    // console.log('urlpath', urlPath, parser.pathname, config)

    // let signature = encryptRequest(PRIVATE_KEY, urlPath, request_data, http_method)
    // config.headers['Serenity-HTTP-SIGNATURE'] = signature
    
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
