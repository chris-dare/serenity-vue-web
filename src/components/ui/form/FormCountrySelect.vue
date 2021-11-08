<template>
  <MultiSelect
    v-model="selected"
    :title="title"
    :multiple="false"
    :options="countries"
    label="display"
    track_by="code"
    custom-field="code"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'FormCountrySelect',

  props: {
    value: {
      type: [Array, Object, String],
      default: () => [],
    },

    title: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapState({
      countries: state => state.global.countries,
    }),
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },

  created() {
    this.getCountries()
  },

  methods: {
    ...mapActions({
      getCountries: 'global/getCountries',
    }),
  },
}
</script>