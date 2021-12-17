<template>
  <div class="px-6 overflow-y-scroll h-avg">
    <div v-if="due.patients.length">
      <Steps :step="due" />
    </div>
    <div v-else-if="met.patients.length">
      <Steps :step="met" />
    </div>
    <div
      v-else
      class="flex flex-col justify-center items-center py-12"
    >
      <img
        src="@/assets/img/x ray 1.svg"
        class="mb-4 w-6"
        alt=""
      >
      <p class="font-semibold text-center mb-2">Your queue is empty</p>
      <p class="text-secondary text-center">There are no patients waiting for you.</p>
    </div>
  </div>
</template>

<script>
import Steps from './Steps'
import { mapActions, mapState } from 'vuex'
import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'
import isToday from 'date-fns/isToday'

export default {
  name: 'UtilityQueue',

  components: { Steps },

  computed: {
    ...mapState({
      visits: state => state.visits.visits,
      practitionerVisits: (state) => state.visits.practitionerVisits,
      bills: state => state.billing.billing,
      serviceRequests: state => state.diagnostic.serviceRequests,
      medicationRequests: state => state.patients.patientMedications,
    }),

    workspaceData() {
      if (this.$isCurrentWorkspace('DIAG')) {
        return this.serviceRequests
      }

      if (this.$isCurrentWorkspace('PHARM')) {
        return this.medicationRequests
      }

      if (this.$isCurrentWorkspace('BILL')) {
        return this.bills.map(bill => {
          bill.patient_detail = {
            mobile: bill.patient_mobile,
            first_name: bill.patient_name ? bill.patient_name.split(' ')[0] : '',
            lastname: bill.patient_name ? bill.patient_name.split(' ')[1] : '',
            id: bill.patientid,
            due: bill.status === 'billable',
          }
          return bill
        })
      }

      if (this.$isCurrentWorkspace('OPD')) {
        return this.practitionerVisits
      }

      return this.visits
    },

    normalizedData() {
      return this.$date.sortByDate(this.workspaceData.map(data => {
        let patient = data.patient_detail ? data.patient_detail : data.patient ? data.patient : {}
        return {
          fullName: this.$utils.concatData(patient, ['first_name', 'lastname']),
          time: data.next_encounter_due || data.authored_on || data.created_at || data.arrived_at || data.occurrence_date,
          mobile: patient.mobile,
          id: patient.id || data.patient,
          due: patient.due,
        }
      }), 'time', 'desc')
    },

    due() {
      return {
        title: 'Due',
        patients: this.normalizedData
          .filter((patient) =>
            (isAfter(parseISO(patient.time), Date.now())
            && isToday(parseISO(patient.time)))
            || patient.due,
          ),
      }
    },

    met() {
      return {
        title: 'Met',
        patients: this.normalizedData.filter(patient => isAfter(Date.now(), parseISO(patient.time))),
      }
    },
  },

  created() {
    if (this.$isCurrentWorkspace('PHARM')) {
      this.getMedicationRequests()
    }
  },

  methods: {
    ...mapActions({
      getMedicationRequests: 'patients/getMedicationRequests',
    }),

    init() {

    },
  },
}
</script>
