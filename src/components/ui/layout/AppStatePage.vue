<template>
  <div>
    <Loading
      v-if="loading"
    />
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppStatePage',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
