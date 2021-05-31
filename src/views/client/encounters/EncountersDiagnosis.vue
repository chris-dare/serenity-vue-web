<template>
  <div class="relative h-enc">
    <SeForm class="space-y-8">
      <p
        v-if="mode === 'update'"
        class="font-semibold"
      >
        Edit diagnosis
      </p>
      <p
        v-else
        class="font-semibold"
      >
        Add diagnosis
      </p>

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

      <div class="flex">
        <SeButton
          v-if="mode === 'update'"
          :icon="add"
          :loading="loading"
          @click="submit"
        >
          Update
        </SeButton>
        <SeButton
          v-else
          :icon="add"
          :loading="loading"
          @click="submit"
        >
          Add Diagnosis
        </SeButton>
        <SeButton
          v-if="mode === 'update'"
          class="ml-2"
          variant="secondary"
          @click="cancelUpdate"
        >
          Cancel
        </SeButton>
      </div>
    

      <div v-if="mode == 'create'">
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
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4 cursor-pointer"
              @click="$router.push({ name: 'EditEncounterDiagnosis', params: { diagnosisId: diagnosis.id } })"
            >
            <Trash
              class="w-5 h-5 cursor-pointer"
              @click="confirmDelete(diagnosis)"
            />
          </div>
        </div>
      </div>
    </SeForm>

    <div
      v-if="mode === 'create'"
      class="flex justify-between items-center absolute w-full right-0 bottom-12"
    >
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
    <ConfirmDeleteModal
      :loading="deleteLoading"
      @delete="removeDiagnosis"
    />
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
  props: ['diagnosisId'],

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {},
      loading: false,
      deleteLoading: false,
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
    mode() {
      return this.diagnosisId ? 'update' : 'create'
    },
  },

  watch: {
    diagnosisId() {
      this.init()
    },
  },

  methods: {
    ...mapActions({
      createDiagnosis: 'encounters/createDiagnosis',
      updateDiagnosis: 'encounters/updateDiagnosis',
      deleteDiagnosis: 'encounters/deleteDiagnosis',
    }),

    init() {
      if(this.mode === 'update'){
        const diagnosis = this.currentEncounterDiagnosis.find(el => el.id === this.diagnosisId)
        this.form.condition = diagnosis.condition
        this.form.role = diagnosis.role
        this.form.id = this.diagnosisId
      }
    },

    confirmDelete(diagnosis) {
      this.$trigger('confirm:delete:open', { data: diagnosis.id, label: 'Are you sure you want to delete this diagnosis?' })
    },

    async removeDiagnosis(id) {
      this.deleteLoading = true
      try {
        await this.deleteDiagnosis(id).then(() => {
          this.$toast.open({
            message: 'Diagnosis successfully deleted',
          })
        })
        this.deleteLoading = false
        this.$trigger('confirm:delete:close')
       
      /* eslint-disable-next-line */
      } catch (error) {
      }
      this.deleteLoading = false
    },

    submit(reroute = false) {
      if (reroute && this.dataHasNotChanged) {
        this.$router.push({ name: 'EncounterLabs', params: { id: this.$route.params.id }})
        return
      }

      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.mode === 'update') {
        this.update()
      } else {
        this.save(reroute)
      }
      
    },

    cancelUpdate() {
      this.$router.go(-1)
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
        throw(error)
      }
    },

    async update() {
      this.loading = true
      try {
        await this.updateDiagnosis(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Diagnosis successfully updated',
        })
        this.reset()
        this.$router.push({ name: 'EncounterDiagnosis' })
        /* eslint-disable-next-line */
      } catch (error) {
      }
      this.loading = false
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
