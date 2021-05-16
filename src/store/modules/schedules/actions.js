/* eslint-disable no-unused-vars */
import SchedulesAPI from '@/api/schedules'
import Schedule from '@/models/Schedule'
import Vue from 'vue'
import { SET_SCHEDULES, UPDATE_SCHEDULE, DELETE_SCHEDULE, ADD_SCHEDULE_DATA, SET_SCHEDULE_DATA } from './mutation-types'

export default {
  async getSchedules({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI.list(provider.id, params)
      
      commit(SET_SCHEDULES, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getSchedule({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI.get(provider.id, id)
      commit(SET_SCHEDULE_DATA, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createSchedule({ dispatch, rootState }, payload) {
    try {
      const schedule = new Schedule(payload).getCreateView()
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI
        .create(provider.id, payload.practitioner.id, schedule)
      dispatch('getSchedules', payload)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateSchedule({ commit, rootState }, payload) {
    try {
      const schedule = new Schedule(payload).getUpdateView()
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI
        .update(provider.id, payload.practitioner_id, payload.id, schedule)

      const normalizedSchedule = new Schedule({ ...data.data, practitioner_id: payload.practitioner_id }).getNormalizedUpdateView()
      commit(UPDATE_SCHEDULE, normalizedSchedule)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async deleteSchedule({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      await SchedulesAPI
        .delete({providerId: provider.id, ...params})
      commit(DELETE_SCHEDULE, params.scheduleId)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  addToCurrentSchedule({ commit }, data) {
    commit(ADD_SCHEDULE_DATA, data)
  },

  refreshCurrentSchedule({ commit }) {
    commit(SET_SCHEDULE_DATA, {})
  },

  setCurrentSchedule({ commit }, data) {
    commit(SET_SCHEDULE_DATA, data)
  },
}
