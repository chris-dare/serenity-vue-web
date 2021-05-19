<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p class="font-semibold">Add diagnosis</p>


      <MultiSelect
        v-model="form.type"
        title="Select a Diagnosis"
        :multiple="false"
        :options="[]"
        label="first_name"
        placeholder="Choose a lab text to be performed"
      />

      <cv-text-area
        label="Notes"
        placeholder="Write the patients medical complaint "
        :rows="4"
      />

      <SeButton :icon="add">Add Status Localis</SeButton>
    

      <div>
        <p>Previous Diagnosis</p>
      </div>
    </SeForm>

    <div class="flex justify-between items-center absolute w-full right-0 bottom-8">
      <SeButton :to="{name: 'EncounterReview', params: { id: $route.params.id }}">Back to patient review</SeButton>
      <SeButton
        :to="{name: 'EncounterLabs', params: { id: $route.params.id }}"
        :icon="icon"
      >
        Submit and Order labs
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'EncountersDiagnosis',

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {},
    }
  },
}
</script>
