<template>
  <div>
    <img
      v-if="url"
      class="rounded-full"
      :class="customClass"
      :src="url"
      alt=""
    >
    <Avatar
      v-else
      :name="alt"
      :class="customClass"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageBlock',

  props: {
    alt: {
      type: String,
      default: '',
    },

    customClass: {
      type: String,
      default: 'w-16 h-16 text-lg',
    },

    url: {
      type: [String,Object],
      default: '',
    },
  },
}
</script>
