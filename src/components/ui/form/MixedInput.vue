<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <p class="bx--label">{{ label }}</p>
    <div class="items-center relative">
      <cv-text-input
        v-model="localValue"
        :placeholder="placeholder"
        class="col-span-4 se-no-label"
      />
      <div class="flex items-center h-full absolute right-2 top-0 text-secondary">
        <component
          :is="suffixIcon"
          class="w-5"
          @click="$emit('click')"
        />
        {{ suffixText }}
      </div>
    </div>
    <p v-if="invalidMessage">{{ invalidMessage }}</p>
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
  },
}
</script>
