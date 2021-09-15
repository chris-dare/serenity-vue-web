<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <p class="bx--label capitalize">{{ label }}</p>
    <div class="items-center relative">
      <cv-text-input
        v-model="localValue"
        :placeholder="placeholder"
        class="col-span-4 se-no-label"
        :disabled="disabled"
        :class="{'se-input-disabled': disabled}"
        v-bind="$attrs"
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
  name: 'MixedInput',

  mixins: [modelMixin],

  props: {
    placeholder: {
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
  },
}
</script>
