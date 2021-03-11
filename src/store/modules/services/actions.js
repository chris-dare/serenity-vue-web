/* eslint-disable no-unused-vars */
import ServicesAPI from '@/api/services'
import { SET_SERVICES } from './mutation-types'

export default {
  async getServices({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_SERVICES, data.data)
  },
}
