<template>
  <MultiSelect
    v-model="localValue"
    :placeholder="placeholder"
    title="Patients"
    :custom-label="customLabel"
    track-by="mr_number"
    :options="options"
    :multiple="false"
    :searchable="true"
    :internal-search="false"
    :clear-on-select="false"
    :close-on-select="false"
    :limit="3"
    :max-height="600"
    :hide-selected="true"
    v-bind="$attrs"
    :loading="loading"
    @search-change="(val) => throttledSend(val, true)"
    @remove="$emit('remove', $event)"
  />
</template>

<script>
import ModelMixin from '@/mixins/model'
import PatientsApi from '@/api/patients'
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'AutoCompletePatients',

  mixins: [ModelMixin],

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Patients',
    },
    placeholder: {
      type: String,
      default: 'Type to search',
    },
    customLabel: {
      type: Function,
      default: (value) => this.$utils.concatData(value, ['title', 'first_name', 'other_names', 'last_name', 'mobile']),
    },
  },

  data() {
    return {
      options: [],
      defaultOptionsFound: false,
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
      this.fetchPatients(search, userInitiated)
    }, 300),

    async fetchPatients(search, userInitiated) {

      if (isEmpty(search)) {
        this.options = []
        return
      }
      this.loading = true
      const { data } = await PatientsApi.list(this.provider.id, { search })

      this.options = data.results
      if (userInitiated == false) {
        this.defaultOptionsFound = false
      }
      this.loading = false
    },

    // customLabel(value) {
    //   return this.$utils.concatData(value, ['title', 'first_name', 'other_names', 'last_name', 'mobile'])
    // },
  },
}
</script>

