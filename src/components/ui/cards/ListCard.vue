<template>
  <div :class="[isActive ? 'bg-white': 'bg-transparent']" class="w-full border border-solid px-3 py-6 relative border-serenity-subtle-border rounded-sm">
      <div :class="[border, isActive ? 'w-1': 'w-0.5']" class="absolute left-0 top-0 h-full"></div>
      <slot />
  </div>
</template>

<script>
export default {
    name: 'ListCard',

    props: {
        border: {
            type: String,
            default: 'bg-serenity-primary',
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
