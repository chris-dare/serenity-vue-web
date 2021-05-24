<template>
  <div>
    <div
      v-if="error && !loading"
      class="text-red-500 cursor-pointer space-y-2 text-lg"
    >
      <div
        class="flex item-center space-x-2"
        @click="$router.go(-1)"
      >
        <Back class="text-serenity-primary" />
        <p class="text-serenity-primary">Go back</p>
      </div>
      <div>Error loading page. Please check your internet connection and try again.</div>
    </div>
    <cv-loading
      :active="loading && !error"
      overlay
    />
    <div v-if="!error && !loading">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppStatePage',

  components: {
    Back: () => import('@carbon/icons-vue/es/arrow--left/16'),

  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
