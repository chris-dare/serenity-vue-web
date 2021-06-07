<template>
  <div class="flex flex-col md:flex-row h-full overflow-hidden">
    <div
      class="border-r overflow-hidden relative transition-all duration-500 ease-in-out"
      :class="{ 'w-1/3': !isOpen, 'w-2/3': isOpen }"
    >
      <slot name="side" />
    </div>
    <div
      class="overflow-y-auto overflow-x-hidden bg-serenity-light-gray "
      :class="[isOpen ? 'w-1/3' : 'w-2/3']"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeSectionLayout',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
