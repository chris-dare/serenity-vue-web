/* eslint-disable no-unused-vars */
import SpecialtiesAPI from '@/api/specialties'
import { SET_SPECIALTIES } from './mutation-types'

export default {
  async getSpecialties({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await SpecialtiesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_SPECIALTIES, data.data)
  },
}
