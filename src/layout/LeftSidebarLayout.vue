<template>
  <div class="flex flex-col md:flex-row h-full overflow-hidden">
    <div
      class="border-r overflow-hidden transition-all duration-500 ease-in-out relative"
      :class="{ 'w-12': !isOpen, 'w-1/5': isOpen }"
    >
      <div
        v-if="!isOpen"
        @click="isOpen = !isOpen"
        class="absolute flex items-center justify-center top-0 left-0 w-12 h-12 bg-serenity-warning transition-all duration-500 ease-in-out"
      >
        <img src="@/assets/img/user--activity 1.svg" class="w-5 h-5" alt="" />
      </div>
      <div>
        <slot v-if="isOpen" name="sidebar" />
        <div class="absolute bottom-0 left-0 h-12 bg-black flex w-full">
          <div
            class="w-full pr-4 flex transition-all duration-500 ease-in-out justify-end items-center bg-serenity-light-gray"
            :class="{ hidden: !isOpen, block: isOpen }"
          >
            <p class="text-xs">Minimize panel</p>
          </div>
          <div
            @click="isOpen = false"
            class="w-12 flex items-center justify-center h-12 bg-black"
          >
            <img
              src="@/assets/img/drag--horizontal 1.svg"
              class="w-5 h-5"
              alt=""
            />
          </div>
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
export default {
  name: 'LeftSidebarLayout',

  data() {
    return {
      isOpen: false,
    }
  },
}
</script>
