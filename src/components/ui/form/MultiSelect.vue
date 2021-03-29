<template>
  <div>
    <div class="bx--label">{{ title }}</div>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :multiple="multiple"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      :placeholder="placeholder"
      :label="label"
      :track-by="trackBy"
      :preselect-first="preselect"
      :show-labels="false"
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
    trackBy: {
      type: String,
      default: 'id',
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

    multiple: {
      type: Boolean,
      default: false,
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
