<template>
  <div>
    <div>
      <MultiSelect
        v-model="localValue"
        placeholder="Type to search"
        title="Condition"
        :options="options"
        :multiple="multiple"
        :searchable="true"
        :internal-search="true"
        :clear-on-select="false"
        :close-on-select="false"
        :limit="3"
        :max-height="600"
        :hide-selected="true"
        :options-limit="4"
        :loading="isLoading"
        :custom-label="nameWithLang"
        custom-field="value"
        track-by="value"
        @search-change="asyncFind"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ModelMixin from '@/mixins/model'
import debounce from 'lodash/debounce'

export default {
  name: 'AutoCompleteClinicalTables',

  mixins: [ModelMixin],

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isLoading: false,
      total: 0,
    }
  },

  computed: {
    ...mapState({
      clinicalOptions: state => state.resources.clinicalOptions,
    }),
    ...mapGetters({
      medications: 'resources/medications',
    }),

    options() {
      let data = []

      this.clinicalOptions.forEach(element => {
        data.push({
          label: element[0],
          value: element[1],
        })
      })

      return data
    },
  },

  // TODO: quick and dirty solution to get initially set values to show in the textbox
  watch: {
    localValue(val) {
      this.asyncFind(val)
    },
  },

  methods: {
    ...mapActions({
      getDiagnosisCodeOptions: 'resources/getDiagnosisCodeOptions',
    }),

    async asyncFind (query) {
      this.isLoading = true
      await this.getDiagnosisCodeOptions(query)
      
      this.isLoading = false
    },

    generate: debounce(function (query) {
      this.asyncFind(query)
    }, 500),

    nameWithLang (data) {
      return `${data.value} — [${data.label}]`
    },
  },
}
</script>

