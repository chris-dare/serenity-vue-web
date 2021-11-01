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

      <cv-checkbox
        v-model="form.is_provisional_diagnosis"
        label="Is this a provisional diagnosis?"
        value="check-1"
      />

      <AutoCompleteClinicalTables
        v-model="form.condition"
        :error-message="$utils.validateRequiredField($v, 'condition')"
        title="Select or type diagnosis"
        placeholder="Write the patients medical complaint"
        close-on-select
        required
        :multiple="false"
      />

      <MultiSelect
        v-model="form.role"
        title="Type of Diagnosis"
        :options="roles"
        :multiple="false"
        :track-by="null"
        placeholder="Choose a lab text to be performed"
        :custom-label="customLabel"
        :error-message="$utils.validateRequiredField($v, 'role')"
        required
      />

      <FormInput
        v-model="form.note"
        placeholder="Write additional information for this appointment here"
        :rows="5"
        label="Notes"
        type="textarea"
      />

      <div class="flex justify-end">
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

        <DataTable
          small
          :data="currentEncounterDiagnosis"
          :columns="columns"
          no-data-label="No diagnoses"
        >
          <template #default="{row}">
            <cv-data-table-cell>
              <div>
                <p>{{ $date.formatDate(row.created_at, 'dd MMM, yyyy') }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ row.is_provisional_diagnosis ? 'Provisional' : 'Final' }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ row.condition }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ row.role | removeDash }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div class="flex items-center space-x-2">
                <Edit
                  class="w-4 h-4 cursor-pointer"
                  @click="$router.push({ name: 'EditEncounterDiagnosis', params: { diagnosisId: row.id } })"
                />
                <Trash
                  class="w-4 h-4 cursor-pointer"
                  @click="confirmDelete(row)"
                />
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>
    </SeForm>

    <div
      v-if="mode === 'create'"
      class="flex justify-between items-center w-full my-12"
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
        Order labs
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
import Add from '@carbon/icons-vue/es/add/32'
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import unsavedChanges from '@/mixins/unsaved-changes'

export default {
  name: 'EncountersDiagnosis',

  mixins: [unsavedChanges],

  props: {
    diagnosisId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {
        condition: '',
        role: 'chief-complaint',
        is_provisional_diagnosis: true,
      },
      loading: false,
      deleteLoading: false,
      roles: [ 'admission-diagnosis', 'discharge-diagnosis', 'chief-complaint', 'comorbidity-diagnosis', 'pre-op-diagnosis', 'post-op-diagnosis', 'billing' ],
      columns: ['Date', 'Type', 'Condition', 'Role', 'Action'],
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
        this.$toast.error('Please fill in the required fields')
        return
      }

      if (this.mode === 'update') {
        this.update()
      } else {
        this.save(reroute)
      }

    },

    cancelUpdate() {
      this.form = {
        condition: '',
        role: '',
      }
      this.$v.$reset()
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
      Object.assign({}, this.form, {})
      this.resetDirtyState()
    },
  },
}
</script>
