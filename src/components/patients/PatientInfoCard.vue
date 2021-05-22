<template>
  <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
    <div class="flex">
      <div class="flex items-center space-x-4">
        <ImageBlock
          :url="patient.url"
          :alt="patient.name"
        />
        <div>
          <p>{{ patient.name }}</p>
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
        class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
      >
        <img
          src="@/assets/img/edit 1.svg"
          class="w-4 h-4"
          @click="$router.push({ name: 'Biodata', params: { id: patient.id } })"
        >
      </div>
    </div>
    <component :is="actionComponent" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PatientInfoCard',

  components: {
    ReceptionActions: () => import('@/components/patients/actions/ReceptionActions'),
    OPDActions: () => import(/* webpackPrefetch: true */ '@/components/patients/actions/OPDActions'),
    DiagnoticActions: () => import(/* webpackPrefetch: true */ '@/components/patients/actions/DiagnoticActions'),
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),
    actionComponent() {
      if (this.workspaceType === 'RECEPT') return 'ReceptionActions'
      return 'OPDActions'
    },
  },
}
</script>
