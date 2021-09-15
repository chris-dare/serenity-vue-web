<template>
  <div class="grid grid-cols-2 gap-4">
    <Timepicker
      v-model="form.start_time"
      format="HH:mm"
      label="Specify a start time"
      hide-disabled-hours
      :error-message="$utils.validateRequiredField(v, 'start_time')"
    />
    <Timepicker
      v-model="form.end_time"
      label="Specify a end time"
      format="HH:mm"
      :hour-range="hourRange"
      :minute-range="minuteRange"
      :error-message="$utils.validateRequiredField(v, 'end_time')"
    />
  </div>
</template>

<script>
export default {
  name: 'TimeRangePicker',

  props: {
    value: {
      type: Object,
      default: () => ({
        start: '',
        end: '',
      }),
    },

    v: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    form: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },

    start() {
      return [[this.$date.formatDate(Date.now(), 'HH'), 23]]
    },

    hourRange() {
      if (!this.form.start_time) return [[0,24]]
      return [[parseInt(this.form.start_time.split(':')[0]), 24]]
    },

    minuteRange() {
      if (!this.form.start_time) return [[0,60]]
      return [[parseInt(this.form.start_time.split(':')[1]), 60]]
    },
  },
}
</script>
