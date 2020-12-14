export default {
  fullName: state => {
    return state.user ? `${state.user.first_name} ${state.user.last_name}` : null
  },

  authorizationHeader: state => {
    return state.token ? `Bearer ${state.token}` : null
  },

  isLoggedIn: state => state.loggedIn,
}
