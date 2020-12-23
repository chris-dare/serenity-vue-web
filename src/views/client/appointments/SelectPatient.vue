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
      <cv-data-table :columns="columns" :data="filteredPatients">
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredPatients"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <img
                  class="w-12 h-12 rounded-full mr-3"
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
          @click="$router.push({ name: 'ClinicsServices' })"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          >Next: Clinic and service</cv-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
import { mapState } from 'vuex'
export default {
  name: 'SelectPatient',

  components: { PatientCard },

  data() {
    return {
      columns: ['Patient', 'Weight/Height', 'Mobile'],
      search: '',
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
    }
  },
  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
      patientsCount: (state) => state.patients.patientsCount,
    }),

    filteredPatients() {
      return this.patients.slice(0, 4)
    },
  },
}
</script>
