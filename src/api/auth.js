import http from '@/http'
import {authHttp} from '@/http'

export default {
  url: 'auth/',
  
  create(params) {
    return http.post(this.url, params)
  },

  update(params) {
    return http.patch(this.url + '/' + params.id, params)
  },

  delete(id) {
    return http.delete(this.url + '/' + id)
  },

  login(params){
    return authHttp.post(`providers/${this.url}login`, params)
  },

  reset(params){
    return authHttp.post(`${this.url}password-reset/`, params)
  },

  refresh(params){
    return authHttp.post(`${this.url}token/refresh`, params)
  },

  confirmReset(params){
    return authHttp.post(`${this.url}password-reset/confirm/`, params)
  },

  changePassword(params){
    return http.post(`${this.url}change-password`, params)
  },

  updateProfile(params){
    return http.patch('user', params)
  },

  updateProvider(params){
    return http.patch(`providers/${params.id}`, params)
  },
  getProvider(id){
    return http.get(`providers/${id}`)
  },
  logout(){
    return http.get(`${this.url}logout`)
  },
}
