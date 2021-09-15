<template>
  <div class="grid grid-cols-2 gap-4">
    <cv-date-picker
      v-model="date.start"
      kind="single"
      date-label="Start date"
      class="inherit-full-input"
      :cal-options="calStartOptions"
      @change="$emit('change', $event)"
    />
    <cv-date-picker
      v-model="date.end"
      kind="single"
      date-label="End date"
      class="inherit-full-input"
      :cal-options="calOptions"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'DateRangePicker',

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
    calStartOptions() {
      return {
        'dateFormat': 'm/d/Y',
        defaultDate: Date.now(),
      }
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
