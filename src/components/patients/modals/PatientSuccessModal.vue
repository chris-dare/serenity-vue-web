<template>
  <BaseModal
    :name="name"
  >
    <template>
      <div class="w-full flex flex-col items-center justify-center pt-6">
        <img
          src="@/assets/img/doctor 1.svg"
          class=""
          alt=""
        >
        <p class="text-serenity-primary my-4 text-lg">Well done!</p>
        <p class="text-secondary">Patient Profile has been successfully created!</p>
        <cv-button
          kind="primary"
          class="my-6 flex items-center justify-center bg-serenity-primary px-12"
          @click="$router.push({ name: 'Patients' })"
        >
          Go to patient profile
        </cv-button>
        <router-link
          :to="{ name: 'Dashboard' }"
          class="underline text-primary"
        >
          Return to dashboard
        </router-link>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'

export default {
  name: 'PatientSuccessModal',

  mixins: [modalMixin],

  data() {
    return {
      name: 'patient-success-modal',
    }
  },

  events: {
    'patient:success:open': function(){
      this.open()
    },
  },
}
</script>
