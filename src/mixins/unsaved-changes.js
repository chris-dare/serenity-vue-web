import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

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

    confirmChanges(next) {
      this.$confirm(this.$t('you_have_unsaved_changes'), 'Warning', {
        confirmButtonText: this.$t('stay'),
        cancelButtonText: this.$t('discard'),
        type: 'warning',
      })
        // do we really need this 'then'?
        .then(() => {
          return true
        })
        .catch(() => {
          this.resetDirtyState()
          next()
        })
    },

    resetDirtyState() {
      initialData = cloneDeep(this.$data)
    },
  },
}
