<template functional>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <slot />

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          v-if="!props.modal"
          variant="outline"
          @click="listeners['cancel']"
        >
          Cancel
        </SeButton>
        <SeButton
          v-if="props.previous && !props.modal"
          :to="{ name: props.previous }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="props.icon"
          :loading="props.loading"
          @click="listeners['save']"
        >
          {{ props.nextLabel }}
        </SeButton>
      </div>
    </div>
  </cv-form>
</template>

<script>
export default {
  name: 'MultiStepBase',
}
</script>
