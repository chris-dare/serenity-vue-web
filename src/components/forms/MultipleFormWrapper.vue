<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <p class="font-semibold">{{ label }}</p>
      <IconButton @click="add"><Add /></IconButton>
    </div>
    <div
      v-for="(val, index) in localValue"
      :key="index"
      class="grid grid-cols-12 gap-x-4 gap-y-8"
    >
      <p class="text-serenity-green font-semibold mb-4">{{ index + 1 }}.</p>
      <div class="col-span-10">
        <slot :data="val" />
      </div>
      <Trash
        class="w-5 h-5 cursor-pointer"
        @click="remove(index)"
      />
    </div>
  </div>
</template>

<script>
import model from '@/mixins/model'
export default {
  name: 'MultipleFormWrapper',

  mixins: [model],

  props: {
    label: {
      type: String,
      default: '',
    },

    defaultValue: {
      type: [String, Array, Object],
      default: null,
    },
  },

  methods: {
    add() {
      this.localValue.push(this.defaultValue)
    },
    remove(index) {
      this.localValue.splice(index, 1)
    },
  },
}
</script>
