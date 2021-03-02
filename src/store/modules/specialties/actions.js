/* eslint-disable no-unused-vars */
import SpecialtiesAPI from '@/api/specialties'
import { SET_SPECIALTIES, DELETE_SPECIALTY, UPDATE_SPECIALTY} from './mutation-types'

export default {
  async getUsers({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await SpecialtiesAPI.list(provider.id).catch((error) => {
      console.log('error specialties', error)
      throw error
    })
    commit(SET_SPECIALTIES, data.data)
  },

  async createUser({ commit }, payload) {
    const { data } = await SpecialtiesAPI
      .create(payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_SPECIALTY, data.data)
  },

  async updateUser({ commit }, { id, payload }) {
    const { data } = await SpecialtiesAPI
      .update(id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_SPECIALTY, data.data)
  },
  async deleteUser({ commit }, id) {
    const { data } = await SpecialtiesAPI
      .delete(id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_SPECIALTY, data)
  },
}
