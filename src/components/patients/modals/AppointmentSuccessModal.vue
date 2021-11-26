<template>
  <BaseModal
    :name="name"
  >
    <template>
      <div class="w-full flex flex-col items-center justify-center">
        <img
          src="@/assets/img/calendar--event 1.svg"
          class=""
          alt=""
        >
        <p class="text-serenity-primary my-4 text-lg">Well done!</p>
        <p class="text-secondary">New appointment booked for Darlene Robertson</p>
        <cv-button
          kind="primary"
          class="my-6 flex items-center justify-center bg-serenity-primary px-12"
          @click="$router.push({ name: 'Patients'})"
        >
          Go to patient profile
        </cv-button>
        <router-link
          :to="{name: 'Patients'}"
          class="underline text-primary"
        >
          Return to appointments
        </router-link>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
export default {
  name: 'AppointmentSuccessModal',

  mixins: [modalMixin],

  data() {
    return {
      name: 'appointment-success-modal',
    }
  },

  events: {
    'appointment:success:open': function(){
      this.open()
    },
  },
}
</script>
