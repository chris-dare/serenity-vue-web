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
      Add a service
    </p>
    <div
      v-for="(list, index) in labLists"
      :key="index"
      class="mt-3 border-b border-solid border-subtle"
    >
      <div
        v-if="list.code.code"
        class="grid grid-cols-8 gap-4 items-center mb-3"
      >
        <div class="flex items-center col-span-6">
          <div class="space-y-1">
            <p class="text-black font-semibold">{{ list.code.category }}</p>
            <p class="text-secondary text-sm">
              Service:
              <span class="text-primary">{{ list.code.display }}</span>
            </p>
            <p
              v-if="list.price_tier"
              class="text-secondary text-sm"
            >
              Price: <span class="text-primary">{{ priceTier(list) }}</span>
            </p>
          </div>
        </div>
        <div>
          <Edit
            class="w-4 h-4 cursor-pointer"
            @click="editLab(list)"
          />
        </div>
        <div>
          <Trash
            class="w-4 h-4 cursor-pointer"
            @click="deleteLab(list)"
          />
        </div>
      </div>
    </div>
    <SeForm class="space-y-8 mt-8">
      <MultiServiceForm
        v-model="labRequest"
        :options="billableServiceRequests"
        :search-options="labProceedures"
        :loading="dataLoading"
        :v="$v"
        @input="$v.$touch()"
      >
        <div class="flex justify-end">
          <SeButton
            class="mt-3"
            :loading="loading"
            data-cy="billing-select-clinic-add"
            @click="addLabRequest"
          >
            Add new service
          </SeButton>
        </div>
      </MultiServiceForm>
    </SeForm>
    <DeleteModal
      :loading="deleteLoading"
      @delete="removeLab"
    />
    <VirtualCareRequirementsModal />
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/add/32'
import Edit from '@carbon/icons-vue/es/edit/32'
import DeleteModal from '@/components/ui/modals/ConfirmDeleteModal'
import MultiServiceForm from '@/components/forms/MultiServiceForm'
import VirtualCareRequirementsModal from '@/components/appointments/VirtualCareRequirementsModal'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'BillingSelectClinic',

  components: { VirtualCareRequirementsModal, DeleteModal, MultiServiceForm },

  mixins: [MultiStep],

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
      labRequest: {
        priority: 'routine',
        code: null,
        forTravel: null,
      },
      loading: false,
      finalLoading: false,
      dataLoading: false,
      acted: false,
      deleteLoading: false,
      next: 'BillingPayment',
      previous: 'BillingSelectPatient',
      parent: 'Dashboard',
      visitId: '',
      labLists: [],
      form: {},
    }
  },

  validations: {
    form: {
      labs: {required, minLength: minLength(1)},
    },
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      services: (state) => state.services.services,
      specialties: (state) => state.resources.specialties,
      storeData: (state) => state.checkout.currentCheckout,
      provider: (state) => state.auth.provider,
      location: (state) => state.global.location,
      priorities: (state) => state.resources.priorities,
      encounter: (state) => state.encounters.currentEncounter,
      patientServiceRequests: (state) => state.patients.patientServiceRequests,
    }),

    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),

    billableServiceRequests(){
      return this.patientServiceRequests.filter(
        (result) => result.status === 'draft',
      )
    },

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
  },

  async created(){
    this.init()
  },

  methods: {
    ...mapActions({
      refresh: 'checkout/refreshCheckout',
      addToStoreData: 'checkout/addToCheckout',
      createVisit: 'visits/createVisit',
      getPatientServiceRequests: 'patients/getPatientServiceRequests',
      createServiceRequest: 'patients/createServiceRequest',
      updateServiceRequest: 'patients/updateServiceRequest',
      setCurrentEncounter: 'encounters/setCurrentEncounter',
      deleteServiceRequest: 'patients/deleteServiceRequest',
    }),
  
    cancel(){
      this.refresh()
      if (this.modal) {
        this.$emit('stop')
        return
      }
      this.$router.push({ name: 'Dashboard'})
    },

    priceTier(list) {
      if (!list.code || !this.labProceedures.length) return 'Select Service'
      let service = this.labProceedures.find(service => service.order_code=== list.code.code)
      if (!service) 'Select Service'
      let price = service.price_tiers.filter(
        (result) => list.price_tier === result.id,
      )
      return `${this.$currency(price[0].charge, price[0].currency).format()} - ${price[0].description}`
    },

    

    async init() {
      this.dataLoading = true
      let id = this.storeData.patient.id
      await this.getPatientServiceRequests({ patient: id }).finally(() => this.dataLoading = false )
      this.labLists = this.form.labs || []
      this.dataLoading = false
    },

    async updateRequest(lab){
      this.mode = 'update'
      this.form = lab
    },

    addLabRequest(){
      this.$v.$touch()
      let service = this.labLists.find(service => service.code.id === this.labRequest.code.id)
      if(!service){
        if (!this.labRequest.price_tier) {
          this.$toast.open({
            message: 'Select a price tier',
            type: 'error',
          })
          return
        }
        this.labLists = [...this.labLists, { ...this.labRequest }]
        this.labRequest = {code: null}
      }
      this.form.labs = this.labLists
      
    },

    deleteLab(list){
      for( let i = 0; i < this.labLists.length; i++){                          
        if ( this.labLists[i].code.id === list.code.id) { 
          this.labLists.splice(i, 1)
          i--
        }
      }
      this.labLists = [...this.labLists]
      this.form.labs = this.labLists
    },

    editLab(list){
      this.labRequest = list
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
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      }
      this.deleteLoading = false
    },

    submit() {
      // if(this.labRequest){
      //   this.addLabRequest()
      //   return
      // }
      if (this.labRequest || !this.labLists || this.mode === 'create') {
        this.addLabRequest()
        this.$toast.error('Please add a lab request')
        return
      }
      this.form.labs = this.labLists

      if (this.mode === 'update') {
        this.update()
      } else {
        this.save()
      }
    },

    async startVisit(){
      this.loading = true
      this.form.patient = this.storeData.patient.id
      this.form.location = this.$locationId
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
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
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
            location: this.$locationId,
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
          this.$toast.open({
            message: error.message || 'Something went wrong!',
            type: 'error',
          })
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
