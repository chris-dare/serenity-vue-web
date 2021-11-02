import InventoryAPI from '@/api/inventory'
import Vue from 'vue'
import { SET_INVENTORY, DELETE_INVENTORY, UPDATE_INVENTORY } from './mutation-types'

export default {
  async getInventory({ commit, rootState }, params ) {
    try {
      const provider = rootState.auth.provider
      const { data } = await InventoryAPI.list(provider.id, params)
      commit(SET_INVENTORY, data.results)
      return data
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createInventory({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      payload.provider_id = provider.id
      const { data } = await InventoryAPI.create(payload)
      commit(UPDATE_INVENTORY, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateInventory({ commit }, payload) {
    try {
      delete payload.provider
      const { data } = await InventoryAPI.update(payload)
      commit(UPDATE_INVENTORY, data.data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async deleteInventory({ commit }, id) {
    try {
      await InventoryAPI.delete(id)
      commit(DELETE_INVENTORY, id)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },
}
