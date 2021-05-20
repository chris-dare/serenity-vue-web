<template>
  <div class="divide-solid divide-y divide-subtle">
    <ToggleList
      title="Patient Vitals"
      class="pt-4"
    >
      <div class="space-y-4">
        <VitalsDetail
          small
          :form="vitals"
        />
        <SeButton
          v-if="$userCan('vitals.write')"
          variant="secondary-outline"
          @click="$trigger('capture:vitals:open')"
        >
          Record new Vitals <Add class="w-5 ml-2" />
        </SeButton>
      </div>
    </ToggleList>
    <ToggleList
      title="Chief Complaint"
      class="pt-4"
    >
      <cv-text-area
        v-model="form.chief_complaint"
        :rows="5"
        placeholder="Reason for visit"
      />
    </ToggleList>
    <ToggleList
      title="History of Present illness"
      class="pt-4"
    >
      <cv-text-area
        v-model="form.progress"
        :rows="5"
        placeholder="Progress of complaint"
      />
    </ToggleList>
    <ToggleList
      title="Past Medical History"
      class="pt-4"
    >
      <EncounterMedicalHistory />
    </ToggleList>
    <ToggleList
      title="Social History"
      class="pt-4"
    >
      <EncounterSocialHistory />
    </ToggleList>
    <ToggleList
      title="Family History"
      class="pt-4"
    >
      <cv-text-area
        v-model="form.family_history"
        :rows="5"
        placeholder="Progress of complaint"
      />
    </ToggleList>
    <ToggleList
      title="Review of systems"
      class="pt-4"
    />
  </div>
</template>

<script>
import VitalsDetail from '@/components/vitals/VitalsDetail'
import EncounterMedicalHistory from '@/components/patients/encounters/EncounterMedicalHistory'
import EncounterSocialHistory from '@/components/patients/encounters/EncounterSocialHistory'
import { mapGetters } from 'vuex'

export default {
  name: 'EncounterDetails',

  components: { VitalsDetail, EncounterMedicalHistory, EncounterSocialHistory },

  data() {
    return {
      form: {},
    }
  },

  computed: {
    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
    }),
  },
}
</script>
