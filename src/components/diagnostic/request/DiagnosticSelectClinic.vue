<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Make Payment"
    :previous="previous"
    :modal="modal"
    :loading="finalLoading"
    :query="$route.query"
    @back="goBack"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <p class="text-primary my-4">
      {{ modal ? 'Reason for visit' : 'Create a diagnostic request' }}
    </p>
    <div class="grid grid-cols-3 gap-4">
      <InfoLinkCard
        v-for="(appointment, index) in appointmentTypes"
        :key="index"
        :is-selected="selected === appointment.value"
        :details="appointment"
        :type="appointment.type"
        @click="selected = appointment.value"
      />
    </div>
    <SeForm class="space-y-8 mt-8">
      <!-- <div class="space-y-4">
        <MultiSelect
          v-model="form.code"
          title="Choose a service"
          :multiple="false"
          :options="services"
          label="healthcare_service_name"
          track-by="id"
          placeholder="Select service"
          :error-message="$utils.validateRequiredField($v, 'code')"
          @select="clear"
        />

        <cv-text-area
          v-model="form.patient_instruction"
          label="Note"
          placeholder="Leave a note for the lab tecnician"
          :rows="4"
          class="col-span-2"
        />

        <div class="grid grid-cols-2 gap-4">
          <MultiSelect
            ref="serviceTier"
            v-model="form.service_tier"
            title="Choose a service tier"
            :multiple="false"
            :options="serviceTiers"
            label="label"
            track-by="value"
            placeholder="Service tiers"
            :error-message="$utils.validateRequiredField($v, 'service_tier')"
            preselect
          />
          <PrioritiesSelect
            v-model="form.priority"
            :options="priorities"
          />
        </div>
        <div class="flex items-center">
          <cv-checkbox
            v-model="form.forTravel"
            value="true"
            label="This is for travel"
          />
          <cv-text-input
            v-if="form.forTravel"
            v-model="form.passport_number"
            type="text"
            label="Passport number"
            placeholder="Passport number"
          />
        </div>
      </div> -->
      <ServiceRequestForm
        v-model="form"
        :v="$v"
      />

      <!-- <div class="flex space-x-2">
        <SeButton
          :loading="loading"
          :icon="mode === 'create' ? add : edit"
          @click="submit"
        >
          <template v-if="mode === 'create'">Add test</template>
          <template v-else>Update test</template>
        </SeButton>
        <SeButton
          v-if="mode === 'update'"
          class="ml-2"
          variant="secondary"
          @click="mode = 'create'"
        >
          Cancel
        </SeButton>
      </div> -->


      <!-- <div v-if="mode === 'create'">
        <p class="mb-2 font-semibold">Previous Labs of {{ storeData.patient ? storeData.patient.first_name + ' ' + storeData.patient.last_name : '' }}</p>

        <DataTable
          small
          :data="currentEncounterServiceRequests"
          :columns="columns"
          no-data-label="No labs"
        >
          <template #default="{row}">
            <cv-data-table-cell>
              <p>{{ $date.formatDate(row.authored_on, 'dd MMM, yyyy') }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.service }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.priority | capitalize }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $utils.getFirstData(row.order_detail) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $utils.getFirstData(row.service_request_bodysite) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.specimen }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div class="flex items-center space-x-2">
                <Edit
                  class="w-4 h-4 cursor-pointer"
                  @click="updateRequest({...row})"
                />
                <Trash
                  class="w-4 h-4 cursor-pointer"
                  @click="confirmDeleteLab(row.id)"
                />
              </div>
            </cv-data-table-cell>
          </template>
        </DataTable>
      </div> -->
    </SeForm>
    <DeleteModal
      :loading="deleteLoading"
      @delete="removeLab"
    />
    <VirtualCareRequirementsModal :visible.sync="visible" />
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/add/32'
import Edit from '@carbon/icons-vue/es/edit/32'
// import See from '@carbon/icons-vue/es/view/32'
import DeleteModal from '@/components/ui/modals/ConfirmDeleteModal'
import ServiceRequestForm from '@/components/forms/ServiceRequestForm'
import VirtualCareRequirementsModal from '@/components/appointments/VirtualCareRequirementsModal'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import unsavedChanges from '@/mixins/unsaved-changes'

