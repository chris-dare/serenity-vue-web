<template>
  <div class="">
    <div class="flex">
      <PatientCard
        @click="selected = type.value"
        :is-selected="selected === type.value"
        :details="type"
        :type="type.type"
        v-for="(type, index) in patientTypes"
        :key="index"
      />
    </div>
    <div class="mt-5">
      <p class="text-primary mb-4">Select your patient below</p>
      <cv-search
        placeholder="Search for patient, enter name or MR number"
        v-model="search"
        class="mb-4"
      ></cv-search>
      <cv-skeleton-text
        v-if="loading"
        :heading="false"
        :paragraph="true"
        :line-count="3"
        width="100%"
      ></cv-skeleton-text>
      <cv-data-table :columns="columns" :data="filteredPatients">
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredPatients"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
            class="cursor-pointer"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-2 space-x-3">
                <cv-radio-button :value="row" name="group-1" v-model="form.patient" />
                <img
                  class="w-12 h-12 rounded-full"
                  :src="row.image"
                  alt=""
                />
                <div>
                  <p class="text-sm">{{ row.name }}</p>
                  <p class="text-secondary text-xs">
                    {{ row.gender }}, {{ row.age }} years
                  </p>
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ row.weight }}kg</p>
                <p class="text-secondary text-xs">{{ row.height }}cm</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ row.phone }}</p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <cv-button
        class="border-serenity-primary px-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
        kind="tertiary"
        >Cancel</cv-button
      >
      <div class="flex items-center">
        <cv-button
          @click="save"
          :icon="icon"
          kind="primary"
          :disabled="disabled"
          class="bg-serenity-primary ml-6"
          >Next: Clinic and service</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SelectPatient',

  components: { PatientCard },

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
