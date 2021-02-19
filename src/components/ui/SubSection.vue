<template>
  <div class="space-y-1">
    <p class="text-gray-500">{{ label }}</p>
    <div>
      <slot>
        <p :class="descriptionColor">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubSection',

  props: {
    label: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },

    descriptionColor: {
      type: String,
      default: 'text-primary',
    },
  },
}
</script>
