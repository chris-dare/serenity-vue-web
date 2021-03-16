<template>
  <div class="space-y-1">
    <p class="text-secondary">{{ label }}</p>
    <div>
      <slot>
        <p
          :class="descriptionColor"
          class="capitalize"
        >
          {{ description }}
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBlock',

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
