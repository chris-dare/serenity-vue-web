<template>
  <div class="space-y-8">
    <div
      v-for="(intake, index) in form.intakes"
      :key="index"
      class="grid grid-cols-3 gap-4"
    >
      <MultiSelect
        v-model="intake.type_of_fluid"
        title="Type of fluid"
        placeholder="Select type"
        :options="[]"
      />

      <FormInput
        v-model="intake.volume"
        placeholder="Enter Volume"
        label="Volume"
      />

      <FormInput
        v-model="intake.fluid_name"
        placeholder="Enter fluid name"
        label="Fluid name"
      />
    </div>
    <SeButton variant="secondary-outline"><Add class="mr-2 w-5 h-5" /> Add new intake </SeButton>
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
export default {
  name: 'IntakeChart',

  data() {
    return {
      form: {
        intakes: [{}],
      },
      loading: false,
    }
  },
}
</script>
