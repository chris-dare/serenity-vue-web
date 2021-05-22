<template>
  <div
    class="max-w-7xl mx-auto"
  >
    <PatientInfoCard />

    <div>
      <PatientDetailsNav />
      
      <router-view />
    </div>
    <SinglePatientModals />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SinglePatientModals from '@/components/patients/modals/SinglePatientModals'
import PatientDetailsNav from '@/components/patients/PatientDetailsNav'
import PatientInfoCard from '@/components/patients/PatientInfoCard'

export default {
  name: 'SinglePatient',

  components: {
    SinglePatientModals,
    PatientDetailsNav,
    PatientInfoCard,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.loading = true
      await vm.initSinglePatientInformation(vm.id)
      vm.loading = false
    })
  },

  methods: {
    ...mapActions({
      initSinglePatientInformation: 'patients/initSinglePatientInformation',
    }),
  },
}
</script>
