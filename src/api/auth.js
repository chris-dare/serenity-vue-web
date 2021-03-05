import http from '@/http'
import {authHttp} from '@/http'

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
    return authHttp.post(`${this.url}login`, params)
  },

  reset(params){
    return authHttp.post(`${this.url}password-reset/`, params)
  },

  refresh(params){
    return http.post(`${this.url}token/refresh`, params)
  },

  confirmReset(params){
    return authHttp.post(`${this.url}password-reset/confirm/`, params)
  },

  changePassword(params){
    return http.post(`${this.url}change-password`, params)
  },

  logout(){
    return http.get(`${this.url}logout`)
  },
}
