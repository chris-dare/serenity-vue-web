<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <div class="space-x-1">
      <span
        v-if="required"
        class="error"
      >*</span>
      <span class="bx--label capitalize">{{ label }}</span>
    </div>
    <div class="items-center relative">
      <cv-text-input
        v-model="localValue"
        v-mask="mask"
        :placeholder="placeholder"
        class="col-span-4 se-no-label"
        :disabled="disabled"
        :class="{'se-input-disabled': disabled}"
        v-bind="$attrs"
        :data-qa="qaName"
      />
      <div
        :class="{'cursor-not-allowed bg-gray-200 border-b-0 border-serenity-dark border-solid': disabled}"
        class="flex items-center h-full absolute right-2 top-0 text-secondary"
      >
        <component
          :is="suffixIcon"
          class="w-5"
          @click="$emit('click')"
        />
        {{ suffixText }}
      </div>
    </div>
    <p
      v-if="invalidMessage"
      class="error lowercase"
    >
      {{ invalidMessage }}
    </p>
  </cv-form>
</template>

<script>
import modelMixin from '@/mixins/model'
export default {
  name: 'FormMixedInput',

  mixins: [modelMixin],

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    mask: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    invalidMessage: {
      type: String,
      default: '',
    },
    suffixText: {
      type: String,
      default: '',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    qaName() {
      return this.label?.split(' ').join('_').toLowerCase()
    },
  },
}
</script>
