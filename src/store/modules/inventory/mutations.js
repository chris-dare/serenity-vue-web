import { SET_INVENTORY, UPDATE_INVENTORY, DELETE_INVENTORY } from './mutation-types'

export default {
  [SET_INVENTORY](state, inventory) {
    state.inventory = inventory
  },

  [UPDATE_INVENTORY](state, inventory) {
    const index = state.inventory.findIndex(a => a.id === inventory.id)
    if (index !== -1) {
      state.inventory = state.inventory.map(a => {
        if (a.id === inventory.id) return inventory
        return a
      })
    } else {
      state.inventory.push(inventory)
    }
  },

  [DELETE_INVENTORY](state, inventoryId) {
    const index = state.inventory.findIndex(a => a.id === inventoryId)
    if (index !== -1) {
      state.inventory.splice(index, 1)
    }
  },
}
