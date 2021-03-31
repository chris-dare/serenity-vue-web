<template>
  <div class="grid grid-cols-2 gap-4">
    <cv-date-picker
      v-model="date.start"
      kind="single"
      date-label="Start date"
      class="inherit-full-input"
    />
    <cv-date-picker
      v-model="date.end"
      kind="single"
      date-label="End date"
      class="inherit-full-input"
      :cal-options="calOptions"
    />
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    value: {
      type: Object,
      default: () => ({
        start: '',
        end: '',
      }),
    },
  },

  computed: {
    date: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    calOptions() {
      return {
        'dateFormat': 'm/d/Y',
        minDate: this.date.start,
      }
    },
  },
}
</script>
