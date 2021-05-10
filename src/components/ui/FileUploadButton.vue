<template>
  <div
    :class="customClass"
    class="bg-serenity-light-gray flex items-center"
  >
    <input
      id="file"
      type="file"
      name="file"
      class="inputfile hidden"
      accept="image/*"
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
  },
}
</script>
