<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div>
        <h1>Add labs</h1>
        <p class="text-secondary text-sm">Add a new lab test to performed on patient</p>
      </div>
    </template>
    <template slot="content">
      <SeForm class="space-y-8 mt-8">
        <SelectService
          v-if="nextPage === 'service'"
          :modal="true"
          @next="nextPage = 'pay'"
          @stop="visible = false"
          @back="visible = false"
        />
        <SelectPayment
          v-if="nextPage === 'pay'"
          :modal="true"
          @next="nextPage = 'summary'"
          @stop="visible = false"
          @back="nextPage = 'service'"
        />
        <SelectDetail
          v-if="nextPage === 'summary'"
          :modal="true"
          @next="visible = false"
          @stop="visible = false"
          @back="nextPage = 'pay'"
        />
      </SeForm>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DataMixin from '@/mixins/data'
import SelectService from '@/components/diagnostic/request/DiagnosticSelectClinic'
import SelectPayment from '@/components/diagnostic/request/DiagnosticSelectPayment'
import SelectDetail from '@/components/diagnostic/request/DiagnosticSummaryDetail'

export default {
  name: 'AddLabModal',

  components: { SelectService, SelectPayment, SelectDetail },

  mixins: [DataMixin],

  data() {
    return {
      visible: false,
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
    }
  },

  events: {
    'new-lab:add:open': function() {
      this.visible = true
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

    close() {
      this.visible = false
    },
    add(){
      this.visible = false
      this.$trigger('requestedlabs:add:open')
    },
  },
}
</script>
