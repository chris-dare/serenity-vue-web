<template>
  <div>
    <div class="bx--label">{{ title }}</div>
    <div class="flex item-center group relative">
      <VueMultiselect
        v-model="selected"
        :options="options"
        :multiple="multiple"
        :close-on-select="!multiple"
        :preserve-search="true"
        :placeholder="placeholder"
        :label="label"
        :track-by="trackBy"
        :preselect-first="preselect"
        :show-labels="false"
        :internal-search="enableSearch"
        :custom-label="customLabel"
        :disabled="disabled"
        class="group"
        @input="$emit('select', $event)"
      />
      <div
        class="flex items-center border-b border-solid border-secondary h-full absolute right-0"
        :class="{'px-2': !selected}"
      >
        <Close
          v-if="selected"
          class="w-4 z-50 cursor-pointer invisible group-hover:visible"
          @click="clear"
        />
      </div>
    </div>
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

    enableSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cleared: false,
    }
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
        if (val === '') {
          this.$emit('input', null)
          return
        }
        this.$emit('input', this.customField && val[this.customField] ? val[this.customField] : val)
      },
    },
  },

  methods: {
    clear() {
      this.selected = ''
    },
  },
}
</script>
