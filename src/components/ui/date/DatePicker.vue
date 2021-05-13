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
  },

  data() {
    return {
      date: null,
      // https://chmln.github.io/flatpickr/options/
      configs: {
        date: {},
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
          // dateFormat: 'd-m-Y H:i',
          allowInput: true,
          defaultHour: 0,
          defaultMinute: 0,
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
          // minDate: 'today',
          dateFormat: 'Y-m-d',
          // disable: [
          //   function(date) {
          //   // disable every multiple of 8
          //     return !(date.getDate() % 8)
          //   },
          // ],
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
