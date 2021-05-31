import { cloneDeep, isEqual } from 'lodash'

let initialData = {}

export default {
  data() {
    return {
      propertiesToCompareChanges: null,
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.dataHasNotChanged()) {
      return next()
    }

    this.confirmChanges(next)
  },

  created() {
    this.$nextTick(() => {
      this.resetDirtyState()
    })
  },

  methods: {
    dataHasNotChanged() {
      const keys = this.propertiesToCompareChanges || Object.keys(this.$data)
      for (const key of keys) {
        if (!isEqual(initialData[key], this.$data[key])) {
          return false
        }
      }
      return true
    },

    // eslint-disable-next-line no-unused-vars
    confirmChanges(next) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'stay',
        cancelButtonText: 'discard',
        label: 'You have unsaved changes. Do you want to discard them or save them?',
        callback: async () => {
          console.log('here')
        },
        cancel: async () => {
          this.resetDirtyState()
          next()
        },
      })
    },

    resetDirtyState() {
      initialData = cloneDeep(this.$data)
    },
  },
}
