<template>
  <div class="w-4/5 mx-auto">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <img
            class="w-16 h-16 rounded-full mx-4"
            :src="patient.image"
            alt=""
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary text-sm capitalize">
              {{ patient.gender }}, {{ patient.age }} years
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2"></div>
              <p>Delayed</p>
            </div>
          </div>
        </div>
        <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
        </div>
      </div>
      <div class="flex">
        <cv-button
          size="field"
          kind="primary"
          class="px-4 bg-black hover:bg-black mr-2"
        >
          Add new
          <img
            src="@/assets/img/chevron--sort--down 1.svg"
            class="ml-2"
            alt=""
          />
        </cv-button>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
          @click="$router.push({ name: 'SelectPatient' })"
        >
          Record a new encounter
          <img src="@/assets/img/add 1.svg" class="ml-2" alt="" />
        </cv-button>
      </div>
    </div>

    <div>
      <div class="mt-2 bg-white flex">
        <router-link
          tag="div"
          :to="{ name: link.path }"
          v-for="(link, index) in links"
          :key="index"
          class="relative cursor-pointer flex-1 items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight"
          >{{ link.label }}
          <div
            class="w-4/5 mx-auto h-0.5 absolute bg-serenity-light-gray bottom-0"
            :class="{ 'bg-serenity-primary-highlight': link.path === $route.name }"
          ></div>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SinglePatient',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      links: [
        { label: 'Summary', path: 'PatientSummary' },
        { label: 'Chart', path: 'PatientCharts' },
        { label: 'Encounters', path: 'PatientEncounters' },
        { label: 'History', path: 'PatientHistory' },
        { label: 'Prescriptions', path: 'PatientPrescriptions' },
        { label: 'Orders/Billing', path: 'PatientOrders' },
        { label: 'Reports', path: 'PatientReports' },
        { label: 'Notes', path: 'PatientNotes' },
      ],
    }
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
    }),
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
