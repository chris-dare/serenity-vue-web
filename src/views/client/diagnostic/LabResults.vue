<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <div class="space-y-2">
      <PatientInfoCard class="mb-0 border-b border-solid border-tetiary" />
    </div>
    <div class="space-y-4 my-6">
      <LabsTable hide-search />
    </div>
  </AppStatePage>
</template>

<script>
import PatientInfoCard from '@/components/patients/PatientInfoCard'
import LabsTable from '@/components/diagnostic/LabsReports'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PatientResults',

    
  components: { PatientInfoCard, LabsTable },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      selected: '',
      loading: false,
    }
  },

  computed: {
    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
    }),
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        vm.loading = true
        await vm.getPatient(vm.id)
        vm.loading = false
      } catch (error) {
        vm.error = error.detail || 'Error loading page. Please check your internet connection and try again.'
        vm.loading = false
      }
    })
  },

  beforeRouteLeave (to, from, next) {
    next(async vm => {
      await vm.refresh()
    })
  },


  methods: {
    ...mapActions({
      getPatient: 'patients/getPatient',
      refresh: 'patients/refreshCurrentPatient',
    }),
  },
}
</script>