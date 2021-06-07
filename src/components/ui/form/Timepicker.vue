<template>
  <div>
    <p
      v-if="label"
      class="bx--label"
    >
      {{ label }}
    </p>
    <VueTimepicker
      v-model="localValue"
      format="HH:mm:ss"
    />
    <p class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Timepicker',

  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      localValue: '',
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.localValue = newVal
      },
    },

    localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vue__time-picker{
    border-bottom: 1px solid #8d8d8d;
    @apply rounded-none
}
</style>
