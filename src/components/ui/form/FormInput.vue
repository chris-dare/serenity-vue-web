<template>
  <div>
    <div class="space-x-1">
      <span
        v-if="required"
        class="error"
      >*</span>
      <span class="bx--label">{{ label }}</span>
    </div>
    <component
      :is="inputComponent"
      v-model="localValue"
      :type="type"
      v-bind="$attrs"
      class="se-no-label"
      :data-qa="qaName"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
export default {
  name: 'FormInput',

  mixins: [modelMixin],

  props: {
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    inputComponent() {
      if (this.type == 'number') {
        return 'cv-number-input'
      }
      if (this.type == 'textarea') {
        return 'cv-text-area'
      }

      return 'cv-text-input'
    },

    qaName() {
      return this.label?.split(' ').join('_').toLowerCase()
    },
  },
}
</script>
