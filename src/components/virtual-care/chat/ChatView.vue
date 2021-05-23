<template>
  <div class="flex flex-col p-4 bg-white flex-1">
    <ChatActiveView class="flex-1" />
    <ChatFooter class="h-10" />
  </div>
</template>

<script>

export default {
  name: 'ChatView',

  components: {
    ChatFooter: () => import('./ChatFooter'),
    ChatActiveView: () => import('./ChatActiveView'),
  },
}
</script>
