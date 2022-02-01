<template>
  <div
    id="app"
    class="relative"
  >
    <router-view />

    <div
      v-if="updateExists"
      class="p-6 absolute right-2 bottom-2 shadow-lg space-y-2 rounded bg-white transition-all duration-200 ease-in-out"
    >
      <Close
        class="absolute top-2 right-2 cursor-pointer"
        @click="updateExists=false"
      />
      <p>New content available.</p>
        
      <SeButton
        size="sm"
        @click="refreshApp"
      >
        Refresh
      </SeButton>
    </div>
  </div>
</template>

<script>
import updateMixin from '@/mixins/update'
export default {
  name: 'App',

  mixins: [updateMixin],
}
</script>
