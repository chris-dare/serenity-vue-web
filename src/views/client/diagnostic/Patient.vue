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
      <p class="text-serenity-primary font-semibold">
        Perform action
      </p>
      <div class="grid grid-cols-5 gap-2 lg:gap-4 my-4">
        <InfoLinkCard
          v-for="(dashboard, index) in dashboardTypes"
          :key="index"
          :is-selected="selected === dashboard.value"
          :details="dashboard"
          :type="dashboard.type"
          custom-class="bg-white border-0"
          @click="onCardClick(dashboard.value)"
        />
      </div>

      <p class="text-serenity-primary font-semibold">
        Requested lab tests
      </p>

      <LabsTable />
    </div>

    <AddLabModal />
  </AppStatePage>
</template>

<script>
import PatientInfoCard from '@/components/patients/PatientInfoCard'
import LabsTable from '@/components/diagnostic/LabsTable'
import AddLabModal from '@/components/diagnostic/modals/AddLabModal'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'DiagnosticPatient',


  components: { PatientInfoCard, LabsTable, AddLabModal },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      selected: '',
      form: {},
    }
  },

  computed: {
    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
    }),
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),
    dashboardTypes() {
      return [
        {
          label: 'Add Labs',
          description: 'Create a new lab test for patient',
          type: 'add',
          value: 'add',
          hide: !this.$userCan('diagnostic.requests.write'),
        },
        {
          label: 'View Lab results',
          description: 'View previous enteted lab results',
          type: 'report',
          value: 'result',
          hide: !this.$userCan('diagnostic.reports.read'),
        },
      ]
    },
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
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'patients/refreshCurrentPatient',
    }),
    onCardClick(action) {
      this.form.patient = this.patient
      this.addToStoreData(this.form)
      switch (action) {
      case 'add':
        this.$trigger('new-lab:add:open')
        break
      case 'sample':
        this.$router.push({name: 'Diagnostic:Labs', params: { id: this.id}})
        break
      case 'result':
        this.$router.push({name: 'Diagnostic:Labs', params: { id: this.id}})
        break
      default:
        break
      }
    },
  },
}
</script>
