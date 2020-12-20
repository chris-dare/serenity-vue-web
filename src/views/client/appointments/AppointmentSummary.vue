<template>
  <div>
    <div class="border-b border-solid border-subtle py-6">
      <p class="text-secondary mb-4">Patient</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex items-center col-span-3">
          <img
            class="w-10 h-10 rounded-full mr-3"
            :src="$faker().image.image()"
            alt=""
          />
          <div>
            <p class="text-black">{{ $faker().name.findName() }}</p>
            <p class="text-secondary">
              {{ $faker().name.gender() }}, {{ $utils.createRandom(100) }} years
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <p>{{ $utils.createRandom(200) }}kg</p>
          <p class="text-secondary">{{ $utils.createRandom(100) }}cm</p>
        </div>
        <div class="col-span-2">
          <p>{{ $faker().phone.phoneNumber() }}</p>
        </div>
        <div>
          <div
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-solid border-subtle py-6">
      <p class="text-secondary mb-4">Clinic and Services</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex items-center col-span-6">
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
              Price: <span class="text-primary">GHS 1.00 (Tier:express)</span>
            </p>
          </div>
        </div>
        <div>
          <div
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-solid border-subtle py-6">
      <p class="text-secondary mb-4">Date and Doctor</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex col-span-6">
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
              Appointment time: <span class="text-primary">10/12, 10:30am</span>
            </p>
          </div>
        </div>
        <div>
          <div
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-solid border-subtle py-6">
      <p class="text-secondary mb-2">Appointment notes:</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex items-center col-span-6">
          <p>This is a note...</p>
        </div>
        <div>
          <div
            class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center"
          >
            <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
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
          @click="visible = !visible"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary"
          >Book appointment</cv-button
        >
      </div>
    </div>
    <AppointmentSuccessModal :visible.sync="visible" />
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import Diagnostic from '@carbon/icons-vue/es/microscope/32'
import AppointmentSuccessModal from '@/components/patients/modals/AppointmentSuccessModal'
export default {
  name: 'AppointmentSummary',

  components: { Diagnostic, AppointmentSuccessModal },

  data() {
    return {
      icon: Checkmark,
      visible: false,
    }
  },
}
</script>
