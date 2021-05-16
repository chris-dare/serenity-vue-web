import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'


export default async function fetchAppointment ({ next, store, to, from }) {
  const currentAppointment = get(store.state, 'appointments.currentAppointment')
  const { id } = to.params

  if (!isEmpty(currentAppointment) || !id) {
    return next()
  }

  try {
    await store.dispatch('appointments/getAppointment', id, { root: true })
    return next()
  } catch (error) {
    return next({name: from.name})
  }
  
}