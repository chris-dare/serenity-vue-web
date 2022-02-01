<template>
  <div class="relative h-main">
    <SeForm class="space-y-8">
      <p
        v-if="mode === 'update'"
        class="font-semibold"
      >
        Update Lab
      </p>

      <ServiceRequestForm
        v-if="mode === 'update'"
        v-model="form"
        :v="$v"
      />

      <MultipleFormWrapper
        v-else
        v-model="serviceRequests"
        :default-value="form"
        label="Order Labs/ imaging"
      >
        <template #default="{ data }">
          <ServiceRequestForm
            :value="data"
            :v="$v"
          />
        </template>
      </MultipleFormWrapper>

      <div class="flex justify-end space-x-2">
        <SeButton
          :loading="loading"
          :icon="add"
          @click="submit"
        >
          <template v-if="mode === 'create'">Request test</template>
          <template v-else>Update test</template>
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

      <div
        v-if="mode === 'create'"
        class="space-y-2"
      >
        <p class="font-semibold">Labs</p>

        <FilterGroup
          v-model="selectedFilter"
          :filters="filters"
        />

        <DataTable
          small
          :data="labs"
          :columns="columns"
          no-data-label="No labs"
        >
          <template #default="{row}">
            <cv-data-table-cell>
              <p>{{ $date.formatDate(row.authored_on, 'dd MMM, yyyy') }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.display }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.priority | capitalize }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.purpose || '-' }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.note || '-' }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div class="flex items-center space-x-2">
                <Edit
                  v-if="row.encounter === $route.params.encounter"
                  class="w-4 h-4 cursor-pointer"
                  @click="$router.push({ name: 'EditEncounterLab', params: { labId: row.id } })"
                />
                <Trash
                  class="w-4 h-4 cursor-pointer"
                  @click="confirmDeleteLab(row)"
                />
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div>
    </SeForm>

    <div class="flex justify-between items-center my-12">
      <SeButton
        variant="secondary"
        :to="{name: 'EncounterDiagnosis', params: { id: $route.params.id }}"
      >
        Back to diagnosis
      </SeButton>
      <SeButton
        :icon="icon"
        :loading="loading"
        @click="submit(true)"
      >
        Go to Medications
      </SeButton>
    </div>
    <ConfirmDeleteModal
      :loading="deleteLoading"
      @delete="removeLab"
    />
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import ServiceRequestForm from '@/components/forms/ServiceRequestForm'
import unsavedChanges from '@/mixins/unsaved-changes'
import MultipleFormWrapper from '@/components/forms/MultipleFormWrapper'

