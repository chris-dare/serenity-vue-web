<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template slot="title">
      <div>
        <h1>Add new device</h1>
      </div>
    </template>
    <template>
      <SeForm class="space-y-8 mt-8">
        <div class="space-y-4">
          <cv-text-input
            v-model="form.specimen"
            type="text"
            label="Device Name"
            placeholder="Device Name"
          />
          <MultiSelect
            v-model="form.code"
            title="Select Device type"
            :multiple="false"
            :options="labProceedures"
            track_by="id"
            label="healthcare_service_name"
            custom-field="healthcare_service_name"
            placeholder="Search or select a device type"
          />
        </div>
      </SeForm>

      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="outline"
          @click="close"
        >
          Cancel
        </SeButton>
        <div class="flex items-center">
          <SeButton
            :loading="loading"
            class="mr-3"
            variant="secondary"
          >
            Save device
          </SeButton>
          <SeButton
            :loading="loading"
          >
            Save and configure device
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DataMixin from '@/mixins/data'
import modalMixin from '@/mixins/modal'

export default {
  name: 'AddNewDevice',

  mixins: [DataMixin, modalMixin],

  data() {
    return {
      nextPay: false,
      form: {
        order_detail: [{display: ''}],
        service_request_bodysite: [{display: ''}],
        service_request_category: [{display: 'laboratory-procedure'}],
        priority: 'routine',
      },
      mode: 'create',
      loading: false,
      columns: ['Date', 'Lab type', 'Priority', 'Order detail', 'Bodysite', 'Specimen', 'Action'],
      deleteLoading: false,
      name: 'add-lab-results-modal',
    }
  },

  events: {
    'device:add:open': function() {
      this.open()
      this.mode = 'create'
    },
    'device:update:open': function(data) {
      this.open()
      this.form = data.params[0]
      this.mode = 'update'
    },
  },

  computed: {
    ...mapState({
      data: (state) => state.patients.patientServiceRequests,
    }),
    ...mapGetters({
      data: 'patient/patientServiceRequests',
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

    confirmDeleteLab(lab) {
      this.$trigger('confirm:delete:open', { data: lab, label: 'Are you sure you want to delete this lab?' })
    },

    add(){
      this.close()
      this.$trigger('requestedlabs:add:open')
    },
  },
}
</script>
