<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p class="font-semibold">Medication</p>


      <MultiSelect
        v-model="form.type"
        title="Name of medicine"
        :multiple="false"
        :options="[]"
        placeholder="Name of drug"
      />

      <cv-text-area
        label="Notes"
        placeholder="Write the patients medical complaint "
        :rows="4"
      />

      <SeButton :icon="add">Add Drug</SeButton>
    

      <div>
        <p>Past medications</p>
      </div>
    </SeForm>

    <div class="flex justify-between items-center absolute w-full right-0 bottom-8">
      <SeButton :to="{name: 'EncounterLabs', params: { id: $route.params.id }}">Back to labs</SeButton>
      <SeButton
        :to="{name: 'EncounterLabs', params: { id: $route.params.id }}"
        :icon="icon"
      >
        Care plan
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'EncounterMedications',

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {},
    }
  },
}
</script>
