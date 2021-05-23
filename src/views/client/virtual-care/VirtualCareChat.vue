<template>
  <div class="p-4 flex flex-col h-full">
    <div class="h-20 bg-serenity-primary flex justify-end items-center p-4">
      <SeButton class="bg-serenity-primary-highlight space-x-2">
        <Camera class="w-5" />
        <span>Change to video</span>
      </SeButton>
    </div>

    <ChatView />
  </div>
</template>

<script>
import ChatView from '@/components/virtual-care/chat/ChatView'
import Camera from '@carbon/icons-vue/es/camera/32'

export default {
  name: 'VirtualCareChat',

  components: { ChatView, Camera },
}
</script>
