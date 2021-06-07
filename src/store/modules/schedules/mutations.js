import { SET_SCHEDULES, UPDATE_SCHEDULE, DELETE_SCHEDULE, ADD_SCHEDULE_DATA, SET_SCHEDULE_DATA } from './mutation-types'

export default {
  [SET_SCHEDULES](state, schedules) {
    state.schedules = schedules
  },

  [UPDATE_SCHEDULE](state, schedule) {
    const index = state.schedules.findIndex(a => a.id === schedule.id)
    if (index !== -1) {
      state.schedules = state.schedules.map(a => {
        if (a.id === schedule.id) return schedule
        return a
      })
    } else {
      state.schedules.push(schedule)
    }
  },

  [DELETE_SCHEDULE](state, scheduleId) {
    const index = state.schedules.findIndex(a => a.id === scheduleId)
    if (index !== -1) {
      state.schedules.splice(index, 1)
    }
  },

  [ADD_SCHEDULE_DATA](state, data) {
    let currentSchedule = state.currentSchedule
    state.currentSchedule = {...currentSchedule, ...data}
  },

  [SET_SCHEDULE_DATA](state, data) {
    state.currentSchedule = data
  },
}
