<template>
  <div class="relative h-full">
    <SeForm class="space-y-8">
      <p class="font-semibold">Add diagnosis</p>

      <SingleSelect
        v-model="form.role"
        title="Select a Diagnosis"
        :options="roles"
        placeholder="Choose a lab text to be performed"
        :custom-label="customLabel"
        :error-message="$utils.validateRequiredField($v, 'role')"
      />

      <cv-text-area
        v-model="form.condition"
        type="text"
        label="Notes"
        placeholder="Write the patients medical complaint"
        :invalid-message="$utils.validateRequiredField($v, 'condition')"
        :rows="5"
        class="se-input-gray"
      />

      <SeButton
        :icon="add"
        @click="submit"
      >
        Add Status Localis
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
            class="flex items-center space-x-2"
          >
            <p>{{ diagnosis.condition }} - {{ $date.formatDate(diagnosis.created_at) }}</p>
            <router-link
              class="underline"
              :to="{ name: 'EncounterReview', params: { ...$route.params } }"
            >
              view encounter
            </router-link>
          </div>
        </div>
      </div>
    </SeForm>

    <div class="flex justify-between items-center absolute w-full right-0 bottom-8">
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

export default {
  name: 'EncountersDiagnosis',

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {},
      roles: [ 'admission-diagnosis', 'discharge-diagnosis', 'chief-complaint', 'comorbidity-diagnosis', 'pre-op-diagnosis', 'post-op-diagnosis', 'billing' ],
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
          this.$router.push({ name: 'EncounterLabs'})
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
