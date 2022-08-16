<template>
  <div>
    <SeForm class="space-y-6 my-6">
      <FormCountrySelect
        v-model="form.RESIDENT_COUNTRY"
        title="Resident Country"
      />

      <MultiSelect
        v-model="form.ALCOHOL_INTAKE"
        title="Alcohol Status"
        :multiple="false"
        :options="['no', 'occasional', 'habitual']"
      />
      <div class="space-y-2">
        <MultiSelect
          v-model="tobacco"
          title="Tobacco status"
          :multiple="false"
          :options="['unspecified', 'yes', 'no']"
        />
        <cv-text-input
          v-if="tobacco !== 'no'"
          v-model="form.TOBACCO_PACKS_PER_DAY"
          label="Tobacco packs per day"
          type="number"
        />
      </div>
      <div class="space-y-2">
        <MultiSelect
          v-model="physical"
          title="Physical activity"
          :multiple="false"
          :options="['unspecified', 'low', 'average', 'high']"
        />
        <cv-text-area
          v-model="form.PHYSICAL_ACTIVITY_FREQUENCY"
          :rows="5"
          placeholder="Notes on physical activity"
        />
      </div>
      <div class="space-y-2">
        <MultiSelect
          v-model="form.EATING_HABITS"
          title="Eating habits"
          :multiple="false"
          :options="['unspecified', 'low', 'moderate', 'high']"
          :track-by="null"
        />
        <cv-text-area
          v-model="form.EATING_HABITS_NOTES"
          :rows="5"
          placeholder="Notes on eating habits"
        />
      </div>

      <MultiSelect
        v-model="form.VEGAN_STATUS"
        title="Vegetarian/Vegan"
        :multiple="false"
        :options="['unspecified', 'yes', 'no']"
        :track-by="null"
      />
      <cv-text-area
        v-model="form.STRESS"
        :rows="5"
        placeholder="Notes on stress"
        label="Stress"
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
import { mapActions, mapGetters } from 'vuex'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'EncounterSocialHistory',

  data() {
    return {
      form: {},
      physical: '',
      loading: false,
      tobacco: 'no',
    }
  },

  computed: {
    ...mapGetters({
      currentPatientSocialHistory: 'encounters/currentPatientSocialHistory',
    }),
  },

  watch: {
    currentPatientSocialHistory: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.tobacco = val.TOBACCO_PACKS_PER_DAY ? 'yes' : 'no'
          this.form = { ...val }
        }
      },
    },
  },

  methods: {
    ...mapActions({
      createObservation: 'patients/createObservation',
    }),

    async save() {
      try {
        this.loading = true
        await this.createObservation({
          payload: omitBy(this.form, isEmpty),
          patient: this.$route.params.id,
        })
        this.$toast.open('Social history saved')
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
