import User from '@/models/User'
export default {
  practitioners: state => {
    return state.users.map(pat => {
      const user = new User(pat).getNormalizedView()
      return user
    })
  },

  practitionersWithoutCurrentUser: (state, getters, rootState) => {
    return state.users.filter(pat => pat.id !== rootState.auth.provider.practitionerRoleId).map(pat => {
      const user = new User(pat).getNormalizedView()
      return user
    })
  },

  getSinglePractitioner: (state, getters) => id => {
    return getters.practitioners.find(pat => pat.id === id) || {}
  },

  getSinglePractitionerByRole: (state, getters) => id => {
    let practitioner = getters.practitioners.find(pat => pat.practitioner_role.id === id)
    return practitioner ? practitioner : {}
  },
}
