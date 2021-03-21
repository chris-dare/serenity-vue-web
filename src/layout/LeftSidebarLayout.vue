<template>
  <div class="flex flex-col md:flex-row h-full overflow-hidden">
    <div
      v-if="workspaceType !== 'admin'"
      class="border-r overflow-hidden relative transition-all duration-500 ease-in-out"
      :class="{ 'w-12': !isOpen, 'w-1/5': isOpen }"
    >
      <div>
        <div
          v-if="!isOpen"
          class="absolute flex items-center justify-center top-0 left-0 w-12 h-12 bg-warning transition-all duration-500 ease-in-out"
          @click="isOpen = !isOpen"
        >
          <img
            src="@/assets/img/user--activity 1.svg"
            class="w-5 h-5"
            alt=""
          >
        </div>
        <div>
          <div>
            <slot
              v-if="isOpen"
              name="sidebar"
            />
          </div>
        </div>
      </div>
      <div
        class="h-full"
        @click="conditionalOpening"
      />
      <div class="absolute bottom-0 left-0 h-12 bg-black flex w-full">
        <div
          class="w-full pr-4 flex transition-all duration-500 ease-in-out justify-end items-center bg-serenity-light-gray"
          :class="{ hidden: !isOpen, block: isOpen }"
        >
          <p class="text-xs">Minimize panel</p>
        </div>
        <div
          class="w-12 flex items-center justify-center h-12 bg-black"
          @click="isOpen = !isOpen"
        >
          <ArrowRight
            class="w-5 h-5 text-white transition-all duration-50 ease-in-out transform"
            :class="[isOpen ? 'rotate-180' : 'rotate-0']"
          />
        </div>
      </div>
    </div>
    <div
      class="overflow-y-auto overflow-x-hidden bg-serenity-light-gray py-10 px-12"
      :class="{ 'w-full': !isOpen, 'w-4/5': isOpen }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import ArrowRight from '@carbon/icons-vue/es/arrow--right/32'
import { mapState } from 'vuex'
export default {
  name: 'LeftSidebarLayout',

  components: { ArrowRight },

  data() {
    return {
      isOpen: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),
  },

  methods: {
    conditionalOpening() {
      if (this.isOpen) {
        return
      }

      this.isOpen = true
    },
  },
}
</script>
