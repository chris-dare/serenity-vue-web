<template>
  <BaseModal
    :name="name"
    title="Laboratory Test Result"
    width="700px"
    @closed="close"
  >
    <template>
      <div
        v-if="!loading"
        class="space-y-6"
      >
        <div>
          <div class="flex items-center">
            <div>
              <p>{{ $utils.concatData(report.patient_detail, ['first_name', 'lastname']) }}</p>
              <p class="text-secondary text-xs">
                {{ report.patient_detail ? report.patient_detail.gender : '-' }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 border-b border-solid border-subtle pb-6">
          <InfoBlock
            label="Test requested"
            :description="`${report.service_request_detail.display} (${report.service_request_detail.code})`"
            description-class="text-serenity-primary"
          />
          <InfoBlock
            label="Category"
            :description="report.category || '-'"
          />
          <div>
            <p class="text-secondary mb-1">Encounter</p>
            <p>
              {{ $date.formatDate( report.diagnostic_report_conclusion_code[0] ? report.diagnostic_report_conclusion_code[0].created_at : '') }}
              <span
                v-if="!diagnostic"
                class="text-serenity-primary ml-1 underline"
              >View encounter</span>
            </p>
          </div>
          <InfoBlock
            label="Date requested"
            :description="$date.formatDate($utils.concatData(report.service_request_detail, ['authored_on']))"
          />
          <InfoBlock
            label="Date Completed"
            :description="$date.formatDate( report.approved_date_time) || '-'"
          />
          <InfoBlock
            label="Specimen"
            :description="report.specimen_types || '-'"
          />
          <InfoBlock
            label="Conclusion"
            :description="report.conclusion || '-'"
          />
        </div>
        <div
          v-if="report.diagnostic_report_results.length"
          class="grid grid-cols-4 gap-1 mt-6"
        >
          <p>Investigation</p>
          <p>Result</p>
          <p class="whitespace-nowrap">Reference range (low - high)</p>
          <p class="text-right">Intepretation</p>
        </div>
        <div>
          <div
            v-for="(list, index) in report.diagnostic_report_results"
            :key="index"
            class="grid grid-cols-4 gap-1 mt-6"
          >
            <div class="text-left">
              <p class="text-secondary capitalize">{{ list.code | removeDash }}</p>
            </div>
            <div class="flex items-center justify-begin">
              <p>{{ list.value || '-' }}</p>
              <p class="text-secondary ml-2"> {{ list.unit || '' }}</p>
            </div>
            <div class="text-left">
              <p>{{ $utils.getFirstData(list.observation_reference_range, 'low') + '-' + $utils.getFirstData(list.observation_reference_range, 'high') }}</p>
            </div>
            <div
              v-if="list.observation_interpretation"
              class="flex items-center justify-end"
            >
              <div
                class="w-2 h-2 rounded-full mr-2"
                :class="list.observation_interpretation === 'Normal' ? 'bg-success' : list.observation_interpretation === 'Low' ? 'bg-blue' : 'bg-danger'"
              />
              <p>{{ list.observation_interpretation || '-' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="space-y-6"
      >
        <h3>Loading...</h3>
      </div>
      <div class="w-full mt-8 flex items-center justify-end space-x-2">
        <SeButton
          variant="white"
          @click="close"
        >
          Close
        </SeButton>
        
        <div
          v-if="diagnostic"
          class="flex items-center"
        >
          <div
            v-if="!approved && !cancelled"
            class="flex items-center space-x-3"
          >
            <SeButton
              v-if="!approved && !review"
              variant="warning"
              class="mx-3"
              :loading="reviewLoading"
              @click="updateResult('submit-for-review')"
            >
              Submit for review
            </SeButton>
            <div
              v-else
              class="flex items-center space-x-2"
            >
              <SeButton
                variant="danger"
                :loading="rejectLoading"
                @click="updateResult('reject')"
              >
                Reject Results
              </SeButton>
              <SeButton
                :loading="approveLoading"
                @click="updateResult('approve')"
              >
                Approve Results
              </SeButton>
            </div>
          </div>
          <SeButton
            :loading="loading"
            @click="download(report.diagnostic_report_media)"
          >
            Download Document
          </SeButton>
        </div>
        <SeButton
          v-else
          variant="secondary"
        >
          Repeat this test
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import DiagnosticAPI from '@/api/diagnostic'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LabTestModal',

  mixins: [modalMixin],

  data() {
    return {
      report: {
        service_request_detail: {},
        diagnostic_report_conclusion_code: [],
      },
      approveLoading: false,
      rejectLoading: false,
      approval: '',
      reviewLoading: false,
      loading: false,
      diagnostic: false,
      name: 'lab-test-modal',
    }
  },

  computed: {
    ...mapState({
      provider: state => state.auth.provider,
    }),
    approved() {
      return this.approval === 'final'
    },
    cancelled(){
      return this.approval === 'cancelled'
    },
    review() {
      return this.approval === 'preliminary'
    },
  },

  events: {
    'lab:result:open': async function({params}){
      this.loading = true
      this.open()
      const { data } = await DiagnosticAPI.get(this.provider.id, params[0])
      this.report = data
      this.loading = false
    },
    'diagnostic-report:open': async function({params}){
      this.loading = true
      const { data } = await DiagnosticAPI.get(this.provider.id, params[0])
      this.report = data
      this.open()
      this.approval = this.report.status
      this.diagnostic = true
      this.loading = false
    },
  },

  methods: {
    ...mapActions({
      updateDiagnosticReport: 'diagnostic/updateDiagnosticReport',
      getData: 'diagnostic/getDiagnosticReports',
      updateResultStatus: 'diagnostic/updateResultStatus',
    }),
  
    async updateResult(status){
      if(status === 'approve'){
        this.approveLoading = true
      } else if(status === 'reject') {
        this.rejectLoading = true
      } else {
        this.reviewLoading = true
      }
      let payload = {
        id: this.report.id,
        payload: {
          action: status,
        },
      }
      try {
        const { data, message } = await this.updateResultStatus(payload)

        this.report = data
        this.approval = data.status

        this.$toast.open({
          message: message,
        })
        this.getData()
        this.approveLoading = false
        this.reviewLoading = false
        this.rejectLoading = false
      } catch (error) {
        this.rejectLoading = false
        this.approveLoading = false
        this.reviewLoading = false
        this.$toast.open({
          message: 'Operation failed. Contact Serenity team',
          type: 'error',
        })
      }
    },
    download(pdf){
      const file = this.$utils.getFirstData(pdf, 'file')
      if(file){
        this.loading = true
        this.$utils.downloadPDF(file)
        this.loading = false
      } else {
        this.$toast.open({
          message: 'Download failed!',
          type: 'error',
        })
      }
    },
  },
}
</script>
