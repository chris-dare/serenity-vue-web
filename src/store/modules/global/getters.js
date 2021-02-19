export default {
  sideBarlinks: state => {
    return state.token ? `Bearer ${state.token}` : null
  },
}
