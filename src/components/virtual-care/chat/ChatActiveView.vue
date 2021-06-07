<template>
  <div>
    <div
      v-for="(message, index) in messages"
      :key="index"
    >
      <ChatMessageByMe
        v-if="message.sent_by_me"
        :message="message"
      />
      <ChatMessage
        v-else
        :message="message"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatActiveView',

  components: {
    ChatMessage: () => import('./ChatMessage'),
    ChatMessageByMe: () => import('./ChatMessageByMe'),
  },

  data() {
    return {
      messages: [
        { label: 'Aha', sent_by_me: true, date: new Date() },
        { label: 'Aha', sent_by_me: false,  date: new Date() },
      ],
    }
  },
}
</script>