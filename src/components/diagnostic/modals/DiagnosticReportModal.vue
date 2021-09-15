<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div>
        <h1>Diagnostic Reports</h1>
      </div>
    </template>
    <template slot="content">
      <div class="flex items-center py-5">
        <div class="space-y-1">
          <p class="text-lg font-semibold">{{ form && form.code }}</p>
          <div class="flex items-center">
            <p class="text-xs">Service: {{ form && form.code }}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between pt-4 pb-2">
          <div>
            <p class="text-md">{{ form && form.category }}</p>
            <p class="text-secondary text-xs"> Report Category </p>
          </div>
          <div class="text-right">
            <p class="text-md">{{ form && form.code }}</p>
            <p class="text-secondary text-xs"> Code </p>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 pb-2">
          <div>
            <p class="text-md">{{ form.diagnostic_report_specimen[0] ? form.diagnostic_report_specimen[0].display : '-' }}</p>
            <p class="text-secondary text-xs"> Specimen </p>
          </div>
          <div class="text-right">
            <p class="text-md">{{ form && form.status }}</p>
            <p class="text-secondary text-xs"> Status </p>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 pb-2">
          <div>
            <p class="text-md">{{ form.diagnostic_report_conclusion_code[0] ? form.diagnostic_report_conclusion_code[0].display : '-' }}</p>
            <p class="text-secondary text-xs"> Observations </p>
          </div>
          <div class="text-right">
            <p class="text-md">{{ form.diagnostic_report_conclusion_code[0] ? form.diagnostic_report_conclusion_code[0].display : '-' }}</p>
            <p class="text-secondary text-xs"> Conclusions </p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary"
          @click="close"
        >
          Go back
        </SeButton>
        <div class="flex items-center">
          <div
            v-if="!approved"
          >
            <SeButton
              class="mx-3"
              :loading="approveLoading"
              @click="approveResult()"
            >
              Approve Results
            </SeButton>
            <SeButton
              class="mx-3"
              variant="danger"
              :loading="approveLoading"
              @click="approveResult()"
            >
              Reject Results
            </SeButton>
          </div>
          <SeButton
            class="mx-3"
            :loading="loading"
          >
            Download Document
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DiagnosticReportModal',

  data() {
    return {
      visible: false,
      form: {},
      loading: false,
      approveLoading: false,
      approval: '',
    }
  },


  computed: {
    approved() {
      return this.approval === 'final'
    },
  },

  methods: {
    ...mapActions({
      updateDiagnosticReport: 'diagnostic/updateDiagnosticReport',
    }),
    close() {
      this.visible = false
    },
    async approveResult(){
      this.approveLoading = true
      this.form.status = 'final'
      try {
        await this.updateDiagnosticReport(this.form)
        this.$toast.open({
          message: 'Results successfully approved',
        })
        this.approveLoading = false
      } catch (error) {
        this.approveLoading = false
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      }
    },
  },
}
</script>
