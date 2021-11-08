<template>
  <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
    <div class="flex">
      <div class="flex items-center space-x-4">
        <ImageBlock
          :url="patient.photo"
          :alt="(patient.name || patient.fullName) | capitalize"
        />
        <div>
          <p>{{ (patient.name || patient.fullName) | capitalize }}</p>
          <p class="text-secondary  capitalize">
            {{ patient.gender_age_description }}
          </p>
          <div class="mt-2 flex items-center">
            <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
            <p>MR No: {{ patient.mr_number }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="$userCan('patient.write') && editable"
        class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
      >
        <img
          src="@/assets/img/edit 1.svg"
          class="w-4 h-4 cursor-pointer"
          @click="$router.push({ name: 'Biodata', query: { id: patient.id } })"
        >
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PatientInfoCard',

  props: {
    editable: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),
  },
}
</script>
