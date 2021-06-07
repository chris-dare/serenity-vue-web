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
      :custom-label="customLabel"
    >
      <template
        slot="clear"
      >
        <div
          v-if="!isEmptyData"
          class="multiselect__clear"
          @mousedown.prevent.stop="clear"
        >
          <Close class="w-4" />
        </div>
      </template>
    </VueMultiselect>
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
import isEmpty from 'lodash/isEmpty'

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

    customLabel: {
      type: Function,
      default (option, label) {
        if (isEmpty(option)) return ''
        return label ? option[label] : option
      },
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

    isEmptyData() {
      return isEmpty(this.selected)
    },
  },

  methods: {
    clear() {
      this.selected = ''
    },
  },
}
</script>