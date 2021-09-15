<template functional>
  <div class="space-x-1">
    <span
      v-if="props.required"
      class="error"
    >*</span>
    <span class="bx--label">{{ props.label }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormLabel',
}
</script>
