<template>
  <div class="py-4 space-y-2 flex flex-col justify-end items-end">
    <span class="bg-serenity-primary text-white p-4 w-auto">
      {{ message.label }}
    </span>
    <p class="text-xs text-secondary">
      {{ $date.formatDate(message.date) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChatMessageByMe',

  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>