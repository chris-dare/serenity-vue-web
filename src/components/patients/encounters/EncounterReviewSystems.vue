<template>
  <SeForm class="space-y-4">
    <MultiSelect
      v-model="form.field"
      track-by="code"
      label="display"
      :options="examUnitTypes"
      title="System"
      placeholder="Select a system"
      custom-field="code"
      :error-message="$utils.validateRequiredField($v, 'field')"
    />

    <cv-text-area
      v-model="form.value"
      :rows="5"
      placeholder="Enter information here"
      label="Examination notes"
      :invalid-message="$utils.validateRequiredField($v, 'value')"
    />

    <div class="flex justify-end mt-2">
      <SeButton
        :loading="loading"
        @click="save"
      >
        save
      </SeButton>
    </div>

    <div>
      <p class="mb-2 font-semibold">Reviews</p>

      <div
        v-if="!currentPatientExamSystems.length"
        class="flex items-center my-4"
      >
        No review available
      </div>
      <div
        v-else
        class="space-y-3"
      >
        <div
          v-for="(exam, index) in currentPatientExamSystems"
          :key="index"
          class="flex items-center space-x-2"
        >
          {{ exam.unit }} - {{ exam.value }}
        </div>
      </div>
    </div>
  </SeForm>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'EncounterReviewSystems',

  data() {
    return {
      form: {},
      loading: false,
    }
  },

  computed: {
    ...mapState({
      examUnitTypes: state => state.resources.examUnitTypes,
    }),

    ...mapGetters({
      currentPatientExamSystems: 'encounters/currentPatientExamSystems',
    }),
  },

  validations: {
    form: {
      field: { required },
      value: { required },
    },
  },

  methods: {
    ...mapActions({
      createSystem: 'patients/createSystem',
    }),

    async save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error('These fields are required!')
        return
      }
      this.loading = true
      try {
        await this.createSystem({ payload: this.form, patient: this.$route.params.id })
        this.loading = false
        this.form = {}
        this.$v.$reset()
      } catch (error) {
        this.loading = false
      }
        
    },
  },
}
</script>
