<template>
  <div
    class="mt-2 bg-white flex"
  >
    <div
      v-for="(link, index) in computedLinks"
      :key="index"
      tag="div"
      class="relative cursor-pointer flex-1 items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight"
      @click="goTo(link)"
    >
      {{ link.label }}
      <div
        class="w-4/5 mx-auto h-0.5 absolute bg-serenity-light-gray bottom-0"
        :class="{ 'bg-serenity-primary-highlight': link.path === selected }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DetailPageNav',

  props: {
    links: {
      type: Array,
      default: () => [],
    },

    type: {
      type: String,
      default: 'route',
    },
  },

  data() {
    return {
      selected: '',
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),

    computedLinks() {
      if(this.links.length > 0) return this.links
      let links = [
        { label: 'Summary', path: 'PatientSummary' },
      ]

      // if (this.workspaceType !== 'RECEPT') {
      //   links.push({ label: 'Timeline', path: 'PatientTimeline' })
      // }

      links.push(
        { label: 'Chart', path: 'PatientCharts' },
        { label: 'Appointments', path: 'PatientAppointments' },
        { label: 'Encounters', path: 'PatientEncounters' },
        { label: 'Prescriptions', path: 'PatientPrescriptions' },
        { label: 'Orders', path: 'PatientOrders' },
        { label: 'Bills', path: 'PatientBills' },
        { label: 'Reports', path: 'PatientReports' },
        { label: 'Notes', path: 'PatientNotes' },
      )
      return links

    },
  },

  created() {
    this.selected = this.type === 'route' ? this.$route.name : this.links[0].path
  },

  methods: {
    goTo(link) {
      if (this.type === 'route') {
        this.$router.push({ name: link.path, query: link.query })
      }

      this.selected = link.path
      this.$emit('change', link.path)
    },
  },
}
</script>
