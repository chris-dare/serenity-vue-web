/* eslint-disable no-unused-vars */
import ResourceAPI from '@/api/resources'
import SpecialtiesAPI from '@/api/specialties'
import { SET_RESOURCES, SET_SPECIALTIES, SET_CATEGORIES, SET_CODES } from './mutation-types'

export default {
  async getResources({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await ResourceAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_RESOURCES, data.data)
  },

  async getSpecialties({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await SpecialtiesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_SPECIALTIES, data.data)
  },

  async getCategories({ commit, rootState }) {
    const { data } = await ResourceAPI.categories().catch((error) => {
      throw error
    })
    commit(SET_CATEGORIES, data.data)
  },

  async getCodes({ commit, rootState }) {
    const { data } = await ResourceAPI.codes().catch((error) => {
      throw error
    })
    commit(SET_CODES, data.data)
  },
}
