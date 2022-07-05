<template>
  <div class="space-y-4">
    <div
      v-for="(item, index) in localValue"
      :key="index"
      class="space-x-2 flex border-b border-solid border-subtle py-2"
    >
      <p>{{ index + 1 }}.</p>
      <div class="flex-1">
        <slot :item="item" />
      </div>
      <div class="flex items-center space-x-4">
        <Edit
          class="w-4 h-4 cursor-pointer"
          @click="$emit('edit', item)"
        />
        <Trash
          class="w-4 h-4 cursor-pointer"
          @click="$emit('remove', item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import model from '@/mixins/model'

export default {
  name: 'MultipleOptionsWrapper',

  mixins: [model],
}
</script>
