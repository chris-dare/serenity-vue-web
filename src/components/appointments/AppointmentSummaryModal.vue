<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div>
        <p class="mb-2">Appointment details</p>
        <div class="border-b border-solid border-subtle py-3">
          <p class="text-secondary mb-4">Patient</p>
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-3"
              :src="$faker().image.image()"
              alt=""
            />
            <div>
              <p class="text-black">{{ $faker().name.findName() }}</p>
              <p class="text-secondary">
                {{ $faker().name.gender() }},
                {{ $utils.createRandom(100) }} years
              </p>
            </div>
          </div>
        </div>
        <div class="border-b border-solid border-subtle py-3">
          <p class="text-secondary mb-4">Clinic and Services</p>
          <div class="flex items-center">
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
            >
              <Diagnostic class="w-7 h-7 text-white" />
            </div>
            <div>
              <p class="text-black font-semibold mb-1">Diagnostics</p>
              <p class="text-secondary mb-1">
                Service:
                <span class="text-primary"> SARS-COV 2 Laboratory test</span>
              </p>
              <p class="text-secondary">
                Price:
                <span class="text-primary">GHS 1.00 (Tier:express)</span>
              </p>
            </div>
          </div>
        </div>
        <div class="border-b border-solid border-subtle py-3">
          <p class="text-secondary mb-4">Date and Doctor</p>
          <div class="flex">
            <img
              class="w-10 h-10 rounded-full mr-3"
              :src="$faker().image.image()"
              alt=""
            />
            <div>
              <p class="text-black font-semibold mb-1">
                {{ $faker().name.findName() }}
              </p>
              <p class="text-secondary mb-2">
                General Practitioner
              </p>
              <p class="text-secondary">
                Appointment time:
                <span class="text-primary">10/12, 10:30am</span>
              </p>
            </div>
          </div>
        </div>
        <div class="border-b border-solid border-subtle py-3">
          <p class="text-secondary mb-2">Appointment notes:</p>
          <div class="flex items-center">
            <p>This is a note...</p>
          </div>
        </div>
        <div class="flex items-center justify-center flex-col">
          <cv-button
            kind="primary"
            @click="$router.push({ name: 'Patients' })"
            class="my-3 flex items-center justify-center bg-serenity-primary px-12 w-full"
            >Edit appointment</cv-button
          >
          <cv-button
            class="border-danger flex items-center justify-center mb-3 px-12 text-danger hover:text-white focus:bg-danger hover:bg-danger w-full"
            kind="tertiary"
            >Cancel</cv-button
          >
          <router-link :to="{ name: 'Patients' }" class="underline text-primary"
            >Close</router-link
          >
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import Diagnostic from '@carbon/icons-vue/es/microscope/32'
export default {
  name: 'AppointmentSummaryModal',

  components: { Diagnostic },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
