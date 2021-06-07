<template>
  <div class="space-y-8 my-4">
    <div class="space-y-4">
      <div class="space-y-2">
        <p class="font-semibold">Past Illnesses</p>

        <p
          v-if="!patientPreviousIllness.length"
          class="text-sm text-gray-600"
        >
          No past illness recorded
        </p>

        <li
          v-for="(illness, index) in patientPreviousIllness"
          :key="index"
          class="text-sm text-gray-600"
        >
          {{ illness.value }} - {{ $date.formatDate(illness.issued) }}
        </li>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Allegies</p>

        <p
          v-if="!allergies.length"
          class="text-sm text-gray-600"
        >
          No allergies recorded
        </p>

        <li
          v-for="(allergy, index) in allergies"
          :key="index"
          class="text-sm text-gray-600"
        >
          {{ allergy.code }} - {{ allergy.clinical_status }}
        </li>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Medications</p>

        <p
          v-if="!patientPastMedications.length"
          class="text-sm text-gray-600"
        >
          No past medications recorded
        </p>

        <li
          v-for="(illness, index) in patientPastMedications"
          :key="index"
          class="text-sm text-gray-600"
        >
          {{ illness.value }} - {{ $date.formatDate(illness.issued) }}
        </li>
      </div>
      <div class="space-y-2">
        <p class="font-semibold">Surgeries</p>

        <p
          v-if="!patientPreviousHospitalization.length"
          class="text-sm text-gray-600"
        >
          No past surgeries recorded
        </p>

        <li
          v-for="(illness, index) in patientPreviousHospitalization"
          :key="index"
          class="text-sm text-gray-600"
        >
          {{ illness.value }} - {{ $date.formatDate(illness.issued) }}
        </li>
      </div>
    </div>
    <AddNewButton @click="$trigger('medical:history:open')">Update</AddNewButton>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'EncounterMedicalHistory',

  computed: {
    ...mapState({
      allergies: state => state.patientAllergies.allergies,
    }),

    ...mapGetters({
      patientPreviousIllness: 'patients/patientPreviousIllness',
      patientPreviousHospitalization: 'patients/patientPreviousHospitalization',
      patientPastMedications: 'patients/patientPastMedications',
    }),
  },
}
</script>
