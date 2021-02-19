<template>
  <div>
    <router-link
      tag="div"
      :to="to"
      class="flex justify-center items-center h-12 hover:bg-serenity-primary-highlight relative"
      exact-active-class="bg-serenity-primary-highlight"
    >
      <slot />
      <div
        v-if="hasNotifications"
        class="w-2 h-2 rounded-full bg-yellow-400 absolute right-1"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppNavItem',

  props: {
    to: {
      type: String,
      default: '/',
    },

    hasNotifications: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
