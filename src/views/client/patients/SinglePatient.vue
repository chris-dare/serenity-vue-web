<template>
  <div class="w-4/5 mx-auto">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <img
            class="w-16 h-16 rounded-full mx-4"
            :src="patient.image"
            alt=""
          >
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary  capitalize">
              {{ patient.gender }}, {{ patient.age }} years
            </p>
            <div class="mt-2 flex items-center">
              <!-- <div class="bg-green-700 w-3 h-3 rounded-full mr-2"></div> -->
              <p>MR No: 0012456</p>
            </div>
          </div>
        </div>
        <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img
            src="@/assets/img/edit 1.svg"
            class="w-4 h-4"
          >
        </div>
      </div>
      <div class="flex">
        <AddNewDropdown />
        <cv-button
          v-if="!hasEncounter"
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
          @click="$router.push({ name: 'SelectPatient' })"
        >
          Record a new encounter
          <img
            src="@/assets/img/add 1.svg"
            class="ml-2"
            alt=""
          >
        </cv-button>
        <cv-button
          v-else
          kind="primary"
          size="field"
          class="px-4 bg-warning hover:bg-warning mr-2 text-black"
          @click="$router.push({ name: 'SelectPatient' })"
        >
          Open ongoing encounter
          <img
            src="@/assets/img/add 1.svg"
            class="ml-2"
            alt=""
          >
        </cv-button>
      </div>
    </div>

    <div>
      <div class="mt-2 bg-white flex">
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
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddNewDropdown from '@/components/patients/AddNewDropdown'

export default {
  name: 'SinglePatient',

  components: {AddNewDropdown},

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      hasEncounter: false,
    //   links: [
    //     { label: 'Summary', path: 'PatientSummary' },
    //     { label: 'Chart', path: 'PatientCharts' },
    //     { label: 'Encounters', path: 'PatientEncounters' },
    //     { label: 'History', path: 'PatientHistory' },
    //     { label: 'Prescriptions', path: 'PatientPrescriptions' },
    //     { label: 'Orders/Billing', path: 'PatientOrders' },
    //     { label: 'Reports', path: 'PatientReports' },
    //     { label: 'Notes', path: 'PatientNotes' },
    //   ],
    }
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
      globalType: (state) => state.global.globalType,
    }),
    links() {
      let links = [{ label: 'Summary', path: 'PatientSummary' }]

      if (this.globalType === 'Reception') {
        links.push({ label: 'Chart', path: 'PatientCharts' },{ label: 'Appointments', path: 'PatientAppointments' })
      } else {
        links.push(
          { label: 'Timeline', path: 'PatientTimeline' },
          { label: 'Chart', path: 'PatientCharts' },
          { label: 'Appointments', path: 'PatientAppointments' },
          { label: 'Encounters', path: 'PatientEncounters' },
          { label: 'Prescriptions', path: 'PatientPrescriptions' },
          { label: 'Orders/Billing', path: 'PatientOrders' },
          { label: 'Reports', path: 'PatientReports' },
          { label: 'Notes', path: 'PatientNotes' })
      }
      return links

    },
    patient() {
      return this.patients[0]
    },
    isSelected() {
      return (index) => this.initialSelected === index
    },
    summaryFields() {
      return [
        { label: 'Method', value: this.$faker().lorem.word() },
        { label: 'Payment Network', value: this.$faker().lorem.word() },
        { label: 'Phone Number', value: this.$faker().lorem.word() },
        { label: 'Name on Account', value: this.$faker().lorem.word() },
        { label: 'Secondary Method', value: this.$faker().lorem.word() },
      ]
    },
  },

  mounted() {
    this.getPatients()
  },

  methods: {
    ...mapActions({
      getPatients: 'patients/getPatients',
    }),
  },
}
</script>
