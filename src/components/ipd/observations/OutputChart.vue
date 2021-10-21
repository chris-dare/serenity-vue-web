<template>
  <div class="space-y-8">
    <div
      v-for="(output, index) in form.outputs"
      :key="index"
      class="grid grid-cols-3 gap-4"
    >
      <MultiSelect
        v-model="output.type_of_fluid"
        title="Type of output"
        placeholder="Select type"
        :options="[]"
      />

      <FormInput
        v-model="output.output_name"
        placeholder="Enter output name"
        label="Output name"
      />

      <FormInput
        v-model="output.fluid_name"
        placeholder="Enter output volume"
        label="Running output volume"
      />
    </div>
    <SeButton variant="secondary-outline"><Add class="mr-2 w-5 h-5" /> Add new output </SeButton>
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
  name: 'OutputChart',

  data() {
    return {
      form: {
        outputs: [{}],
      },
      loading: false,
    }
  },
}
</script>
