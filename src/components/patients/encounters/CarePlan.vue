<template>
  <div class="relative h-main">
    <SeForm class="space-y-8">
      <p class="font-semibold">Care Plans</p>
      <FormInput
        v-model="form.description"
        label="Care plan"
        type="textarea"
        placeholder="Prepare a care plan"
        :input-message="$utils.validateRequiredField($v, 'description')"
        :rows="5"
        required
      />

      <div class="flex justify-end space-x-2">
        <SeButton
          :loading="loading"
          @click="submit"
        >
          <template v-if="mode === 'create'">Save</template>
          <template v-else>Update</template>
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
        <p class="mb-2 font-semibold">Previous Care plans</p>

        <DataTable
          small
          :data="currentEncounterCarePlans"
          :columns="columns"
          no-data-label="No Care Plan"
        >
          <template #default="{row}">
            <cv-data-table-cell>
              <div>
                <p>{{ row.description }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div class="space-x-2 flex items-center">
                <Edit
                  class="w-4 h-4 cursor-pointer"
                  @click="$router.push({ name: 'EditEncounterCarePlan', params: { planId: row.id } })"
                />
                <Trash
                  class="w-4 h-4 cursor-pointer"
                  @click="remove(row.id)"
                />
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>
    </SeForm>

    <div class="flex justify-between items-center mt-5 w-full right-0 bottom-12">
      <SeButton
        variant="secondary"
        :to="{name: 'EncounterMedications', params: { id: $route.params.id }}"
      >
        Back to medications
      </SeButton>
      <SeButton
        :icon="icon"
        :to="{ name: 'EncountersSummary' }"
        variant="primary"
      >
        Encounter Summary
      </SeButton>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'CarePlan',

  props: {
    planId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      icon: ChevronRight,
      form: {},
      loading: false,
      columns: ['Description', 'Action'],
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      encounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      currentEncounterCarePlans: 'encounters/currentEncounterCarePlans',
    }),

    mode() {
      return this.planId ? 'update' : 'create'
    },
  },

  validations: {
    form: {
      description: { required },
    },
  },

  watch: {
    planId: {
      immediate: true,
      handler() {
        this.init()
      },
    },
  },

  methods: {
    ...mapActions({
      createCarePlan: 'encounters/createCarePlan',
      updateCarePlan: 'encounters/updateCarePlan',
      deleteCarePlan: 'encounters/deleteCarePlan',
    }),

    init() {
      if(this.mode === 'update'){
        let lab = this.currentEncounterCarePlans.find(el => el.id === this.planId)
        Object.assign(this.form, lab)
      }
    },

    submit(reroute= false) {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill all required fields')
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
        await this.createCarePlan(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Care Plan successfully added',
        })
        this.form = {}
        if (reroute) {
          this.$router.push({ name: 'EncounterMedications'})
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      try {
        await this.updateCarePlan(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Care Plan successfully updated',
        })
        this.cancelUpdate()
      } catch (error) {
        this.loading = false
      }
    },

    close() {
      this.form = {}
      this.$v.$reset()
    },

    remove(id) {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'Delete',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to delete this care plan?',
        callback: async () => {
          this.removeCarePlan(id)
        },
        cancel: async () => {

        },
      })
    },

    reset() {
      this.$v.$reset()
      this.$resetData()
    },

    cancelUpdate() {
      this.reset()
      this.$router.push({ name: 'EncounterCarePlan', params: { planId: null }})
    },

    async removeCarePlan(id) {
      this.loading = true
      try {
        await this.deleteCarePlan(id).then(() => {
          this.$toast.open({
            message: 'Care plan successfully deleted',
          })
        })
        this.loading = false

      /* eslint-disable-next-line */
      } catch (error) {
      }
      this.loading = false
    },
  },
}
</script>
