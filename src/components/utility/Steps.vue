<template>
  <div>
    <div class="grid grid-cols-6 h-20">
      <div />
      <div class="flex items-center justify-center relative">
        <div class="z-1 w-px h-10 absolute bottom-0 bg-serenity-step" />
        <div class="z-0 w-4 h-4 rounded-full bg-warning" />
      </div>
      <div class="flex items-center col-span-4">
        <p class="">{{ step.title }} ({{ step.patients.length }})</p>
      </div>
    </div>
    <div
      v-for="(patient, index) in step.patients"
      :key="index"
      class="grid grid-cols-6 h-20"
    >
      <div class="text-xs text-gray-500 flex items-center text-right">
        {{ $date.formatDate(patient.time) }}
      </div>
      <div class="flex items-center justify-center relative">
        <div
          :class="[index === step.patients.length - 1 ? 'h-10' : 'h-full']"
          class="z-1 w-px absolute top-0 bg-serenity-step"
        />
        <div class="w-2 h-2 rounded-full bg-serenity-step" />
      </div>
      <div
        class="flex items-center py-2 cursor-pointer col-span-4"
        @click="$router.push({name: currentWorkspacePatientPage, params: { id: patient.id }})"
      >
        <InfoImageBlock
          :label="patient.fullName | capitalize"
          :description="patient.mobile"
          :url="patient.photo"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Steps',

  props: {
    step: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      currentWorkspacePatientPage: 'global/currentWorkspacePatientPage',
    }),
  },
}
</script>
