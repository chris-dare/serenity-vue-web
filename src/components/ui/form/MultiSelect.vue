<template>
  <div>
    <div class="bx--label">{{ title }}</div>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :multiple="multiple"
      :close-on-select="!multiple"
      :clear-on-select="false"
      :preserve-search="true"
      :placeholder="placeholder"
      :label="label"
      :track-by="trackBy"
      :preselect-first="preselect"
      :show-labels="false"
      :internal-search="false"
      :custom-label="customLabel"
      :disabled="disabled"
      @select="$emit('select', $event)"
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
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'MultiSelect',

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

    disabled: {
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

    customField: {
      type:String,
      default: null,
    },
  },

  computed: {
    selected: {
      get() {
        let data = {}
        if (this.customField) {
          data = this.options.find(option => option[this.customField] === this.value)
        } else {
          data = this.value
        }
        return data
      },
      set(val) {
        this.$emit('input', this.customField && val[this.customField] ? val[this.customField] : val)
      },
    },
  },
}
</script>
