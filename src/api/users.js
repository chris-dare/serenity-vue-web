import http from '@/http'

// function randomString(l) {
//   let text = ''
//   const char_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   for (let i = 0; i < l; i++) {
//     text += char_list.charAt(Math.floor(Math.random() * char_list.length))
//   }
//   return text
// }

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/practitioners`)
  },

  create(providerId, params) {
    // let mmm =  Object.assign({}, params, {
    //   id: randomString(15),
    // })
    // return Promise.resolve(
    //   {data: mmm},
    // )
    if(typeof(params.practitioner_specialty) == 'string'){
      params.practitioner_specialty = [params.practitioner_specialty]
    }
    return http.post(`${this.url}${providerId}/practitioners`, params)
  },

  update(providerId, params) {
    return http.put(`${this.url}${providerId}/practitioners/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/practitioners/${id}`)
  },
}
