<template>
  <div
    class="max-w-7xl mx-auto"
  >
    <PatientInfoCard>
      <component :is="actionComponent" />
    </PatientInfoCard>

    <div>
      <PatientDetailsNav />
      
      <router-view />
    </div>
    <SinglePatientModals />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SinglePatientModals from '@/components/patients/modals/SinglePatientModals'
import PatientDetailsNav from '@/components/patients/PatientDetailsNav'
import PatientInfoCard from '@/components/patients/PatientInfoCard'

export default {
  name: 'SinglePatient',

  components: {
    SinglePatientModals,
    PatientDetailsNav,
    PatientInfoCard,
    ReceptionActions: () => import('@/components/patients/actions/ReceptionActions'),
    OPDActions: () => import(/* webpackPrefetch: true */ '@/components/patients/actions/OPDActions'),
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

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),
    actionComponent() {
      if (this.workspaceType === 'RECEPT') return 'ReceptionActions'
      return 'OPDActions'
    },
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
