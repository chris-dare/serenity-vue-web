<template>
  <div>
    <div
      v-if="label"
      class="bx--label"
    >
      {{ label }}
    </div>
    <flat-pickr
      v-model="localValue"
      :config="configs[type]"
      placeholder="Select a date"
      class="bg-white border-b h-10 w-full border-serenity-dark px-4"
      v-bind="$attrs"
      @on-change="$emit('change', $event)"
    />
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
  
export default {   
  name: 'DatePicker',

  components: {
    flatPickr,
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
    disableDatesBeforeToday: {
      type: Boolean,
      default: false,
    },
    maxDate: {
      type: [String, Date],
      default: null,
    },
  },

  data() {
    return {
      date: null,
      // https://chmln.github.io/flatpickr/options/
      configs: {
        date: {
          dateFormat: 'Y-m-d',
          minDate: this.disableDatesBeforeToday ? 'today' : null,
          maxDate: this.maxDate,
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
          defaultDate: Date.now(),
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
      }, 
    }
  },
}
</script>

<style lang="scss">
.flatpickr-calendar{
  width: auto !important;
  height: auto !important;
}
</style>
