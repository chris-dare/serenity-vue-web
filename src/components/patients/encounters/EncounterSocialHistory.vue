<template>
  <div>
    <SeForm class="space-y-6 my-6">
      <FormCountrySelect title="Resident Country" />

      <MultiSelect
        v-model="form.alcohol"
        title="Alcohol Status"
        :multiple="false"
        :options="['unspecified', 'yes', 'no']"
        :track-by="null"
      />
      <MultiSelect
        v-model="form.tobacco"
        title="Tobacco status"
        :multiple="false"
        :options="['unspecified', 'yes', 'no']"
        :track-by="null"
      />
      <div class="space-y-2">
        <MultiSelect
          v-model="physical.display"
          title="Physical activity"
          :multiple="false"
          :options="['unspecified', 'low', 'average', 'high']"
          :track-by="null"
        />
        <cv-text-area
          v-model="physical.notes"
          :rows="5"
          placeholder="Notes on physical activity"
        />
      </div>
      <MultiSelect
        v-model="form.eating"
        title="Eating habits"
        :multiple="false"
        :options="['unspecified', 'low', 'moderate', 'high']"
        :track-by="null"
      />
      <MultiSelect
        v-model="form.vegan"
        title="Vegetarian/Vegan"
        :multiple="false"
        :options="['unspecified', 'yes', 'no']"
        :track-by="null"
      />
    </SeForm>

    <div class="flex items-center justify-end">
      <SeButton
        :loading="loading"
        @click="save"
      >
        Save
      </SeButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'EncounterSocialHistory',

  data() {
    return {
      form: {},
      physical: {display: '', notes: ''},
      loading: false,
    }
  },

  methods: {
    ...mapActions({
      createObservation: 'encounters/createObservation',
    }),
    save() {},
  },
}
</script>
