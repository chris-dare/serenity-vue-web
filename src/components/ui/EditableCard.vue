<template>
  <div class="bg-white py-3 px-5">
    <div class="flex items-center justify-between">
      <p class="text-gray-500 text-xs">{{ title }}</p>
      <div
        class="bg-serenity-light-gray w-9 h-9 rounded-full ml-6 flex items-center justify-center"
      >
        <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
      </div>
    </div>
    <div>
        <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'EditableCard',

    props: {
        title: {
            type: String,
            default: '',
        },
    },
}
</script>
