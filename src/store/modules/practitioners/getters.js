import User from '@/models/User'
export default {
  practitioners: state => {
    return state.users.map(pat => {
      const user = new User(pat).getNormalizedView()
      return user
    })
  },
  getSinglePractitioner: (state, getters) => id => {
    return getters.practitioners.find(pat => pat.id === id) || {}
  },
}
