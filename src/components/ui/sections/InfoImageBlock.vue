<template>
  <div class="flex items-center py-2 space-x-2">
    <img
      v-if="url"
      class="w-10 h-10 rounded-full mr-3"
      :src="url"
      alt=""
    >
    <Avatar
      v-else
      :name="name || last"
    />
    <div>
      <p class="text-secondary">{{ label }}</p>
      <p class="text-secondary text-xs">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoImageBlock',

  props: {
    label: {
      type: String,
      default: '',
    },
    url: {
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

<style>

</style>