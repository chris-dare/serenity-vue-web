<template>
  <div
    :class="customClass"
    class="bg-serenity-light-gray flex items-center"
  >
    <input
      id="file"
      ref="input"
      type="file"
      name="file"
      :value="value"
      class="inputfile hidden"
      accept="image/*,.pdf"
      v-on="inputListeners"
    >
    <label
      class="w-full"
      for="file"
    >
      <slot name="button">
        <div
          :class="customClass"
          class="flex items-center justify-between text-serenity-primary w-full px-6"
        >
          <div>{{ title }}</div>
          <CloudUpload class="w-5 h-5" />
        </div>
      </slot>
    </label>
  </div>
</template>

<script>
import CloudUpload from '@carbon/icons-vue/es/cloud--upload/32'
export default {
  name: 'FileUploadButton',

  components: {CloudUpload},

  props: {
    title: {
      type: String,
      default: 'Choose a file',
    },

    customClass: {
      type: String,
      default: 'h-12 border-t border-solid border-serenity-subtle-border',
    },

    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      }
    },
  },
}
</script>
