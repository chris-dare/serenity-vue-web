<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template slot="title">
      <div>
        <h1>Add labs</h1>
        <p class="text-secondary text-sm">Add a new lab test to performed on patient</p>
      </div>
    </template>
    <template>
      <SeForm class="space-y-8 mt-8">
        <SelectService
          v-if="nextPage === 'service'"
          :modal="true"
          @next="nextPage = 'pay'"
          @stop="close"
          @back="close"
        />
        <SelectPayment
          v-if="nextPage === 'pay'"
          :modal="true"
          @next="nextPage = 'summary'"
          @stop="close"
          @back="nextPage = 'service'"
        />
        <SelectDetail
          v-if="nextPage === 'summary'"
          :modal="true"
          @next="close"
          @stop="close"
          @back="nextPage = 'pay'"
        />
      </SeForm>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DataMixin from '@/mixins/data'
import modalMixin from '@/mixins/modal'
import SelectService from '@/components/diagnostic/request/DiagnosticSelectClinic'
import SelectPayment from '@/components/diagnostic/request/DiagnosticSelectPayment'
import SelectDetail from '@/components/diagnostic/request/DiagnosticSummaryDetail'

export default {
  name: 'AddLabModal',

  components: { SelectService, SelectPayment, SelectDetail },

  mixins: [DataMixin, modalMixin],

  data() {
    return {
      nextPage: 'service',
      form: {
        order_detail: [{display: ''}],
        service_request_bodysite: [{display: ''}],
        service_request_category: [{display: 'laboratory-procedure'}],
        priority: 'routine',
      },
      mode: 'create',
      loading: false,
      columns: ['Date', 'Lab type', 'Priority', 'Order detail', 'Bodysite', 'Specimen', 'Action'],
      name: 'add-lab-modal',
    }
  },

  events: {
    'new-lab:add:open': function() {
      this.open()
      this.nextPage = 'service',
      this.mode = 'create'
    },
  },

  computed: {
    ...mapState({
      data: (state) => state.patients.patientServiceRequests,
    }),
    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      getPatientServiceRequests: 'patients/getPatientServiceRequests',
      deleteServiceRequest: 'patients/deleteServiceRequest',
    }),

    init() {
      this.loading = true
      let id = this.$route.params.id
      this.getPatientServiceRequests({ patient: id }).finally(() => this.loading = false )

    },

    async updateRequest(lab){
      this.mode = 'update'
      this.form = lab
    },

    add(){
      this.close()
      this.$trigger('requestedlabs:add:open')
    },
  },
}
</script>
