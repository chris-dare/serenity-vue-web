import http from '@/http'

export default {
  url: 'pharmacy',

  list() {
    return http.get(`${this.url}/inventory`)
  },

}
