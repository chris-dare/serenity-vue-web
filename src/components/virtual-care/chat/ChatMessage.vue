<template>
  <div class="py-4 space-y-2">
    <span class="bg-serenity-primary text-white p-4 w-auto">
      {{ message.label }}
    </span>
    <p class="pt-2 text-xs text-secondary">
      {{ $date.formatDate(message.date) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',

  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
