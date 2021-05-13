<template>
  <div class="flex items-center date-time-picker">
    <cv-date-picker class="se-no-label se-custom-input" />
    <Timepicker v-model="date" />
    <!-- <cv-time-picker
      class="se-no-label se-custom-input"
      :form-item="true"
    /> -->
  </div>
</template>

<script>
export default {
  name: 'DateTimePicker',

  data () {
    return {
      date: null,
    }
  },
}
</script>

<style lang="scss">
.date-time-picker{
    input{
        border: none !important;
    }
}
</style>
