export function initialState() {
  return {
    loggedIn: false,
    token: null,
    user: null,
    refreshToken: null,
    organizations: [],
  }
}

export default initialState()
