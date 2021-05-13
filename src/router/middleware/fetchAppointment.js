
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'


export default function fetchAppointment ({ next, store, to, from }) {
  const currentAppointment = get(store.state, 'appointments.currentAppointment')
  const { id } = to.query

  if (isEmpty(currentAppointment) || !id) {
    return next()
  }

  try {
    store.dispatch('appointments/getAppointment', id, { root: true })
    return next()
  } catch (error) {
    return next({name: from.name})
  }
  
}