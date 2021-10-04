<template>
  <div class="space-y-6">
    <p class="text-serenity-primary font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6">
      <InfoLinkCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <p class="text-serenity-primary font-semibold">
      Here are your admissions ({{ 4 }})
    </p>

    <AdmissionsTable />
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import AdmissionsTable from '@/components/ipd/AdmissionsTable'

export default {
  name: 'IPDDashboard',

  components: {AdmissionsTable},

  computed: {
    dashboardTypes() {
      return [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
          hide: !this.$userCan('patient.write'),
        },
        {
          label: 'Record an admission',
          description: 'Record a patient’s admission',
          type: 'destination',
          value: 'admission',
        },
        {
          label: 'Discharge a patient',
          description: 'Discharge a patient from a ward',
          type: 'destination',
          value: 'receive',
        },
        {
          label: 'Register a patient',
          description: 'Create record for a new patient',
          type: 'baggage',
          value: 'register',
        },
        {
          label: 'Make a ward transfer',
          description: 'Transfer a patient to another ward',
          type: 'baggage',
          value: 'clients',
        },
      ]
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      switch (dashboard.value) {
      case 'admission':
        this.$router.push({ name: 'AdmissionSelectPatient' })
        break
      case 'register':
        this.$router.push({ name: 'Biodata' })
        break
      case 'search':
        this.$router.push({ name: 'Patients' })
        break

      default:
        break
      }

    },
  },
}
</script>
