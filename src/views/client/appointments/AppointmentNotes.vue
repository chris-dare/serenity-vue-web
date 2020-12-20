<template>
  <div>
    <p class="text-primary my-4 font-bold">
      Additional notes for the appointment
    </p>
    <cv-text-area
      :label="label"
      v-model="form.notes"
      placeholder="Write additional information for this appointment here"
      :rows="10"
    >
    </cv-text-area>
    <div class="flex items-center justify-between my-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          >Cancel</cv-button
        >
        <cv-button
          @click="$router.push({ name: 'AppointmentPayment' })"
          class="bg-black"
          kind="primary"
          >Go back</cv-button
        >
      </div>
      <div class="flex items-center">
        <cv-button
          @click="$router.push({ name: 'AppointmentSummary' })"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary"
          >Next: Summary</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'AppointmentNotes',

  data() {
    return {
      form: {},
      icon: ChevronRight,
    }
  },
}
</script>
