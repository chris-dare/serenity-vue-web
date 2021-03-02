export function initialState() {
  return {
    loggedIn: false,
    token: null,
    user: null,
    refreshToken: null,
  }
}

export default initialState()
