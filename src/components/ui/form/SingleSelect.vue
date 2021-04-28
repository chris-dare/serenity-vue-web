<template>
  <div>
    <div class="bx--label">{{ title }}</div>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :searchable="false"
      close-on-select
      :show-labels="false"
      :placeholder="placeholder"
      :preselect-first="preselect"
    />
    <p
      v-if="error || errorMessage"
      class="error"
    >
      {{ errorMessage || 'This field is required' }}
    </p>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
export default {
  name: 'SingleSelect',

  components: { VueMultiselect },

  props: {
    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: [Array, Object, String],
      default: () => [],
    },

    title: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    error: {
      type: [Boolean, String],
      default: false,
    },

    errorMessage: {
      type: String,
      default: null,
    },

    preselect: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
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

<style>

</style>