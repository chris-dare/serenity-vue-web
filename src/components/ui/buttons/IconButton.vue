<template functional>
  <div
    class="bg-serenity-light-gray w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-serenity-primary"
    @click="listeners['click']"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'IconButton',
}
</script>
