import http from '@/http'

export default {
  url: 'auth/',
  

  create(params) {
    return http.post(this.url, params)
  },

  update(params) {
    return http.put(this.url + '/' + params.uuid, params)
  },

  delete(id) {
    return http.delete(this.url + '/' + id)
  },

  login(params){
    return http.post(`${this.url}login`, params)
  }

  // refresh(params){
  //   return http.post(`${this.url}login`, params)
  // }
}
