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
    <ModalSetLocation />
  </div>
</template>

<script>
import ModalSetLocation from '@/components/locations/ModalSetLocation'

import updateMixin from '@/mixins/update'
import { mapState } from 'vuex'
export default {
  name: 'App',

  components: {ModalSetLocation},

  mixins: [updateMixin],

  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
    }),
  },

  watch: {
    loggedIn: {
      immediate: true,
      handler(val, oldVal) {
        console.log('val', val, oldVal)
        if (val && val !== oldVal) {
          setTimeout(() => {
            this.$trigger('set:location:open')
          }, 300)
        }
        
      },
    },
  },
}
</script>
