<template>
  <div class="mb-4">
    <div
      class="flex items-center justify-between w-full"
    >
      <div class="flex items-center w-full">
        <CaretUp32
          :class="[isClosed ? 'rotate-90' : 'rotate-180']"
          class="transform transition-all duration-100 ease-linear mr-2 text-serenity-primary w-5 h-5 cursor-pointer"
          @click="isClosed = !isClosed"
        />
        <div class="flex-1">
          <slot name="title"> {{ title }} </slot>
        </div>
      </div>
    </div>
    <div
      class="overflow-hidden transform transition-all duration-200 ease-in-out pl-7 origin-top pt-1 "
      :class="[isClosed ? 'scale-y-0 h-0' : 'scale-y-100 h-auto']"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import CaretUp32 from '@carbon/icons-vue/es/caret--up/32'
export default {
  name: '',

  components: { CaretUp32 },

  props: {
    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isClosed: true,
    }
  },
}
</script>
