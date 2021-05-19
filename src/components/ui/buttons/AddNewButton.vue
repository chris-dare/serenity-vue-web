<template>
  <div
    class="flex item-center space-x-1 text-serenity-primary"
    @click="$emit('click')"
  >
    <AddFilled class="w-5 h-5 text-serenity-primary" />
    <span>
      <slot>Add new</slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'AddNewButton',
}
</script>
