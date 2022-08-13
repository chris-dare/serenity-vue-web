<template>
  <div>
    <div
      v-if="label"
      class="bx--label space-x-1"
    >
      <span
        v-if="required"
        class="error"
      >*</span>
      {{ label }}
    </div>
    <div class="flex relative">
      <flat-pickr
        ref="picker"
        v-model="localValue"
        :config="configs[type]"
        :placeholder="placeholder"
        class="bg-white border-b h-10 w-full border-serenity-dark px-4"
        :disabled="disabled"
        v-bind="$attrs"
        :class="{ 'cursor-not-allowed opacity-40': disabled }"
        :data-cy="cyName"
        @on-change="$emit('change', $event)"
      />
      <Close
        v-if="localValue"
        class="absolute right-2 top-3 cursor-pointer text-serenity-dark"
        @click="clear"
      />
    </div>
    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import modelMixin from '@/mixins/model'
import { startOfMonth, endOfMonth } from 'date-fns'
import Close from '@carbon/icons-vue/es/close--outline/16.js'

export default {
  name: 'DatePicker',

  components: {
    flatPickr,
    Close,
  },

  mixins: [modelMixin],

  props: {
    label: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'date',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disableDatesBeforeToday: {
      type: Boolean,
      default: false,
    },
    maxDate: {
      type: [String, Date, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select a date',
    },
    minDate: {
      type: [String, Date, Number],
      default: null,
    },
    defaultDate: {
      type: [String, Date, Number],
      default: Date.now(),
    },
    format: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      date: null,
      // https://chmln.github.io/flatpickr/options/
    }
  },

  computed: {
    configs() {
      return {
        date: {
          dateFormat: this.format || 'Y-m-d',
          minDate: this.disableDatesBeforeToday ? 'today' : this.minDate ? this.minDate : null,
          maxDate: this.maxDate,
          altFormat: 'd M, Y',
          altInput: true,
        },
        wrap: {
          wrap: true,
          altFormat: 'M	j, Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          minDate: new Date(),
        },
        time: {
          wrap: true,
          enableTime: true,
          enableSeconds: true,
          noCalendar: true,
          allowInput: true,
          dateFormat: 'H:i:S\\Z',
          altFormat: 'h:i K',
          altInput: true,
        },
        datetime: {
          // wrap: true,
          enableTime: true,
          // dateFormat: 'Z',
          dateFormat: 'Y-m-dTH:i:S\\Z', // Displays: 2017-01-22Z
          altFormat: 'Y-m-d H:i',
          altInput: true,
          allowInput: true,
          defaultHour: 0,
          defaultMinute: 0,
          minDate: this.disableDatesBeforeToday ? 'today' : null,
        },
        inline: {
          inline: true,
        },
        allowInput: {
          allowInput: true,
          dateFormat: 'Y-m-d',
        },
        start: {
          minDate: new Date(),
          maxDate: null,
        },
        end: {
          minDate: null,
        },
        range: {
          mode: 'range',
          dateFormat: 'Y-m-d',
          defaultDate: this.defaultDate,
          minDate: this.disableDatesBeforeToday ? 'today' : null,
        },
        datetimerange: {
          mode: 'range',
          enableTime: true,
          allowInput: true,
          dateFormat: 'Y-m-dTH:i:S\\Z', // Displays: 2017-01-22Z
          altFormat: 'Y-m-d H:i',
          altInput: true,
          minDate: this.disableDatesBeforeToday ? 'today' : null,
          // defaultDate: Date.now(),
        },
        custom: {
          mode: 'range',
          // dateFormat: 'Y-m-d',
          minDate: this.disableDatesBeforeToday ? 'today' : null,
          dateFormat: 'Y-m-dTH:i:S\\Z', // Displays: 2017-01-22Z
          altFormat: 'Y-m-d',
          altInput: true,
          defaultDate: [startOfMonth(Date.now()), endOfMonth(Date.now())],
        },
      }
    },

    cyName() {
      return this.label?.split(' ').join('_').toLowerCase()
    },
  },

  methods: {
    onChange (selectedDates, dateStr, instance) {
      if (!this.type === 'custom') {
        this.$emit('change', dateStr)
        return
      }
      instance.element.value = dateStr.replace('to', ':#;')
    },

    clear() {
      this.localValue = ''
    },
  },
}
</script>

<style lang="scss">
.flatpickr-calendar{
  width: auto !important;
  height: auto !important;
}
</style>
