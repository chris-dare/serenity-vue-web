<template>
  <BaseModal
    :name="name"
  >
    <template slot="title">
      <div>
        <h1>Add labs</h1>
        <p class="text-secondary text-sm">Add a new lab test to performed on patient</p>
      </div>
    </template>
    <template>
      <SeForm class="space-y-8 mt-8">
        <div class="space-y-4">
          <MultiSelect
            v-model="form.code"
            title="Choose lab type"
            :multiple="false"
            :options="labProceedures"
            track_by="id"
            label="healthcare_service_name"
            custom-field="healthcare_service_name"
            placeholder="Search or choose a lab text to be performed"
          />
         
          <cv-text-area
            v-model="form.order_detail[0].display"
            label="Order details"
            placeholder="Details for this order"
            :rows="4"
            class="col-span-2"
          />
          <cv-text-area
            v-model="form.patient_instruction"
            label="Note"
            placeholder="Leave a note for the lab tecnician"
            :rows="4"
            class="col-span-2"
          />

          <PrioritiesSelect
            v-model="form.priority"
            :options="priorities"
          />
        
          <div class="grid grid-cols-2 gap-4">
            <cv-text-input
              v-model="form.specimen"
              type="text"
              label="Specimen"
              placeholder="Specimen"
            />
            <cv-text-input
              v-model="form.service_request_bodysite[0].display"
              type="text"
              label="Bodysite"
              placeholder="Body site"
            />
          </div>
        </div>

        <div class="flex space-x-2">
          <SeButton
            :loading="loading"
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
        </div>
    

        <div>
          <p class="mb-2 font-semibold">Previous Labs</p>

          <DataTable
            small
            :data="data"
            :columns="columns"
            no-data-label="No labs"
          >
            <template #default="{row}">
              <cv-data-table-cell>
                <p>{{ $date.formatDate(row.authored_on, 'dd MMM, yyyy') }}</p>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <p>{{ row.code }}</p>
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
        </div>
      </SeForm>

      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary"
          @click="close"
        >
          Go back
        </SeButton>
        <div class="flex items-center">
          <SeButton
            :loading="loading"
            @click="add"
          >
            Add new lab
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
  name: 'AddLabResultsModal',

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
    'lab:add:open': function() {
      this.open()
      this.mode = 'create'
    },
    'lab-report:update:open': function(data) {
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
