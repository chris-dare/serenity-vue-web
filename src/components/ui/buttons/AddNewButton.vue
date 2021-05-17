<template>
  <div
    class="flex item-center space-x-2 text-serenity-primary"
    @click="$emit('click')"
  >
    <AddFilled class="w-4 h-4 text-serenity-primary" />
    <span>Add new</span>
  </div>
</template>

<script>
export default {
  name: 'AddNewButton',
}
</script>
