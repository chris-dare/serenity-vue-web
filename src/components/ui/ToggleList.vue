<template>
  <div class="mb-4">
    <div @click="isOpen = !isOpen" class="flex items-center">
        <CaretUp32 :class="[isOpen ? 'rotate-180' : 'rotate-0']" class="transform transition-all duration-100 ease-linear mr-2 text-serenity-primary w-5 h-5" />
        <slot name="title"> {{ title }} </slot>
    </div>
    <div class="overflow-hidden transform transition-all duration-200 ease-in-out pl-7 origin-top pt-1 text-sm" :class="[isOpen ? 'scale-y-0 h-0' : 'scale-y-100 h-auto']">
        <slot />
    </div>
  </div>
</template>

<script>
import CaretUp32 from '@carbon/icons-vue/es/caret--up/32'
export default {
    name: '',

    props: {
        title: {
            type: String,
            default: null,
        },
    },

    components: { CaretUp32 },

    data() {
        return {
            isOpen: false,
        }
    },
}
</script>
