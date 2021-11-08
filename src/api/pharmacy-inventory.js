import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params){
    return http.get(`${this.url}${providerId}/get-inventory`, { params })
  },

}
