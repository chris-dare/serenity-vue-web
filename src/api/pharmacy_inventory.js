import http from '@/http'

export default {
  url: 'pharmacy',

  list(params = {}) {
    return http.get(`${this.url}/inventory`, {params})
  },

}
