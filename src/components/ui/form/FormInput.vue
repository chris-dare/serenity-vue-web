<template>
  <div>
    <div
      v-if="label"
      class="space-x-1 bx--label"
    >
      <span
        v-if="required"
        class="error"
      >*</span>
      <span class="">{{ label }}</span>
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
    <component
      :is="inputComponent"
      v-model="localValue"
      :type="type"
      v-bind="$attrs"
      class="se-no-label"
      :data-cy="cyName"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import Information from '@carbon/icons-vue/es/information/16'

export default {
  name: 'FormInput',

  components: {Information},

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
    information: {
      type: String,
      default: '',
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

    cyName() {
      return this.label?.split(' ').join('_').toLowerCase()
    },
  },
}
</script>
