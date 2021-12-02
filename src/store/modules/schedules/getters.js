import Schedule from '@/models/Schedule'
import isSameWeek from 'date-fns/isSameWeek'

export default {
  schedules: (state,getters,rootState) => {
    return state.schedules.map(sch => {
      let schedule = new Schedule(sch).getNormalizedView()
      //   is same week and time
      schedule.weekDays = state.schedules.filter(sche => isSameWeek(new Date(sche.planning_horizon_start), new Date(sch.planning_horizon_start)))
      schedule.days = new Array(schedule.day)
      schedule.location = rootState.locations.locations.find(loc => loc.id === schedule.location)
      schedule.health_service = rootState.services.services.find(service => service.id === schedule.healthcare_service)
      return schedule
    })
  },
}
