<template>
  <div>
    <div>
      <MultiSelect
        v-model="localValue"
        placeholder="Type to search"
        :title="title"
        :multiple="multiple"
        :searchable="true"
        :internal-search="false"
        :limit="3"
        :max-height="600"
        :hide-selected="true"
        :loading="isLoading"
        :options="options.map(type => type.value)"
        clear-on-select
        v-bind="$attrs"
        @search-change="asyncFind"
        @remove="$emit('remove', $event)"
      >
        <template
          slot="singleLabel"
          slot-scope="props"
        >
          <span class="option__title">{{ getStoreFrontName(props) }}</span>
        </template>
        <template
          slot="option"
          slot-scope="props"
        >
          <span class="option__small">{{ getStoreFrontName(props) }}</span>
        </template>
      </MultiSelect>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
    title: {
      type: String,
      default: 'Condition',
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
  // watch: {
  //   localValue(val) {
  //     this.asyncFind(val)
  //   },
  // },

  mounted() {
    this.asyncFind('a')
  },

  methods: {
    ...mapActions({
      getDiagnosisCodeOptions: 'resources/getDiagnosisCodeOptions',
    }),

    async asyncFind (query) {
      if (!query) return
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

    getStoreFrontName(props) {
      let data = this.options.find(i => i.value === props.option)
      return data ? `${data.value} — [${data.label}]` : props.option
    },
  },
}
</script>

