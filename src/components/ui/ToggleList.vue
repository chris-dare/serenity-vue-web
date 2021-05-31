<template>
  <div class="mb-4">
    <div
      class="flex items-center justify-between w-full cursor-pointer"
      @click="toggleClose"
    >
      <div class="flex items-center w-full">
        <CaretUp32
          :class="[isClosed ? 'rotate-90' : 'rotate-180']"
          class="transform transition-all duration-100 ease-linear mr-2 text-serenity-primary w-5 h-5 cursor-pointer"
        />
        <div class="flex-1">
          <slot name="title">
            <div class="flex items-center justify-between">
              <p
                class="text-serenity-primary w-full"
              >
                {{ title }}
              </p>
              <AddFilled
                v-if="hasCreate"
                class="w-5 h-5 text-serenity-primary"
                @click.stop="$emit('create')"
              />
            </div>
          </slot>
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
  name: 'ToggleList',

  components: { CaretUp32 },

  props: {
    title: {
      type: String,
      default: null,
    },

    hasCreate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isClosed: true,
      key: Math.random(),
    }
  },

  watch: {
    isClosed(val) {
      if (!val) {
        this.$trigger('toggle:list:open', { key: this.key })
      }
    },
  },

  methods: {
    toggleClose() {
      this.isClosed = !this.isClosed
      this.$emit('change')
    },
  },

  events: {
    'toggle:list:open': function(_ev, { key }){
      if (key !== this.key && !this.isClosed) {
        this.isClosed = true
      }
    },
  },
}
</script>
