<template>
  <MultiSelect
    v-model="selected"
    :title="title"
    :multiple="false"
    :options="countries"
    label="name"
    track_by="alpha2Code"
    :placeholder="placeholder"
  />
</template>

<script>
import { mapState } from 'vuex'
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
}
</script>