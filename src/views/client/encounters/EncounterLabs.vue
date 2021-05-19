<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p class="font-semibold">Order Labs/ imaging</p>

      <MultiSelect
        v-model="form.type"
        title="Choose lab type"
        :multiple="false"
        :options="[]"
        label="first_name"
        placeholder="Search or choose a lab text to be performed"
      />

      <cv-text-area
        label="Order details"
        placeholder="Details for this order"
        :rows="4"
      />
      <cv-text-area
        label="Note"
        placeholder="Leave a note for the lab tecnician"
        :rows="4"
      />

      <MultiSelect
        v-model="form.priority"
        title="Priority"
        :multiple="false"
        :options="[]"
        label="first_name"
        placeholder="Routine, ASAP, Urgent"
      />

      <div class="grid grid-cols-2 gap-4">
        <MultiSelect
          v-model="form.body_site"
          title="Body site"
          :multiple="false"
          :options="[]"
          placeholder="Body site"
        />
        <MultiSelect
          v-model="form.specimen"
          title="Specimen"
          :multiple="false"
          :options="[]"
          placeholder="Specimen"
        />
      </div>

      <SeButton :icon="add">Add Another test</SeButton>
    

      <div>
        <p>Previous Labs</p>
      </div>
    </SeForm>

    <div class="flex justify-between items-center">
      <SeButton :to="{name: 'EncounterDiagnosis', params: { id: $route.params.id }}">Back to diagnosis</SeButton>
      <SeButton
        :to="{name: 'EncounterMedications', params: { id: $route.params.id }}"
        :icon="icon"
      >
        Submit and go to Medications
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
export default {
  name: 'EncountersLabs',

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {},
    }
  },
}
</script>
