<template>
  <MultiSelect
    v-model="localValue"
    :custom-label="customLabel"
    track-by="id"
    :options="options"
    :multiple="false"
    :searchable="true"
    :internal-search="true"
    :clear-on-select="false"
    :close-on-select="false"
    :limit="3"
    :max-height="600"
    v-bind="$attrs"
    :loading="loading"
    @search-change="(val) => fetchUsers(val, true)"
    @remove="$emit('remove', $event)"
  >
    <template slot="noOptions">List is empty. Type to search</template>
  </MultiSelect>
</template>

<script>
import ModelMixin from '@/mixins/model'
import UsersApi from '@/api/users'
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'AutoCompletePractitioners',

  mixins: [ModelMixin],

  data() {
    return {
      options: [],
      defaultOptionsFound: false,
      selectedObj: null,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      provider: state => state.auth.provider,
    }),
  },

  methods: {
    throttledSend: debounce(function(search, userInitiated) {
      this.fetchUsers(search, userInitiated)
    }, 1500),

    async fetchUsers(search, userInitiated) {
      if (isEmpty(search)) {
        this.options = []
        return
      }
      this.loading = true
      const { data } = await UsersApi.list(this.provider.id, { search })

      this.options = data.data
      if (userInitiated == false) {
        this.defaultOptionsFound = false
      }
      this.loading = false
    },

    async fetchUser(id, userInitiated) {

      if (isEmpty(id)) {
        this.options = []
        return
      }
      const { data } = await UsersApi.get(this.provider.id, id)

      this.options = [data.data]
      this.selectedObj = data.data
      if (userInitiated == false) {
        this.defaultOptionsFound = false
      }
    },

    customLabel(value) {
      return this.$utils.concatData(value, ['title', 'first_name', 'other_names', 'last_name'])
    },
  },
}
</script>

