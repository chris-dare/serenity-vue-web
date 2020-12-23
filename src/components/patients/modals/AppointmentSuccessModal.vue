<template>
  <cv-modal class="se-no-title-modal" close-aria-label="Close" :visible="modalVisible" size="xs">
      <template slot="content">
          <div class="w-full flex flex-col items-center justify-center">
              <img src="@/assets/img/calendar--event 1.svg" class="" alt="">
              <p class="text-serenity-primary my-4 text-lg">Well done!</p>
              <p class="text-secondary">New appointment booked for Darlene Robertson</p>
              <cv-button kind="primary" @click="$router.push({ name: 'Patients'})" class="my-6 flex items-center justify-center bg-serenity-primary px-12">Go to patient profile</cv-button>
              <router-link :to="{name: 'Patients'}" class="underline text-primary">Return to appointments</router-link>
          </div>
      </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'AppointmentSuccessModal',

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
