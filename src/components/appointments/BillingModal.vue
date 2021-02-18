<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div>
        <div class="w-full flex justify-center items-center flex-col space-y-1 mb-4">
          <img
            class="w-32"
            src="@/assets/img/qr.png"
            alt=""
          >
          <p class="text-xs">Darlene Robertson</p>
          <p class="text-secondary text-xs">Female, 23 years</p>
        </div>

        <div class="grid grid-cols-1">
          <div class="flex items-center space-x-6">
            <div>
              <p class="text-xs">00232380</p>
              <p class="text-secondary text-xs">MR no.</p>
            </div>
            <div>
              <p class="text-xs">0549776944</p>
              <p class="text-secondary text-xs">Phone number</p>
            </div>
          </div>
          <div class="bg-secondary my-4 w-full h-px" />
          <div class="space-y-4">
            <p class="text-secondary text-xs">Clinic and Services</p>

            <div class="space-y-2">
              <p class="font-bold text-xs">Diagnostics</p>

              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">Service:</p>
                <p class="text-xs">SARS-COV 2 Laboratory test</p>
              </div>
              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">Price:</p>
                <p class="text-xs">GHS 1.00 (Tier:express)</p>
              </div>
            </div>
          </div>
          <div class="bg-secondary my-4 w-full h-px" />
          <div class="space-y-4">
            <p class="text-secondary text-xs">Date and Doctor</p>

            <div class="space-y-2">
              <p class="font-bold text-xs">Dr. Regina Amartey</p>

              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">General Practitioner</p>
              </div>
              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">Appointment time:</p>
                <p class="text-xs">10/12, 10:30am</p>
              </div>
            </div>
          </div>
          <div class="bg-secondary my-4 w-full h-px" />
          <div class="space-y-2">
            <p class="text-secondary text-xs">Appointment notes</p>

            <p class="text-xs">This is a note...</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div
            class="underline text-primary text-xs cursor-pointer"
            @click="modalVisible = !modalVisible"
          >
            Return to appointments
          </div>
          <cv-button
            kind="primary"
            class="my-3 flex items-center justify-center bg-serenity-primary px-4"
            @click="$emit('print')"
          >
            Print Bill
          </cv-button>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BillingModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      columns: ['Patient', 'Appointment', 'Payment Type', 'Action'],
    }
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
    }),
    filteredPatients() {
      return this.patients.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
    modalVisible: {
      set(val) {
        this.$emit('update:visible', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
