<template>
  <div class="py-4 space-y-4">
    <div
      v-for="(item, index) in history"
      :key="index"
      class=" capitalize grid grid-cols-2"
    >
      <div class="text-serenity-primary">{{ index | removeUnderscore }}</div>
      <div>{{ item || 'N/A' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialHistoryDetails',

  props: {
    history: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
