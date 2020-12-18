<template>
  <div :class="customClass" class="bg-serenity-light-gray flex items-center">
    <input type="file" name="file" id="file" class="inputfile hidden" accept="image/*" />
    <label class="w-full" for="file">
      <div class="flex items-center justify-between text-serenity-primary w-full">
        <div>{{ title }}</div>
        <CloudUpload class="w-5 h-5" />
      </div>
    </label>
  </div>
</template>

<script>
import CloudUpload from '@carbon/icons-vue/es/cloud--upload/32'
export default {
  name: 'FIleUploadButton',

  components: {CloudUpload},

  props: {
    title: {
      type: String,
      default: 'Choose a file',
    },

    customClass: {
        type: String,
        default: 'h-12 px-6 border-t border-solid border-serenity-subtle-border',
    },
  },
}
</script>

<style></style>
