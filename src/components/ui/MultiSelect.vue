<template>
  <div>
    <p class="bx--label">{{ title }}</p>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :multiple="multiple"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      :placeholder="placeholder"
      :label="label"
      track-by="id"
      :preselect-first="true"
    />
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
export default {
  name: 'Multiselect',

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

    label: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    error: {
      type: Boolean,
      default: false,
    },

    errorMessage: {
      type: String,
      default: 'This field is required',
    },

    multiple: {
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
