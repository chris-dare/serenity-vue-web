<template>
  <SeForm class="flex w-full space-x-2">
    <div class="flex-1 flex items-end">
      <cv-text-input
        v-model="message"
        class="borderless-input"
        placeholder="Type message"
      />
      <div class="flex items-center justify-center h-full bg-serenity-light-gray pr-3">
        <Microphone class="w-5" />
      </div>
    </div>
    <div class="flex items-center justify-center bg-serenity-primary w-10">
      <Send class="w-5 text-white" />
    </div>
  </SeForm>
</template>

<script>


export default {
  name: 'ChatFooter',

  components: {
    Microphone: () => import('@carbon/icons-vue/es/microphone/32'),
    Send: () => import('@carbon/icons-vue/es/send/32'),
  },

  data() {
    return {
      message: '',
    }
  },
}
</script>
