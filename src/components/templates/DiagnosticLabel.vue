<template>
  <div class="flex h-56">
    <div class="bg-black text-white w-10 relative h-full">
      <p class="text-white transform -rotate-90 absolute origin-0 whitespace-nowrap bottom-5 left-5 font-bold uppercase">
        {{ detail.priority }} <span class="font-normal">{{ detail.code }}</span>
      </p>
    </div>

    <div />
  </div>
</template>

<script>
export default {
  name: 'DiagnosticLabel',

  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {

    }
  },
}
</script>
