<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Patients ({{ patientsCount }})</p>
        <router-link
          :to="{name:'Biodata'}"
          tag="cv-button"
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
        >
          Add new patient <Add class="ml-4 w-5 h-5 text-white" />
        </router-link>
      </div>

      <PatientsTable />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientsTable from '@/components/patients/PatientsTable'
export default {
  name: 'Patients',

  components: {  PatientsTable },

  data() {
    return {
      search: '',
    }
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
      patientsCount: (state) => state.patients.patientsCount,
    }),
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

<style></style>
