<template>
  <div>
    <div v-if="$userCan(permission)">
      <slot />
    </div>
    <div v-else>You are not allowed to view this page</div>
  </div>
</template>

<script>
export default {
  name: 'ProtectedPage',

  props: {
    permission: {
      type: String,
      default: null,
    },
  },
}
</script>
