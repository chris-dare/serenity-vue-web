<template>
  <div
    class="mt-2 bg-white flex"
  >
    <router-link
      v-for="(link, index) in links"
      :key="index"
      tag="div"
      :to="{ name: link.path }"
      class="relative cursor-pointer flex-1 items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight"
    >
      {{ link.label }}
      <div
        class="w-4/5 mx-auto h-0.5 absolute bg-serenity-light-gray bottom-0"
        :class="{ 'bg-serenity-primary-highlight': link.path === $route.name }"
      />
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PatientDetailsNav',

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),

    links() {

      let links = [
        { label: 'Summary', path: 'PatientSummary' },
      ]

      if (this.workspaceType !== 'RECEPT') {
        links.push({ label: 'Timeline', path: 'PatientTimeline' })
      } 
    
      links.push(
        { label: 'Chart', path: 'PatientCharts' },
        { label: 'Appointments', path: 'PatientAppointments' },
        { label: 'Encounters', path: 'PatientEncounters' },
        { label: 'Prescriptions', path: 'PatientPrescriptions' },
        { label: 'Orders/Billing', path: 'PatientOrders' },
        { label: 'Reports', path: 'PatientReports' },
        { label: 'Notes', path: 'PatientNotes' },
      )
      return links

    },
  },
}
</script>
