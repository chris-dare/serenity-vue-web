<template>
  <div class="relative h-full flex flex-col pb-6 max-w-6xl">
    <div class="flex-1">
      <p><b>Encounter Summary</b> - Started On {{ $date.formatDate(encounter.start_time, 'dd MMM, yyyy @ HH:mm a') }}</p>

      <div class="divide-y divide-solid divide-subtle space-y-4">
        <div class="py-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-serenity-primary font-bold">Review</p>
            <router-link
              :to="{ name: 'EncounterReview' }"
              class="text-serenity-primary text-base"
            >
              <Edit class="w-5" />
            </router-link>
          </div>
          <div class="space-y-2">
            <div>
              <p class="text-sm font-bold">Reason for visit</p>
              <p class="capitalize text-sm">{{ encounter.chief_complaint || '-' }}</p>
            </div>
            <div>
              <p class="text-sm font-bold">History of Present illness</p>
              <p class="capitalize text-sm">{{ encounter.history_of_presenting_illness || '-' }}</p>
            </div>
          </div>
        </div>
        <div class="py-4">
          <div class="flex items-center justify-between mb-3">
            <p class="text-serenity-primary font-bold">Diagnosis</p>
            <router-link
              :to="{ name: 'EncounterDiagnosis' }"
              class="text-serenity-primary text-base"
            >
              <Edit class="w-5" />
            </router-link>
          </div>

          <div class="mt-4">
            <p
              v-if="!diagnosis.length"
              class="text-sm"
            >
              No diagnosis
            </p>
            <div
              v-for="(diag, index) in diagnosis"
              :key="index"
              class="space-y-1 mt-5"
            >
              <p class="text-sm font-bold">{{ diag.condition }}</p>
              <p class="capitalize text-sm">{{ diag.role | removeDash }}</p>
              <p
                v-if="diag.note"
                class="text-sm"
              >
                <b>Note:</b> {{ diag.note || '' }}
              </p>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-serenity-primary font-bold">Labs</p>
            <router-link
              :to="{ name: 'EncounterLabs' }"
              class="text-serenity-primary text-base"
            >
              <Edit class="w-5" />
            </router-link>
          </div>

          <div>
            <p
              v-if="!labs.length"
              class="text-sm"
            >
              No labs
            </p>
            <div
              v-for="(diag, index) in labs"
              :key="index"
              class="space-y-1"
            >
              <li class="text-sm">{{ diag.display }} - {{ diag.priority }} - {{ diag.purpose }}</li>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-serenity-primary font-bold">Medications</p>
            <router-link
              :to="{ name: 'EncounterMedications' }"
              class="text-serenity-primary text-base"
            >
              <Edit class="w-5" />
            </router-link>
          </div>

          <div>
            <p
              v-if="!medications.length"
              class="text-sm"
            >
              No medications
            </p>
            <div
              v-for="(medication, index) in medications"
              :key="index"
              class="space-y-1"
            >
              <li class="text-sm">
                {{ $utils.getFirstData(medication.medication_detail) }} {{ $utils.getFirstData(medication.medication_detail) }} {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'strength') }} -
                {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'period_unit') }}
                {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'frequency') }} {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'frequency_unit') }}
              </li>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-serenity-primary font-bold">Care plans</p>
            <router-link
              :to="{ name: 'EncounterCarePlan' }"
              class="text-serenity-primary text-base"
            >
              <Edit class="w-5" />
            </router-link>
          </div>

          <div>
            <p
              v-if="!carePlans.length"
              class="text-sm"
            >
              No care plans
            </p>
            <div
              v-for="(carePlan, index) in carePlans"
              :key="index"
              class="space-y-1"
            >
              <li class="text-sm">
                {{ carePlan.description }}
              </li>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-serenity-primary font-bold">Referral</p>
            <router-link
              :to="{ name: 'EncounterReferral' }"
              class="text-serenity-primary text-base"
            >
              <Edit class="w-5" />
            </router-link>
          </div>

          <div>
            <p
              v-if="!referrals.length"
              class="text-sm"
            >
              No referrals
            </p>
            <div
              v-for="(referral, index) in referrals"
              :key="index"
              class="space-y-1"
            >
              <p class="text-sm text-secondary">Patient referred to</p>
              <p class="text-sm">{{ referral.recipient ? referral.recipient_detail.name : referral.recipient_extra_detail }}</p>
            </div>
          </div>
        </div>
      </div>


      <div class="flex flex-wrap items-center justify-end space-x-2 mt-6">
        <SeButton
          :to="{ name: 'EncounterCarePlan' }"
          variant="secondary"
        >
          Create Care Plan
        </SeButton>
        <SeButton
          variant="secondary"
          :to="{ name: 'EncounterReferral' }"
        >
          Create Referral
        </SeButton>
        <SeButton
          variant="secondary"
          @click="followup"
        >
          Create Follow Up Appointment
        </SeButton>
        <SeButton
          :icon="icon"
          @click="end"
        >
          Close Encounter
        </SeButton>
        <SeButton
          :icon="icon"
          :loading="loading"
          @click="endVisit"
        >
          End Visit
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'EncountersSummary',

  data() {
    return {
      icon: ChevronRight,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      encounter: state => state.encounters.currentEncounter,
      currentPatient: state => state.patients.currentPatient,
    }),

    ...mapGetters({
      diagnosis: 'encounters/currentEncounterDiagnosis',
      labs: 'encounters/currentEncounterServiceRequests',
      medications: 'encounters/currentEncounterMedicationRequests',
      carePlans: 'encounters/currentEncounterCarePlans',
      referrals: 'encounters/currentEncounterReferrals',
      getSinglePractitionerByRole: 'practitioners/getSinglePractitionerByRole',
      visitId: 'visits/visitId',
    }),
  },

  methods: {
    ...mapActions({
      endEncounter: 'encounters/endEncounter',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      deleteVisit: 'visits/deleteVisit',
    }),

    followup() {
      this.addToCurrentAppointment({ patient: this.currentPatient, appointmentType: 'FOLLOWUP' })
      this.$trigger('book:appointment:open', 'followup')
    },

    end() {
      this.$trigger('visit:end:open', {
        callback: async () => {
          this.loading = true
          try {
            await this.endEncounter()
            this.$toast.open({
              message: 'Encounter ended successfully',
            })
            this.$router.push({ name: 'PatientSummary', params: { id: this.$route.params.id }})
            this.loading = false
          } catch (error) {
            // empty
            throw error || error.message
          }
        },
      })
    },

    async endVisit() {
      this.$trigger('actions-modal:open', {
        confirmButtonText: 'End',
        type: 'delete',
        confirmButtonVariant: 'danger',
        label: 'Are you sure you want to end this visit?',
        callback: async () => {
          try {
            this.loading = true
            await this.endEncounter()
            await this.deleteVisit(this.visitId)
            this.$toast.open({ message: 'The visit has ended' })
            this.$router.push({ name: 'PatientSummary', params: { id: this.$route.params.id }})
            this.loading = false

          } catch (error) {
            this.loading = false
          }
        },
        cancel: async () => {

        },
      })
    },
  },
}
</script>
