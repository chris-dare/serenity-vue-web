<template>
  <div class="h-full">
    <p class="bx--label">{{ label }}</p>
    <Webcam v-model="localValue" />
    <FileUploadButton
      v-model="localValue"
      title="Or upload patient photo"
    />
  </div>
</template>

<script>
import model from '@/mixins/model'
export default {
  name: 'UploadImage',

  mixins: [model],

  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
