<template>
  <div>
    <div
      v-if="title"
      class="bx--label space-x-1 flex items-center"
    >
      <span
        v-if="required"
        class="error"
      >*</span>
      <span>{{ title }}</span>

      <cv-tooltip
        v-if="information"
        :tip="information"
      >
        <Information
          v-if="information"
          class="w-4 h-4"
        />
      </cv-tooltip>
    </div>
    <div class="flex item-center group relative">
      <VueMultiselect
        v-model="selected"
        :options="options"
        :multiple="multiple"
        :close-on-select="!multiple"
        :preserve-search="preserveSearch"
        :placeholder="placeholder"
        :preselect-first="preselect"
        :show-labels="false"
        :custom-label="customLabel"
        class="group"
        v-bind="$attrs"
        :data-cy="cyName"
        @input="$emit('select', $event)"
        @search-change="$emit('search-change', $event)"
        @tag="$emit('tag', $event)"
        @remove="$emit('remove', $event)"
      >
        <template
          slot="clear"
        >
          <div
            v-if="!isEmptyData && !hideClose"
            class="multiselect__clear"
            @mousedown.prevent.stop="clear"
          >
            <Close class="w-4" />
          </div>
        </template>
        <!-- Pass on all named slots -->
        <slot
          v-for="slot in Object.keys($slots)"
          :slot="slot"
          :name="slot"
        />

        <!-- Pass on all scoped slots -->
        <template
          v-for="slot in Object.keys($scopedSlots)"
          :slot="slot"
          slot-scope="scope"
        >
          <slot
            :name="slot"
            v-bind="scope"
          />
        </template>
      </VueMultiselect>
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
import Information from '@carbon/icons-vue/es/information/32'

export default {
  name: 'MultiSelect',

  components: { VueMultiselect, Information },

  props: {
    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: [Array, Object, String, Number],
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

    multiple: {
      type: Boolean,
      default: false,
    },

    preselect: {
      type: Boolean,
      default: false,
    },

    preserveSearch: {
      type: Boolean,
      default: true,
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

    required: {
      type: Boolean,
      default: false,
    },

    hideClose: {
      type: Boolean,
      default: false,
    },

    information: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      cleared: false,
      selected: null,
    }
  },

  computed: {
    isEmptyData() {
      return isEmpty(this.selected)
    },

    cyName() {
      return this.title?.split(' ').join('_').toLowerCase()
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal && this.options?.length) {
          this.assignSelected()
        }
      },
    },

    options: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.assignSelected()
        }
      },
    },

    selected: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val === '' || !val) {
            this.$emit('input', this.multiple ? [] : null)
            return
          }
          this.$emit('input', this.customField && val[this.customField] ? val[this.customField] : val)
        }
      },
    },
  },

  methods: {
    clear() {
      if (this.multiple) {
        this.selected.forEach(element => {
          this.$emit('remove', element)
        })
      }
      this.selected = ''
    },

    assignSelected() {
      let data = {}

      if (this.customField) {
        data = this.options.find(option => option[this.customField] === this.value)
      } else {
        data = this.value
      }
      this.selected = data
    },
  },
}
</script>
