/* eslint-disable no-unused-vars */
import SchedulesAPI from '@/api/schedules'
import { SET_SCHEDULES, UPDATE_SCHEDULE, DELETE_SCHEDULE, ADD_SCHEDULE_DATA, SET_SCHEDULE_DATA } from './mutation-types'

export default {
  async getSchedules({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI.list(provider.id)
      commit(SET_SCHEDULES, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async getSchedule({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI.get(provider.id, id)
      commit(SET_SCHEDULE_DATA, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createSchedule({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI
        .create(provider.id,payload)
      commit(UPDATE_SCHEDULE, data.data)
      commit(SET_SCHEDULE_DATA, {})
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  async updateSchedule({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await SchedulesAPI
        .update(provider.id,payload)
      commit(UPDATE_SCHEDULE, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async deleteSchedule({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await SchedulesAPI
        .delete(provider.id, id)
      commit(DELETE_SCHEDULE, id)
    } catch (error) {
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
