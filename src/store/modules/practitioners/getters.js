import User from '@/models/User'
export default {
  practitioners: state => {
    return state.users.map(pat => {
      const user = new User(pat).getNormalizedView()
      return user
    })
  },
}
