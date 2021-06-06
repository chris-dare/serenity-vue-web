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
        :preselect-first="preselect"
        :show-labels="false"
        :custom-label="customLabel"
        class="group"
        v-bind="$attrs"
        @input="$emit('select', $event)"
        @search-change="$emit('search-change', $event)"
        @tag="$emit('tag', $event)"
        @remove="$emit('remove', $event)"
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

  data() {
    return {
      cleared: false,
      selected: null,
    }
  },

  computed: {
    // selected: {
    //   get() {
    //     let data = {}
    //     if (this.customField) {
    //       data = this.options.find(option => option[this.customField] === this.value)
    //     } else {
    //       data = this.value
    //     }
    //     return data
    //   },
    //   set(val) {
    //     if (val === '' || !val) {
    //       this.$emit('input', null)
    //       return
    //     }
    //     this.$emit('input', this.customField && val[this.customField] ? val[this.customField] : val)
    //   },
    // },

    isEmptyData() {
      return isEmpty(this.selected)
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          let data = {}
          if (this.customField) {
            data = this.options.find(option => option[this.customField] === this.value)
          } else {
            data = this.value
          }
          this.selected = data
        }
      },
    },

    selected: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (val === '' || !val) {
            this.$emit('input', null)
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
  },
}
</script>