export default {
  name: 'EncountersLabs',

  components: {
    ServiceRequestForm,
    MultipleFormWrapper,
  },

  mixins: [unsavedChanges],

  props: {
    labId: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      form: {
        priority: 'routine',
        intent: 'plan',
      },
      selectedFilter: 'current',
      categories: [ 'laboratory-procedure', 'imaging', 'counselling', 'education', 'surgical-procedure' ],
      loading: false,
      propertiesToCompareChanges: ['form'],
      columns: ['Date', 'Lab test', 'Priority', 'Purpose', 'Note', 'Action'],
      priorities: [
        {display: 'Urgent (highest)', code: 'urgent'},
        {display: 'ASAP (medium)', code: 'asap'},
        {display: 'Routine (lowest)', code: 'routine'},
      ],
      deleteLoading: false,
      requiredFields: ['code'],

      serviceRequests: [{
        priority: 'routine',
        intent: 'plan',
      }],
    }
  },

  validations: {
    form: {
      code: { required },
    },
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      encounter: (state) => state.encounters.currentEncounter,
    }),

    ...mapGetters({
      currentPatientServiceRequests: 'encounters/currentPatientServiceRequests',
      currentEncounterServiceRequests: 'encounters/currentEncounterServiceRequests',
      labProceedures: 'services/labProceedures',
      visitId : 'visits/visitId',
    }),

    labs() {
      if (this.selectedFilter === 'all') {
        return this.currentPatientServiceRequests
      }

      if (this.selectedFilter === 'previous') {
        return this.currentPatientServiceRequests.filter(request => request.encounter !== this.$route.params.encounter)
      }

      return this.currentEncounterServiceRequests
    },

    mode() {
      return this.labId ? 'update' : 'create'
    },

    filters() {
      return [
        { display: 'All labs', code: 'all' },
        { display: 'Current encounter labs', code: 'current' },
        { display: 'Previous labs', code: 'previous' },
      ]
    },

    hasRequiredFields() {
      return this.$utils.objectHasRequiredData(this.form, this.requiredFields) && !this.labId
    },
  },

  watch: {
    labId: {
      immediate: true,
      handler() {
        this.init()
      },
    },
    currentEncounterServiceRequests: {
      immediate: true,
      handler() {
        this.init()
      },
    },
  },

  methods: {
    ...mapActions({
      createServiceRequest: 'patients/createServiceRequest',
      updateServiceRequest: 'patients/updateServiceRequest',
      setCurrentEncounter: 'encounters/setCurrentEncounter',
      deleteServiceRequest: 'patients/deleteServiceRequest',
    }),

    init() {
      if(this.mode === 'update'){
        let lab = this.currentEncounterServiceRequests.find(el => el.id === this.labId)
        Object.assign(this.form, lab)
      }
    },

    async removeLab(id) {
      this.deleteLoading = true
      try {
        await this.deleteServiceRequest(id).then(() => {
          this.$toast.open({
            message: 'Lab successfully deleted',
          })
        })
        this.deleteLoading = false
        this.$trigger('confirm:delete:close')
      /* eslint-disable-next-line */
      } catch (error) {
      }
      this.deleteLoading = false
    },

    submit(reroute= false) {
      if (reroute && !this.hasRequiredFields) {
        this.$router.push({ name: 'EncounterMedications', params: { id: this.$route.params.id }})
        return
      }

      this.$v.$touch()

      if (this.$v.$invalid && this.mode === 'create') {
        this.$toast.error('Please fill all required fields')
        return
      }

      if (this.mode === 'update') {
        this.update()
      } else {
        
        this.serviceRequests.map(request => {
          request.requesting_practitioner_role = this.provider.practitionerRoleId
          request.patient = this.$route.params.id
          request.location = this.$locationId
          request.encounter = this.encounter.id
          request.visit_id = this.visitId
          request.status = this.$isCurrentWorkspace('IPD') ? 'active' : 'draft'
          return request
        })
        this.save(reroute)
      }
    },

    async save(reroute) {
      this.loading = true

      try {
        await this.createServiceRequest(this.serviceRequests)
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully added',
        })
        this.reset()
        if (reroute) {
          this.$router.push({ name: 'EncounterMedications', params: { id: this.$route.params.id } })
        }
      } catch (error) {
        this.loading = false
      }
    },

    async update() {
      this.loading = true
      try {
        await this.updateServiceRequest(this.form)
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully updated',
        })
        this.reset()
        this.$router.push({ name: 'EncounterLabs' })
        /* eslint-disable-next-line */
      } catch (error) {
      }
      this.loading = false
    },

    confirmDeleteLab(lab) {
      this.$trigger('confirm:delete:open', { data: lab.id, label: 'Are you sure you want to delete this lab?' })
    },

    reset() {
      this.$v.$reset()
      this.$resetData()
    },

    customLabel (value) {
      return value.split('-').join(' ')
    },

    viewEncounter(lab) {
      this.setCurrentEncounter(lab.encounter)
      this.$router.push({ name: 'PatientEncounters', params: { id: this.$route.params.id }})
    },

    cancelUpdate() {
      this.$resetData()
      this.$v.$reset()
      this.form = {
        priority: 'routine',
        intent: 'plan',
      }
      this.$router.go(-1)
    },

    addLab() {
      this.serviceRequests.push({
        priority: 'routine',
        intent: 'plan',
      })
    },
    removeLabLocal(index) {
      this.serviceRequests.splice(index, 1)
    },
  },
}
</script>
