<template functional>
  <div
    class="bg-serenity-light-gray rounded-full flex items-center justify-center cursor-pointer "
    :class="[props.small ? 'w-5 h-5' : 'w-8 h-8 text-serenity-primary']"
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
