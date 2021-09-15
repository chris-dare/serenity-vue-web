export default {
  getCurrentClientNoDataLabel: state => (field = 'data') => {
    let client = state.client.companyName
    return `You have no ${field} available for ${client}`
  },
}
