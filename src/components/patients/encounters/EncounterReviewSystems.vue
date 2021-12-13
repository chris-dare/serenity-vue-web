<template>
  <SeForm class="space-y-4">
    <MultiSelect
      v-if="type !== 'GENERAL'"
      v-model="form.unit"
      track-by="code"
      label="display"
      :options="units"
      title="System"
      placeholder="Select a system"
      custom-field="code"
      :error-message="$utils.validateRequiredField($v, 'unit')"
      required
      open-direction="bottom"
    />

    <FormInput
      v-model="form.value"
      :rows="5"
      placeholder="Enter information here"
      label="Examination notes"
      :invalid-message="$utils.validateRequiredField($v, 'value')"
      required
      type="textarea"
    />

    <div class="flex justify-end mt-2">
      <SeButton
        :loading="loading"
        @click="submit"
      >
        save
      </SeButton>
    </div>

    <div>
      <p class="mb-2 font-semibold">Reviews</p>

      <div
        v-if="!reviewTypes.length"
        class="flex items-center my-4"
      >
        No review available
      </div>
      <div
        v-else
        class="space-y-3"
      >
        <div
          v-for="(exam, index) in reviewTypes"
          :key="index"
          class="flex items-center space-x-4"
        >
          <span>{{ exam.unit }} - {{ exam.value }}</span>

          <Edit
            class="cursor-pointer"
            @click="form = { ...exam }"
          />
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

  props: {
    type: {
      type: String,
      default: null,
    },
  },

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

    units() {
      return this.examUnitTypes.filter(ex => ex.code !== 'GENERAL')
    },

    ...mapGetters({
      currentPatientExamSystems: 'encounters/currentEncounterExamSystems',
    }),

    reviewTypes() {
      if (this.type === 'GENERAL') {
        return this.currentPatientExamSystems.filter(ex => ex.unit === 'GENERAL')
      }

      return this.currentPatientExamSystems.filter(ex => ex.unit !== 'GENERAL')
    },
  },

  validations: {
    form: {
      unit: { required },
      value: { required },
    },
  },

  methods: {
    ...mapActions({
      createSystem: 'patients/createSystem',
      updateSystem: 'patients/updateObservation',
    }),

    submit() {
      if (this.type === 'GENERAL') this.form.unit = 'GENERAL'
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error('These fields are required!')
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {

      this.loading = true
      try {
        await this.createSystem({ payload: this.form, patient: this.$route.params.id })
        this.loading = false
        this.form = {}
        this.$toast.open('System record saved successfully')
        this.$v.$reset()
      } catch (error) {
        this.loading = false
      }

    },
    async update() {
      this.loading = true
      try {
        await this.updateSystem(this.form)
        this.loading = false
        this.form = {}
        this.$toast.open('System record saved successfully')
        this.$v.$reset()
      } catch (error) {
        this.loading = false
      }

    },
  },
}
</script>
