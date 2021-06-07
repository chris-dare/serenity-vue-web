<template>
  <AppointmentSelectSlot />
</template>

<script>
import AppointmentSelectSlot from '@/components/appointments/book/AppointmentSelectSlot'
import { mapState } from 'vuex'

export default {
  name: 'DateDoctor',

  components: { AppointmentSelectSlot },

  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),
  },

  async beforeMount() {
    const specialty = this.storeData.specialty
    if(!specialty){
      this.$router.push({
        name: 'ClinicsServices',
      })
      this.$toast.error('Please select a specialty before proceeding')

      return
    }
    // this.filter()
  },
}
</script>
