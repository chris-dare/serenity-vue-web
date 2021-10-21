<template>
  <div class="space-y-8">
    <p class="text-secondary text-sm">
      Fall Risk assessment tool can be used to identify risk factors for fall in hospitalized patients in Clearspace Medical. The tool score may
      be used to predict future falls, but it is more important to identify risk factors using the scale and then plan care to address those risk 
      factors.
      This tool can be used by registered nurses. Use this tool in conjuction with clinical assessment and a review of medication to determine
      if patient is at risk for falls and plan care accordingly.
    </p>
    <div>
      <div class="grid grid-cols-2 border-y border-red-500 border-solid">
        <p class="font-semibold">Morse fall scale</p>
        <p class="font-semibold">Patient score</p>
      </div>
    
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid grid-cols-2 items-center"
      >
        <p class="text-secondary text-sm">{{ item.label }}</p>
        <MultiSelect placeholder="Please select a score" />
      </div>
    </div>
    <div class="space-y-4">
      <h4>Results</h4>
      <div class="divide-x divide-solid divide-gray-200 flex space-x-8">
        <MewsScore label="9" />
        <div class="pl-8">
          <p>No risk of falls</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <SeButton
        variant="secondary"
        @click="$emit('close')"
      >
        Go back
      </SeButton>
      <SeButton
        :loading="loading"
      >
        Submit
      </SeButton>
    </div>
  </div>
</template>

<script>
import MewsScore from '../MewsScore.vue'
export default {
  name: 'RiskAssessmentTools',

  components: {MewsScore},

  data() {
    return {
      items: [
        { label: 'History of fall (immediate / Previous)'},
        { label: 'Secondary Diagnosis (≥ 2 medical diagnoses in chart)'},
        { label: 'Ambulatory Aid'},
        { label: 'Intravenous Therapy/ Heparin block'},
        { label: 'Gait'},
        { label: 'Mental status '},
      ],
    }
  },
}
</script>
