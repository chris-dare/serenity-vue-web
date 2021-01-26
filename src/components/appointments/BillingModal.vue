<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="sm"
  >
    <template slot="content">
      <div>
        <div class="w-full flex justify-center items-center flex-col space-y-2">
          <img src="@/assets/img/qr.png" alt="" />
          <p>Darlene Robertson</p>
          <p class="text-serenity-text">Female, 23 years</p>
        </div>

        <div class="divide-y divide-secondary">
            <div>
                
            </div>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppointmentDetailsModal',

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
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