export default {
  name: 'DiagnosticSelectClinic',

  components: { VirtualCareRequirementsModal, DeleteModal, ServiceRequestForm },

  mixins: [MultiStep, unsavedChanges],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    diagnosisId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      icon: ChevronRight,
      add: Add,
      edit: Edit,
      selected: 'diagnostic',
      mode: 'create',
      form: {
        priority: 'routine',
        code: null,
        forTravel: null,
      },
      categories: [ 'laboratory-procedure', 'imaging', 'counselling', 'education', 'surgical-procedure' ],
      loading: false,
      finalLoading: false,
      visible: false,
      propertiesToCompareChanges: ['form'],
      columns: ['Date', 'Lab type', 'Priority', 'Order detail', 'Bodysite', 'Specimen', 'Action'],
      acted: false,
      deleteLoading: false,
      next: 'DiagnosticPayment',
      previous: 'DiagnosticSelectPatient',
      parent: 'DiagnosticDashboard',
      visitId: '',
    }
  },

  validations: {
    form: {
      code: { required },
    },
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      services: (state) => state.services.services,
      specialties: (state) => state.resources.specialties,
      storeData: (state) => state.appointments.currentAppointment,
      types: (state) => state.appointments.appointmentTypes,
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      priorities: (state) => state.resources.priorities,
      encounter: (state) => state.encounters.currentEncounter,
      currentEncounterServiceRequests: (state) => state.patients.patientServiceRequests,
    }),

    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),

    appointmentTypes() {
      return [
        {
          label: 'Diagnostic',
          description: 'COVID-19 and other laboratory tests',
          type: 'diagnostic',
          value: 'diagnostic',
        },
      ]
    },

    serviceTiers() {
      if (!this.form.code || !this.form.code.price_tiers) return []
      return this.form.code.price_tiers.map(tier => {
        return {
          label: `${tier.display} - ${tier.currency} ${tier.charge}`,
          value: tier.display,
        }
      })
    },

    specialties() {
      if (!this.form.service) return []
      if (this.form.id) return this.services.find(service => service.id === this.form.service.id).healthcare_service_specialties
      return this.form.service.healthcare_service_specialties
    },
  },

  watch: {
    labId() {
      this.init()
    },
  },

  created(){
    this.init()
  },

  methods: {
    cancel(){
      this.refresh()
      if (this.modal) {
        this.$emit('stop')
        return
      }
      this.$router.push({ name: 'Dashboard'})
    },

    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      createVisit: 'visits/createVisit',
      getPatientServiceRequests: 'patients/getPatientServiceRequests',
      createServiceRequest: 'patients/createServiceRequest',
      updateServiceRequest: 'patients/updateServiceRequest',
      setCurrentEncounter: 'encounters/setCurrentEncounter',
      deleteServiceRequest: 'patients/deleteServiceRequest',
    }),

    init() {
      if(this.mode === 'update'){
        let lab = this.currentEncounterServiceRequests.find(el => el.id === this.labId)
        lab = JSON.parse(JSON.stringify(lab))
        Object.assign(this.form, lab)
      // } else {
      //   this.storeData.patient.id ? this.getPatientServiceRequests(this.storeData.patient.id) : this.$toast.error('Please select a patient')
      }
    },

    async updateRequest(lab){
      this.mode = 'update'
      this.form = lab
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

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid && this.mode === 'create') {
        this.$toast.error('Please fill all required fields')
        return
      }

      if (this.mode === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async startVisit(){
      this.loading = true
      this.form.patient = this.storeData.patient.id
      try {
        await this.createServiceRequest([this.form])
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully added',
        })
        // this.$router.push({ name: 'DiagnosticPayment' })

        this.getPatientServiceRequests({ patient: this.storeData.patient.id })
        this.acted = true
        // this.reset()

        // if () {
        // }
      } catch (error) {
        this.loading = false
      }
    },

    async save() {
      this.loading = true
      if(this.storeData.patient.id){
        if ( !this.visitId ) {
          await this.createVisit({
            patient: this.storeData.patient.id,
            storeData: this.storeData.id,
            status: 'waitlist',
            // need storeData handler
            assigned_to: this.provider.practitionerRoleId ,
            visit_class: 'diagnostic',
            arrived_at: this.$date.queryNow(),
          }).then( async (data) => {
            this.loading = false
            this.visitId = data.id
            this.form.visit = data.id
            this.startVisit()
          })
        } else {
          this.startVisit()
        }
      } else {
        this.$toast.error('Please select a patient')
        this.loading = false
      }
      this.loading = false
    },

    async update() {
      this.loading = true
      if(this.storeData.patient.id){
        try {
          await this.updateServiceRequest(this.form)
          this.loading = false
          this.$toast.open({
            message: 'Service Request successfully updated',
          })
          this.getPatientServiceRequests({patient: this.storeData.patient.id})
          // this.reset()
          this.mode = 'create'
          this.acted = true
          /* eslint-disable-next-line */
        } catch (error) {
        }
      } else {
        this.$toast.error('Please select a patient')
        this.loading = false
      }
      this.loading = false
    },

    confirmDeleteLab(lab) {
      this.$trigger('confirm:delete:open', { data: lab, label: 'Are you sure you want to delete this lab?' })
    },

    reset() {
      this.$v.$reset()
      this.$v.$touch()
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
      this.$router.go(-1)
    },

    clear() {
      this.$refs.serviceTier.clear()
    },
  },
}
</script>
