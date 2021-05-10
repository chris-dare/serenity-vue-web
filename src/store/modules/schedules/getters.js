import Schedule from '@/models/Schedule'
import isSameWeek from 'date-fns/isSameWeek'
// import format from 'date-fns/format'
// import parseISO from 'date-fns/parseISO'

export default {
  schedules: (state,getters,rootState) => {
    return state.schedules.map(sch => {
      let schedule = new Schedule(sch).getNormalizedView()
      //   is same week and time
      schedule.weekDays = state.schedules.filter(sche => isSameWeek(new Date(sche.start), new Date(sch.start)))
      schedule.days = new Array(schedule.day)
      // schedule.days = schedule.weekDays.length === 0 ? new Array(schedule.day) : schedule.weekDays.map(day => format(parseISO(day.start), 'E').toLowerCase())
      schedule.location = rootState.locations.locations.find(loc => loc.id === schedule.provider_location_id)
      schedule.health_service = rootState.services.services.find(service => service.id === schedule.healthcareService_id)
      schedule.practitioner = rootState.practitioners.users.find(user => user.id === schedule.practitioner_id)
      return schedule
    })
  },
}
