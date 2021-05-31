<template>
  <div class="relative h-enc">
    <SeForm class="space-y-8">
      <p class="font-semibold">Add diagnosis</p>

      <AutoCompleteClinicalTables
        v-model="form.condition"
        :error-message="$utils.validateRequiredField($v, 'condition')"
        title="Select or type diagnosis"
        placeholder="Write the patients medical complaint"
      />

      <MultiSelect
        v-model="form.role"
        title="Select a Diagnosis"
        :options="roles"
        :multiple="false"
        placeholder="Choose a lab text to be performed"
        :custom-label="customLabel"
        :error-message="$utils.validateRequiredField($v, 'role')"
      />

      <SeButton
        :icon="add"
        :loading="loading"
        @click="submit"
      >
        Add Diagnosis
      </SeButton>
    

      <div>
        <p class="mb-2 font-semibold">Previous Diagnosis</p>

        <div
          v-if="!currentEncounterDiagnosis.length"
          class="flex items-center my-4"
        >
          No diagnosis available
        </div>
        <div
          v-else
          class="space-y-3"
        >
          <div
            v-for="(diagnosis, index) in currentEncounterDiagnosis"
            :key="index"
            class="flex items-center space-x-4"
          >
            <p><span class="text-serenity-primary">{{ diagnosis.condition }}</span> - {{ $date.formatDate(diagnosis.created_at) }} - {{ diagnosis.role }}</p>
          </div>
        </div>
      </div>
    </SeForm>

    <div class="flex justify-between items-center absolute w-full right-0 bottom-12">
      <SeButton
        variant="secondary"
        :to="{name: 'EncounterReview', params: { id: $route.params.id }}"
      >
        Back to patient review
      </SeButton>
      <SeButton
        :icon="icon"
        @click="submit(true)"
      >
        Submit and Order labs
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import unsavedChanges from '@/mixins/unsaved-changes'

export default {
  name: 'EncountersDiagnosis',

  mixins: [unsavedChanges],

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {},
      loading: false,
      roles: [ 'admission-diagnosis', 'discharge-diagnosis', 'chief-complaint', 'comorbidity-diagnosis', 'pre-op-diagnosis', 'post-op-diagnosis', 'billing' ],
      propertiesToCompareChanges: ['form'],
    }
  },

  validations: {
    form: {
      role: { required },
      condition: { required },
    },
  },

  computed: {
    ...mapGetters({
      currentEncounterDiagnosis: 'encounters/currentEncounterDiagnosis',
    }),
  },

  methods: {
    ...mapActions({
      createDiagnosis: 'encounters/createDiagnosis',
      updateDiagnosis: 'encounters/updateDiagnosis',
    }),

    submit(reroute = false) {
      if (reroute && this.dataHasNotChanged) {
        this.$router.push({ name: 'EncounterLabs', params: { id: this.$route.params.id }})
        return
      }

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      

      if (this.form.id) {
        this.update()
      } else {
        this.save(reroute)
      }
      
    },

    async save(reroute) {
      this.loading = true

      try {
        await this.createDiagnosis(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Diagnosis successfully added',
        })
        this.reset()
        if (reroute) {
          this.$router.push({ name: 'EncounterLabs', params: { id: this.$route.params.id }})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateDiagnosis(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Diagnosis successfully updated',
        })
        this.reset()
      } catch (error) {
        this.loading = false
      }
    },

    customLabel (value) {
      return value.split('-').join(' ')
    },

    reset() {
      this.$v.$reset()
      this.form = {}
    },
  },
}
</script>
