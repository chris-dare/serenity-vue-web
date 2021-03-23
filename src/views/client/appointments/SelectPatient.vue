<template>
  <div class="">
    <div class="flex">
      <PatientCard
        v-for="(type, index) in patientTypes"
        :key="index"
        :is-selected="selected === type.value"
        :details="type"
        :type="type.type"
        @click="selected = type.value"
      />
    </div>
    <div class="mt-5">
      <p class="text-primary mb-4">Select your patient below</p>
      <cv-search
        v-model="search"
        placeholder="Search for patient, enter name or MR number"
        class="mb-4"
        autocomplete="off"
      />
      <cv-skeleton-text
        v-if="loading"
        :heading="false"
        :paragraph="true"
        :line-count="3"
        width="100%"
      />
      <SelectPatientTable
        :columns="columns"
        :data="filteredPatients"
        :patient.sync="form.patient"
      />
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <cv-button
        class="border-serenity-primary px-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
        kind="tertiary"
      >
        Cancel
      </cv-button>
      <div class="flex items-center">
        <cv-button
          :icon="icon"
          kind="primary"
          :disabled="disabled"
          class="bg-serenity-primary ml-6"
          @click="save"
        >
          Next: Clinic and service
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
import SelectPatientTable from '@/components/appointments/tables/SelectPatientTable'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SelectPatient',

  components: { PatientCard, SelectPatientTable },

  data() {
    return {
      form: {},
      columns: ['Patient', 'Weight/Height', 'Mobile'],
      radioVal: null,
      search: '',
      icon: ChevronRight,
      patientTypes: [
        {
          label: 'Existing patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'existing',
        },
        {
          label: 'New patient',
          description: 'Create record for a new patient',
          type: 'newpatient',
          value: 'new',
        },
      ],
      selected: 'existing',
      loading: false,
    }
  },
  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
      patientsCount: (state) => state.patients.patientsCount,
    }),

    filteredPatients() {
      return this.patients.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase()),
      ).slice(0, 4)
    },

    disabled() {
      return !this.form.patient
    },
  },

  async mounted() {
    this.loading = true
    await this.getPatients()
    this.loading = false
  },

  methods: {
    ...mapActions({
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      getPatients: 'patients/getPatients',
    }),

    save() {
      this.addToCurrentAppointment(this.form)
      this.$router.push({ name: 'ClinicsServices' })
    },
  },
}
</script>
