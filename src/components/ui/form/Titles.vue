<template>
  <div>
    <p class="bx--label">{{ label }}</p>
    <div class="flex items-center justify-between w-full">
      <cv-radio-button
        v-for="(item, index) in titles"
        :key="index"
        v-model="input"
        :name="name"
        :label="item"
        :value="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Title',
    },
  },
  computed: {
    ...mapState({
      titles: (state) => state.global.titles,
    }),

    name() {
      return `group-${Math.random()}`
    },

    input: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>